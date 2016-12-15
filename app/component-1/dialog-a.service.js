angular.module('app.component1').service('dialogAService', function($window) {
    'use strict';

    this.refreshView = function() {
        $window.location.reload();
    };

});