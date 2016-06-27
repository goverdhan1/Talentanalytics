'use strict';
angular.module('jobHistory').controller('JobHistoryController', ['$scope', '$stateParams', 'JobHistoryService', 'CoreConstants', 'ExportData',
        function ($scope, $stateParams, JobHistoryService, CoreConstants, ExportData) {
            $scope.setEmployeeId = function () {
                $scope.employeeId = $stateParams.employeeId;
            };

            $scope.addValuesIfPresent = function(originalValue, valueToAdd){
                if (originalValue && valueToAdd && valueToAdd.length > 0) {
                    return originalValue + ' - ' + valueToAdd;
                }
                return originalValue;
            };

            $scope.loadDataJobHistory = function () {

                //  Clean ExportData object as empty. To keep  updated data. (First time load)
                ExportData.sections = null;

                $scope.setEmployeeId();
                JobHistoryService.get({
                    employeeId: $scope.employeeId
                }, function (data) {

                    $scope.jobHistoryModel = data;
                    $scope.jobHistoryNoDataFound = !data || !data.list || data.list.length <= 0;

                    $scope.expandJobHistory = function () {
                        $scope.showHideClass = "expandJobHistory";
                    }

                    $scope.collapseJobHistory = function () {
                        var contactTopPosition = $("#firstJobItem").position().top;

                        //$("#contact-list-scroller").scrollTop(contactTopPosition);
                        $("#jobHistoryContainer").animate({ scrollTop: contactTopPosition });
                        $scope.showHideClass = "collapseJobHistory";
                    }

                    /***START- Set data to ExportData obj. ***/

                    if (ExportData.sections == undefined || ExportData.sections == null)
                        ExportData.sections = [];

                    // TO-DO File name need to change
                    ExportData.filename = 'Employee Quickview Summary';
                    ExportData.page = $scope.viewType;

                    // Bind data based on page.
                    var section = {};
                    section.header = [{ 'FIELD_LABEL': 'Effective Date', 'FIELD_NAME': 'effectiveDate' }, { 'FIELD_LABEL': 'Action Type', 'FIELD_NAME': 'actionType' }, { 'FIELD_LABEL': 'Job Level Desc', 'FIELD_NAME': 'jobDescriptionOnly' }, { 'FIELD_LABEL': 'Reason for Action', 'FIELD_NAME': 'reasonForAction' }, { 'FIELD_LABEL': 'Job or Position Key/Text', 'FIELD_NAME': 'JPDescription' }];
                    section.filters = data.filters;
                    section.data = [];
                    data.list.forEach(function (data) {
                        if (data.typeOfChange === 'JOB')
                        {
                            var exportData = {
                                effectiveDate: data.effectiveDate,
                                jobDescriptionOnly: data.pLevelTxt,
                                actionType: $scope.addValuesIfPresent(data.actionType, data.actionTypeDescription),
                                reasonForAction:  $scope.addValuesIfPresent(data.reasonForAction, data.reasonForActionDesc),
                                JPDescription: $scope.addValuesIfPresent(data.jobCode, data.jobDescription)
                        };           
                        }
                        else if (data.typeOfChange === 'POSITION')
                        {
                            var exportData = {
                                effectiveDate: data.effectiveDate,
                                jobDescriptionOnly: data.pLevelTxt,
                                actionType: $scope.addValuesIfPresent(data.actionType, data.actionTypeDescription),
                                reasonForAction: $scope.addValuesIfPresent(data.reasonForAction, data.reasonForActionDesc),
                                JPDescription: $scope.addValuesIfPresent(data.positionCode, data.positionDescription)
                            };
                        }
                        section.data.push(exportData)
                    })
                   section.title = 'JOB HISTORY';
                    section.display_order = 3;
                    ExportData.sections.push(section);

                    /***END- Set data to ExportData obj. ***/

                }, function (err) {
                    console.error('Error occured while trying to fetch information from Detailed View Service is as follows: ' + err);
                });

            };
        }]);