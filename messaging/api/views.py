from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView,  ListAPIView, CreateAPIView
from .serializers import MessageSerializer
from rest_framework.views import Response
from rest_framework import status

from messaging.models import Message, Dialog

from django.db.models import Q


class DialogView(GenericAPIView):
    """
    Gets the dialogues of a user 
    """

    permission_classes = [IsAuthenticated]

    # Gets Relationships of a logged In/ Authenticated user
    def get(self, request):
        relationships = Dialog.objects.filter(Q(sender=request.user) | Q(recepient=request.user))

        response = []

        for relationship  in relationships:
            if relationship.sender == request.user:
                chat = relationship.recepient
            else:
                chat = relationship.sender
            

            data = {
                "chat":chat.username,
                "chat_uuid":chat.uuid,
                # "last_login":chat.last_login,
                "uuid":relationship.id,
                "user":request.user.uuid
            }

            response.append(data)
        return Response(response, status=status.HTTP_200_OK)



class MessageListView(GenericAPIView):

    """
    Requests for all messages or creates new 
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = Message.objects.filter(Q(sender = request.user) | Q(recepient = request.user)).order_by('created_at')        
        response = []
        for message in messages:
           
            data = {
                "id":message.id,
                "message_sender_uuid":message.sender.uuid,
                "message_receiver_uuid":message.recepient.uuid,
                "text_message": message.text,
                "dialog":message.dialog.id,

            }
            
            response.append(data)
        return Response(response, status=status.HTTP_200_OK)
    
