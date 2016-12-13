angular.module('app.component1').controller('ViewTaskController', function($scope, $modal, $filter, $modalInstance, selectedTodo, todos) {
    'use strict';

    $scope.selectedTodo = selectedTodo;

    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.edit = function(id) {
        $modalInstance.close();
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-edit.tpl.html',
            controller: 'EditTaskController',
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

}).controller('EditTaskController', function($scope, $rootScope, $modalInstance, todoService) {
    'use strict';

    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];

    $scope.submitForm = function() {
        var todoToAdd = $scope.todo;
        var addedTodo = todoService.addTodo(todoToAdd);
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

}).controller('EditTaskController', function($scope, $rootScope, $modalInstance, todoService, selectedTodo) {

    $scope.categories = ["MEETING", "SHOPPING", "REMINDER"];
    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];

    $scope.editedTodo = {};
    angular.copy(selectedTodo, $scope.editedTodo);
    $scope.taskTitle = $scope.editedTodo.title;

    $scope.submitForm = function() {
        changedTodo = todoService.amendTodo($scope.editedTodo);
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