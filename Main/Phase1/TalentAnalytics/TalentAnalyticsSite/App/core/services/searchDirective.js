'use strict';

//Service used for communicating with the a Deloitte People Network.
var employeeSearch = angular.module('core12',[]);

employeeSearch.directive("empSearch", function () {
    return {
        restrict: 'A',
        templateUrl: '../../App/summary/views/employeeSearch.html',

        link: function (scope, element, attrs) {
        },
        replace: true
    }
});