'use strict';

angular.module('detailedViewDataTable').directive("taDetailedViewDataTable", function () {
    return {
        restrict: 'E',

        templateUrl: '../../App/detailedViewDataTable/views/detailedViewDataTable.html',

        scope: {
            serviceName: '@',
            getDataService: '@',
            title: '@',
            report: '@',
            defaultSort: '@'
        },
        controller: 'DetailedViewDataTableController'
    }
});