angular.module('app.component1').controller('FirstViewController', function($scope, $modal, $filter, $window, todoService, todos) {
    'use strict';

    $scope.todos = todos;
    $scope.todo = {};

    $scope.$on("updateView", function() {
        $window.location.reload();
    });

    $scope.filter = 'title';
    $scope.search = {
        category: '',
        title: ''
    };

    $scope.view = function(id) {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
            controller: 'ViewTaskController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function() {
                    return $scope.todo = $filter('filter')(todos, function(todo) { return todo.id === id; })[0];
                },
                todos: function() {
                    return $scope.todos;
                }
            }
        })
    };

    //$scope.test = console.log(todoService.todosTest());

    // todoService.todosList().then(function (list) {
    //     $scope.todos = list;
    // });

    $scope.add = function(id) {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'EditTaskController',
            size: 'md',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function() {
                    return $scope.todo = $filter('filter')(todos, function(todo) { return todo.id === id; })[0];
                }
            }
        });
    };

    $scope.totalItems = $scope.todos.length;
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.numPerPage);

    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;
        $scope.filteredTodos = $scope.todos.slice(begin, end);
    }, true);

    //controllery sa funkcja konstruktowa
})

//Promise service
