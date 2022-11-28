from channels.routing import ProtocolTypeRouter
from django.urls import re_path

import _chatting.consumers

websocket_urlpatterns = [
    re_path(r"ws/chatting/(?P<room_name>\w+)/$", _chatting.consumers.ChatConsumer.as_asgi()),
]

