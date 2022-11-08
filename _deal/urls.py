from django.urls import path
from .views import *

urlpatterns = [
   path("new/<int:product_id>",new,name = "new")
]