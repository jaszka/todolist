angular.module('app.component1').controller('MyFirstController', function ($scope, $http, $modal, todoService) {
    'use strict';

    $scope.data = {
        helloWorld: 'hello world',
        form: {
            category: '',
            title: '',
            priority: '',
            content: '',
            date: ''
        }
    }

    $scope.filter = 'category';
    $scope.search = {
        category: '',
        title: ''
    };

    $scope.edit = function (index) {
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function () {
                    return $scope.todos[index];
                }
            }
        });
    };

    //$scope.test = console.log(todoService.todosTest());

    todoService.todosList().then(function (list) {
        $scope.todos = list;
    });

    $scope.add = function () { //TODO change to add todo form
        $modal.open({
            templateUrl: '/component-1/modal-dialog/modal-add.tpl.html',
            controller: 'MyModalController',
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedTodo: function () {
                    return $scope.data.form;
                }
            }
        });
    };

    $scope.print = function () {
        todoService.print();
    }

    $http.get('http://rest-service.guides.spring.io/greeting').
        then(function (response) {
            $scope.greeting = response.data;
        });

    //controllery sa funkcja konstruktowa



}).controller('MyModalController', function ($scope, $modalInstance, selectedTodo) {
    'use strict';

    $scope.selectedTodo = selectedTodo;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.categories = ["MEETING", "SHOPPING", "REMINDER"];

    $scope.priorities = ["HIGH", "MEDIUM", "LOW"];

    $scope.submitForm = function (isValid) {
        if (isValid) {
            alert('our form is amazing');
        }
    };

    $scope.doSomethingWithDate = function (date) {
        alert(date);
    };

})

//Promise service
