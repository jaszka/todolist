angular.module('app.component1').controller('FirstViewController', function ($scope, $modal, $filter, $window, todoService, todos) {
    'use strict';

    $scope.todos = todos;
    $scope.todo = {};

    $scope.$on("updateView", function () {
        $window.location.reload();
    });

    $scope.filter = 'title';
    $scope.search = {
        category: '',
        title: ''
    };

    $scope.orderByCreationTime = function () {
        console.log($scope.todos);
        return $scope.todos = $filter('orderBy')($scope.todos, $scope.todo.addetAt, true);
    };

    $scope.view = function (id) {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
            controller: 'ViewTaskController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function () {
                    return $scope.todo = $filter('filter')(todos, function (todo) { return todo.id === id; })[0];
                },
                todos: function () {
                    return $scope.todos;
                }
            }
        })
    };

    //$scope.test = console.log(todoService.todosTest());

    // todoService.todosList().then(function (list) {
    //     $scope.todos = list;
    // });

    $scope.add = function () {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'AddTaskController',
            size: 'md',
            backdrop: 'static',
            keyboard: false
        });
    };

    $scope.totalItems = $scope.todos.length;
    $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.numPerPage);

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;
        $scope.filteredTodos = $scope.todos.slice(begin, end);
    }, true);

    //controllery sa funkcja konstruktowa

}).controller('ViewTaskController', function ($scope, $modal, $filter, $modalInstance, selectedTodo, todos) {
    'use strict';

    $scope.selectedTodo = selectedTodo;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.edit = function (id) {
        $modalInstance.close();
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-edit.tpl.html',
            controller: 'EditTaskController',
            size: 'md',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function () {
                    return $scope.selectedTodo;
                }
            }
        });
    };

}).controller('AddTaskController', function ($scope, $rootScope, $modalInstance, todoService) {

    $scope.categories = ["MEETING", "SHOPPING", "REMINDER"];
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];

    $scope.submitForm = function () {
        todoToAdd = $scope.todo;
        addedTodo = todoService.addTodo(todoToAdd);
        $modalInstance.close();
        $rootScope.$broadcast('updateView');
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

    $(function () {
        $('#datetimepicker').datetimepicker({
            useStrict: true,
            format: 'YYYY-MM-DD HH:mm',
            stepping: 10,
            allowInputToggle: true
        });
    });

}).controller('EditTaskController', function ($scope, $rootScope, $modalInstance, todoService, selectedTodo) {

    $scope.categories = ["MEETING", "SHOPPING", "REMINDER"];
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];

    $scope.editedTodo = {};
    angular.copy(selectedTodo, $scope.editedTodo);
    $scope.taskTitle = $scope.editedTodo.title;

    $scope.submitForm = function () {
        changedTodo = todoService.amendTodo($scope.editedTodo);
        $modalInstance.close();
        $rootScope.$broadcast('updateView');
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

})

//Promise service
