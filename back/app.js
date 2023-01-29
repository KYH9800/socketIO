const express = require('express');
const app = express();
const port = 8080;
// cors
const cors = require('cors');
// routes
const indexRouter = require('./routes');
// socket.io
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

const server = app.listen(8085, (req, res) => {
  console.log(8085, 'port start');
});

SocketIO(server);
