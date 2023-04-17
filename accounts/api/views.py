from django.contrib import auth
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect 

from messaging.models import Message
from .serializer import MessageSerializer, RegisterSerializer #LoginSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


csrf_protect_method = method_decorator(csrf_protect)

class RegistrationView(APIView):
    """
    Create new Users for the system.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Registration Succesfull", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class LoginView(APIView):
#     """
#     Login Users for the system.
#     """
#     permission_classes = [AllowAny]

#     def post(self, request, format=None):
#         user = auth.authenticate(username=request.data['username'], password=request.data['password'])
#         print(user)
#         if user is not None:
#             auth.login(request, user)
#             return Response("Succesful Login", status=status.HTTP_200_OK)

#         else:
#             return Response("Inavalid Credentials")

class LogoutView(APIView): 
    permission_classes = (IsAuthenticated,)    
    def post(self, request):
        try:             
            refresh_token = request.data["refresh_token"]           
            token = RefreshToken(refresh_token)               
            token.blacklist()               
            return Response(status=status.HTTP_205_RESET_CONTENT)         
        except Exception as e:               
            return Response(status=status.HTTP_400_BAD_REQUEST)

class MessageListView(APIView):

    """
    Requests for all messages or creates new 
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

