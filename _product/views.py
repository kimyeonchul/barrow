from django.shortcuts import render
from .forms import ProductForm
from .models import product
# Create your views here.

def test(request):
    form = ProductForm(request.POST,request.FILES)
    print(form.data)
    
    if form.is_valid():
        print(1)
        new = form.save(commit = False)
        new.views = 0
        new.save()
    else:
        print(form.errors)
    return render(request, 'test.html')