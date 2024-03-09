from rest_framework.test import APITestCase
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from accounts.models import User


class TestUserModel(APITestCase):
    """
    Variety Tests for models User
    """

    def test_create_user(self):
        user = User.objects.create_user('testuser','test@gmail.com','mypassword')
        self.assertIsInstance(user,User)
        self.assertEqual(user.email,'test@gmail.com')
        self.assertFalse(user.is_staff)

    def test_create_superuser(self):
        user = User.objects.create_superuser('testuser','test@gmail.com','mypassword')
        self.assertIsInstance(user,User)
        self.assertTrue(user.is_staff)
        self.assertEqual(user.username,"testuser")
        
    def test_superuser_is_staff_status_value_error(self):
        self.assertRaises(ValueError, User.objects.create_superuser, username="testuser", email="test@gmail.com", password="mypass", is_staff=False)
        self.assertRaisesMessage(ValueError,"Superuser must have is_staff=True.")

    def test_superuser_is_superuser_status_value_error(self):
        self.assertRaises(ValueError, User.objects.create_superuser, username="testuser", email="test@gmail.com", password="mypass", is_superuser=False)
        self.assertRaisesMessage(ValueError,"Superuser must have is_superuser=True.")

    def test_username_value_error(self):
        self.assertRaises(ValueError, User.objects.create_user, username="", email='test@gmail.com', password="mypass")
        self.assertRaisesMessage(ValueError,"The given username must be set")

    def test_email_value_error(self):
        self.assertRaises(ValueError, User.objects.create_user, username="testuser", email="", password="mypass")
        self.assertRaisesMessage(ValueError,"The given email must be set")

    def test_token_generation(self):
        user = User(username='testuser', email='test@gmail.com')
        token = user.token

        test_payload = {
            'username': 'testuser',
            'email': 'test@gmail.com',
            'exp': datetime.utcnow() + timedelta(hours=24),
        }

        test_token = jwt.encode(test_payload, settings.SECRET_KEY, algorithm='HS256')
        self.assertEqual(token, test_token)


    def test_str(self):
        user = User.objects.create_user('morvin','morv@gmail.com','mypassword')
        self.assertEqual(str(user),'morv@gmail.com')


