'use strict';

angular.module('detailedView').controller('DetailedViewController', ['$scope', '$stateParams', 'DetailedViewService', 'currencyFilter',
    'CoreConstants', '$state','ExportData',

    function ($scope, $stateParams, DetailedViewService, currencyFilter, CoreConstants, $state, ExportData) {

        $scope.setEmployeeId = function () {
            $scope.employeeId = $stateParams.employeeId;
        };

        $scope.loadData = function () {

            $scope.setEmployeeId();

            $scope.activeTab = $state.current.data.activeTab;

            DetailedViewService.get({
                employeeId: $scope.employeeId
            }, function (data) {
                $scope.model = data;

                // To export CSV,XLS
                ExportData.employeeName = data.employeeName;
                ExportData.location = data.location;
                ExportData.desphone = data.deskPhone;
                ExportData.jobLevel = data.jobLevel;

            }, function (err) {
                console.error('Error occured while trying to fetch information from Detailed View Service is as follows: ' + err);
            });
        };
        $scope.redirect = function (url) {
            window.open(url, '_blank');
        }

    }
]);