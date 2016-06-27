'use strict';
angular.module('headcountManagementFilter').controller('hcmSavefilterModalController', function ($scope, $timeout, $modalInstance, $q,
    hcmGetUserFiltersService, UserDetails, HeadcountManagementFilterPostService,
    hcmFilterValidationService, toaster, HcmGetHierarchyPostDataService) {

    $scope.saveFilterAsModel = { fileName: '' };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.Apply = function () {


        if ($scope.saveFilterAsModel.fileName.length > 0) {
            var postData = $scope.getPostData();
            var isHaveInvalidData = hcmFilterValidationService.validateAllData(postData.postAttribute, postData.dateData.SELECTION_TYPE);
            if (isHaveInvalidData) {
                $modalInstance.close();
                return;
            }
            $scope.filterNameExists = false;
            hcmGetUserFiltersService.getCached(function (data) {
                $scope.filsterList = data.results;
                for (var i = 0; i < $scope.filsterList.length; i++) {
                    if ($scope.filsterList[i].FILTER_NAME === $scope.saveFilterAsModel.fileName) {
                        $scope.filterNameExists = true;
                    }
                }
                if ($scope.filterNameExists) {
                    var errMessage = "Filter name already exists";
                    toaster.pop('warning', errMessage);
                } else {
                    
                    var chartType;
                    if ($scope.lineChartHandler.lineChart) {
                        chartType = 'Line';
                    } else {
                        chartType = 'Bar';
                    }
                    if (postData.dateData.SELECTION_TYPE == 'STANDARD') {
                        if(postData.dateData.CHART_SCALE == 'YTD-FP' || postData.dateData.CHART_SCALE == 'YOY YTD-FP' || postData.dateData.CHART_SCALE == 'PTD-FP')
                        {
                            if (isLessThan3PeriodsForStandard(postData.dateData.ATTRIBUTE)) {
                                chartType = 'Bar';
                            }
                        }
                    }
                    else if (postData.dateData.SELECTION_TYPE == 'CUSTOM-FYP' && postData.dateData.CHART_SCALE == 'FP') {
                        if (isLessThan3PeriodsForCustomFYP(postData.dateData.ATTRIBUTE)) {
                            chartType = 'Bar';
                        }                        
                    }

                    var newItemData = {
                        USER_NAME: UserDetails.userId,
                        FILTER_NAME: $scope.saveFilterAsModel.fileName,
                        ATTRIBUTE: postData.postAttribute,
                        ATTRIBUTE_VALUE: '',
                        ATTRIBUTENAME_DATE: '',
                        REPORTING_TYPE: postData.dateData.REPORTING_TYPE,
                        SELECTION_TYPE: postData.dateData.SELECTION_TYPE,
                        DELETE_FLAG: 'N',
                        REPORT_NAME: postData.dateData.REPORT_NAME,
                        CHART_SCALE: postData.dateData.CHART_SCALE.replace('CD-', ''),
                        NEW_FILTER_NAME: '',
                        LAST_USED_FLAG: 'Y',
                        CHART_TYPE: chartType
                    };

                    var parent = $scope.$parent;

                    newItemData = HcmGetHierarchyPostDataService.fillPostDataOfValidHierarchyData(newItemData);
                   
                    parent.multiSave = true;
                   
                    HeadcountManagementFilterPostService.save(newItemData).$promise
                    .then(function (result) {
                        parent.multiSave = false;
                        
                        $scope.bindSavedFilter(true);
                    }, function (err) {
                        parent.multiSave = false;
                        // Tracking errors
                        var errMessage = "Save last used filter and chart type returned an error";
                        console.error(errMessage, err);
                        toaster.pop('error', errMessage);
                    });

                    $modalInstance.close();
                }
            }, function (err) {
                var errMessage = "Get user filters service returned an error";
                console.error(errMessage, err);
                toaster.pop('error', errMessage);
            });
        }
    };

    var isLessThan3PeriodsForStandard = function (dateStr) {

        if (dateStr && dateStr != '' && dateStr != 'DATE()')
        {
            var noOfPeriods = dateStr.split(',')[1].split(')')[0];
            if (!isNaN(noOfPeriods) && Number(noOfPeriods) <= 3 )
            {
                return true;
            }
        }

        return false;
    }

    var isLessThan3PeriodsForCustomFYP = function (dateStr) {
        
        if (dateStr && dateStr != '') {

            var start = dateStr.split(',')[0];
            var end = dateStr.split(',')[1];
            var startPeriod = Number(start.substr(start.length - 2, 2));
            var endPeriod = Number(end.substr(7, 2));
            var startYear = Number(start.substr(7, 4));
            var endYear = Number(end.substr(2, 4));

            if (!isNaN(startPeriod) && !isNaN(endPeriod) && !isNaN(startYear) && !isNaN(endYear)) {
                if((endYear == startYear) && ((Number(endPeriod) - Number(startPeriod)) <= 3)){
                    return true;
                }
                else if (((endYear - startYear) == 1) && ((endPeriod + 13) - startPeriod <= 3)) {
                    return true;
                }
            }            
        }

         return false;
    }    

});