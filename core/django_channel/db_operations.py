from channels.db import database_sync_to_async
from accounts.models import User
from messaging.models import Dialog, Message, UploadedFile


@database_sync_to_async
def save_message(message, sender, recepient, dialog, file=None):
    message = Message.objects.create(
        sender=sender, 
        recepient=recepient, 
        text=message, 
        file=file,
        dialog=Dialog.objects.get(id=dialog)
    )

@database_sync_to_async
def save_file(sender, image):
    file = UploadedFile.objects.create(
        uploaded_by = sender,
        file = image
    )
    return file

@database_sync_to_async
def get_user(uuid):
    return User.objects.get(uuid=uuid)