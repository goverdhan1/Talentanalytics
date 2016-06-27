'use strict';
angular.module('detailedViewDataTable').directive("loaHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="loa-history-directive" default-sort="DATEFROM" title="LOA HISTORY" service-name="LOA HISTORY DETAIL" get-data-service="DetailedViewLOAHistoryService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);