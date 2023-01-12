from django.shortcuts import render,redirect
from .forms import DealForm
from .models import Deal
from _notification.models import Notification
from _product.models import Product, Product_image
from _barrow.views import base, side
from _chatting.models import Room

from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from django.contrib import messages
from django.utils.safestring import mark_safe

import datetime
from datetime import datetime

def new(request, product_id):
    item = Product.objects.get(id = product_id)
    reserveds = Deal.objects.filter(product = item)
    dates = [{"start_date" : reserved.get_start_date(),"end_date" : reserved.get_end_date()} for reserved in reserveds]
    print(dates)
    context = {
            "item" : item,
            "reserveds" : dates,
    }
    context.update(base(request))
    context.update(side(request))
    if request.method == "GET":
        
        return render(request, "lentApply.html", context)

    elif request.method == "POST":
        print(type(request.POST.get("start_date")))
        
        if datetime.strptime(request.POST.get("start_date"), '%Y-%m-%d')<item.start_date or datetime.strptime(request.POST.get("end_date"), '%Y-%m-%d')>item.end_date:
            messages.add_message(
                                request,
                                messages.ERROR,
                                '대여 기간이 잘못되었습니다.'
                        )            
            return render(request, "lentApply.html", context)
        form = DealForm(request.POST)
        print(request.POST)
        if form.is_valid():
            new = form.save(commit=False)
            new.type = request.POST["type"]
            new.state = "WAIT"
            new.user_cons = request.user
            new.user_prod = item.productor
            new.product = item
            new.save()

            new_notice = Notification(user = item.productor,content = str(request.user.name) + "님이 대여를 신청했습니다.")
            new_notice.save()
            return redirect("products:itempage",product_id)
        
        else:
            messages.add_message(
                                request,
                                messages.ERROR,
                                '양식이 틀렸습니다.'
                        )            
            return render(request, "lentApply.html", context)

@csrf_exempt    
def accept(request, product_id):
    item = Product.objects.get(id = product_id)
    if request.method == "GET":
        
        item_image = Product_image.objects.filter(product = item)[0]

        deals = Deal.objects.filter(product = item, user_prod = request.user, state = "WAIT")
        
        context = {
            "item" : item,
            "item_image" : item_image,
            "deals" : deals,
        }
        context.update(base(request))
        context.update(side(request))
        return render(request, "lentAccept.html", context)
    elif request.method == "POST":
        deal = Deal.objects.get(id = request.POST["id"])
        deal.state = "LEND"
        deal.save()

        new_notice = Notification(user = deal.user_cons,content = str(deal.user_prod.name) + "님이 대여를 수락했습니다.")
        new_notice.save()
        return redirect("deal:accept",product_id)

def delete(request, product_id):
    item = Product.objects.get(id = product_id)
    deal = Deal.objects.get(product = item, user_cons = request.user)
    if deal.user_cons.id == request.user.id:
        deal.delete()
        return redirect("products:itempage",product_id)
@csrf_exempt    
def set_state(request):
    now = datetime.datetime.now()
    deals = Deal.objects.filter(state = "ACCEPT",start_date_gte = now)
    for deal in deals:
        deal.state = "LEND"
        deal.save()
    deals = Deal.objects.filter(state = "LEND",end_date_gte = now)
    for deal in deals:
        deal.state = "TERMINATE"
        deal.save()


    return JsonResponse({"is_accepted" : True})

def send_msg(request):
    if request.method == "POST":
        deal = Deal.objects.get(id = request.POST.get("deal_id"))
       
        if Room.objects.filter(user__id=deal.user_prod.id).exists() and Room.objects.filter(user__id=deal.user_cons.id).exists():
            room = Room.objects.filter(user__id=deal.user_prod.id) and Room.objects.filter(user__id=deal.user_cons.id)
            room = room[0]
            room_name = str(room.product.title)+str(room.room_num)
            print(room_name)
            return render(request, 'chat_redirect.html', {
                'room_name_json': mark_safe(json.dumps(room_name))
            })
        else:
            room_num = Room.objects.filter(product = deal.product).count()
            new = Room(room_num = room_num+1,product = deal.product)
            new.save()
            new.user.add(deal.user_prod)
            new.user.add(deal.user_cons)
            room_name = str(new.product.title)+" "+str(new.room_num)
            return render(request, 'chat_redirect.html', {
                'room_name_json': mark_safe(json.dumps(room_name))
            })
            