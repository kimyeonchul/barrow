from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = "account"
urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("changeUserInfo/",views.changeUserInfo, name="changeUserInfo"),
    path("getUserInfo/",views.getUserInfo, name="getUserInfo"),
    path("findIdPwd/",views.findIdPwd,name = "findIdPwd"),
    path("findId/",views.findId,name = "findId"),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]