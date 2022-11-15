from django.contrib import auth
from django.shortcuts import render, redirect

# Create your views here.
from _account.models import User


def login(request):
    if request.method == 'POST':
        user = User.objects.filter(username=request.POST["username"])
        if user.exists():
            user = user[0]

            if user.password == request.POST["password"]:
                auth.login(request, user)
                return redirect("home")

        return render(request, "login.html")
    else:
        return render(request, "login.html")


def register(request):
    if request.method == 'POST':
        try:
            user = User()
            user.username = request.POST['username']
            user.password = request.POST['password']
            user.name = request.POST['name']
            user.birth = request.POST['birth']
            user.address = int(request.POST['address'])
            user.phoneNum = request.POST['phoneNum']
            user.image = request.POST['image']
            user.save()
            return redirect('login')
        except Exception as e:
            print(e)
            return render(request, 'signup.html')
    return render(request, 'signup.html')