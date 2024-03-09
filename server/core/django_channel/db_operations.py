from channels.db import database_sync_to_async
from accounts.models import User
from messaging.models import Dialog, Message


@database_sync_to_async
def save_message(message, sender, recepient, dialog):
    message = Message.objects.create(
        sender=sender, 
        recepient=recepient, 
        text=message, 
        dialog=Dialog.objects.get(id=dialog)
    )
@database_sync_to_async
def get_user(uuid):
    return User.objects.get(uuid=uuid)