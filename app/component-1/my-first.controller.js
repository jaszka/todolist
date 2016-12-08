angular.module('app.component1').controller('MyFirstController', function ($scope, $http, $modal, books, todos, todoService) {
    'use strict';

    $scope.data = {
        helloWorld: 'hello world',
        form: {
            category: '',
            title: '',
            priority: '',
            content: '',
            date: ''
        },
        books: books.data
    }

    $scope.edit = function (index) {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            resolve: {
                selectedTodo: function () {
                    return $scope.todos[index];
                }
            }
        });
    };

    $scope.add = function () { //TODO change to add todo form
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'MyModalController',
            size: 'lg'
        });
    };

    $scope.print = function () {
        todoService.print();
    }


    $scope.selectRow = function (index) {
        $scope.selectedRowIndex = index;
    }

    $http.get('http://rest-service.guides.spring.io/greeting').
        then(function (response) {
            $scope.greeting = response.data;
        });

    $scope.books = books.data;
    $scope.todos = todos.data;
    $scope.openModal = function () { //controllery sa funkcja konstruktowa
        alert('There will be a modal here');
    };


}).controller('MyModalController', function ($scope, $modalInstance) { //wszystkie funkcje Angulara wyswietlane sa z dolarem
    'use strict';

    $scope.submitForm = function (isValid) {
        if (isValid) {
            alert('our form is amazing');
        }
    };

    $scope.doSomethingWithDate = function (date) {
        alert(date);
    };

})

//do komunikacji ze springowymi RESTami sa serwisy tutaj, nie controllery
//Promise service
