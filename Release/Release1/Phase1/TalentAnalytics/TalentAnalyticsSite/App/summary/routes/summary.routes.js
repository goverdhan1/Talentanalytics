'use strict';

angular.module('summary').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

      // Summary state routing
      $stateProvider
          .state('summary', {
            url: '/summary/:employeeId',
            parent: 'parent',
            templateUrl: 'app/summary/views/summary.html',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Summary');
                }
            },
          });
  }
]);