'use strict';
angular.module('detailedViewDataTable').directive("basicInfoDirective", function () {
    return {
        restrict: 'E',

        templateUrl: '../../App/detailedViewDataTable/views/detailedViewBasicInfo.html',

        compile: function compile() {
            return {
                pre: function preLink(scope) {
                    scope.serviceName = 'BASIC INFO DETAIL';
                    scope.getDataService = 'DetailedViewBasicInfoService';
                    scope.title = 'BASIC INFO';
                    scope.report = 'basic-info-directive';
                }
            }
        },

        controller: 'DetailedViewDataTableController',
    }
});