'use strict';

angular.module('headcountDetailView').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('headcountdetailview', {
              url: '/headcountdetailview',
              parent: 'parent',
              params: {
                  //selectedFilter: null,
                  reportTitle: null
              },
              templateUrl: 'App/hcm-detailview/views/hcm-detailview.html',
              controller: 'HeadcountDetailViewController',
              controllerAs: 'hcdvCtrl',
              resolve: {
                  analyticsDataSent: function (RouteLoadUpdatesService) {
                      RouteLoadUpdatesService.updatesBeforeRouteLoad('HeadCountDetailView');
                  }
              },
          })
  }
]);