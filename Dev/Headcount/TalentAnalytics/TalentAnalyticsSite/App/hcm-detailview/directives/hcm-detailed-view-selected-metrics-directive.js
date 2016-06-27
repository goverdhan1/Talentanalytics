'use strict';
angular.module('headcountDetailView').directive("hcmDetailedViewSelectedMetrics", ['$timeout', 'hcmDetailedViewGraphData', function ($timeout, hcmDetailedViewGraphData) {
    return {
        restrict: 'E',
        template: '<div class="detailed-view-selected-metrics-wrapper"><div class="detailed-view-selected-metrics-marcer"></div><div class="detailed-view-selected-metrics-lable">{{name}}</div></div>',
        controller: function ($scope) {
            Object.defineProperties($scope, {
                name: {
                    get: function () {
                        return hcmDetailedViewGraphData.selectedMetricsName;
                    }
                }
            });

        },
        link: function (scope, element, attrs) { },
        replace: true
    };
}]);