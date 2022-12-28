from django.shortcuts import render, redirect
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
            print(request.FILES)
            print(request.FILES.getlist('img'))
            i = 0
            for img in request.FILES.getlist('img[]'):
                new_image = Product_image.objects.create(product = new, image = img, index = i)
                new_image.save()
                i+=1

        else:
            print(form.errors)
        return redirect("barrow:home")
    context = {}
    context.update(base(request))
    context.update(side(request))
    context["product_id"] = 0
    return render(request, 'itemRegister.html',context)

def modify(request, product_id):
    context = {}
    context.update(base(request))
    context.update(side(request))
    if request.method == "POST":
        product = Product.objects.get(id = product_id)
        form = ProductForm(request.POST)
        print(request.POST)
        print(request.FILES)
        pass
        if form.is_valid():
            cur_images = Product_image.objects.filter(product = product)
            for i in range(cur_images.count()):
                try:
                    img = request.POST["img"+str(i)]
                    if img == '':
                        continue
                        
                except:
                    try:
                        img = request.FILES["img"+str(i)]
                        image = Product_image.objects.get(product=product, index= i)
                        image.image = img
                        image.save()
                    except:
                        images = Product_image.objects.filter(product = product).order_by("index")
                        images[i].delete()
            

            images = Product_image.objects.filter(product = product).order_by("index")
            i = 0
            for image in images:
                image.index = i
                image.save()
                i+=1
            for image in request.FILES.getlist("img[]"):
                new = Product_image.objects.create(product = product, image = image, index = i)
                new.save()
                i+=1
            product.title = form.cleaned_data['title']
            product.area = form.cleaned_data['area']
            product.area_detail = form.cleaned_data["area_detail"]
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
        return redirect("products:itempage",product_id)
    else:
        item = Product.objects.get(id = product_id)
        types = []
        type = list(item.type)
        type = list(map(int, type))
        types.append(type)
        context["product_id"] = product_id
        context["item"] = Product.objects.get(id = product_id)
        context["images"] = []
        images = Product_image.objects.filter(product = context["item"])
        context["images"] = images
        context["type"] = type
        return render(request, "itemRegister.html", context)

def delete(request,product_id):
    item = Product.objects.get(id = product_id)
    item.delete()
    return redirect("barrow:home")

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
        context = {
                "item" : item,
                "item_images" : item_images,
                "productor" : productor,
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
            "state" : "WAIT"
            }
        elif Deal.objects.filter(user_cons = request.user, product = item, state = "LEND", start_date__lte = time, end_date__gte = time).exists():
            deal = Deal.objects.filter(user_cons = request.user, product = item, state = "LEND", start_date__lte = time, end_date__gte = time)[0]
            context = {
            "item" : item,
            "item_images" : item_images,
            "productor" : productor,
            "deal_end_date" : deal.end_date.strftime("%Y. %m. %d"),
            "state" : "LEND"
            }
        else:
            context = {
                "item" : item,
                "item_images" : item_images,
                "productor" : productor,
                "favorite" : item.favor.count(),
                "state" : "TERMINATE"
            }
    context.update(base(request))
    context.update(side(request))
    return render(request,"itemPage.html", context)

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