from django import forms
from . import models as MODELS

class KeywordForm(forms.ModelForm):
    class Meta:
        model = MODELS.Keyword
        fields = ["content"]
        