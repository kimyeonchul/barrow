from django.shortcuts import render
from _search.models import Keyword, CurMostSearch
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

        if CurMostSearch.objects.all().exists():

            last_mosts = CurMostSearch.objects.all()

            if last_mosts[0].time.hour != today.hour:
                print(1)
                create_most_search()
        else:
            
            create_most_search()
        
        most_search = list(CurMostSearch.objects.all().order_by("rank"))
        for i in range(20 - len(most_search)):
            most_search.append(None)

        base_context = {
            "recent_search" : recent_search_query,
            "most_search_date" : most_search_date,
            "most_search" : most_search,
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
    best = Product.objects.all().order_by("-views")
    type_queries = list(best.values("type"))
    types = []

    for type in type_queries:
        type = list(type["type"])
        type = list(map(int, type))
        types.append(type)
    best_products = list(zip(list(best),types))
    
    if len(best_products)%20!=0:
        for i in range(20 - len(best_products)%20):
            best_products.append((None,None))
    context = {
        "best_products" : best_products,
    }
    return context

def get_category_num():
    result = {}
    products = Product.objects.all()
    result['전체'] = (products.count())

    products = Product.objects.filter(category = "CLOTHES")
    result['의류']=(products.count())

    products = Product.objects.filter(category = "SHOES")
    result['신발']=(products.count())

    products = Product.objects.filter(category = "TRAVELS")
    result['여행용품']=(products.count())

    products = Product.objects.filter(category = "BAGS")
    result['가방']=(products.count())

    products = Product.objects.filter(category = "CARRIERS")
    result['캐리어']=(products.count())

    products = Product.objects.filter(category = "SPORTS")
    result['스포츠']=(products.count())

    products = Product.objects.filter(category = "LEISURES")
    result['레저']=(products.count())

    products = Product.objects.filter(category = "HOMES")
    result['가전']=(products.count())

    products = Product.objects.filter(category = "FURNITURES")
    result['가구']=(products.count())

    products = Product.objects.filter(category = "ELECTROMICS")
    result['전자제품']=(products.count())

    products = Product.objects.filter(category = "CASUALS")
    result['캐주얼']=(products.count())
    
    products = Product.objects.filter(category = "OTHERS")
    result['기타']=(products.count())

    return result

def home(request):
    if request.user.is_authenticated:

        user = request.user

    context = get_best()
    context["best_products"] = context["best_products"][:4]
    context.update(base(request))
    context.update(side(request))

    print(context)
    return render(request, "main/main.html", context)

def best(request, page_num):
    context = get_best()
    context["total_page_num"] = len(context["best_products"])
    context["best_products"] = context["best_products"][20*(page_num - 1):20*(page_num)]

    context.update(base(request))
    context.update(side(request))
    return render(request,"main/best.html",context)

def category_view(request, category, sort):
    categories = {"의류":"CLOTHES", "신발":"SHOES", "여행용품":"TRAVELS", "가방":"BAGS", "캐리어":"CARRIERS", "스포츠":"SPORTS", "레저":"LEISURES", "가전":"HOMES", "가구":"FURNITURES", "전자제품":"ELECTROMICS", "캐주얼":"CASUALS", "기타":"OTHERS"}
    sorts = {"최신순":"-created","높은가격순":"-price","낮은가격순":"price","조회순":"-views"}

    if sort == "추천순":
        if category == "전체":
            products = Product.objects.all().annotate(
                likes = Count("favor")
            ).order_by("-likes")
        else:
            products = Product.objects.filter(category = categories[category]).annotate(
                likes = Count("favor")
            ).order_by("-likes")
        
    
    elif sort == "신청순":
        if category == "전체":
            products = Product.objects.all().annotate(
                deals = Count("deal")
            ).order_by("-deals")
        else:
            products = Product.objects.filter(category = categories[category]).annotate(
                deals = Count("deal")
            ).order_by("-deals")
        
    else:
        if category == "전체":
            products = Product.objects.all().order_by(sorts[sort])
        else:
            products = Product.objects.filter(category = categories[category]).order_by(sorts[sort])

    total_category_num = get_category_num()

    type_queries = list(products.values("type"))
    types = []

    for type in type_queries:
        type = list(type["type"])
        type = list(map(int, type))
        types.append(type)
    products = list(zip(list(products),types))
    
    context = {
        "category_num" : total_category_num,
        "cur_category_num" : total_category_num[category],
        "products" : products,
        "is_key" : False,
        "category" : category,
        "sort" : sort,
    }
    context.update(base(request))
    context.update(side(request))
    print(products)
    return render(request, "main/category.html", context)

def near_products(request):
    return render(request, "main/map.html")

def create_most_search():
    most_search_queries = Keyword.objects.all().values("content").annotate(
            content_count = Sum("count")
    ).order_by("-content_count")
    most_search_queries = most_search_queries[:20]
    
    last_most_quries = CurMostSearch.objects.all()
    last_mosts = {}
    for last_most_query in last_most_quries:
        last_mosts[last_most_query.keyword] = last_most_query.rank

    last_most_contents = list(last_mosts.keys())
    
    for last_most in last_most_quries:
        last_most.delete()
    
    for i in range(len(most_search_queries)):
        if most_search_queries[i]["content"] in last_most_contents:
            vector = int(last_mosts[most_search_queries[i]["content"]])-i
        else:
            vector = 0
        
        CurMostSearch.objects.create(keyword = most_search_queries[i]["content"], rank = i, vector = vector)
                
    