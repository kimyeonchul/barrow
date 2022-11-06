from django.urls import path
from .views import *

urlpatterns = [
   path("",home,name = "home"),
   path("best/",best,name = "best"),
   path("category/<str:category>/<str:sort>/",category_view,name = "category"),
   path("near_products",near_products,name = "near_products"),
]