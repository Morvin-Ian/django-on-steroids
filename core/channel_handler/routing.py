from django.urls import re_path
from core.channel_handler.chat_consumer import ChatRoomConsumer, ConnectionConsumer

websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<uuid>[^/]+)/$', ChatRoomConsumer.as_asgi()),
    re_path(r'^ws/', ConnectionConsumer.as_asgi()),

]