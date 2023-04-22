import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ChatRoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        print("Connect")

    async def receive(self, text_data):
      print("receive")

    async def chat_message(self, event):
        print("message")

    async def disconnect(self, close_code):
        print("Disconect")

