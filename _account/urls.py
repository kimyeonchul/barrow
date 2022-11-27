from django.urls import path
from . import views

app_name = "account"
urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("changeUserInfo/",views.changeUserInfo, name="changeUserInfo"),
    path("getUserInfo/",views.getUserInfo, name="getUserInfo"),
    path("findIdPwd/",views.findIdPwd,name = "findIdPwd"),
    path("findId/",views.findId,name = "findId"),
]