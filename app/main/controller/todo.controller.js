angular.module('app').controller('TodoViewController', function ($scope, $modal, $modalInstance, todoService, selectedTodo, list, calendar) {
    'use strict';

    $scope.list = list;
    $scope.calendar = calendar;

    $scope.selectedTodo = selectedTodo;

    $scope.statuses = ["PENDING", "DONE", "SUSPENDED", "CANCELLED"];

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.edit = function () {
        $modalInstance.close();
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'AddTaskController',
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

    $scope.editStatus = function () {
        var todoToAdd = {
            id: $scope.selectedTodo.id,
            category: $scope.selectedTodo.category,
            title: $scope.selectedTodo.title,
            priority: $scope.selectedTodo.priority,
            content: $scope.selectedTodo.content,
            status: $scope.selectedTodo.status
        };
        var addedTodo = todoService.amendTodo(todoToAdd);
        $modalInstance.close();
    };

})