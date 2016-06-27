'use strict';

angular.module('summary').controller('SummaryController', ['$scope', '$stateParams', 'SummaryLeftbarService', 'CoreConstants', 'toaster', 'UserPersonalizationService', 'SummaryEditViewService', 'SummaryEditViewPostService', 'UserDetails', 'SummaryLayoutService', 'ExportData',

function ($scope, $stateParams, SummaryLeftbarService, CoreConstants, toaster, UserPersonalizationService, SummaryEditViewService, SummaryEditViewPostService, UserDetails, SummaryLayoutService, ExportData) {

    $scope.setEmployeeId = function () {
        $scope.employeeId = $stateParams.employeeId;
    };

    $scope.loadData = function () {

        $scope.setEmployeeId();

        getUserEditViewColumnSelection();

        //for global Bonus Detail link URL
        var BonusUrl = CoreConstants.BonusUrl;
        $scope.BonusUrl = BonusUrl;
        SummaryLayoutService.get({ employeeId: $stateParams.employeeId }, function(layoutData){
            $scope.summaryRightLayoutItems = layoutData;
        }, function (err) {
            console.error('The following error occured on trying to retrieve the security check information: ');
            console.log(err);
            toaster.pop('error', "Security check service returned an error");
        });
        SummaryLeftbarService.get({ employeeId: $stateParams.employeeId }, function (data) {
            $scope.model = data;

            // To export CSV,XLS
            ExportData.employeeName = data.employeeName;

        }, function (err) {
            console.error('The following error occured on trying to retrieve the summary left bar information: ');
            console.log(err);
            toaster.pop('error', "Summary left bar service returned an error");
        });
    };

    $scope.open = false;
    $scope.toggleEditPopup = function () {
        $scope.open = !($scope.open);
       
    };

    $scope.getMaxEditViewSelectionReachedStatus = function () {
        var i, selectedCount = 0;
        for (i = 0; i < $scope.EditViewFields.length; i++) {
            if ($scope.EditViewFields[i].CHECKED === 'true') {
                selectedCount += 1;
            }
        }
        return selectedCount >= 5;
    };

    $scope.updateMaxEditViewSelectionReachedStatus = function () {
        $scope.maxEditViewSelectionReached = $scope.getMaxEditViewSelectionReachedStatus();
    };

    $scope.saveEditView = function () {
        var postFields = '';
        var newDisplayFields = [];
        if ($scope.EditViewFields) {
            $scope.EditViewFields.forEach(function (field) {
                if (field.CHECKED === 'true') {
                    postFields = postFields + ',' + (field.FIELD_NAME);
                    newDisplayFields.push({ FIELD_NAME: field.FIELD_NAME, FIELD_LABEL: field.FIELD_LABEL });
                }
            });
        }

        $scope.postFields = postFields.slice(1);
        $scope.userName = UserDetails.userId;

        SummaryEditViewPostService.save({
            FIELD_NAME: $scope.postFields,
            USER_NAME: $scope.userName,
            SERVICE_NAME: 'LEFT PORTION EDIT',
            FIELD_ORDER: 1
        }, function (response) {
            if (!response || !response.d) {
                console.error('SummaryEditViewPostService did not return data in the correct format.');
                return;
            }
            $scope.displayFields = newDisplayFields;
            $scope.originalEditViewFields = angular.copy($scope.EditViewFields);
        }, function (err) {
            console.error('Error occured while posting user personalized column list: ');
            console.error(err);
            toaster.pop('error', "Error occured while saving column selection");
        });
    };

    $scope.cancelEditView = function () {
        $scope.EditViewFields = angular.copy($scope.originalEditViewFields);
        $scope.updateMaxEditViewSelectionReachedStatus();
    };

    SummaryEditViewService.get({ employeeId: $stateParams.employeeId }, function (data) {
        if (!data || !data.d || !data.d.results || data.d.results <= 0) {
            console.error('SummaryEditViewService did not return data in the correct format.');
            return;
        }
        $scope.SummaryEditViewData = data.d.results[0];
    }, function (err) {
        console.error('The following error occured ');
        console.log(err);
        toaster.pop('error', "Edit View Service returned an error");
    });

    function getUserEditViewColumnSelection() {
        UserPersonalizationService.get({ userName: UserDetails.userId, serviceName: 'LEFT PORTION EDIT', employeeId: $stateParams.employeeId },
            function (editViewData) {
                if (!editViewData || !editViewData.d || !editViewData.d.results) {
                    console.error('UserPersonalizationService did not return data in the correct format.');
                    return;
                }

                $scope.EditViewFields = editViewData.d.results;
                $scope.originalEditViewFields = angular.copy($scope.EditViewFields);

                var displayFields = [];
                if ($scope.EditViewFields) {
                    $scope.EditViewFields.forEach(function (fieldColumn) {
                        if (fieldColumn.CHECKED === 'true') {
                            displayFields.push(fieldColumn);
                        }
                    });
                }
                $scope.displayFields = displayFields;

                $scope.updateMaxEditViewSelectionReachedStatus();

            }, function (err) {
                console.error('The following error occured on trying to retrieve the user personalization data for edit view: ');
                console.log(err);
                toaster.pop('error', "Summary Edit View User personlized service returned an error");
            });
    }

    $scope.redirect = function (url) {
        window.open(url, '_blank');
    }
}]);