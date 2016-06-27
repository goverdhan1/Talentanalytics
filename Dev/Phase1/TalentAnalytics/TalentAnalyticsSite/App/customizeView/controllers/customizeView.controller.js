'use strict';
angular.module('customizeView').controller('CustomizeViewController', ['$scope', '$stateParams', 'UserPersonalizationService', 'SummaryEditViewPostService', 'ConsolidatedLayoutService', 'ConsolidatedViewPostService', 'consolidatedViewMappingModel', 'CoreConstants', '$modal', 'UserDetails', '$window','ExportData',
        function ($scope, $stateParams, UserPersonalizationService, SummaryEditViewPostService, ConsolidatedLayoutService, ConsolidatedViewPostService, consolidatedViewMappingModel, CoreConstants, $modal, UserDetails, $window,ExportData) {
            $scope.sortViewModel = [];
            $scope.customizeViewModel = [];
            //Load all the data for Customize Table
            $scope.loadDataCustomizeView = function () {
                //Get the data for all the available columns
                $scope.getAllFields();
            };
            $scope.getAllFields = function () {
                //Get the data for all the available columns
                $scope.getAllCustomizeData();
                
            }
            $scope.buildSortViewModel = function () {
                var count = 0;
                $scope.sortViewModel = [];
                angular.forEach($scope.customizeViewModel, function (key, value) {
                    if (key.CHECKED) {
                        $scope.sortViewModel.push(key);
                        count++;
                    }
                });
                //Sort the selected fields as per the field order
                $scope.originalSortModel = $scope.sortViewModel.sort(function (a, b) {
                    return a.FIELD_ORDER - b.FIELD_ORDER;
                });
            }
            $scope.getAllCustomizeData = function () {
                //Model data for all the table columns and this is also used for left side check boxes
                $scope.customizeViewModel = [];
                if ($scope.viewType == "detailedView") {
                    UserPersonalizationService.get({
                        userName: UserDetails.userId,
                        serviceName: $scope.viewName,
                        employeeId: $stateParams.employeeId
                    }, function (data) {
                        
                        if (data.d && data.d.results) {

                            if ($scope.viewName === 'COMPENSATION HISTORY DETAIL') {
                                data.d.results = data.d.results.filter(function (item) {
                                    return CoreConstants.detailedViewHiddenColumns.indexOf(item.FIELD_NAME) < 0;
                                });
                            }

                            //Iterate through the servicce response and assign to the model
                            angular.forEach(data.d.results, function (key, value) {
                                //As "CHECKED" field in the json response is string type, so the string comparison and converting it to boolean
                                if (key.CHECKED === 'true') {
                                    key.CHECKED = true;
                                }
                                else {
                                    key.CHECKED = false;
                                }
                                $scope.customizeViewModel.push(key);
                            });
                        }
                        //Model used for right side fields i.e, selected fields
                        $scope.buildSortViewModel();
                        var count = 0;
                    }, function (err) {
                        console.error('Error occured while trying to fetch information from Detailed View Service is as follows: ' + err);
                    });
                }
                else if ($scope.viewType == 'consolidatedView' || $scope.viewType == 'consolidatedRedirect') {
                    $scope.customizeViewModel = [];
                    $scope.getConsolidatedDirectives();
                }
            }
            $scope.getConsolidatedDirectives = function () {
                $scope.allSections = [];
                $scope.visibleSections = [];
                //Get the data for all the available columns
                ConsolidatedLayoutService.get({
                    userName: UserDetails.userId,
                    employeeId: $stateParams.employeeId
                }, function (data) {
                    $scope.allSections = [];
                    //Model data for all Visible sections in the consolidated view
                    if (data && data.d && data.d.results) {
                        angular.forEach(data.d.results, function (key, value) {
                            $scope.allSections.push(key);
                            if (key.REPORT_ORDER && key.REPORT_ORDER > 0) {
                                $scope.visibleSections.push(key);
                            }
                        });
                        $scope.buildConsolidatedCustomizeData();
                        $scope.visibleSections.sort(function (a, b) {
                            return a.REPORT_ORDER - b.REPORT_ORDER;
                        });
                        $scope.customizeViewModel = $scope.customizeTable;
                        $scope.buildSortViewModel();
                    }

                }, function (err) {
                    console.error('Error occured while trying to fetch information from Consolidated View Service is as follows: ' + err);
                });
            }
            $scope.buildConsolidatedCustomizeData = function () {
                $scope.customizeTable = [];
                angular.forEach($scope.allSections, function (key, value) {
                    var customizeItem = {};
                    customizeItem.CHECKED = (key.CHECKED == "true" || key.CHECKED == true) ? true : false;
                    customizeItem.FIELD_NAME = key.REPORT_NAME;
                    customizeItem.FIELD_ORDER = key.REPORT_ORDER;
                    angular.forEach(consolidatedViewMappingModel.mappingArray, function (item, value) {
                        if (key.REPORT_NAME === item.FIELD_NAME) {
                            customizeItem.FIELD_LABEL = item.FIELD_LABEL;
                        }
                    });
                    $scope.customizeTable.push(customizeItem);
                });
              
            }
            //method for updating the sort view model when user selects or unselects the check boxes
            $scope.updateDisplayFields = function (sortModel, showHideflag) {
                var sortViewModel = [];
                sortViewModel = $scope.sortViewModel.slice();
                //Loop through the complete columns and re-build the sort array after check or uncheck happens
                if (!showHideflag) {
                    angular.forEach(sortViewModel, function (key, value) {
                        if (key.FIELD_NAME && sortModel.FIELD_NAME === key.FIELD_NAME) {
                            sortViewModel.splice(sortViewModel.indexOf(key),1);
                        }

                    });
                }
                else {
                    sortViewModel.push(sortModel);
                }
                sortViewModel = $scope.setFieldOrder(sortViewModel);
                sortViewModel.sort(function (a, b) {
                    return a.FIELD_ORDER - b.FIELD_ORDER;
                });
                $scope.sortViewModel = sortViewModel;
            }
            //Method for updating the selected fields and their display order
            $scope.applySortOrder = function () {
                var displayFieldCount = 0;
                var selectedFields = '';
                //Loop through the sort view model and build the string of fields for saving their sort order
                angular.forEach($scope.sortViewModel, function (key, value) {
                    if (key.FIELD_NAME) {
                        if (key.FIELD_ORDER) {
                            key.FIELD_ORDER = displayFieldCount + 1;
                            if (displayFieldCount === 0) {
                                selectedFields = key.FIELD_NAME;
                            }
                            else {
                                //Concatinating fields into single string in the order of sort by the user
                                selectedFields = selectedFields +','+key.FIELD_NAME;
                            }
                            displayFieldCount++;
                        }
                        else {
                            key.FIELD_ORDER = 0;
                        }
                    }

                });
                //resetting the counter to zero
                displayFieldCount = 0;
               
                $scope.originalSortModel = $scope.sortViewModel;

                $scope.saveCustomizeData(selectedFields);
            }
            $scope.setFieldOrder = function (sortArray) {
                var arrayCount = 0;
                angular.forEach(sortArray, function (key, value) {
                    key.FIELD_ORDER = arrayCount + 1;
                    arrayCount++;
                });
                return sortArray;
            }
            $scope.saveCustomizeData = function (selectedFields) {
                if ($scope.viewType == 'detailedView') {
                    saveDetailedViewPreferences(UserDetails.userId, $scope.viewName, selectedFields);
                }
                else if ($scope.viewType == 'consolidatedView' || $scope.viewType == 'consolidatedRedirect') {
                    saveConsolidatedViewPreferences(UserDetails.userId, selectedFields);
                }
            }
            var saveDetailedViewPreferences = function (userId, viewName, selectedFields) {
                //Calling the post service and passing the field names in the order of sort
                //Using the edit view service as this can be reused for all the post scenarios
                SummaryEditViewPostService.save({
                    USER_NAME: userId,
                    SERVICE_NAME: viewName,
                    FIELD_NAME: selectedFields,
                    //Service expects the field order should always be 1
                    FIELD_ORDER: 1
                }, function (data) {
                    //Notify the parent that the fields are changed
                    $scope.$emit('customizeTableChanged', selectedFields);
                }, function (err) {
                    console.log('Failed to post the data to the server due to the eror ' + err);
                });
            }
            var saveConsolidatedViewPreferences = function (userId, selectedFields) {
                //Calling the post service and passing the field names in the order of sort
                //Using the edit view service as this can be reused for all the post scenarios
                ConsolidatedViewPostService.save({
                    USER_NAME: userId,
                    REPORT_NAME: selectedFields,
                }, function (data) {
                    //Notify the parent that the fields are changed
                    $scope.$emit('consolidatedViewChanged', selectedFields);
                    if ($scope.viewType == 'consolidatedRedirect') {
                        $window.location.href = '#!/consolidatedView/' + $stateParams.employeeId;
                    }
                }, function (err) {
                    console.log('Failed to post the data to the server due to the eror ' + err);
                });
            }
            //Modal Show/Hide
            $scope.open = function () {
                var modalInstance = $modal.open({
                    templateUrl: '../../App/customizeView/views/customizeView.html',
                    backdrop: 'static',
                    keyboard: false,
                    scope: $scope,
                    controller: function ($scope, $modalInstance) {
                        
                        $scope.cancel = function () {
                            $("body").removeClass("modal-open")
                            $modalInstance.dismiss('cancel');
                        };
                        $scope.Apply = function () {
                            $scope.applySortOrder();
                            $("body").removeClass("modal-open");
                            $(".modal-dialog").parents('body').css("overflow", "initial");
                            $modalInstance.close();
                        };
                    }
                });
                $("body").addClass("modal-open");
            }
            
        }]);
