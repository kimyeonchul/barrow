from datetime import datetime

from django.contrib import auth
from django.core.serializers import serialize
from django.shortcuts import render, redirect
import json
from django.http import HttpResponse, JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

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


@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            user = User()
            data = json.loads(request.body)
            user.username = request.POST.get('username')
            user.password = request.POST.get("password", '')
            user.name = request.POST.get("name", '')
            user.birth = request.POST.get("birth", '')
            user.address = request.POST.get("address", '')
            user.phoneNum = request.POST.get("phoneNum", '')
            user.save()

            # return redirect('login')
            context = {
                "username": user.username
            }
            return JsonResponse(context)
        except Exception as e:
            print(e)
            error = {
                "error": e
            }
            # return render(request, 'signup.html')
            return JsonResponse(error)
    return render(request, 'signup.html')



##마이페이지 개인정보 수정하기 passowrd랑 주소찾기
def changeUserInfo(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            user = User.objects.get(id=int(data["user_id"]))
            user.password = data["password"]
            user.address = data["address"]
            user.save()
            is_changed = True
        except:
            is_changed = False
    context = {
        "is_changed": is_changed,
    }
    return JsonResponse(context)

##마이페이지 유저정보가져오기
def getUserInfo(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            user = User.objects.get(id=int(data["user_id"]))
            password = user.password
            username = user.username
            name = user.name
            birth = user.birth
            address = user.address
            phonenum = user.phoneNum
        except Exception as e:
            print(e)
    context = {
        "username": username,
        "password": password,
        "name": name,
        "birth": birth,
        "address": address,
        "phoneNum": phonenum,
    }
    return JsonResponse(context)



