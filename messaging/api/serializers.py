from rest_framework import serializers
from messaging.models import Message, UploadedFile

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
        

class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_null=True) 
    class Meta:
        model = UploadedFile 
        fields = ('uploaded_by', 'file') 

