angular.module('app.component1').controller('FirstViewController', function($scope, $modal, $filter, $window, todoService, todos) {
    'use strict';

    $scope.todos = todos;
    $scope.todo = {};

    $scope.filter = 'title';
    $scope.search = {
        category: '',
        title: ''
    };

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    $scope.view = function(id) {
        $modal.open({
            templateUrl: '/main/layout/modal-dialog.tpl.html',
            controller: 'TodoViewController',
            size: 'md',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function() {
                    return $scope.todo = $filter('filter')(todos, function(todo) { return todo.id === id; })[0];
                },
                list: function() {
                    return true;
                },
                calendar: function() {
                    return false;
                }
            }
        });
    };

    $scope.add = function() {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'AddTaskController',
            size: 'md',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function() {
                    return null;
                }
            }
        });
    };

});
