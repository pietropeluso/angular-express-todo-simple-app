
function TodoCtrl($scope, $http, $location, $routeParams, $filter) {

  // pagination variables
  $scope.limit = 3;
  $scope.offset = 0;
  $scope.todos = [];
  $scope.more = true;

  $scope.getTodosWithRange = function () {
    $http.get('/api/todos/'+$scope.offset+'/'+$scope.limit).
    success(function(data, status, headers, config) {
      $scope.todos = $scope.todos.concat(data.todos);
      $scope.more = data.todos.length === $scope.limit;
    });
  }

  $scope.selected = 'all';
  $scope.isShown = function(whichOne) {
    if ($scope.selected == 'all') {
      return true;
    }
    return $scope.selected == whichOne;
  };

  $scope.isProgress = function (id) {
    return $scope.todos[id].state == 'progress';
  }

  $scope.isCompleted = function (id) {
    return $scope.todos[id].state == 'completed';
  }

  $scope.loadMore = function () {
    $scope.offset += $scope.limit;
    $scope.getTodosWithRange(); 
  }

  $scope.hasMore = function () {
    return $scope.more;
  }

  $scope.getTodosWithRange();
}

function AddTodoCtrl($scope, $http, $location) {

  $scope.form = {};
  $scope.form.date = new Date();
  $scope.form.state = 'pending';

  $scope.submitTodo = function () {
    $http.post('/api/todo', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadTodoCtrl($scope, $http, $routeParams) {
  $http.get('/api/todo/' + $routeParams.id).
    success(function(data) {
      $scope.todo = data.todo;
    });

  $scope.isCorrectOption = function(state) {
    return $scope.todo.state == state;
  }
}

function EditTodoCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/todo/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.todo;
    });

  $scope.editTodo = function () {
    $http.put('/api/todo/' + $routeParams.id, $scope.form).
      success(function(data) {
        //$location.url('/readTodo/' + $routeParams.id);
        $location.path('/'); //return to Home page
      });
  };
}

function DeleteTodoCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/todo/' + $routeParams.id).
    success(function(data) {
      $scope.todo = data.todo;
    });

  $scope.deleteTodo = function () {
    $http.delete('/api/todo/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
