from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = "account"
urlpatterns = [
    path("login/", views.login, name="login"),
    path("register/", views.register, name="register"),
    path("getUserInfo/",views.getUserInfo, name="getUserInfo"),
    path("findIdPwd/",views.findIdPwd,name = "findIdPwd"),
    path("findId/",views.findId,name = "findId"),
    path("id_duplicated_check/",views.is_id_duplicated,name = "is_id_duplicated"),
    path("send_SMS/",views.send_SMS,name = "send_sms"),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    path("mypage/",views.mypage_main,name = "mypage_main"),
    path("mypage/notice/",views.mypage_notice,name = "mypage_notice"),
    path("mypage/modify/",views.mypage_modify, name = "mypage_modify"),
    path("mypage/modify/confirm/",views.mypage_modify_confirm,name = "mypage_modify_confirm"),
    path("mypage/changePwd/",views.change_pwd,name = "mypage_changepwd"),
    path("mypage/favorite/",views.mypage_favorites,name = "mypage_favorite"),
    path("mypage/account/",views.mypage_account,name = "mypage_account"),
    path("mypage/use/<str:type>/",views.mypage_use,name = "mypage_use"),
    

]