from django.shortcuts import render
from _search.models import Keyword
from _account.models import User
from _product.models import Product
from django.db.models import Sum, Count

import datetime
from datetime import timedelta

def base(request):
        user = request.user
        recent_search_query = None
        
        #검색기록
        if request.user.is_authenticated:
            recent_search_query = user.keyword.all().order_by("-date")
            recent_search_query = recent_search_query[:10]
        
        today = datetime.datetime.now()
        most_search_date = str(today.year) + '-' + str(today.month).zfill(2) + "-" + str(today.day).zfill(2) +" " + str(today.hour).zfill(2) + ":00"

        most_search_query = Keyword.objects.all().values("content").annotate(
            content_count = Sum("count")
        ).order_by("-content_count")
        most_search_query = most_search_query[:20]

        base_context = {
            "recent_search" : recent_search_query,
            "most_search_date" : most_search_date,
            "most_search" : most_search_query,
        }

        return base_context

def side(request):
    user = request.user

    favorite_num = 0
    recent_view = None

    if request.user.is_authenticated:
        favorite = user.favorite
        favorite_num = favorite.count()

        recent_view = user.get_recent_view()

    side_context = {
        "favorite_num" : favorite_num,
        "recent_views" : recent_view,
    }
    return side_context

def get_best():
    products = Product.objects.all().order_by("-views")
    
    return products

def get_category_num():
    result = []

    products = Product.objects.filter(category = "CLOTHES")
    result.append(products.count())

    products = Product.objects.filter(category = "SHOES")
    result.append(products.count())

    products = Product.objects.filter(category = "TRAVELS")
    result.append(products.count())

    products = Product.objects.filter(category = "BAGS")
    result.append(products.count())

    products = Product.objects.filter(category = "CARRIERS")
    result.append(products.count())

    products = Product.objects.filter(category = "SPORTS")
    result.append(products.count())

    products = Product.objects.filter(category = "LEISURES")
    result.append(products.count())

    products = Product.objects.filter(category = "HOMES")
    result.append(products.count())

    products = Product.objects.filter(category = "FURNITURES")
    result.append(products.count())

    products = Product.objects.filter(category = "ELECTROMICS")
    result.append(products.count())

    products = Product.objects.filter(category = "CASUALS")
    result.append(products.count())
    
    products = Product.objects.filter(category = "OTHERS")
    result.append(products.count())

    return result

def home(request):
    if request.user.is_authenticated:

        user = request.user

    best_products = get_best()
    best_products = best_products[:4]

    context = {
        "best_products" : best_products,
    }
    context.update(base(request))
    context.update(side(request))

        
    return render(request, "main/main.html", context)

def best(request):
    products = get_best()
    context = {
        "products" : products,
    }
    context.update(base(request))
    context.update(side(request))
    return render(request,"best.html",context)

def category_view(request, category, sort):
    categories = {"의류":"CLOTHES", "신발":"SHOES", "여행용품":"TRAVELS", "가방":"BAGS", "캐리어":"CARRIERS", "스포츠":"SPORTS", "레저":"LEISURES", "가전":"HOMES", "가구":"FURNITURES", "전자제품":"ELECTROMICS", "캐주얼":"CASUALS", "기타":"OTHERS"}
    sorts = {"최신순":"-created","높은가격순":"price","낮은가격순":"-price","조회순":"-views"}

    if sort == "추천순":
        products = Product.objects.filter(category = categories[category]).annotate(
            likes = Count("favor")
        ).order_by("-likes")
        
    
    elif sort == "신청순":
        products = Product.objects.filter(category = categories[category]).annotate(
            deals = Count("deal")
        ).order_by("-deals")
        
    else:
        products = Product.objects.filter(category = categories[category]).order_by(sorts[sort])

    context = {
        "category_num" : get_category_num(),
        "products" : products,
    }
    context.update(base(request))
    context.update(side(request))

    return render(request, "main/category.html", context)

def near_products(request):
    return render(request, "near.html")
