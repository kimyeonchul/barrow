from django.db import models
import datetime
from datetime import timedelta

PRODUCT_TYPES = (
    ("01","직거래만"),
    ("10", "택배거래만"),
    ("11", "택배/직거래")
)

PRODUCT_PRICE_PERS = (
    ("PER_DAY","DAY"),
    ("PER_WEEK","WEEK"),
    ("PER_MONTH","MONTH")
)

PRODUCT_CATEGORIES = (
    ("CLOTHES","의류"),
    ("SHOES","신발"),
    ("TRAVELS","여행용품"),
    ("BAGS","가방"),
    ("CARRIERS","캐리어"),
    ("SPORTS","스포츠"),
    ("LEISURES","레저"),
    ("HOMES","가전제품"),
    ("FURNITURES","가구"),
    ("ELECTRONICS","전자제품"),
    ("CASUALS","캐주얼"),
    ("OTHERS","기타")

)

class Product(models.Model):
    productor = models.ForeignKey("_account.User",on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    area = models.CharField(max_length=100, verbose_name='거래 장소', null = False, default = "")
    area_detail = models.CharField(max_length=100, verbose_name='거래 장소', null = False, default = "")
    type = models.CharField(max_length = 2, choices = PRODUCT_TYPES, null = False)
    price = models.IntegerField(null = False)
    price_per = models.CharField(null = False, max_length = 20,choices = PRODUCT_PRICE_PERS)
    start_date = models.DateTimeField(null = False)
    end_date = models.DateTimeField(null = False)
    category = models.CharField(null = False, max_length=20, choices = PRODUCT_CATEGORIES)
    memo = models.TextField(null = True, default = "", max_length = 200)
    views = models.IntegerField(null = False, default = 0)
    created = models.DateTimeField(null = False, auto_now_add = True)

    def get_created(self):
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
    def get_start_date(self):
        return str(self.start_date.month)+" / " + str(self.start_date.day)
    def get_end_date(self):
        return str(self.end_date.month)+" / " + str(self.end_date.day)    
    def get_first_image(self):
        return self.images.all()[0]
    def get_images(self):
        return self.images.all()

class Product_image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,related_name = "images")
    image = models.ImageField(default='/media/product/product_dafault.png', upload_to='product',
                              blank=True, null=True)
    index  = models.IntegerField(null = False)

