from django import forms
from . import models as MODELS

class ProductForm(forms.ModelForm):
    class Meta:
        model = MODELS.Deal
        fields = ["start_date","end_date","type","state"]
        
        