from django import forms
from . import models as MODELS

class DealForm(forms.ModelForm):
    class Meta:
        model = MODELS.Deal
        fields = ["start_date","end_date"]
        
        