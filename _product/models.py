from django.db import models


class Type(models.Model):
    name = models.CharField(unique=True)

class Price_per(models.Model):
    name = models.CharField(unique=True)


class Product(models.Model):

    title = models.CharField(max_length=50, unique=True)
    area = models.TextField()
    type = models.foreingkey(Type.name, related_name='type', on_delete=models.SET_NULL())
    price = models.IntegerField()
    price_per = models.foreingkey(Price_per.name, relate_name='per', on_delete=models.SET_NULL())
    start_date = models.DateField()
    end_date = models.DateField()


