from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import MessageListView, DialogView, CreateDialogView, UpdateReadMessages, FileUploadView

urlpatterns = [
    path("list/", MessageListView.as_view()),
    path("chats/", DialogView.as_view()),
    path("add_dialog/", CreateDialogView.as_view()),
    path("read/", UpdateReadMessages.as_view()),
    path("upload_file/", FileUploadView.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)
