from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from _product.models import Product

from datetime import datetime
#phonenumberfield사용하려면 pip install django-phonenumber-field[phonenumbers], pip install django-phonenumber-field[phonenumberslite]이거설치해야함



class User(AbstractUser):
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    birth = models.DateField()
    address = models.TextField()
    phoneNum = PhoneNumberField()          #setting.py에 installedappsdp  'phonenumber_field',이거추가
    favorite = models.ManyToManyField("_product.Product", related_name='favor')
    keyword = models.ManyToManyField("_search.Keyword", related_name='search')

    def view(self, prd):
        check = User_view.objects.filter(user = self, product = prd)
        if check:
            check[0].date = datetime.now()
            check[0].save()
        else:
            new = User_view.objects.create(user = self, product = prd)
            
            new.save()

        arr = User_view.objects.filter(user = self)
        if arr.count() > 3:
             arr = arr.order_by("-date")
             arr[0].delete
    
    def get_recent_view(self):
        arr = User_view.objects.filter(user = self).values_list("product",flat = True)
        arr = list(arr)
        result = Product.objects.filter(id__in = arr)
        return result

class User_view(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey("_product.Product",on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add = True)

    

            
