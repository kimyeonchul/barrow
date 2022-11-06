from django.shortcuts import render
from .forms import KeywordForm
from .models import Keyword
from _account.models import User
from _product.models import Product
from _barrow.views import base, side

from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def get_category_num(key):
    result = []
    products = Product.objects.filter(title__contains = key)
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "CLOTHES")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "SHOES")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "TRAVELS")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "BAGS")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "CARRIERS")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "SPORTS")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "LEISURES")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "HOMES")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "FURNITURES")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "ELECTROMICS")
    result.append(products.count())

    products = Product.objects.filter(title__contains = key, category = "CASUALS")
    result.append(products.count())
    
    products = Product.objects.filter(title__contains = key, category = "OTHERS")
    result.append(products.count())

    return result

def search(request, key, ctgr = "전체", srt = "최신순"):
    # if request.user.is_authenticated:
        # user = request.user
    user = User.objects.get(id = 2)

    keyword = Keyword.objects.filter(content = key)
    if keyword:
        keyword[0].searched()
        if request.user.is_authenticated and not keyword[0].search.filter(id = user.id):
            keyword[0].search.add(user)

        keyword[0].save()
    else:
        form = KeywordForm(content = key)
        if form.is_valid():
            new = form.save(commit = False)
            new.searched()
            new.save()
            if request.user.is_authenticated:
                new.search.add(user)    

    categories = {"의류":"CLOTHES", "신발":"SHOES", "여행용품":"TRAVELS", "가방":"BAGS", "캐리어":"CARRIERS", "스포츠":"SPORTS", "레저":"LEISURES", "가전":"HOMES", "가구":"FURNITURES", "전자제품":"ELECTROMICS", "캐주얼":"CASUALS", "기타":"OTHERS"}
    sorts = {"최신순":"-created","높은가격순":"price","낮은가격순":"-price","조회순":"-views"}
    if ctgr == "전체":
        products = Product.objects.filter(title__icontains = key).order_by(sorts[srt])
    else:    
        products = Product.objects.filter(title__icontains = key,category = categories[ctgr]).order_by(sorts[srt])
    
    base_context = base(request)
    side_context = side(request)

    context = {
        "keyword" : key,
        "products" : products,
        "category_num" : get_category_num(),

    }
    context.update(base_context)
    context.update(side_context)

    return render(request, 'test.html',context)

@csrf_exempt
def search_save(request):
    if request.method == "POST":
        data = json.loads(request.body)
    
    if data.get("is_save"):
        User.objects.get(id = data.get("user")).search_save = True
        is_saved = True
    else:
        User.objects.get(id = data.get("user")).search_save = False
        is_saved = False

    context = {
        "is_saved" : is_saved,
    }

    return JsonResponse(context)
