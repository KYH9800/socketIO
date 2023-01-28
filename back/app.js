const express = require('express');
const app = express();
const port = 8080;
// routes
const indexRouter = require('./routes');

app.use('/', indexRouter);

app.listen(port, (req, res) => {
  console.log(port, 'port start');
});
