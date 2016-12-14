describe('\'app.component-1\' module', function () {
    'use strict';
    var routeProvider;

    beforeEach(function () {
        module('ngRoute', function ($routeProvider) {
            routeProvider = $routeProvider;
            spyOn(routeProvider, 'when').and.callThrough();
            spyOn(routeProvider, 'otherwise').and.callThrough();
        });
        module('app.component1');
    });

    // This is necessary to trigger loading the modules above; use it to inject services once they are needed
    beforeEach(inject());

    it('defines a route for the dialog-a', function () {
        expect(routeProvider.when).toHaveBeenCalledWith('/component-1/dialog-a', { templateUrl : 'component-1/dialog-a/dialog-a.html', controller: 'FirstViewController',
                resolve: {todos: function (todoService) {return todoService.todosList();}}})
    });

});
