angular.module('app').service('todoService', function($http) {
    'use strict';

    this.todosList = function() {
        return $http.get('http://localhost:8090/todos?all').then(function(response) { return response.data; });
    };

    this.addTodo = function(todo) {
        return $http.post('http://localhost:8090/todos', todo).then(function(response) { return response.data; });
    };

    this.amendTodo = function(todo) {
        return $http.post('http://localhost:8090/todos?update', todo).then(function(response) { return response.data; });
    };

});