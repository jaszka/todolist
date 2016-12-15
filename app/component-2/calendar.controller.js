angular.module('app.component2').controller('SecondViewController', function(uiCalendarConfig, $scope, $modal, $compile, todos) {
    'use strict';

    $scope.events = [];
    $scope.eventSources = [$scope.events];

    $scope.selectedEvent = null;

    var setColor = function(priority) {
        if (priority === 'HIGH') {
            return '#cc0000';
        }
        if (priority === 'MEDIUM') {
            return '#ffb400';
        }
        if (priority === 'LOW') {
            return '#56e25f';
        }
    };

    angular.forEach(todos, function(todo) {
        $scope.events.push({
            id: todo.id,
            title: todo.title,
            category: todo.category,
            content: todo.content,
            priority: todo.priority,
            start: new Date(todo.date),
            end: new Date(todo.date) + 36000,
            status: todo.status,
            allDayDefault: true,
            stick: true,
            color: setColor(todo.priority)
        });
    });

    $scope.uiConfig = {
        calendar: {
            height: 500,
            editable: true,
            displayEventTime: false,
            firstDay: 1,
            header: {
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: function(event) {
                $scope.selectedEvent = event;
                $modal.open({
                    templateUrl: '/main/layout/modal-dialog.tpl.html',
                    controller: 'TodoViewController',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: true,
                    resolve: {
                        selectedTodo: function() {
                            return $scope.selectedEvent;
                        },
                        list: function() {
                            return false;
                        },
                        calendar: function() {
                            return true;
                        }
                    }
                });
            },
            eventRender: function(event, element) {
                element.attr({
                    'popover': ['Title:  ' + event.title + ',  ' + 'Description:  ' + event.content.slice(0,5) + '...'],
                    'popover-placement': 'right',
                    'popover-trigger': 'mouseenter'
                });
                $compile(element)($scope);
            }
        }
    };

});