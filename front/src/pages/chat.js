import React, { useEffect, useState } from 'react';
// socket.io-client
import io from 'socket.io-client';

const Chat = () => {
  const socket = io.connect('http://localhost:8085/chat', {
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
    // emit을 통해 message를 보낸다.
    socket.emit('new_message', {
      message: message,
    });
  };

  // [useEffect]
  // POST /room
  // body: userId (나의 id)
  // 프론트에서는 url이 /room/:roomId
  // 채팅방이 생성됨 !!
  // 채팅방 정보를 받아옴 (채팅기록 || null)
  // roomId, user, chat
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

export default Chat;
