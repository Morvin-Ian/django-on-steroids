from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import MessageListView, RelationshipListView

urlpatterns = [
    path("list-create/", MessageListView.as_view()),
    path("chats/", RelationshipListView.as_view()),


]

urlpatterns = format_suffix_patterns(urlpatterns)