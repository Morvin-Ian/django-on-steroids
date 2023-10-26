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
    
## Installation
    1. git clone 'this repo's link'
    2. pip install -r requirements.txt
    3. cd frontend && npm i --legacy-peer-deps
    
## Run
    1. python3 manage.py runserver
    2. On another terminal - cd frontend && npm start 
![Screenshot from 2023-10-26 13-09-03](https://github.com/Morvin-Ian/django-on-steroids/assets/78966128/bc9dfcc8-6bf6-4374-bb3f-9d554aeefb68)


