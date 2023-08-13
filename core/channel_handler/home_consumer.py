import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from messaging.models import Dialog, Message  
from accounts.models import User
from django.db.models import Q              


class HomePageConsumer(AsyncJsonWebsocketConsumer):
    async def websocket_connect(self, event):
        self.group_name = f"HomePage_Room"
        
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
        status = received_data.get("status")
        action = received_data.get("typing")
        user = received_data.get("user")
        
        response = {
            "type":"chat.message",
            "typing":action,
            "status":status,
            "user":user,   
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
        status = received_data.get("status")
        action = received_data.get("typing")
        user = received_data.get("user")

        response = {
            'status': status,
            'typing':action,
            "user":user,    
        } 
        
        await self.send(json.dumps(response))   

    async def websocket_disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
        