'use strict';

angular.module('exports').directive("exportButtonHcm", function () {
    return {
        restrict: 'E',
        templateUrl: 'App/exports/views/hcmexport.button.template.html',

        replace: true,
        controller: 'ExportController',
    }
});