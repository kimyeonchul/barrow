from django.shortcuts import render
from _search.models import Keyword
from _account.models import User
from _product.models import Product
from django.db.models import Sum

import datetime
from datetime import timedelta

def base(request):
    # user = request.user
        user = User.objects.get(id = "1")

        #검색기록
        recent_search_query = user.keyword.all().order_by("-date")
        recent_search_query = recent_search_query[:10]
        
        most_search_query = Keyword.objects.all().order_by('-count')
        most_search_query = most_search_query[:20]

        base_context = {
            "recent_search" : recent_search_query,
            "most_search" : most_search_query,
        }

        return base_context

def side(request):
    # user = request.user
    user = User.objects.get(id = "1")

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

def home(request):
    # if request.user.is_authenticated:

        # user = request.user
        user = User.objects.get(id = "1")

        best_products = get_best()
        best_products = best_products[:4]

        context = {
            "best_products" : best_products,
        }
        context.update(base(request))
        context.update(side(request))

        
        return render(request, "test.html", context)
