'use strict';

// dashboard Controller
angular.module('dashboard').controller('DashboardController', ['$scope', 'DashboardConstants', 'CoreConstants', 'CoreFunctions', '$stateParams', '$window',
  function ($scope, DashboardConstants, CoreConstants, CoreFunctions, $stateParams, $window) {

      $scope.tiles = DashboardConstants.tiles;
      if ($stateParams.tabIndex && $stateParams.tabIndex.length) {
          $scope.tab = Number($stateParams.tabIndex);
      } else {
          $scope.tab = DashboardConstants.defaultTabIndex;
      }

      $scope.onTabSelect = function (tabIndex) {
          var matchedTile = $scope.getMatchingTab(tabIndex);
          if(matchedTile && matchedTile.url) {
              $window.location.href =  matchedTile.url + "?tabIndex=" + tabIndex;
          } else {
              $scope.tab = tabIndex;
          }
      };

      $scope.getMatchingTab = function (tabIndex) {
          var matchedTiles = DashboardConstants.tiles.filter(function (item) { return item.tabIndex === tabIndex; });
          if (matchedTiles && matchedTiles.length > 0) {
              return matchedTiles[0];
          }
          return null;
      };

      $scope.IntakeFormLink = DashboardConstants.intakeFormLink;

      $scope.SOBSTalentLink = CoreConstants.SOBSTalentLink;

      $scope.redirect = function (url) {
          window.open(url, '_blank');
      }
  }]);
