from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

from .models import Room, Message
from _deal.models import Deal
from _account.models import User

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'chatindex.html', {})

def room(request, room_name):
    if request.method == "GET":
        #request.user가 들어있는 모든방 찾기
        rooms = list(Room.objects.filter(user__id=request.user.id))
        opponents = []
        names = []
        for room in rooms:
            opponents.append(room.opponent_user(request.user))
            names.append(room.room_name())
        datas = list(zip(rooms,opponents,names))

        #방 이름으로 현재 방 찾기
        items = Room.objects.all()
        room = list(filter(lambda x : x.room_name() == room_name, items))[0]
        
        #현재 방의 기존 메세지 
        messages = Message.objects.filter(room = room).order_by("date")

        context = {
            "datas" : datas,
            'room_name_json': mark_safe(json.dumps(room_name)),
            "cur_room" : room,
            "messages" : messages
        }
        return render(request, 'mypage/mypage_chat.html', context)

def room_test(request, room_name):
    if request.method == "GET":
    #request.user가 들어있는 모든방 찾기
        rooms = list(Room.objects.filter(user__id=request.user.id))
        opponents = []
        names = []
        for room in rooms:
            opponents.append(room.opponent_user(request.user))
            names.append(room.room_name())
        datas = list(zip(rooms,opponents,names))

        #방 이름으로 현재 방 찾기
        items = Room.objects.all()
        room = list(filter(lambda x : x.room_name() == room_name, items))[0]
        
        #현재 방의 기존 메세지 
        messages = Message.objects.filter(room = room).order_by("date")

        context = {
            "datas" : datas,
            'room_name_json': mark_safe(json.dumps(room_name)),
            "cur_room" : room,
            "messages" : messages
        }
        return render(request, 'mypage/mypage_chat.html', context)


