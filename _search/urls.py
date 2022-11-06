from django.urls import path
from .views import *

urlpatterns = [
   path("result/<str:key>/<str:ctgr>/<str:srt>/",search,name = "search"),
   path("is_save/",search_save,name = "is_save"),
]