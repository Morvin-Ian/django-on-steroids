from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView, UpdateAPIView, DestroyAPIView, ListCreateAPIView
from .serializers import MessageSerializer
from rest_framework.views import Response
from rest_framework import status

from messaging.models import Message




class ListCreateMessagesView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        return serializer.save(message_sender=self.request.user)
    
    def get_queryset(self):
        return Message.objects.filter(message_sender=self.request.user)







class MessageListView(GenericAPIView):

    """
    Requests for all messages or creates new 
    """
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get(self, request, format=None):
        messages = Message.objects.all()
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)