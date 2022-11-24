from django.urls import path
from .views import *
app_name = "products"
urlpatterns = [
   path("new/",new,name = "new"),
   path("modify/<int:product_id>/",modify,name = "modify"),
   path("delete/<int:product_id>/",delete,name = "delete"),
   path("itempage/<int:product_id>/",itempage,name = "itempage"),
   path("set_favorite",set_favorite,name = "set_favorite"),
]