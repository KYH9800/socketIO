import React, { useEffect, useState } from 'react';
// socket.io-client
import io from 'socket.io-client';

const SocketIO = () => {
  const socket = io.connect('http://localhost:8085', {
    /****************************************************************************************
     * [transports의 역할]
     * socketIO 연결 시 브라우저의 네트워크 탭을 확인해보면 socketIO를 지원하지 않는 구버전의 익스플로러를 위해
     * 연결 시 polling 시도를 먼저 한다.
     * 이후 websocket 지원이 된다면 websocket으로 연결을 시도 후 연결한다.
     * transports 설정의 websocket은 'polling 시도 없이 바로 websocket으로 연결 시도를 하겠다.' 라는 뜻이다.
     * (HTTP 요청 확인 후 websocket도 지원하는지 여부 확인 > websocket으로 프로토콜 전환)
     * transports 설정이 없다면 polling 시도 시 CORS 에러가 발생한다.
     * (원인: withCredentials 설정으로 인한 문제라고 추측됨)
     ****************************************************************************************/
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
