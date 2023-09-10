from django.urls import re_path
from core.channel_handler.chat_consumer import ChatRoomConsumer
from core.channel_handler.home_consumer import HomePageConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<uuid>[^/]+)/$', ChatRoomConsumer.as_asgi()),
    re_path(r'^ws/homepage', ChatRoomConsumer.as_asgi()),
]