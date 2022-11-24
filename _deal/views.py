from django.shortcuts import render,redirect
from .forms import DealForm
from .models import Deal
from _product.models import Product, Product_image
from _barrow.views import base, side

from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

import datetime

def new(request, product_id):
    item = Product.objects.get(id = product_id)
    if request.method == "GET":
        
        reserveds = Deal.objects.filter(product = item)
        context = {
            "item" : item,
            "reserveds" : reserveds,
        }
        context.update(base(request))
        context.update(side(request))
        return render(request, "lentApply.html", context)

    elif request.method == "POST":
        form = DealForm(request.POST)
        if form.is_valid():
            new = form.save(commit=False)
            new.state = "WAIT"
            new.user_cons = request.user
            new.user_prod = item.productor
            new.product = item
            new.save()
        else:
            print(form.errors)
        return redirect("products:itempage",product_id)

@csrf_exempt    
def accept(request, product_id):
    item = Product.objects.get(id = product_id)
    if request.method == "GET":
        
        item_image = Product_image.objects.filter(product = item)[0]

        deals = Deal.objects.filter(product = item, user_prod = request.user)
        
        context = {
            "item" : item,
            "item_image" : item_image,
            "deals" : deals,
        }
        context.update(base(request))
        context.update(side(request))
        return render(request, "lentAccept.html", context)
    elif request.method == "POST":
        data = json.loads(request.body)

        deal = Deal.objects.get(id = data["id"])
        deal.state = "LEND"
        deal.save()

        return JsonResponse({"is_accepted" : True})

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