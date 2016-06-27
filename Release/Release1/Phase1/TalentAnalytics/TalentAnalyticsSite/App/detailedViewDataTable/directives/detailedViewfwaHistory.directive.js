'use strict';
angular.module('detailedViewDataTable').directive("fwaHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="fwa-history-directive" default-sort="DATEFROM" title="FWA HISTORY" service-name="FWA HISTORY DETAIL" get-data-service="DetailedViewFWAHistoryService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);