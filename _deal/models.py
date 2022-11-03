from django.db import models
from _account.models import User
from _product.models import PRODUCT_TYPES, Product

DEAL_STATES = (
    ("WAIT", "대기중"),
    ("LEND", "대여중"),
    ("TERMINATE", "종료")
)
class Deal(models.Model):
    #foreignkye field
    user_cons = models.ForeignKey(User, on_delete=models.CASCADE)
    user_prod = models.ForeignKey(User, on_delete=models)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    start_date = models.DateTimeField(null = False)
    end_date = models.DateTimeField(null = False)
    type = models.CharField(null = False, max_length = 20, choices = PRODUCT_TYPES)
    state = models.CharField(null = False, default = "WAIT", max_length = 20, choices = DEAL_STATES)
