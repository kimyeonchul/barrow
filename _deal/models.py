from django.db import models
from _account.models import User
from _product.models import PRODUCT_TYPES, Product
import datetime
from datetime import timedelta

DEAL_STATES = (
    ("WAIT", "대기중"),
    ("ACCEPT", "수락"),
    ("LEND", "대여중"),
    ("TERMINATE","종료")
    
)
class Deal(models.Model):
    #foreignkye field
    user_cons = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "buy")
    user_prod = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "sell")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name = "deal")

    start_date = models.DateTimeField(null = False)
    end_date = models.DateTimeField(null = False)
    created = models.DateTimeField(null = False, auto_now_add = True)
    type = models.CharField(null = False, max_length = 20, choices = PRODUCT_TYPES)
    state = models.CharField(null = False, default = "TERMINATE", max_length = 20, choices = DEAL_STATES)

    def get_start_date(self):
        return str(self.start_date.year)+". "+str(self.start_date.month)+". " + str(self.start_date.day)
    def get_end_date(self):
        return str(self.end_date.year)+". " + str(self.end_date.month)+". " + str(self.end_date.day)
    def get_created(self):
        return str(self.created.year)+". " + str(self.created.month)+". " + str(self.created.day)
    def get_created_from(self):
        now = datetime.datetime.now()
        created = now - self.created
        if created < timedelta(days = 1):
            return str(created.seconds // 3600)+"시간 전"
        elif created < timedelta(days = 30):
            return str(created.days)+"일 전"
        elif created < timedelta(days = 365):
            return str(created.days // 30)+"달 전"
        else:
            return str(created.years // 365)+"년 전"
 
