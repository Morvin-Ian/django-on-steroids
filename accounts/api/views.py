from django.contrib import auth
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect 
from django.db.models import Q

from .serializer import  RegisterSerializer, LoginSerializer
from accounts.models import User
from messaging.models import Dialog

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny


csrf_protect_method = method_decorator(csrf_protect)

class RegistrationView(GenericAPIView):
    """
    Create new Users for the system.
    """
    authentication_classes = []
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(GenericAPIView):
    """
    Login Users for the system.
    """
    authentication_classes = []
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        user = auth.authenticate(email=request.data['email'], password=request.data['password'])      
        if user is not None:
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response("Invalid Credentials", status=status.HTTP_401_UNAUTHORIZED)
        
        

class AuthenticationView(GenericAPIView):
    """
    Authenticating users with tokens
    """
    permission_classes = [ IsAuthenticated]
    serializer_class = RegisterSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response({"user":serializer.data})

# class GetUsers
class FetchUsers(GenericAPIView):
    """
    Fetch Users with no relationship with the logged in User.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = []
        users = User.objects.all()

        for user in users:
            if user.profile:
                profile = user.profile.url
            else:
                profile = None
            

            if user != request.user:
                #Eliminate friends
                dialogs = Dialog.objects.filter(
                            Q(sender=user) & Q(recepient=request.user) | 
                            Q(sender=request.user) & Q(recepient=user)
                        )
                
                if not dialogs:
                    data = {
                        "uuid":user.uuid,
                        "username":user.username,
                        "email":user.email,
                        "profile":profile
                    }

                    response.append(data)
        return Response(response, status=status.HTTP_200_OK)


