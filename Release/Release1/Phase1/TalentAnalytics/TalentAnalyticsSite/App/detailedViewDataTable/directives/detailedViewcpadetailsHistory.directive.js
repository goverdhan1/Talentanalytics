'use strict';
angular.module('detailedViewDataTable').directive("cpaHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="cpa-history-directive" default-sort="CPA_CERTI_TYPE" title="CPA EXAM SCORES" service-name="CPA EXAM SCORES" get-data-service="DetailedViewCPAExamScoresService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);