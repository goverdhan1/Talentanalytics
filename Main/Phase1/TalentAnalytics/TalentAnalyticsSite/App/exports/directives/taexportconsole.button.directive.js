'use strict';

angular.module('exports').directive("exportButtonConsole", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/exports/views/taexportconsole.button.template.html',

        replace: true,
        controller: 'ExportController',
    }
});