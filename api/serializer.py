from messaging.models import Message
from rest_framework import serializers



class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer for the message Model
    """
    class Meta:
        model = Message
        fields = [
            'message_sender', 
            'message_receiver', 
            'text_message', 
            'image_message', 
            'video_message'
            ]
