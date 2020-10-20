const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

const testData = [
  {value: 'Chack in with parents once a week'},
  {value: 'Record 2 videos per day'},
  {value: 'Work on side project 5 hours/week'},
  {value: 'Write for 20 minutes a day'},
  {value: 'Feed dog twice a day'},
];

app.get('/api/habits', function (req, res) {
  res.status(200).json( testData );
})
app.post('/api/habits', function (req, res) {
  testData.push(req.body);
  res.status(200).json();
})
const server = app.listen(port, function () {
  const host = server.address().address
  const port = server.address().port
  console.log("server", host, port)
});
