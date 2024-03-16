# Django-on-steroids

The project, is focused on a real time chat app utilizing `react` library and `Django` backend.
The api was heavily dependent on `Django restframework`. 

## Testing
Unitests have also been imlemented on every app `(apis)`,
to ensure quality code.
Coverage has also been used to monitor the quality of tests based on it's report

## Django Channels
It referes to a third part module that extends its abilities beyond HTTP - to handle WebSockets, chat protocols, IoT protocols, and more.
It provides a way to handle real-time, bi-directional communication between the server and client, making it ideal for building applications such as chat rooms, real-time dashboards, and online games.

Django Channels is built on top of the popular asyncio library, which is part of Python's standard library, and it uses the WebSockets protocol to enable real-time communication between the client and server. It also supports other protocols such as HTTP long-polling, Server-Sent Events (SSE), and more.

Some of the key features of Django Channels include:

0. Asynchronous handling of requests
1. WebSockets support
2. Custom protocol support
3. Django integration
    
## Setup
### Option 1
    1. git clone 'this repo's link'
    2. Navigate to the settings.py file in the project folder and set USE_REDIS attribute to False
    ```
        # settings.py
        USE_DOCKER = False
    ```
    3. pip install -r requirements.txt
    4. cd frontend && npm i

### Option 2 - Using Docker

1. git clone `url`

2. python manage.py migrate

3. docker-compose build

4. docker-compose up
    
## Run
    1. python3 manage.py runserver
    2. On another terminal - cd frontend && npm run dev 
![Screenshot from 2024-03-15 16-57-22](https://github.com/Morvin-Ian/django-on-steroids/assets/78966128/8946480a-da9b-455b-9003-08681086b6a7)
![Screenshot from 2024-03-15 16-56-45](https://github.com/Morvin-Ian/django-on-steroids/assets/78966128/3583faf0-d96f-43a3-9781-70412c134ef3)



