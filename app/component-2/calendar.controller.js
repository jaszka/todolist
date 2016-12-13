angular.module('app.component2').controller('SecondViewController', function (uiCalendarConfig, $scope, $modal, $filter, $window, todoService, todos) {
    'use strict';

    $scope.events = [];
    $scope.eventSources = [$scope.events];
    //angular.copy(todos, $scope.eventSources);

    $scope.selectedEvent = null;
    var isFirstTime = true;

    $scope.events.slice(0, $scope.events.length);

    angular.forEach(todos, function(todo) {
        $scope.events.push({
            title: todo.title,
            category: todo.category,
            description: todo.description,
            start: new Date(todo.date.year, todo.date.monthValue - 1, todo.date.dayOfMonth),
            end: new Date(todo.date.year, todo.date.monthValue - 1, todo.date.dayOfMonth),
            stick: true
        })
    });

    $scope.uiConfig = {
        calendar: {
            height: 500,
            editable: true,
            displayEventTime: false,
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: function (event) {
                $scope.selectedEvent = event;
            },
            eventAfterAllRender: function () {
                if ($scope.events.length > 0 && isFirstTime) {
                    uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.events[0].start);
                    isFirstTime = false;
                }

            },
            //eventDrop: $scope.alertOnDrop,
            //eventResize: $scope.alertOnResize
        }
    };

})