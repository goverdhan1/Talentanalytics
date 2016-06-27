'use strict';

// Setting up route
angular.module('consolidatedView').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

      // consolidated view state routing
      $stateProvider
          .state('consolidatedview', {
              parent: 'parent',
              url: '/consolidatedView/:employeeId',
              templateUrl: 'app/consolidatedView/views/consolidatedview.html',
              resolve: {
                  analyticsDataSent: function (RouteLoadUpdatesService) {
                      RouteLoadUpdatesService.updatesBeforeRouteLoad('Consolidated view');
                  }
              },
          })
  }
]);