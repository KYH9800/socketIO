// socket.io
const { Server } = require('socket.io');
// cors
const cors = require('cors');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
    /********************************************************************************************
     * allowEIO3: 호환성을 위한 설정 (참고: https://runebook.dev/ko/docs/socketio/client-installation)
     * path: path는 클라이언트와 연결할 수 있는 경로를 의미
     ********************************************************************************************/
    allowEIO3: true,
    path: '/socket.io',
  });

  io.on('connection', (socket) => {
    const req = socket.request;
    /************************************************************************
     * IP 파악
     * req.headers['x-forwarded-for']는 포워딩 시 ip가 변조되는 부분을 그나마 잡기 위함
     ************************************************************************/
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`✔ ${ip} 클라이언트 접속, socket.id : ${socket.id}, req.ip : ${req.ip}`);

    // 연결 종료 시
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id, req.ip);
    });

    // 에러 시
    socket.on('error', (err) => {
      console.error(err);
    });

    /**********************************************
     * 클라이언트로부터의 메세지 (on: 받는다. / emit: 보낸다.)
     **********************************************/
    socket.on('new_message', (msg) => {
      console.log('msg: ', msg);
      console.log('socket.id: ', socket.id);
      /*******************************************************************
       * socket.id: 고유의 socket ID를 통해 User를 구분하고 어떠한 작업을 할 수 있다.
       * 강퇴, 어떤 채팅방에 있는지 확인... 등등
       *******************************************************************/
      io.emit('new_message', msg);
    });

    socket.on('reply', (data) => {
      console.log('data: ', data);
    });

    socket.emit('news', 'Hello Socket.IO');
  });
};
