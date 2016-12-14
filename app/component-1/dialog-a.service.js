angular.module('app.component1').service('dialogAService', function($window) {

    this.refreshView = function() {
        $window.location.reload();
    }

})