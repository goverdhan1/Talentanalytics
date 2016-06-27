
'use strict';

angular.module('compensationHistory').controller('CompensationHistoryController', ['$scope', 'CompensationHistoryService', '$stateParams', 'CoreConstants', 'ExportData',
    function ($scope, CompensationHistoryService, $stateParams, CoreConstants, ExportData) {

        $scope.setEmployeeId = function () {
            $scope.employeeId = $stateParams.employeeId;
        };

        $scope.loadData = function () {

            $scope.setEmployeeId();

            CompensationHistoryService.get({ employeeId: $scope.employeeId }, function (data) {

                if (!data || !data.yearlyData || data.yearlyData.length <= 0) {
                    $scope.readyToRender = true;
                } else {
                    $scope.hasMultipleCurrencies = data.hasMultipleCurrencies;
                    $scope.defaultCurrency = data.defaultCurrency;
                    $scope.supportedCurrencies = data.supportedCurrencies;
                    $scope.supportedCurrencyPropertyChecker = data.supportedCurrencyPropertyChecker;

                    $scope.yearlyData = data.yearlyData;
                    $scope.readyToRender = true;
                }

                $scope.setExportData(data);

            }, function (err) {
                $scope.readyToRender = true;
            });
        };

        $scope.setExportData = function (data) {
            if (ExportData.sections === undefined || ExportData.sections === null) {
                ExportData.sections = [];
            }

            ExportData.filename = 'Employee Quickview Summary';
            ExportData.page = $scope.viewType;

            var section = {};
            section.header = [{ 'FIELD_LABEL': 'Personnel Year', 'FIELD_NAME': 'year' }];
            if (data && data.supportedCurrencies) {
                data.supportedCurrencies.forEach(function (currency) {
                    section.header.push({ 'FIELD_LABEL': currency + ' Base Salary', 'FIELD_NAME': currency + 'Salary' }, { 'FIELD_LABEL': currency + ' Bonus', 'FIELD_NAME': currency + 'Bonus' }, { 'FIELD_LABEL': currency + ' Total Compensation', 'FIELD_NAME': currency + 'Compensation' });
                });
            }

            if (data) {
                section.filters = data.filters;
                if (data.yearlyData) {
                    var copydata = data.yearlyData;
                    section.data = angular.copy(copydata);
                    section.data.sort(function (a, b) { return b["year"] - a["year"]; });
                }
            }

            section.filters = section.filters || [];
            section.data = section.data || [];
            section.title = 'COMPENSATION HISTORY';
            section.display_order = 2;
            ExportData.sections.push(section);
        };

    }]);


