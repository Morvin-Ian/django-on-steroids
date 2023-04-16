from django.shortcuts import render
from messaging.models import Message

from .serializer import MessageSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class MessageList():
    """
    Requests for all messages or creates new 
    """

