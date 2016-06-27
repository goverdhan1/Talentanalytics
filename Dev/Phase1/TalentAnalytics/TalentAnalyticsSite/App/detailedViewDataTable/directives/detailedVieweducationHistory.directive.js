'use strict';
angular.module('detailedViewDataTable').directive("educationHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="education-history-directive" default-sort="DEGREE_COMPL_DATE" title="EDUCATION DETAILS" service-name="EDUCATION DETAIL" get-data-service="DetailedViewEducationDetailsService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);