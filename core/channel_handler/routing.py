from django.urls import re_path
from core.channel_handler.chat_consumer import ChatRoomConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<uuid>[^/]+)/$', ChatRoomConsumer.as_asgi()),

]