from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import MessageListView, DialogView

urlpatterns = [
    path("list/", MessageListView.as_view()),
    path("chats/", DialogView.as_view()),


]

urlpatterns = format_suffix_patterns(urlpatterns)