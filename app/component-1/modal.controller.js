angular.module('app.component1').controller('ViewTaskController', function($scope, $modal, $filter, $modalInstance, selectedTodo) {
    'use strict';

    $scope.selectedTodo = selectedTodo;

    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.edit = function() {
        $modalInstance.close();
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'AddTaskController',
            size: 'md',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function() {
                    return $scope.selectedTodo;
                }
            }
        });
    };

}).controller('AddTaskController', function($scope, $rootScope, $modalInstance, todoService, selectedTodo) {
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

    $scope.submitAddForm = function() {
        var todoToAdd = $scope.todo;
        var addedTodo = todoService.addTodo(todoToAdd);
        $modalInstance.close();
        $rootScope.$broadcast('updateView');
    };

    $scope.submitEditForm = function() {
        var changedTodo = todoService.amendTodo($scope.todo);
        $modalInstance.close();
        $rootScope.$broadcast('updateView');
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

})