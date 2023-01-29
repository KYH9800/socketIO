import React, { useEffect, useState } from 'react';
// socket.io-client
import io from 'socket.io-client';

const SocketIO = () => {
  const socket = io.connect('http://localhost:8085', {
    transports: ['websocket'],
    withCredentials: true,
    path: '/socket.io', // 서버에서 설정한 path와 동일하게 맞춰야 한다.
  });

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const onChangeMessageHandler = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleRequestSocket = () => {
    socket.emit('new_message', {
      message: message,
    });
  };

  useEffect(() => {
    socket.on('news', (data) => {
      console.log('data: ', data);
      socket.emit('reply', 'Hello Node.JS');
    });

    socket.on('new_message', (msg) => {
      setChat([
        ...chat,
        {
          msg: msg,
        },
      ]);
    });
  }, [chat]);

  const renderChat = () => {
    return chat.map((message, index) => {
      return (
        <div key={index}>
          <h3>
            <span>{message.msg.message}</span>
          </h3>
        </div>
      );
    });
  };

  return (
    <div>
      <p>test socket</p>
      <input onChange={onChangeMessageHandler} />
      <button onClick={handleRequestSocket}>전송</button>
      <div>{renderChat()}</div>
    </div>
  );
};

export default SocketIO;
