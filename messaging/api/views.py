from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView,  ListAPIView, CreateAPIView
from rest_framework.views import Response
from rest_framework import status

from messaging.models import Message, Dialog, UploadedFile
from accounts.models import User

from django.db.models import Q
from django.core.cache import cache

from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FileSerializer


class DialogView(GenericAPIView):
    """
    Gets the dialogues of a user 
    """

    permission_classes = [IsAuthenticated]

    # Gets Relationships of a logged In/ Authenticated user
    def get(self, request):
        relationships = Dialog.objects.filter(
            Q(sender=request.user) | Q(recepient=request.user))
        response = []

        for relationship in relationships:
            if relationship.sender == request.user:
                chat = relationship.recepient
            else:
                chat = relationship.sender

            if chat.profile:
                profile = chat.profile.url
            else:
                profile = None

            unread_messages = 0
            messages = Message.objects.filter(
                Q(sender=request.user, recepient=chat) |
                Q(sender=chat, recepient=request.user)
            ).order_by('-created_at')
        
            if messages:
                for message in messages:
                    if message.read == False:
                        unread_messages += 1
                last_message =  messages.first().text
                last_message_sender = messages.first().sender.uuid
                date = messages.first().created_at  
            else:
                last_message = None
                last_message_sender = None
                date = None

            data = {
                "chat": chat.username,
                "chat_uuid": chat.uuid,
                "profile": profile,
                "dialog": relationship.id,
                "user": request.user.uuid,
                "last_message":last_message,
                "last_message_sender":last_message_sender,
                "unread_count":unread_messages,
                "date":date
            }

            response.append(data)
        return Response(response, status=status.HTTP_200_OK)


class MessageListView(GenericAPIView):

    """
    Requests for all messages or creates new 
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        messages = Message.objects.filter(Q(sender=request.user) | Q(
            recepient=request.user)).order_by('created_at')
        response = []
        for message in messages:

            if message.file:
                file = UploadedFile.objects.get(file=message.file).file.url
            else:
                file = None

            data = {
                "id": message.id,
                "message_sender_uuid": message.sender.uuid,
                "message_receiver_uuid": message.recepient.uuid,
                "text_message": message.text,
                "file":file,
                "read":message.read,
                "dialog": message.dialog.id,
                "date":message.created_at

            }

            response.append(data)
        return Response(response, status=status.HTTP_200_OK)


class CreateDialogView(GenericAPIView):
    """
    Creates a dialog between users
    """


    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        sender = request.data.get('sender')
        receiver = request.data.get('receiver')

        sender_instance = User.objects.get(uuid=sender)
        receiver_instance = User.objects.get(uuid=receiver)

        if sender_instance and receiver_instance:

            dialog = Dialog.objects.create(
                sender=sender_instance, recepient=receiver_instance)

            response = {
                "dialog": dialog.id
            }

            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response("Invalid users provided", status=status.HTTP_200_OK)


class UpdateReadMessages(GenericAPIView):
    """
    Update messages to read in a dialog between users
    """

    def put(self, request):
        dialog_id = request.data.get("dialog")
        message_list = Message.objects.filter(dialog=dialog_id)

        if message_list:
            for message in message_list:
                if message.read == False:
                    if message.recepient == request.user:
                        message.read = True
                        message.save()

        return Response("Message Read", status=status.HTTP_200_OK)



class FileUploadView(GenericAPIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileSerializer

    def post(self, request):
        # serializer = self.serializer_class(data=request.data)
        # if serializer.is_valid():
            # serializer.save(
        print(request.data)

        # import
        print(request.data)
        return Response(request.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
