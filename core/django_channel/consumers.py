import json
from .db_operations import get_user, save_message, save_file
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.files.base import ContentFile
import base64


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # self.room_name = self.scope["url_route"]["kwargs"]["uuid"]
        self.room_group_name = f"Bace_chat"

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
        file = text_data_json.get("file")

        if sender and receiver:
            sender = await get_user(sender)
            receiver = await get_user(receiver)

            # if file:
            #     print(file)
                # data = base64.b64decode(file[0])
                # image = ContentFile(data, name=file[1])
                # file = await save_file(sender, image)
                # await save_message(message, sender, receiver, dialog, file)

            if message:
                await save_message(message, sender, receiver, dialog)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat.message", "response": text_data_json}
        )

    # Receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))
