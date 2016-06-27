'use strict';
angular.module('headcountManagementFilter').directive('dropdownOptions', function (UserDetails, HeadcountManagementFilterPostService, hcmGetUserFiltersService, toaster, ustageStatistics, HeadcountManagementFilterData) {
    return {
        restrict: 'A',
        transclude: true,
        link: function (scope, element, attrs, analyticsValue) {
            scope.selectItem = function (option, chartType) {
                hcmGetUserFiltersService.getCached(function (data) {
                    HeadcountManagementFilterData.filterList = scope.filsterList = data.results;
                }, function (err) {
                    var errMessage = "Get user filters service returned an error";
                    console.error(errMessage, err);
                    toaster.pop('error', errMessage);
                });
                /*if (scope.setChartType) {
                    scope.setChartType(chartType);
                };*/

                ustageStatistics.analyticsValue("HM Summary- Filter-"+ option + "|HM_Summary");
               
                scope.selectedFilter = option;
                scope.form.selectedFilter = option;
                scope.showList = false;
                scope.overlay = false;                
                var data = {
                    "USER_NAME": UserDetails.userId,
                    "FILTER_NAME": option,
                    "ATTRIBUTENAME_DATE": "",
                    "ATTRIBUTE_VALUE": "",
                    "DELETE_FLAG": "N",
                    "LAST_USED_FLAG": "Y",
                    "CHART_TYPE": chartType
                };

                HeadcountManagementFilterPostService.save(data, function (response) {
                    return
                }, function (err) {
                    // Tracking errors
                    var errMessage = "Save last used filter and chart type returned an error";
                    console.error(errMessage, err);
                    toaster.pop('error', errMessage);
                });

            }
        }
    }
});