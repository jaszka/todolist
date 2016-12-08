angular.module('app').service('todoService', function($http){

    this.print = function() {
        alert('hello world from a service');
    };

});

//w serwisie piszemy this.costam