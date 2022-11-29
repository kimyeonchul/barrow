import json

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import json
# Create your views here.
from django.utils.safestring import mark_safe


def index(request):
    return render(request, 'chatindex.html')


def room(request, room_name):
    return render(request, "room.html", {"room_name": room_name})

