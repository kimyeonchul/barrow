import json

from django.shortcuts import render
import json
# Create your views here.
from django.utils.safestring import mark_safe


def index(request):
    return render(request, 'chatindex.html')

