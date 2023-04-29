import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ChatRoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope["url_route"]["kwargs"]["uuid"]
        self.group_name = f"Room_{self.room_id}"

        
        await self.accept()
       
        await self.channel_layer.group_add(
            self.group_name, 
            self.channel_name
            )
        
        print("connect")

    async def receive(self, text_data):
        group_name = self.group_name 
        received_data = json.loads(text_data)
        action = received_data.get("typing")
        message = received_data.get("message")
        sender_uuid = received_data.get("sender")
        receiver_uuid = received_data.get("receiver")

        # status = received_data.get("status")


        response = {
                "type":"chat.message",
                "typing":action,
                "room_id":self.room_id,
                "sender_id":sender_uuid,   
                "message":message,
                # "status":status
                
        }  

        await self.channel_layer.group_send(
            group_name,
            {
                "type":"chat_message",
                "text":json.dumps(response)                     

            })
        
        print("receive")

    async def chat_message(self, event):
        received_data = json.loads(event["text"])
        action = received_data.get("typing")
        message = received_data.get("message")
        sender_uuid = received_data.get("sender_id")
        receiver_uuid = received_data.get("receiver")


        response = {
            'message': message,
            'typing':action,
            "room_id":self.room_id,
            "sender_id":sender_uuid,
            # "status":status
            
        } 
        
        # Send message to WebSocket
        await self.send(json.dumps(response))   


    async def disconnect(self, close_code):
        print("Disconect")

