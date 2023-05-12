import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from messaging.models import Dialog, Message  
from accounts.models import User
from django.db.models import Q              

class ChatRoomConsumer(AsyncJsonWebsocketConsumer):
    async def websocket_connect(self, event):
        self.room_id = self.scope["url_route"]["kwargs"]["uuid"]
        self.group_name = f"Room_{self.room_id}"
        
        print(self.group_name)
        await self.accept()
       
        await self.channel_layer.group_add(
            self.group_name, 
            self.channel_name
            )
        
        print("connect", event)

    async def websocket_receive(self, event):
        group_name = self.group_name 
        received_data = json.loads(event["text"])
        action = received_data.get("typing")
        message = received_data.get("message")
        sender_uuid = received_data.get("sender")
        receiver_uuid = received_data.get("receiver")

        #Getting the User instance of message sender
        sender = await self.get_user(sender_uuid)

        #Getting the User instance of message Receiver
        if receiver_uuid != "":
            receiver = await self.get_user(receiver_uuid)
           
            # retrieve the Dialog Model
            dialog = await self.get_user_name(sender)
            print(dialog)
        
        
        response = {
                "type":"chat.message",
                "typing":action,
                "room_id":self.room_id,
                "sender_id":sender_uuid,   
                "receiver_id":receiver_uuid,   
                "message":message,
                
        }  

        await self.channel_layer.group_send(
            group_name,
            {
                "type":"chat_message",
                "text":json.dumps(response)                     

            })
        
        print("receive", event)

    async def chat_message(self, event):
        received_data = json.loads(event["text"])
        action = received_data.get("typing")
        message = received_data.get("message")
        sender_uuid = received_data.get("sender_id")
        receiver_uuid = received_data.get("receiver_id")

        response = {
            'message': message,
            'typing':action,
            "room_id":self.room_id,
            "sender_id":sender_uuid,
            "receiver_id":receiver_uuid
            
            } 
        
        await self.send(json.dumps(response))   


    async def websocket_disconnect(self):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name)
            
    @database_sync_to_async
    def get_user_name(self, uuid):
        username = Dialog.objects.get(first_user = uuid)
        return username
    
    @database_sync_to_async
    def get_user(self, uuid):
        user = User.objects.filter(uuid=uuid).first()
        return user



