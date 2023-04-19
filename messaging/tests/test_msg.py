from rest_framework.test import APITestCase
from messaging.models import Message



class TestMessageModel(APITestCase):
    """
    Tests for the Message Model
    """

    def test_str(self):
        message = Message.objects.create(1,2,'Hello There')
        self.assertEqual(str(message),'Hello There')
