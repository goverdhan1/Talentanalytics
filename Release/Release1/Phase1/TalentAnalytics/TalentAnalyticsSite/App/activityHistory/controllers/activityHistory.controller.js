'use strict';

angular.module('activityHistory').controller('ActivityHistoryController', ['$scope', '$stateParams', 'ActivityHistoryService', 'CoreConstants', 'ExportData',

function ($scope, $stateParams, ActivityHistoryService, CoreConstants, ExportData) {

    $scope.setEmployeeId = function () {
        $scope.employeeId = $stateParams.employeeId;
    };

    $scope.loadDataActivityHis = function () {
        //  Clean ExportData object as empty. To keep  updated data. (First time load)
        ExportData.sections = null;

        $scope.setEmployeeId();

        ActivityHistoryService.get({
            employeeId: $scope.employeeId
        }, function (data) {

            $scope.activityHistoryModel = data;
            $scope.activityHistoryNoDataFound = !data || !data.list || data.list.length <= 0;

            $scope.expandactivity = function () {
                $scope.class = "expandActivityHistory";
            }

            $scope.collapseactivity = function (id) {
                var scrollTopPosition = $("#firstActivityItem").position().top;
                $("#ActivityHistoryContainer").animate({ scrollTop: scrollTopPosition });
                $scope.class = "collapseActivityHistory";
            }
            var piidata = data.list[0].securedata;
            /***START- Set data to ExportData obj. ***/

            if (ExportData.sections == undefined || ExportData.sections == null)
                ExportData.sections = [];

            // TO-DO File name need to change
            ExportData.filename = 'Employee Quickview Summary';
            ExportData.page = $scope.viewType;
            ExportData.showHeaderInfo = false;


            // Bind data based on page.
            var section = {};
            if(piidata==='Y'){
                section.header = [{ 'FIELD_LABEL': 'Change Eff. Date', 'FIELD_NAME': 'changeDate' }, { 'FIELD_LABEL': 'Type of Change', 'FIELD_NAME': 'typeOfChange' }, { 'FIELD_LABEL': 'Reason for Action Desc', 'FIELD_NAME': 'reasonforActionDesc' }];
            }
            else {
                section.header = [{ 'FIELD_LABEL': 'Change Eff. Date', 'FIELD_NAME': 'changeDate' }, { 'FIELD_LABEL': 'Type of Change', 'FIELD_NAME': 'typeOfChange' }];
            }
            section.filters = data.filters;
            section.data = data.list;
            section.title = 'ACTIVITY HISTORY';
            section.display_order = 1;
            ExportData.sections.push(section);

            /***END- Set data to ExportData obj. ***/

        }, function (err) {
            console.error('Error occured while trying to fetch information from Detailed View Service is as follows: ' + err);
        });

    };
}]);
