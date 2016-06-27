'use strict';
angular.module('detailedViewDataTable').directive("activityHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="activity-history-directive" default-sort="EFFECTIVE_DATE" title="ACTIVITY HISTORY" service-name="ACTIVITY HISTORY DETAIL" get-data-service="DetailedViewActivityHistoryService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);