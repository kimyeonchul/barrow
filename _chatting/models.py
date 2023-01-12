import json

from channels.generic.websocket import WebsocketConsumer
from django.db import models

class Room(models.Model):
    room_num = models.IntegerField(null = False, default = 0)
    product = models.ForeignKey("_product.Product",on_delete=models.CASCADE)
    user = models.ManyToManyField("_account.User")


class Message(models.Model):
    image = models.ImageField(default='static/img/product_default.png', upload_to='chatting', blank=True, null=True)
    text = models.CharField(max_length=200)
    read = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)
    room_id = models.IntegerField()
    user_id = models.IntegerField()

