'use strict';

angular.module('jobHistory').directive("jobHistorySummary", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/jobHistory/views/jobHistorySummary.html',

        replace: true
    }
});
