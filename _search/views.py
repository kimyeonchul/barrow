from django.shortcuts import render
from .forms import KeywordForm
from .models import Keyword, CurMostSearch
from _account.models import User
from _product.models import Product
from _barrow.views import base, side
from django.db.models import Count

from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def get_category_num(key):
    result = {}
    products = Product.objects.filter(title__contains = key)
    result['전체'] = (products.count())

    products = Product.objects.filter(title__contains = key, category = "CLOTHES")
    result['의류']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "SHOES")
    result['신발']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "TRAVELS")
    result['여행용품']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "BAGS")
    result['가방']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "CARRIERS")
    result['캐리어']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "SPORTS")
    result['스포츠']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "LEISURES")
    result['레저']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "HOMES")
    result['가전제품']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "FURNITURES")
    result['가구']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "ELECTROMICS")
    result['전자제품']=(products.count())

    products = Product.objects.filter(title__contains = key, category = "CASUALS")
    result['캐주얼']=(products.count())
    
    products = Product.objects.filter(title__contains = key, category = "OTHERS")
    result['기타']=(products.count())

    return result

def search(request, ctgr = "전체", srt = "최신순"):
    if request.user.is_authenticated:
        user = request.user
    key = request.GET["content"]
    keyword = Keyword.objects.filter(content = key)
    if keyword:
        keyword[0].searched()
        if request.user.is_authenticated and not keyword[0].search.filter(id = user.id):
            keyword[0].search.add(user)

        keyword[0].save()
    else:
        form = KeywordForm(request.GET)
        if form.is_valid():
            new = form.save(commit = False)
            new.searched()
            new.save()
            if request.user.is_authenticated:
                new.search.add(user)    

    categories = {"의류":"CLOTHES", "신발":"SHOES", "여행용품":"TRAVELS", "가방":"BAGS", "캐리어":"CARRIERS", "스포츠":"SPORTS", "레저":"LEISURES", "가전":"HOMES", "가구":"FURNITURES", "전자제품":"ELECTROMICS", "캐주얼":"CASUALS", "기타":"OTHERS"}
    sorts = {"최신순":"-created","높은가격순":"price","낮은가격순":"-price","조회순":"-views"}

    if ctgr == "전체":
        if srt == "추천순":
            products = Product.objects.filter(title__icontains = key).annotate(
                likes = Count("favor")
            ).order_by("-likes")
            
        
        elif srt == "신청순":
            products = Product.objects.filter(title__icontains = key).annotate(
                deals = Count("deal")
            ).order_by("-deals")
        else:
            products = Product.objects.filter(title__icontains = key).order_by(sorts[srt])
    else:
        if srt == "추천순":
            products = Product.objects.filter(title__icontains = key,category = categories[ctgr]).annotate(
                likes = Count("favor")
            ).order_by("-likes")
            
        
        elif srt == "신청순":
            products = Product.objects.filter(title__icontains = key,category = categories[ctgr]).annotate(
                deals = Count("deal")
            ).order_by("-deals")
        else:    
            products = Product.objects.filter(title__icontains = key,category = categories[ctgr]).order_by(sorts[srt])
    
    base_context = base(request)
    side_context = side(request)

    total_category_num = get_category_num(key)

    type_queries = list(products.values("type"))
    types = []

    for type in type_queries:
        type = list(type["type"])
        type = list(map(int, type))
        types.append(type)
    products = list(zip(list(products),types))
    
    if len(products)%20!=0:
        for i in range(20 - len(products)%20):
            products.append((None,None))
    context = {
        "keyword" : key,
        "products" : products,
        "category_num" : total_category_num,
        "cur_category_num" : total_category_num[ctgr],
        "is_key" : True,
        "category" : ctgr,
        "sort" : srt,

    }
    context.update(base_context)
    context.update(side_context)

    return render(request, 'main/category.html',context)

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


