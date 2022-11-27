from django.urls import path
from .views import *

app_name = "search"

urlpatterns = [
   path("result/<str:ctgr>/<str:srt>/",search,name = "search"),
   path("is_save/",search_save,name = "is_save"),
]