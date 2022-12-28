from django import forms
from . import models as MODELS

class ProductForm(forms.ModelForm):
    class Meta:
        model = MODELS.Product
        fields = ['title','type','price','area','area_detail','price_per','start_date','end_date','category','memo']
        