const express = require('express');
const app = express();
const port = 8080;
// cors
const cors = require('cors');
// routes
const indexRouter = require('./routes');
/*********************************************
 * 1. SocketIO: 모듈화 해놓은 socket_server를 불러온다.
 *********************************************/
const SocketIO = require('./socket');

app.use('/', indexRouter);

app.use(
  cors({
    origin: 'http://localhost:8000',
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  }),
);

app.listen(port, (req, res) => {
  console.log(port, 'port start');
});

/*******************************************************************
 * 기존 사용하는 port와 다르게 새로운 port 번호를 생성했습니다.
 * 사실 이유는 명확하게 없으나 서버를 동시에 2개를 생성하기 위해 나눴습니다.
 * 2. 실행하는 서버를 server라는 변수에 담는다.
 * 3. socket.js 파일에 모듈화를 해놓은 socket_server에 실행된 server를 넘긴다.
 *******************************************************************/
const new_port = 8085;
const server = app.listen(new_port, (req, res) => {
  console.log(new_port, 'port start');
});

SocketIO(server);
