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
        relationships = Dialog.objects.filter(Q(first_user=request.user) | Q(second_user=request.user))

        response = []

        for relationship  in relationships:
            if relationship.first_user == request.user:
                chat = relationship.second_user
            else:
                chat = relationship.first_user

            data = {
                "chat":chat.username,
                "chat_uuid":chat.uuid,
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
        messages = Message.objects.filter(Q(sender = request.user) | Q(recepient = request.user))
        
        response = []
        for message in messages:
           
            data = {
                "message_sender_uuid":message.sender.uuid,
                "message_receiver_uuid":message.recepient.uuid,
                "text_message": message.text,
                "dialog":message.dialog.id,

            }
            
            response.append(data)
        return Response(response, status=status.HTTP_200_OK)
    
