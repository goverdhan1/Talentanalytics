'use strict';
angular.module('detailedViewDataTable').directive("jobHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',
        replace:false,
        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="job-history-directive" default-sort="EFFECTIVE_DATE" title="JOB HISTORY" service-name="JOB HISTORY DETAIL" get-data-service="DetailedViewJobHistoryService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);