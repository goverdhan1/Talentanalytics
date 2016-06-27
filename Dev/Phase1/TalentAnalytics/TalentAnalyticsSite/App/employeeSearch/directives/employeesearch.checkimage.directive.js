'use strict';

angular.module('employeeSearch').directive('checkImage', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
                $http.get(ngSrc).success(function () {
                    //  alert('image exist');
                }).error(function () {
                    //  alert('image not exist');
                    element.attr('src', '../../App/core/images/icon-Employee_Quickview-photo-placeholder@2x.png'); // set default image
                });
            });
        }
    };
});