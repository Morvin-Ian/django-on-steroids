import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals.js';
import { ChatContextProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChatContextProvider>
        <App />
    </ChatContextProvider>
);

reportWebVitals();
