'use strict';
angular.module('headcountDetailView').directive("hcmDetailviewSubheader", function ($modal, HeadcountManagementDetailedViewSaveService, UserDetails, hcmDetailedViewGraphData, toaster) {
    return {
        restrict: 'E',
        templateUrl: 'App/hcm-detailview/views/hcm-detailview-subheader.html',
        controller: function ($scope) {
            hcmDetailedViewGraphData.graphType = 'barchart';
            $scope.lineChartHandler = {
                barChart: true,
                lineChart: false
            };

            $scope.toggleChart = function (chartType) {
                if (chartType === 'barchart') {
                    hcmDetailedViewGraphData.graphType = 'barchart';
                    $scope.lineChartHandler.barChart = true;
                    $scope.lineChartHandler.lineChart = false;

                } else if (chartType === 'linechart') {
                    hcmDetailedViewGraphData.graphType = 'linechart';
                    $scope.lineChartHandler.barChart = false;
                    $scope.lineChartHandler.lineChart = true;
                }
            };

            $scope.saveAsModalOpen = function () {
                //var modalInstance = $modal.open({
                $modal.open({
                    templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-save-as-modal.html',
                    controller: 'HeadcountDetailViewSaveAsController'
                });
            };

            $scope.allViewsModalOpen = function () {
                $modal.open({
                    templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-all-views-modal.html',
                    controller: 'HeadcountDetailViewAllViewsController'
                });
            };
        },
        link: function (scope, element, attrs) {
        },
        replace: true
    }
});