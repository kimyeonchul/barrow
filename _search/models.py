from django.db import models

class Keyword(models.Model):
    count = models.IntegerField(null = True, default = 0)
    date = models.DateTimeField(auto_now_add = True)
    content = models.CharField(null = False, max_length = 100)
