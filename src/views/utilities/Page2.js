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

      const newData = JSON.parse(data);
      const newMessages = [...messages, newData];
      console.log("newMessages", newMessages)

      setMessages(newMessages);
    };

    websocket.onmessage = onMessage;

    return () => {
      // websocket.close();
    };
  }, [websocket, messages]);

  const start = () => {
    const newWebSocket = new WebSocket('ws://localhost:8081/ws/health');
    console.log("start");
    setWebsocket(newWebSocket);
  };



  return (
    <div>
      <button type="button" onClick={start}>
        시작
      </button>
      <div className="col">
        {messages.map((a, index) => (
          <div key={index}>
            <p>{a.name} {a.age}</p>

          </div>
        ))}
      </div>
    </div >
  );
}

export default WebSocketExample;