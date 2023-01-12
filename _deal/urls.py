from django.urls import path
from .views import *

app_name = "deal"

urlpatterns = [
   path("new/<int:product_id>",new,name = "new"),
   path("accept/<int:product_id>",accept,name="accept"),
   path("delete/<int:product_id>",delete, name= "delete"),
   path("send_msg/",send_msg, name = "send_msg"),
]