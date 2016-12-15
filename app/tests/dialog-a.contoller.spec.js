describe('dialog-a.controller tests', function () {

    var scopeMock, modalMock, tasksMock, taskServiceMock;

    scopeMock = {
        path: angular.noop
    };
    modalMock = {
        path: angular.noop
    };
    todosMock = {
        path: angular.noop
    };
    todoServiceMock = {
        path: angular.noop
    };

    var $scope = {};

    beforeEach(module('app.component1'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        modalMock = jasmine.createSpyObj('modal', ['show', 'hide', 'open']);
        var controller = $controller('FirstViewController', { $scope: $scope, $modal: modalMock, todos: todosMock, todoService: todoServiceMock });
    }));

        it('should open modal window for addTask()', function () {
            //when
            $scope.add();
            //then
            expect(modalMock.open).toHaveBeenCalled();
        });

        it('should open modal window for viewTask()', function () {
            //when
            $scope.view();
            //then
            expect(modalMock.open).toHaveBeenCalled();
        });

    });