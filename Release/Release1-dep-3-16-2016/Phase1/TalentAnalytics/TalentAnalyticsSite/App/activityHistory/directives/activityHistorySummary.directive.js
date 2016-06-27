'use strict';

angular.module('activityHistory').directive("activityHistorySummary", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/activityHistory/views/activityHistorySummary.html',

        replace: true
    }
});

angular.module('activityHistory').directive('heightFinding', function ($timeout) {
      return {
          restrict: 'A',
             controller: function ($scope) {
                 var eleHeight = $scope.eleHeight;
          },

             link: function ($scope, element) {
                 var watch = $scope.$watch(function () {
                     return element.children().length;
                 }, function () {
                     // Wait for templates to render
                     $scope.$evalAsync(function () {
                         var totalChildValues =[];
                         var children = element.children();
                         angular.forEach(children, function (data) {
                             totalChildValues.push(data.clientHeight);
                         });
                         var sum = totalChildValues.reduce(function (a, b) { return a + b; }, 0);
                         $scope.heightOfChild = sum;
                       });
                 });
               
          }
      };
  });