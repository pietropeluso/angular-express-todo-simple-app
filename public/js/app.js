/**
* express-todo-app Angular Module
*/

angular.module('myApp', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: TodoCtrl
      }).
      when('/addTodo', {
        templateUrl: 'partials/addTodo',
        controller: AddTodoCtrl
      }).
      when('/readTodo/:id', {
        templateUrl: 'partials/readTodo',
        controller: ReadTodoCtrl
      }).
      when('/editTodo/:id', {
        templateUrl: 'partials/editTodo',
        controller: EditTodoCtrl
      }).
      when('/deleteTodo/:id', {
        templateUrl: 'partials/deleteTodo',
        controller: DeleteTodoCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]).
  filter('completedTodos', function () {
    return function (input) {
      var result = [];
      angular.forEach(input, function(value, key){
        //storing only "state:completed" todo item
        if (value.state === 'completed') {
          result.push(value.id);
        }
    });
    return result;
    };
  });