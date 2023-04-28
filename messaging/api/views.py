from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView,  ListAPIView, CreateAPIView
from .serializers import MessageSerializer
from rest_framework.views import Response
from rest_framework import status

from messaging.models import Message, RelationshipProfile, Relationship

from django.db.models import Q


class RelationshipListView(GenericAPIView):
    """
    Gets the friends of a user 
    """

    permission_classes = [IsAuthenticated]

    # Creates Relationship when a user is logged In/ Authenticated
    def get(self, request):
        if RelationshipProfile.objects.filter(user=request.user).exists()==False:
            user = RelationshipProfile.objects.create(user=request.user, name=f"{request.user.username} Profile")
            Relationship.objects.create(profile=request.user.relationshipprofile)
        else:
            user = request.user.relationshipprofile

        relationships = user.relationships.all()
        response = []

        for relationship  in relationships:

            data = {
                "chat":relationship.profile.user.username,
                "uuid":relationship.profile.user.uuid
            }

            response.append(data)
        return Response(response, status=status.HTTP_200_OK)



class MessageListView(GenericAPIView):

    """
    Requests for all messages or creates new 
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = Message.objects.filter(Q(message_sender = request.user) | Q(message_receiver = request.user))
        response = []
        for message in messages:
            data = {
                "message_sender_uuid":message.message_sender.uuid,
                "message_receiver_uuid":message.message_receiver.uuid,
                "text_message": message.text_message

            }
            response.append(data)
        return Response(response, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)