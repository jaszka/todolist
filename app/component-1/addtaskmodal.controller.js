angular.module('app.component1').controller('AddTaskController', function($scope, $modalInstance, todoService, dialogAService, selectedTodo) {
    'use strict';

    $scope.todo = {};
    $scope.taskTitle = {};

    $scope.priorities = ['HIGH', 'MEDIUM', 'LOW'];
    $scope.statuses = ['PENDING', 'DONE', 'SUSPENDED', 'CANCELLED'];

    if (selectedTodo === null) {
        $scope.adding = true;
        $scope.editing = false;
    } else {
        $scope.adding = false;
        $scope.editing = true;
        angular.copy(selectedTodo, $scope.todo);
        $scope.taskTitle = $scope.todo.title;
    }

    $scope.submitAddForm = function() {
        var todoToAdd = $scope.todo;
        todoService.addTodo(todoToAdd);
        $modalInstance.close();
        dialogAService.refreshView();
    };

    $scope.submitEditForm = function() {
        var todoToChange = $scope.todo;
        todoService.amendTodo(todoToChange);
        $modalInstance.close();
        dialogAService.refreshView();
    };

    $scope.cancel = function() {
        $modalInstance.close();
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
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

});