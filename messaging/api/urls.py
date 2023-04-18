from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import ListCreateMessagesView

urlpatterns = [
    path("list-create/", ListCreateMessagesView.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)