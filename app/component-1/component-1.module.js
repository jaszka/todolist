angular.module('app.component1', ['ngRoute', 'app.component1.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-1/dialog-a', {
            templateUrl: 'component-1/dialog-a/dialog-a.html',
            controller: 'MyFirstController',
            controllerAs: 'myFirstController',
            resolve: {
                books: function ($http) {
                    return $http.get('/component-1/books.json');
                },
                // todos: function ($http) {
                //     return $http.get('/component-1/todos.json');
                // },
                todos: function ($http) {
                    return $http.get('http://localhost:8090/todos?all');
                }
            }
        });
    });

