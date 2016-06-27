'use strict';

angular.module('exports').directive("exportButton", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/exports/views/taexport.button.template.html',

        replace: true,
        controller: 'ExportController',
    }
});