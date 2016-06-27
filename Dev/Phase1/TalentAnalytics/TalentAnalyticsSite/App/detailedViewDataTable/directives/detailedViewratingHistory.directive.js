'use strict';
angular.module('detailedViewDataTable').directive("ratingHistoryDirective", ['$compile', function ($compile) {
    return {
        restrict: 'E',

        link: function (scope, element, attrs) {
            var el = $compile('<ta-detailed-view-data-table report="rating-history-directive" default-sort="FISCALYEAR" title="RATINGS HISTORY" service-name="RATINGS HISTORY DETAIL" get-data-service="DetailedViewRatingHistoryService"></ta-detailed-view-data-table>')(scope);
            element.append(el);
        }
    }
}]);