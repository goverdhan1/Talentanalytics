'use strict';

angular.module('certificationSummary').directive("certificationDetailsSummary", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/certificationSummary/views/certificationSummary.html',

        replace: true
    }
});
