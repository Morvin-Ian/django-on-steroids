from django.urls import path


from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt import views as jwt_views

from .views import *

urlpatterns = [

    path('token/', jwt_views.TokenObtainPairView.as_view()),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view()),

    path('register/', RegistrationView.as_view()),
    # path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),    

    path("messages/", MessageListView.as_view()),


]

urlpatterns = format_suffix_patterns(urlpatterns)