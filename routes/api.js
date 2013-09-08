
var data = {

  "todos": [
    {
      'id': '1',
      'text': 'Vaccinations for the dog',
      'date': '2013-01-05T00:00:00',
      'state': 'pending'
    },
    {
      'id': '2',
      'text': 'Car washing',
      'date': '2013-06-05T00:00:00',
      'state': 'pending'
    },
    {
      'id': '3',
      'text': 'Buy new 35mm B&W film',
      'date': '2013-09-08T00:00:00',
      'state': 'progress'
    },
    {
      'id': '4',
      'text': 'Hotel booking',
      'date': '2013-04-05T00:00:00',
      'state': 'pending'
    },
    {
      'id': '5',
      'text': 'Learn Angular.JS and Express!!',
      'date': '2012-01-28T00:00:00',
      'state': 'completed'
    }
  ]
};


exports.todos = function (req, res) {
  var todos = [];
  data.todos.forEach(function (todo, i) {
    todos.push({
      id: i,
      text: todo.text,
      date: todo.date,
      state: todo.state
    });
  });
  res.json({todos: todos});
};

exports.todosWithPagination = function (req, res) {
  var offset = req.params.offset;
  var limit = req.params.limit;
  var todos = [];
  
  for (i = offset; i < offset+limit; i++) {
    if (i>=0 && i < data.todos.length) {
      todos.push({
        id: i,
        text: data.todos[i].text,
        date: data.todos[i].date,
        state: data.todos[i].state
      });
    }
  }

  res.json({todos: todos});
};

exports.todo = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.todos.length) {
    res.json({
      todo: data.todos[id]
    });
  } else {
    res.json(false);
  }
};

// POST
exports.addTodo = function (req, res) {
  var newid = parseInt(data.todos[data.todos.length-1].id)+1;
  var todo = {
    id: newid,
    text: req.body.text,
    date: req.body.date,
    state: req.body.state
  };
  data.todos.push(todo);
  res.json(req.body);
};

// PUT
exports.editTodo = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.todos.length) {
    data.todos[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE
exports.deleteTodo = function (req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.todos.length) {
    data.todos.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
