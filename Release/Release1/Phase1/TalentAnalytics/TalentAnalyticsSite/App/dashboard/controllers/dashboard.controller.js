'use strict';

// dashboard Controller
angular.module('dashboard').controller('DashboardController', ['$scope', 'DashboardConstants', 'CoreConstants', 'CoreFunctions',
  function ($scope, DashboardConstants, CoreConstants, CoreFunctions) {
      $scope.tab = DashboardConstants.defaultTabIndex;
      $scope.tiles = DashboardConstants.tiles;

      $scope.onTabSelect = function (tabIndex) {
          $scope.tab = tabIndex;
      };

      $scope.IntakeFormLink = DashboardConstants.intakeFormLink;

      $scope.SOBSTalentLink = CoreConstants.SOBSTalentLink;

      $scope.redirect = function (url) {
          window.open(url, '_blank');
      }
  }]);