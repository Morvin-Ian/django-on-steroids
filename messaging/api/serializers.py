from rest_framework import serializers
from messaging.models import Message

class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer for the message Model
    """
    class Meta:
        model = Message
        fields = (
            'sender', 
            'recepient', 
            'text', 
            'file', 
            'read'
        )
        


