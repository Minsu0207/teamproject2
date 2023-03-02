import { React, useState, useEffect } from 'react';


function WebSocketExample() {
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (!websocket) {
            return;
        }

        const onMessage = (msg) => {
            const data = msg.data;
            const newMessages = [...messages, data];
            setMessages(newMessages);
        };

        websocket.onmessage = onMessage;

        return () => {
            websocket.close();
        };
    }, [websocket, messages]);

    const start = () => {
        const newWebSocket = new WebSocket('ws://localhost:8081/ws/chat');

        setWebsocket(newWebSocket);
    };

    return (
        <div>
            <button type="button" onClick={start}>
                시작
            </button>
            <div className="col">
                {messages.map((message, index) => (
                    <div key={index}>
                        <b>{message}</b>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WebSocketExample;