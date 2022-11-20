from django.db import models

# Create your models here.
from _account.models import User
from _product.models import Product


class Room(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    prod = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prod')
    cons = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cons')


class Message(models.Model):
    image = models.ImageField(default='static/img/product_default.png', upload_to='chatting', blank=True, null=True)
    text = models.CharField(max_length=200)
    read = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)
    room_id = models.IntegerField()
    user_id = models.IntegerField()

