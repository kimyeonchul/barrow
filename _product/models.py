from django.db import models

PRODUCT_TYPES = (
    (0b01,"직거래만"),
    (0b10, "택배거래만"),
    (0b11, "택배/직거래")
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
    ("ELECTROMICS","전자제품"),
    ("CASUALS","캐주얼"),
    ("OTHERS","기타")

)

class Product(models.Model):
    image = models.ImageField(upload_to="product",null = True)
    title = models.CharField(max_length=120)
    area = models.CharField(max_length=100, verbose_name='거래 장소', null = False, default = "")
    type = models.CharField(max_length = 20, choices = PRODUCT_TYPES, null = False)
    price = models.IntegerField(null = False)
    price_per = models.CharField(null = False, max_length = 20,choices = PRODUCT_PRICE_PERS)
    start_date = models.DateTimeField(null = False)
    end_date = models.DateTimeField(null = False)
    category = models.CharField(null = False, max_length=20, choices = PRODUCT_CATEGORIES)
    memo = models.TextField(null = True, default = "", max_length = 200)
    views = models.IntegerField(null = False, default = 0)

