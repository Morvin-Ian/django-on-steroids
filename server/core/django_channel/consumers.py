import json
from .db_operations import get_user, get_dialog
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["uuid"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        sender = text_data_json["sender"]
        receiver = text_data_json["receiver"]
        dialog = text_data_json["dialog"]
        message = text_data_json["message"]

        response = {
            "message":message,
            "sender" :sender,
            "receiver":receiver,
            "dialog":dialog
        }

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "response": response}
        )

    # Receive message from room group
    async def chat_message(self, event):
   
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))
