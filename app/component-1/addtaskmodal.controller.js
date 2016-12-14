angular.module('app.component1').controller('AddTaskController', function ($scope, $rootScope, $modalInstance, todoService, selectedTodo) {
    'use strict';

    $scope.todo = {};
    $scope.taskTitle = {};

    if (selectedTodo === null) {
        $scope.adding = true;
        $scope.editing = false;
    } else {
        $scope.adding = false;
        $scope.editing = true;
        angular.copy(selectedTodo, $scope.todo);
        $scope.taskTitle = $scope.todo.title;
    }

    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];
    $scope.statuses = ["PENDING", "DONE", "SUSPENDED", "CANCELLED"];

    $scope.submitAddForm = function () {
        var todoToAdd = $scope.todo;
        var addedTodo = todoService.addTodo(todoToAdd);
        $modalInstance.close();
        $rootScope.$broadcast('updateView');
    };

    $scope.submitEditForm = function () {
        var todoToChange = $scope.todo;
        var changedTodo = todoService.amendTodo(todoToChange);
        $modalInstance.close();
        $rootScope.$broadcast('updateView');
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

})