'use strict';

angular.module('employeeSearch').directive("empSearch", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/employeeSearch/views/employeeSearch.html',

        link: function (scope, element, attrs) {
            scope.resultsPerPage = attrs.resultsPerPage;
        },
        replace: true
    }
});
