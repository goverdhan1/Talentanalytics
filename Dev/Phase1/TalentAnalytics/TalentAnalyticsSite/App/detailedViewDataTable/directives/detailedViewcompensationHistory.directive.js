'use strict';
angular.module('detailedViewDataTable').directive("compensationHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="compensation-history-directive" default-sort="EFFECTIVE_DATE" title="COMPENSATION HISTORY" service-name="COMPENSATION HISTORY DETAIL" get-data-service="DetailedViewCompensationHistoryService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);