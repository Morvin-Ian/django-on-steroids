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

   * **0. Asynchronous handling of requests: Channels uses the asyncio library to handle requests asynchronously, allowing for better performance and scalability.

    * **1. WebSockets support: Channels supports WebSockets, which allow for real-time, bi-directional communication between the client and server.

    * **2. Custom protocol support: Channels can support custom protocols in addition to WebSockets, allowing for more flexibility in how data is exchanged between the client and server.

    * **3. Django integration: Channels integrates seamlessly with Django, allowing you to use Django's ORM, authentication system, and other features in your real-time applications.