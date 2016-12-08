angular.module('app').service('todoService', function ($http) {

    this.print = function () {
        alert('hello from a service');
    };

    this.todosList = function () {
        return $http.get('http://localhost:8090/todos?all').then(function (response) { return response.data });
    }

});