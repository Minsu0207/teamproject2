import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function WebSocketExample({ onConnect }) {
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (!websocket || !isLoggedIn) {
            return;
        }

        const onMessage = (msg) => {
            const data = msg.data;
            const newData = JSON.parse(data);
            const newMessages = [...messages, newData];
            console.log("newMessages", newMessages)
            setMessages(newMessages);
        };

        websocket.onmessage = onMessage;

        return () => {
            // websocket.close();
        };
    }, [websocket, messages, isLoggedIn]);

    const startWebSocket = () => {
        const newWebSocket = new WebSocket('ws://localhost:8081/ws/health');
        newWebSocket.onopen = () => {
            console.log('WebSocket connected');
            onConnect();
        };
        setWebsocket(newWebSocket);
    };

    const handleLoginSuccess = async () => {
        setIsLoggedIn(true);
        startWebSocket();
    };

    return (
        <div>
            <button type="button" onClick={handleLoginSuccess}>
                로그인
            </button>
        </div>
    );
};

WebSocketExample.propTypes = {
    onConnect: PropTypes.func.isRequired,
};

export default WebSocketExample;
