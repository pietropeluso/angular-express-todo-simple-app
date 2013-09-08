
var data = {

  "todos": [
    {
      'text': 'Vaccinations for the dog',
      'date': '2013-01-05T00:00:00',
      'state': 'pending'
    },
    {
      'text': 'Car washing',
      'date': '2013-06-05T00:00:00',
      'state': 'pending'
    },
    {
      'text': 'Buy new 35mm B&W film',
      'date': '2013-09-08T00:00:00',
      'state': 'progress'
    },
    {
      'text': 'Hotel booking',
      'date': '2013-04-05T00:00:00',
      'state': 'pending'
    },
    {
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
  data.todos.push(req.body);
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
