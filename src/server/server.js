var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var date = new Date();
let prior = new Date(2018,5,2);

const getDateString = (dateObj) => {
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  return year + "/" + month + "/" + day;
};

date = getDateString(date);
prior = getDateString(prior);

var todos = [
  {"id": 1, "text": "Hello, world!", "status": "active", dateCompleted: undefined, dateAdded: date},
  {"id": 2, "text": "Pick up groceries", "status": "complete", dateCompleted: date, dateAdded: prior},
  {"id": 3, "text": "Make birthday cake", "status": "active", dateCompleted: undefined, dateAdded: prior},
  {"id": 4, "text": "Make birthday cake", "status": "complete", dateCompleted: date, dateAdded: date},
  {"id": 5, "text": "Clean room", "status": "active", dateCompleted: undefined, dateAdded: date},
];

app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {

  const id = parseInt(req.params.id);
  const index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  res.json(todos[index]);
});

app.post('/todos', function(req, res) {
  var text = req.body.data.input;
  var category = req.body.data.category;
  if (!text) {
    return res.status(400).json({"message": "text is required"});
  }

  const ids = todos.map(obj => obj['id']); //list of todo ids
  const largestId = todos.length > 0 ? Math.max(...ids) + 1 : 1; //adds 1 to the largest id
  var newTodo = { "id": largestId, "text": text, "status": "active", dateAdded: getDateString(new Date()), category: category };
  todos.push(newTodo);
  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);

  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  todos.splice(index,1); //remove todo
  res.json(todos);
});

app.put('/todos/:id', function(req, res) {
  const id = parseInt(req.params.id);
  var method = req.body.data.method; // either status or archive


  var dateCompleted = req.body.data[method] === 'active' ? undefined
                      : getDateString(new Date()); // if new todo is active set
  //set complete date to undefined

  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });


  todos[index][method] = req.body.data[method]; //set todo value in backend to the value in new todo
  todos[index].dateCompleted = dateCompleted;
  res.json(todos[index]);

});

app.put('/todos', function(req, res) {

  for (let i = 0; i < todos.length; i++) { // set all todos in backend to completed 
    if(todos[i].archive !== true) {
      todos[i].status = 'complete';
      todos[i].dateCompleted = getDateString(new Date());
    }
  }
  res.json(todos);
});


// Node server.
var port = 3000;
var server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});

// Dev server.
var devServer = require('../../tools/development-server');
var devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
