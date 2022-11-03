from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

#phonenumberfield사용하려면 pip install django-phonenumber-field[phonenumbers], pip install django-phonenumber-field[phonenumberslite]이거설치해야함
from _product.models import Product


class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField()
    name = models.CharField()
    birth = models.DateField()
    address = models.TextField()
    phoneNum = PhoneNumberField()          #setting.py에 installedappsdp  'phonenumber_field',이거추가
    favorite = models.ManyToManyField(Product, related_name='favor')
    keyword = models.ManyToManyField(keyword, related_name='search')