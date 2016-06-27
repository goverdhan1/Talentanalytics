'use strict';

angular.module('detailedViewDataTable').controller('DetailedViewDataTableController', ['$scope', '$stateParams', 'DetailedViewActivityHistoryService',
    'DetailedViewJobHistoryService', 'DetailedViewBasicInfoService', 'DetailedViewRatingHistoryService', 'DetailedViewCertificationService',
    'DetailedViewEducationDetailsService', 'DetailedViewFWAHistoryService', 'UserPersonalizationService', 'DetailedViewCompensationHistoryService', 'DetailedViewLOAHistoryService', 'DetailedViewCPAExamScoresService', 'CoreConstants', 'toaster', 'UserDetails', 'ExportData', '$q',

function ($scope, $stateParams, DetailedViewActivityHistoryService, DetailedViewJobHistoryService, DetailedViewBasicInfoService,
    DetailedViewRatingHistoryService, DetailedViewCertificationService, DetailedViewEducationDetailsService, DetailedViewFWAHistoryService,
    UserPersonalizationService, DetailedViewCompensationHistoryService, DetailedViewLOAHistoryService, DetailedViewCPAExamScoresService, CoreConstants, toaster, UserDetails, ExportData, $q) {

    $scope.setEmployeeId = function () {
        if (!$stateParams.employeeId) {
            toaster.pop('error', "Missing Employee Id");
            return false;
        }
        $scope.employeeId = $stateParams.employeeId;
        return true;
    };

    $scope.$on('customizeTableChanged', function (event, data) {
        $scope.loadDataDetailViewDataTable();
    });

    $scope.loadDataDetailViewDataTable = function () {

        $scope.detailedViewNoDataFound = false;
        $scope.noColumnsSelected = false;
        if (!$scope.setEmployeeId())
            return; 
        
        if (!$scope.serviceName) {
            console.error('Configuration error. Service name not set. Cannot call the UserPersonalization Service.');
            return;
        }

        if (!UserDetails.userId) {
            console.error('Configuration error. Logged in UserId missing. Cannot call the UserPersonalization Service.');
            return;
        }

        var getService = $scope.getServiceHandle();

        $q.all([UserPersonalizationService.get({ userName: UserDetails.userId, serviceName: $scope.serviceName, employeeId: $stateParams.employeeId }).$promise,
                                getService.get({
                                    employeeId: $scope.employeeId,
                                    defaultSort: $scope.defaultSort
                                }).$promise])
                                .then(function(resultsArray){
                                    var userColumns = resultsArray[0];
                                    var data = resultsArray[1];
                                    $scope.availableAndSelectedColumns = userColumns;
                                    var displayColumns = [];
                                    if (userColumns && userColumns.d && userColumns.d.results) {
                                        if ($scope.serviceName === 'COMPENSATION HISTORY DETAIL') {
                                            userColumns.d.results = userColumns.d.results.filter(function (item) {
                                                return CoreConstants.detailedViewHiddenColumns.indexOf(item.FIELD_NAME) < 0;
                                            });
                                        }
                                        userColumns.d.results.forEach(function (field) {
                                            if (field.CHECKED === 'true') {
                                                displayColumns.push(field);
                                            }
                                        });
                                    }

                                    displayColumns.sort(function (a, b) {
                                        return a.FIELD_ORDER - b.FIELD_ORDER;
                                    });

                                    $scope.displayColumns = displayColumns;
                                    $scope.noColumnsSelected = displayColumns.length <= 0;
                                    if (displayColumns && displayColumns.length > 0) {

                                        if (!getService) {
                                            return;
                                        }

                                        if (!data || !data.d || !data.d.results) {
                                            console.error('Invalid data format returned from the get data service for detail view');
                                            return;
                                        }
                        
                                        $scope.filters = data.filters;
                                        $scope.detailedViewdata = data.d.results;
                                        $scope.detailedViewNoDataFound = data.d.results <= 0;                         

                                        /***START- Set data to ExportData obj. ***/

                                        // For detail view tabs.
                                        if (ExportData.filename == null) {
                                            ExportData.filename = 'Employee Quickview Detail - ' + $scope.viewName;
                                        }

                                        ExportData.page = $scope.viewType;
                                        ExportData.showHeaderInfo = true;

                                        // Bind data based on page.
                                        var section = {};                        
                                        section.header = angular.copy(displayColumns);
                                        section.filters = angular.copy(data.filters);
                                        section.data = angular.copy(data.d.results);                       
                                        section.data.sort(function (a, b) { return b[$scope.defaultSort] - a[$scope.defaultSort]; });

                                        section.title = $scope.viewName;
                                        section.display_order = $scope.getDisplayOrder($scope.report);

                                        var sectionExists = false;
                                        if (ExportData.sections) {
                                            for (var ctr = 0; ctr < ExportData.sections.length; ctr++) {
                                                var existingSection = ExportData.sections[ctr];
                                                if (existingSection.title === section.title) {
                                                    sectionExists = true;
                                                    ExportData.sections[ctr] = section; //replace existing
                                                }
                                            }
                                        }
                                          
                                        if (!sectionExists) {
                                            if (ExportData.sections === undefined || ExportData.sections === null) {
                                                ExportData.sections = [];
                                            }
                                            ExportData.sections.push(section);
                                        }
                                        /***END- Set data to ExportData obj. ***/

                                    };
                              
                                    var defaultSort = $scope.defaultSort;
                                    if(!defaultSort && displayColumns && displayColumns.length > 0){
                                        defaultSort = displayColumns[0];
                                    }
                                    $scope.sort = {
                                        active: defaultSort,
                                        descending: true
                                    }

                                    $scope.changeSorting = function (col) {
                                        var column = col.FIELD_NAME;
                                        var sort = $scope.sort;

                                        if (sort.active === column) {
                                            sort.descending = !sort.descending;
                                        } else {
                                            sort.active = column;
                                            sort.descending = !sort.descending;
                                        }
                                    };

                                    $scope.getIcon = function (column) {
                    
                                        var sort = $scope.sort;
                                        if (!column || !sort) {
                                            return;
                                        }
                                        var compareWith = sort.active;
                                        if (compareWith.FIELD_NAME) {
                                            compareWith = compareWith.FIELD_NAME;
                                        }
                                        if (compareWith === column.FIELD_NAME) {
                                            return sort.descending
                                              ? 'fa fa-sort-down'
                                              :'fa fa-sort-up' ;
                                        }

                                        return 'fa fa-sort';
                                    }
                                
                
            }, function (err) {
                console.error('The following error occured on trying to retrieve the detail view information: ');
                console.log(err);
                toaster.pop('error', "Detail View service returned an error");
            });       

    };

    $scope.getDisplayOrder = function (reportName) {
        if (ExportData.consolidatedViewReportOrder && reportName) {
            for (var ctr = 0; ctr < ExportData.consolidatedViewReportOrder.length; ctr++) {
                var report = ExportData.consolidatedViewReportOrder[ctr];
                if (report.REPORT_NAME === reportName) {
                    return report.REPORT_ORDER;
                }
            }
        }
        return 1;
    };

    $scope.getServiceHandle = function () {
        switch ($scope.getDataService) {
            case "DetailedViewActivityHistoryService":
                return DetailedViewActivityHistoryService;
            case "DetailedViewJobHistoryService":
                return DetailedViewJobHistoryService;
            case "DetailedViewCertificationService":
                return DetailedViewCertificationService;
            case "DetailedViewBasicInfoService":
                return DetailedViewBasicInfoService;
            case "DetailedViewEducationDetailsService":
                return DetailedViewEducationDetailsService;
            case "DetailedViewRatingHistoryService":
                return DetailedViewRatingHistoryService;
            case "DetailedViewCompensationHistoryService":
                return DetailedViewCompensationHistoryService;
            case "DetailedViewFWAHistoryService":
                return DetailedViewFWAHistoryService;
            case "DetailedViewLOAHistoryService":
                return DetailedViewLOAHistoryService;
            case "DetailedViewCPAExamScoresService":
                return DetailedViewCPAExamScoresService;
            default:
                console.log('No get service available for the given name');
        }
    }
}]);
