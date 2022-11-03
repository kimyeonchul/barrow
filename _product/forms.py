from django import forms
from . import models as MODELS

class ProductForm(forms.ModelForm):
    class Meta:
        model = MODELS.product
        fields = ['image','title','area','type','price','price_per','start_date','end_date','category','memo']
        