'use strict';
angular.module('detailedViewDataTable').directive("certificationHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="certification-history-directive" default-sort="EFFECTIVE_DATE" title="CERTIFICATION DETAILS" service-name="CERTIFICATION DETAIL" get-data-service="DetailedViewCertificationService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);