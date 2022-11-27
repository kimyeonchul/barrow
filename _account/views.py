from datetime import datetime

from django.contrib import auth
from django.core.serializers import serialize
from django.shortcuts import render, redirect
import json
from django.http import HttpResponse, JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from _account.models import User


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.filter(username=data.get("username"))
        if user.exists():
            password = data.get("password")
            user = user[0]
            if user.password == password:
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
            user.username = data.get("username")
            user.password = data.get("password")
            user.name = data.get("name")
            user.birth = data.get("birth1")+data.get("birth2")+data.get("birth3")
            user.address = data.get("address1")+data.get("address2")+data.get("address3")
            user.phoneNum = data.get("phoneNum", "")
            user.save()

            return redirect('login')

        except Exception as e:
            print(e)
            return render(request, 'signup.html')

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


def home(request):
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        id=user.id
        return render(request, "login.html",{"userid":id})
    else:
        return render(request, "login.html")

def findIdPwd(request):
    return render(request, "findIdPwd.html")

@csrf_exempt
def findId(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        if User.objects.filter(name = data["name"],  phoneNum= data["phoneNum"]).exists():
            context = {
                "user_id" : User.objects.get(name = data["name"], phoneNum = data["phoneNum"]).username
            }
        else :
            context = {
                "user_id" : None
            }
        return JsonResponse(context)

