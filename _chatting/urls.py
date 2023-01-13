from django.urls import re_path,path
from . import views

app_name = "chatting"
urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    #re_path(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
    re_path(r'^(?P<room_name>[^/]+)/$', views.room_test, name='room'),
]