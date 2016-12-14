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
            //given
            //when
            $scope.add();
            //then
            expect(modalMock.open).toHaveBeenCalled();
        });

        it('should open modal window for viewTask()', function () {
            //given
            //when
            $scope.view();
            //then
            expect(modalMock.open).toHaveBeenCalled();
        });












    });

    // var $scope;

    // beforeEach(module('app.component1'));

    // beforeEach(inject(function ($controller, $rootScope) {
    //     $scope = $rootScope.$new();
    //     $controller('MyFirstController', { $scope: $scope });
    // }));


    // describe('some suite', function () {

    //     it('should add two numbers', function () {
    //        //given

    //        //when
    //        var icon = $scope.getCategoryIcon('Dom');
    //        //then
    //        expect(icon).toBe("glyphicon glyphicon-book");
    //     });

    // });
});


// describe('my-frist.controller tests', function () {


//     var cntl;

// 	beforeEach(module('app.component1'));

// 	beforeEach(inject(function($controller){
// 		cntl = $controller('MyFirstController', {});
// 	}));

// 	describe('some suite', function() {
// 		it('some spec', function() {
// 			// given 
// 			// when 
// 			var a = cntl.getCategoryIcon('Dom');
// 			// then
//             expect(true).toBe(true);
// 		});
// 	});

//     // var $scope;

//     // beforeEach(module('app.component1'));

//     // beforeEach(inject(function ($controller, $rootScope) {
//     //     $scope = $rootScope.$new();
//     //     $controller('MyFirstController', { $scope: $scope });
//     // }));


//     // describe('some suite', function () {

//     //     it('should add two numbers', function () {
//     //        //given

//     //        //when
//     //        var icon = $scope.getCategoryIcon('Dom');
//     //        //then
//     //        expect(icon).toBe("glyphicon glyphicon-book");
//     //     });

//     // });
// });