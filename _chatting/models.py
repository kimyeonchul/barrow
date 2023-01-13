import json

from channels.generic.websocket import WebsocketConsumer
from django.db import models

class Room(models.Model):
    room_num = models.IntegerField(null = False, default = 0)
    product = models.ForeignKey("_product.Product",on_delete=models.CASCADE)
    user = models.ManyToManyField("_account.User")

    def opponent_user(self,me):
        opponent = self.user.all().exclude(id = me.id)[0]
        return opponent
    
    def room_name(self):
        return str(self.product.title)+str(self.room_num)


class Message(models.Model):
    image = models.ImageField(default='static/img/product_default.png', upload_to='chatting', blank=True, null=True)
    text = models.CharField(max_length=200)
    read = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey(Room,on_delete=models.CASCADE)
    user = models.ForeignKey("_account.user",on_delete=models.CASCADE)

    

