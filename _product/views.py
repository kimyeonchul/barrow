from django.shortcuts import render
from .forms import ProductForm
from .models import Product, Product_image
from _barrow.views import base, side
from _account.models import User
from _deal.models import Deal

from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

import datetime
def new(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        
        if form.is_valid():
            new = form.save(commit = False)
            new.productor = request.user
            new.views = 0
            new.save()
            for img in request.FILES.getlist('images'):
                i = 0 
                new_image = Product_image.objects.create(product = new, image = img, index = i)
                new_image.save()
                i+=1
        else:
            print(form.errors)
        context = {}
        context.update(base(request))
        context.update(side(request))
    return render(request, 'test.html',context)

def modify(request, product_id):
    context = {}
    context.update(base(request))
    context.update(side(request))
    if request.method == "POST":
        product = Product.objects.get(id = product_id)
        form = ProductForm(request.POST)
        
        if form.is_valid():
            cur_images = Product_image.objects.filter(product = product)
            for img in cur_images:
                img.delete()
            for img in request.FILES.getlist("images"):
                i = 0               
                new_image = Product_image.objects.create(product = product, image = img, index = i)
                new_image.save()
                i+=1
            product.title = form.cleaned_data['title']
            product.area = form.cleaned_data['area']
            product.type = form.cleaned_data['type']
            product.price = form.cleaned_data['price']
            product.price_per = form.cleaned_data['price_per']
            product.start_date = form.cleaned_data['start_date']
            product.end_date = form.cleaned_data['end_date']
            product.category = form.cleaned_data['category']
            product.memo = form.cleaned_data['memo']
            product.save()

        else:
            print(form.errors)
        return render(request, 'test.html',context)
    else:
        context["product_id"] = product_id
        return render(request, "test.html", context)

def itempage(request, product_id):
    item = Product.objects.get(id = product_id)
    item_images = Product_image.objects.filter(product = item)
    item.views += 1
    item.save()

    time = datetime.datetime.now()

    if request.user == item.productor:
        productor = {
            "name" : "나",
            "image" : request.user.image,
            "is_mine" : True,
        }

    else:
        productor = {
            "name" : item.productor.name,
            "image" : item.productor.image,
            "is_mine" : False,
        }
        if request.user.is_authenticated:
            request.user.view(item)
        
        if Deal.objects.filter(user_cons = request.user, product = item, state = "WAIT"):
            context = {
            "item" : item,
            "item_images" : item_images,
            "productor" : productor,
            "msg" : "현재 신청 수락을 기다리고 있는 상품입니다."
            }
        elif Deal.objects.filter(user_cons = request.user, product = item, state = "LEND", start_date__lte = time, end_date__gte = time):
            deal = Deal.objects.filter(user_cons = request.user, product = item, state = "LEND", start_date__lte = time, end_date__gte = time)
            context = {
            "item" : item,
            "item_images" : item_images,
            "productor" : productor,
            "msg" : "현재 대여중인 상품입니다.\n반납 예정일은 "+ str(deal.end_date)+"입니다."
            }
        else:
            context = {
                "item" : item,
                "item_images" : item_images,
                "productor" : productor,
                "favorite" : item.favor.count(),
            }
    context.update(base(request))
    context.update(side(request))
    return render(request,"test.html", context)

@csrf_exempt
def set_favorite(request):
    data = json.loads(request.body)

    item = Product.objects.get(id = data["product_id"])
    user = User.objects.get(id = data["user_id"])
    if request.method == "POST":
        user.favorite.add(item)
        user.save()
    elif request.method == "DELETE":
        user.favorite.remove(item)
        user.save()

    favorite_num = item.favor.count()
    return JsonResponse({"favorite_num" : favorite_num})