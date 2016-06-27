'use strict';
angular.module('headcountManagementFilter').directive("hcmEditSaveSelectedFilter",
    function ($q, hcmGetUserFiltersService, HeadcountManagementFilterAttributesService, HcmCascading,
              HeadcountManagementFilterPlainAttributeValuesService, HeadcountManagementFilterData, HeadcountManagementFilterPostService,
              HeadcountManagementFilterSelectedAttributeValues, HcmGetHierarchyService, hcmFilterValidationService,
              UserDetails, $modal, toaster, $timeout, HierarchyIncludeAll, HierarchyExcludeAll, ustageStatistics,
              HcmGetSelectionCountForAllNodes, HcmHierarchySetStatusForAllNodes, HcmGetRootHierarchyService, HcmHierarchyUpdateService,
              HcmGetHierarchyPostDataService, HcmCountHierarchySelectedValuesService, HcmHierarchySearch) {
        return {
            restrict: 'E',
            templateUrl: 'App/hcm-filter/views/hcm-editbutton-filter-view.html',
            scope: false,
            controller: function ($scope, $timeout) {
                $scope.deleterFilterFromDropDown = function ($event, filterName) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.deleteConfirmPop = true;
                    $scope.deleteCancel = function () {
                        $scope.deleteConfirmPop = false;
                    }
                    $scope.multiSave = false;
                    $scope.deleterFileterName = filterName;
                    $scope.deleteConfirm = function () {
                        $scope.deleteFilterName = filterName;
                        $scope.deleteConfirmPop = false;
                        HeadcountManagementFilterPostService.save({
                            USER_NAME: UserDetails.userId,
                            FILTER_NAME: filterName,
                            ATTRIBUTENAME_DATE: "",
                            ATTRIBUTE: "",
                            ATTRIBUTE_VALUE: "",
                            REPORTING_TYPE: "",
                            SELECTION_TYPE: "",
                            DELETE_FLAG: "Y",
                            REPORT_NAME: "",
                            CHART_SCALE: "",
                            NEW_FILTER_NAME: ""
                        }, function (data) {                            
                            hcmGetUserFiltersService.get(function (data) {
                                $scope.filsterList = data.results;
                                $scope.form = { selectedFilter: $scope.filsterList[0].FILTER_NAME };
                                $scope.selectedFilter = $scope.filsterList[0].FILTER_NAME;
                                var successMessage = "Successfully deleted the filter";
                                toaster.pop('success', successMessage);
                            }, function (err) {
                                var errMessage = "Get user filters service returned an error";
                                console.error(errMessage, err);
                                toaster.pop('error', errMessage);
                            });
                        }, function (err) {
                            // Tracking errorso
                            var errMessage = "Failed to delete filter";
                            console.error(errMessage, err);
                            toaster.pop('error', errMessage);
                        });
                    }
                }

                //$scope.selectedAttributeValues = {};

                $scope.handleToDateDirective = {};

                $scope.selectedAttribute = '';

                // Bind already saved filter in dropdown
                $scope.bindSavedFilter = function (setAsActive) {
                    hcmGetUserFiltersService.get(function (data) {
                        HeadcountManagementFilterData.filterList = data.results;
                        $scope.filsterList = HeadcountManagementFilterData.filterList;
                        if ($scope.form === undefined || setAsActive) {// First time load latest edited filter
                            var filterName = $scope.filsterList[0].FILTER_NAME;
                            //TODO move chart manipulation to separate file
                            if ($scope.setChartType) {
                                $scope.setChartType($scope.filsterList[0].CHART_TYPE);
                            }
                            $scope.form = { selectedFilter: filterName };
                            $scope.selectedFilter = filterName;
                        }
                    }, function (err) {
                        var errMessage = "Get user filters service returned an error";
                        console.error(errMessage, err);
                        toaster.pop('error', errMessage);
                    });
                }

                $scope.bindSavedFilter();                

                $scope.getPostData = function () {
                    return HcmGetHierarchyPostDataService.getPostData(HeadcountManagementFilterData, $scope.handleToDateDirective);                    
                }

                $scope.open = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'App/hcm-filter/views/hcm-selected-filter-view.html',
                        scope: $scope,
                        controller: function ($scope, $timeout, $modalInstance, ustageStatistics) {
                            $scope.openAttributeValueSearch = false;
                            ustageStatistics.analyticsValue("HM Summary- Edit Button|HM_Summary");
                            HcmGetHierarchyService.clearHierarchyData();
                            HcmGetRootHierarchyService.clearRootHierarchyData();
                            $scope.bindAttribute = function () {
                                $q.all([HeadcountManagementFilterAttributesService.get().$promise, HeadcountManagementFilterSelectedAttributeValues.setSavedAttributeValues(UserDetails.userId, $scope.form.selectedFilter)]).then(function (resultsArray) {
                                    $scope.attributes = resultsArray[0].results;                                    
                                    $scope.updateCountsAfterHierarchyNodeUpdates();
                                    $scope.handleToDateDirective.set();                                 
                                    
                                }, function (err) {
                                    // Tracking errors
                                    var errMessage = "Attribute filter service returned an error";
                                    console.error(errMessage, err);
                                    toaster.pop('error', errMessage);
                                });
                            }
                            

                            $scope.bindAttribute();

                            $scope.cancel = function () {
                                //$scope.$parent.bindSavedFilter();
                                //$scope.$parent.form = { selectedFilter: $scope.$parent.selectedFilter };
                                $scope.$parent.selectedFilter = $scope.$parent.form.selectedFilter;
                                $modalInstance.dismiss('cancel');
                            };

                            $scope.selectMatch1 = function (search_txt) {
                                $scope.searchAttributeValue(search_txt);
                            }

                            $scope.searchAttributeValue = function (search_txt) {
                                if ($scope.hierarchy == true) {
                                    if (search_txt.length > 0) {
                                        $scope.hierarchySearch = true;
                                        $scope.lowerCaseSearchKeyword = search_txt.toLowerCase();

                                        var hierarchyFilteredData = angular.copy($scope.hierarchyData);
                                        HcmHierarchySearch.hierarchySearchData(hierarchyFilteredData, $scope.lowerCaseSearchKeyword);
                                        $scope.tree = hierarchyFilteredData;
                                        hierarchyFilteredData = [];
                                    }
                                    else {
                                        $scope.hierarchySearch = false;
                                        $scope.tree = $scope.hierarchyData;
                                    }
                                }
                                else {
                                    $scope.flatData = [];
                                    $scope.nodeCounter = 0;
                                    $scope.filteredData = $scope.infiniteScrollData.filter(function (item) {
                                        if (item != null && item.name !== '' && item.name != null)
                                            return item.name.toUpperCase().indexOf(search_txt.toUpperCase()) != -1;
                                        else
                                            return false;
                                    });
                                    // After filter, rebind it again
                                    $scope.isScrollDown = $scope.loadMoreRecords(0);
                                }
                            }                            

                            $scope.excludeSearch = function () {
                                console.log('Cancelling search');
                                $scope.openAttributeValueSearch = false;
                                $scope.hierarchySearch = false;
                                if ($scope.hierarchy) {
                                    $scope.tree = $scope.hierarchyData;
                                    $scope.selectionCountForAllHierarchyNodes = HcmGetSelectionCountForAllNodes.getSelectionCountForAllNodes($scope.tree);
                                    console.log('$scope.selectionCountForAllHierarchyNodes', $scope.selectionCountForAllHierarchyNodes);
                                }
                                else {
                                    $scope.flatData = [];
                                    $scope.isScrollDown = $scope.loadMoreRecords(0);
                                }
                            }

                            $scope.openAttributeValueSearchTool = function () {
                                $scope.openAttributeValueSearch = true;
                                if ($scope.hierarchy) {
                                    $scope.hierarchSearchData = HcmGetHierarchyService.getHierarchySearch().results;
                                }
                            }

                            $scope.resultsPerPage = 5;
                            $scope.getHierarchySearchData = function (matchText) {
                                return HcmHierarchySearch.getHierarchySearchDataForPage(matchText, 0, $scope.resultsPerPage, $scope.hierarchSearchData);
                            };
                            $scope.getPage = function (matchText, pageNumber) {
                                return HcmHierarchySearch.getHierarchySearchDataForPage(matchText, pageNumber, $scope.resultsPerPage, $scope.hierarchSearchData);
                            };                            

                            $scope.postFilterData = function (callback) {
                                console.log('Going to save data');
                                var postData = $scope.getPostData();

                                var isHaveInvalidData = hcmFilterValidationService.validateAllData(postData.postAttribute, postData.dateData.SELECTION_TYPE);
                                if (isHaveInvalidData) {
                                    return;
                                }

                                $scope.doPost(UserDetails.userId, $scope.form.selectedFilter, postData.postAttribute, '', '', postData.dateData.REPORTING_TYPE,
                                              postData.dateData.SELECTION_TYPE, 'N', postData.dateData.REPORT_NAME, postData.dateData.CHART_SCALE, '',
                                  function (data) {
                                      hcmGetUserFiltersService.get(function (data) {
                                          HeadcountManagementFilterData.filterList = data.results;
                                          $scope.filsterList = data.results;

                                          for (var i = 0; i < $scope.filsterList.length; i++) {
                                              if ($scope.filsterList[i].FILTER_NAME == $scope.selectedFilter) {
                                                  $scope.selectedType = $scope.filsterList[i].SELECTION_TYPE;
                                              }
                                          }

                                          if ($scope.postFilterDataCallback) {
                                              $scope.postFilterDataCallback($scope.form.selectedFilter, $scope.selectedType);
                                          };
                                          if (callback) {
                                              callback();
                                          }
                                          

                                      }, function (err) {
                                          var errMessage = "Get user filters service returned an error";
                                          console.error(errMessage, err);
                                          toaster.pop('error', errMessage);
                                      });
                                  });

                                console.log('Going to close the dialog');
                                return true;
                            };

                            $scope.Apply = function () {
                                $scope.postFilterData(function () {
                                    $modalInstance.close();

                                    $(".modal-dialog").parents('body').css("overflow", "initial");
                                    $modalInstance.close();
                                });
                            };

                            $scope.init = function () {
                                $scope.flat = true;
                                $scope.hierarchy = false;
                                $scope.include = true;
                                $scope.exclude = false;
                                HeadcountManagementFilterData.selectedEmployeeFunction = [];
                            }

                            /// tab start actity
                            $scope.selecteTabDate = true;

                            $scope.selecteTab = false;

                            $scope.dateFilterSelect = function () {
                                $scope.selectedAttribute = 'date';
                                $scope.selecteTabDate = true;
                                $scope.selecteTab = false;
                            }

                            $scope.setExcludeData = function (setting) {
                                // Create new key for Exclude (Toggle button func)
                                var excludeSetKey = $scope.selectedAttribute + '_EXCLUDE';
                                HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] = {};
                                HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] = setting;
                                HcmCountHierarchySelectedValuesService.setSelectedAttributeValCount(HeadcountManagementFilterData, $scope);                                
                            }                            

                            $scope.infiniteScrollData = [];
                            $scope.isScrollDown = true;


                            $scope.loadMoreRecords = function (chunk) {

                                $scope.isScrollDown = true;
                                $scope.flatData = [];
                                var nodeCounter, chunksize;

                                if ($scope.openAttributeValueSearch) {
                                    if (!chunk) {
                                        if ($scope.filteredData.length <= 100) {
                                            nodeCounter = 0;
                                            chunksize = $scope.filteredData.length;
                                            $scope.isScrollDown = false;
                                        } else {
                                            nodeCounter = 0;
                                            chunksize = 100;
                                            $scope.isScrollDown = true;
                                        }
                                        for (nodeCounter; nodeCounter < chunksize; nodeCounter++) {
                                            $scope.flatData.push($scope.filteredData[nodeCounter]);
                                        }
                                    }

                                    if (chunk > 0) {

                                        if ($scope.isScrollDown && $scope.filteredData.length > (chunk + 1) * 100) {
                                            nodeCounter = chunk * 100;
                                            chunksize = nodeCounter + 100;
                                            $scope.isScrollDown = true;
                                        } else {
                                            nodeCounter = (chunk * 100) - 100;
                                            chunksize = $scope.filteredData.length;
                                            $scope.isScrollDown = false;
                                        }
                                        for (nodeCounter; nodeCounter < chunksize; nodeCounter++) {
                                            $scope.flatData.push($scope.filteredData[nodeCounter]);
                                        }
                                    }

                                } else {
                                    if (!chunk) {
                                        if ($scope.infiniteScrollData.length <= 100) {
                                            nodeCounter = 0;
                                            chunksize = $scope.infiniteScrollData.length;
                                            $scope.isScrollDown = false;
                                        } else {
                                            nodeCounter = 0;
                                            chunksize = 100;
                                            $scope.isScrollDown = true;
                                        }
                                        for (nodeCounter; nodeCounter < chunksize; nodeCounter++) {
                                            $scope.flatData.push($scope.infiniteScrollData[nodeCounter]);
                                        }
                                    }

                                    if (chunk > 0) {
                                        if ($scope.isScrollDown && $scope.infiniteScrollData.length > (chunk + 1) * 100) {
                                            nodeCounter = (chunk * 100);
                                            chunksize = nodeCounter + 100;
                                            $scope.isScrollDown = true;
                                        } else {
                                            nodeCounter = (chunk * 100)-100;
                                            chunksize = $scope.infiniteScrollData.length;
                                            $scope.isScrollDown = false;
                                        }
                                        for (nodeCounter; nodeCounter < chunksize; nodeCounter++) {
                                            $scope.flatData.push($scope.infiniteScrollData[nodeCounter]);
                                        }
                                    }

                                }
                                console.log("InfiniteScrollData Length: ", $scope.infiniteScrollData.length);
                                return $scope.isScrollDown;

                            };

                            $scope.bindTreeView = function (selectedRoot) {
                                $scope.rootId = selectedRoot;
                                HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute]['root_id']= {
                                };
                                HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute + '_root_id']= $scope.rootId;
                                HcmGetHierarchyService.getHierarchyData($scope.selectedAttribute, $scope.rootId, function (data) {
                                    $scope.hierarchyData = data.results;
                                    $scope.tree = $scope.hierarchyData;
                                    $scope.selectionCountForAllHierarchyNodes = HcmGetSelectionCountForAllNodes.getSelectionCountForAllNodes($scope.tree);
                                    console.log('$scope.selectionCountForAllHierarchyNodes', $scope.selectionCountForAllHierarchyNodes);
                                    //HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute].count = data.selectedAttributeValCount;
                                    $scope.updateCountsAfterHierarchyNodeUpdates();
                                    if ($scope.flat) {
                                        $scope.setFlatViewDisplay();
                                    }
                                }, function (err) {
                                    // Tracking errors
                                var errMessage = "Get hierarchy data returned an error";
                                console.error(errMessage, err);
                                toaster.pop('error', errMessage);
                                });
                            }
                            

                            $scope.bindAttributeValues = function (attribute) {
                                // Todo: Once again cross check the Attribute Values
                                // Todo: Function Hierarchy value is shown in Atribute List, make sure the case 'Function_HIER is corrent'
                                switch (attribute) {
                                    case 'PFUNCTION_CURR':
                                    case 'PHRSAREA_CURR':
                                    case 'PHRSLINE_CURR':
                                    case 'PFUNCTION':
                                    case 'PHRSAREA':
                                    case 'PHRSLINE':
                                         HcmCascading.getCascadingData(attribute, HeadcountManagementFilterData.selectedAttributeValues, function (d) {
     
                                             var cascadingSort = [];
                                             d.results.forEach(function (value) {
                                                 cascadingSort.push(value);
                                             });

                                             cascadingSort.sort(function (a, b) {
                                                 //return a.name.localeCompare(b.name);
                                                 if (a.name < b.name)
                                                     return -1;
                                                 if (a.name > b.name)
                                                     return 1;
                                                 return 0;

                                              })
                                             
                                             $scope.infiniteScrollData = cascadingSort;

                                            $scope.flatData = [];
                                            $scope.isScrollDown = $scope.loadMoreRecords(0);

                                            $scope.updateCountsAfterHierarchyNodeUpdates();
                                        });
                                        break;
                                    case 'MAST_CCTR_HIER':
                                    case 'PLEVEL_HIER':
                                    case 'PPMARKET_HIER':
                                    case 'PSMARKET_HIER':
                                    case 'ORGUNIT_HIER':
                                    case 'PFUNCTION_HIER':
                                    case 'PHRREGN_HIER':
                                    case 'AGE_GENERATION_HIER':
                                    case 'USI_FUNC_TXT_HIER':
                                        $scope.tree = [];
                                        HcmGetRootHierarchyService.getRootHierarchyData(attribute, function (data) {
                                            // Show selected Root node
                                            if (HeadcountManagementFilterData.selectedAttributeValues[attribute + '_root_id'] &&
                                                  HeadcountManagementFilterData.selectedAttributeValues[attribute + '_root_id'].length > 1) {
                                                var selectedRootNode = HeadcountManagementFilterData.selectedAttributeValues[attribute + '_root_id'];
                                                
                                                $scope.hierarchyRootNodeSelection.selectedValue = selectedRootNode;
                                                $scope.bindTreeView(selectedRootNode, $scope);
                                            }
                                            $scope.selectVals = data.results;

                                            // set default empty selected value
                                            if ($scope.hierarchyRootNodeSelection.selectedValue === undefined) {
                                                $scope.hierarchyRootNodeSelection.selectedValue = '';                                                
                                            }
                                                                                        
                                        });
                                        break;
                                    default:
                                            HeadcountManagementFilterPlainAttributeValuesService.getPlainAttributeValues(attribute, function (d) {
                                                $scope.infiniteScrollData = d.results;
                                                $scope.flatData = [];
                                                $scope.isScrollDown = $scope.loadMoreRecords(0);
                                            });
                                        break;
                                }
                            }                           

                            $scope.onAttributeClick = function (value, AtrLable, hierarchyFlag) {

                                console.log('onAttributeClick: AtrLable', AtrLable);
                                ustageStatistics.analyticsValue(AtrLable + "|HM_Filter_Selection");
                                if ($scope.selectedAttribute === value) {
                                    return;
                                }
                                $scope.infiniteScrollData = []
                                $scope.openAttributeValueSearch = false;
                                angular.element('.right-cnt-scroll').scrollTop(0);
                                $scope.chunk = 0;

                                $scope.flatData = {};
                                $scope.selectedAttribute = value;
                                $scope.truevalue = AtrLable;
                                $scope.selecteTab = true;
                                $scope.selecteTabDate = false;

                                $scope.isHierarchyAttribute = hierarchyFlag === 'Y';

                                //set display type based on whether it is a hierarchy attribute or normal attribute
                                $scope.flat = hierarchyFlag !== 'Y';
                                $scope.hierarchy = hierarchyFlag === 'Y';

                                $scope.hierarchySearch = false;
                                HcmCountHierarchySelectedValuesService.setSelectedAttributeValCount(HeadcountManagementFilterData, $scope);

                                // set Exclude/Include property
                                var excludeSetKey = $scope.selectedAttribute + '_EXCLUDE';
                                if (HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] === undefined || HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] === false) {
                                    $scope.include = true;
                                    $scope.exclude = false;
                                }
                                else {
                                    $scope.include = false;
                                    $scope.exclude = true;
                                }                                                           

                                // Bind selected attribute values (right side content)
                                $scope.bindAttributeValues(value);
                            }

                            //HcmHierarchyUpdateService.selHierarchyData = [];

                            /*$scope.deleteChildObject = function (nodeLevel, id) {
                                if (HcmHierarchyUpdateService.selHierarchyData[nodeLevel] !== undefined && HcmHierarchyUpdateService.selHierarchyData[nodeLevel][id] != undefined) {
                                    delete HcmHierarchyUpdateService.selHierarchyData[nodeLevel][id];
                                    if (jQuery.isEmptyObject(HcmHierarchyUpdateService.selHierarchyData[nodeLevel])) {
                                        var index = HcmHierarchyUpdateService.selHierarchyData.indexOf(nodeLevel);
                                        HcmHierarchyUpdateService.selHierarchyData.splice(index, 1);
                                    }
                                }
                            }*/


                            $scope.updateCountsAfterHierarchyNodeUpdates = function () {
                                HcmCountHierarchySelectedValuesService.updateCountsAfterHierarchyNodeUpdates(HeadcountManagementFilterData, $scope);
                            };

                            $scope.updateOnCheckOfNodeInFlatView = function (node) {
                                if ($scope.isHierarchyAttribute && $scope.flat) { //Update corresponding node in tree view. Use the tree view node to update status as it has the children data
                                    var correspondingNodeInTreeView = HcmGetHierarchyService.getCorrespondingNodeInTreeView($scope.tree, node.id);
                                    HcmGetHierarchyService.updateCorrespondingNodeAndChildrenForTreeView(correspondingNodeInTreeView, node.checked);
                                    $scope.updateSelectedValues(correspondingNodeInTreeView);
                                } else {
                                    $scope.updateSelectedValues(node);
                                }
                            };

                            $scope.updateSelectedValues = function (attributeValue, doNotCallUpdateCounts) {
                                var selAttr = $scope.selectedAttribute;
                                if ($scope.onHierarchyAttributeDisplay()) {
                                    $scope.selectionCountForAllHierarchyNodes = HcmHierarchyUpdateService.updateHierarchyVal(attributeValue, $scope.selectedAttribute, $scope.tree, $scope.hierarchy, $scope.hierarchyData, $scope.flatData, $scope.infiniteScrollData);
                                    console.log('$scope.selectionCountForAllHierarchyNodes', $scope.selectionCountForAllHierarchyNodes);
                                    if(!doNotCallUpdateCounts) {
                                        $scope.updateCountsAfterHierarchyNodeUpdates();
                                    }
                                    return;
                                }

                                // get current attribute data from memory
                                var curAttrData = HeadcountManagementFilterData.selectedAttributeValues[selAttr];
                                if (curAttrData == undefined || curAttrData.length == 0)
                                    curAttrData = [];

                                if (attributeValue.checked) {
                                    if (jQuery.inArray(attributeValue.id, curAttrData) === -1) {
                                        curAttrData.push(attributeValue.id);

                                        // Create new key for Exclude (Toggle button func)
                                        $scope.setExcludeData($scope.exclude);                                        
                                    }
                                }
                                else {
                                    var index = curAttrData.indexOf(attributeValue.id);
                                    curAttrData.splice(index, 1);
                                }
                                // set current attribute data to memory
                                HeadcountManagementFilterData.selectedAttributeValues[selAttr] = curAttrData

                                $scope.updateCountsAfterHierarchyNodeUpdates();

                                updateCascadingDataCount(selAttr);

                                console.log('%c ' + JSON.stringify(HeadcountManagementFilterData.selectedAttributeValues, null, '\t') + ' ', 'background: #fff; color: #FF0000');
                            }

                            $scope.hierarchyRootNodeSelection = {};

                            $scope.getselectVal = function (selectedValue) {
                                var selAttr = $scope.selectedAttribute;

                                // remove hierarchy data from cache while change root id
                                HcmGetHierarchyService.removeRootHierarchyData(HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute + '_root_id']);
                                HeadcountManagementFilterData.selectedAttributeValues[selAttr] = [];
                                $scope.updateCountsAfterHierarchyNodeUpdates();
                                $scope.hierarchySearch = false;
                                $scope.openAttributeValueSearch = false;
                                $scope.tree = [];

                                if (selectedValue === null) {
                                    var selectedRootNode = HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute + '_root_id'];

                                    if (selectedRootNode === undefined) {
                                        selectedRootNode = '';
                                    }
                                    $scope.hierarchyRootNodeSelection.selectedValue = selectedRootNode;
                                    $scope.bindTreeView(selectedRootNode, $scope);
                                }

                                else {
                                    HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute + '_root_id'] = {};
                                    HeadcountManagementFilterData.selectedAttributeValues[$scope.selectedAttribute + '_root_id'] = selectedValue;
                                    $scope.bindTreeView(selectedValue, $scope);
                                }
                            }

                            $scope.changeView = function (type) {
                                console.log('Changing view to ', type);
                                if ((type === 'hierarchy' && $scope.hierarchy) || (type === 'flat' && $scope.flat)) {
                                    return;
                                }
                                if ($scope.openAttributeValueSearch) {
                                    $scope.excludeSearch();
                                }
                                if (type === 'hierarchy') {
                                    $scope.hierarchy = true;
                                    $scope.flat = false;
                                    $scope.bindTreeView($scope.rootId, $scope);
                                }
                                else if (type === 'flat') {
                                    $scope.hierarchy = false;
                                    $scope.flat = true;

                                    if($scope.onHierarchyAttributeDisplay()){
                                        $scope.setFlatViewDisplay();
                                    }
                                }
                            }

                            $scope.onHierarchyAttributeDisplay = function(){
                                var hierarchyAttributeList = [
                                    'MAST_CCTR_HIER',
                                    'PLEVEL_HIER',
                                    'PPMARKET_HIER',
                                    'PSMARKET_HIER',
                                    'ORGUNIT_HIER',
                                    'PFUNCTION_HIER',
                                    'PHRREGN_HIER',
                                    'AGE_GENERATION_HIER',
                                    'USI_FUNC_TXT_HIER'
                                ];
                                return hierarchyAttributeList.indexOf($scope.selectedAttribute) >= 0;
                            };

                            $scope.setFlatViewDisplay = function () {
                                // from tree view to flat json.
                                HcmGetHierarchyService.getFlatViewData($scope.tree, function (data) {
                                    $scope.infiniteScrollData = data.results;
                                    $scope.nodeCounter = 0;
                                    $scope.flatData = [];
                                    angular.element('.right-cnt-scroll').scrollTop(0);
                                    $scope.flat = true;
                                    $scope.hierarchy = false;
                                    $scope.isScrollDown= $scope.loadMoreRecords(0);
                                }, function (err) {
                                    // Tracking errors
                                    var errMessage = "Get hierarchy service returned an error";
                                    console.error(errMessage, err);
                                    toaster.pop('error', errMessage);
                                });
                            };

                            $scope.changeStatus = function (type) {
                                if (type === 'include') {
                                    $scope.include = true;
                                    $scope.exclude = false;                                    
                                    $scope.setExcludeData(false);                                    
                                }
                                else if (type === 'exclude') {
                                    $scope.include = false;
                                    $scope.exclude = true;                                   
                                    $scope.setExcludeData(true);
                                }

                                updateCascadingDataCount($scope.selectedAttribute);
                            }

                            
                            $scope.saveFilter = function () {
                                $scope.postFilterData();
                            }

                            $scope.selectAll = function (checked) {
                                var data, selectedvalue;
                                var selAttr = $scope.selectedAttribute;

                                if ($scope.onHierarchyAttributeDisplay()) {
                                    HcmHierarchySetStatusForAllNodes.hierarchySetStatusForAllNodes($scope.tree, checked);
                                    angular.forEach($scope.tree, function (item) {
                                        $scope.selectionCountForAllHierarchyNodes = HcmHierarchyUpdateService.updateHierarchyVal(item, $scope.selectedAttribute, $scope.tree, $scope.hierarchy, $scope.hierarchyData, $scope.flatData, $scope.infiniteScrollData);
                                        console.log('$scope.selectionCountForAllHierarchyNodes', $scope.selectionCountForAllHierarchyNodes);
                                    });
                                }
                                else {
                                    data = $scope.infiniteScrollData;
                                    selectedvalue = [];

                                    angular.forEach(data, function (item) {
                                        item.checked = checked;
                                        selectedvalue.push(item.id);
                                    });

                                    $scope.infiniteScrollData = data;
                                    if (checked){
                                        HeadcountManagementFilterData.selectedAttributeValues[selAttr] = selectedvalue;
                                    } else {
                                        HeadcountManagementFilterData.selectedAttributeValues[selAttr] = [];
                                    }
                                }
                                $scope.updateCountsAfterHierarchyNodeUpdates();
                                updateCascadingDataCount(selAttr);
                                console.log('%c ' + JSON.stringify(HeadcountManagementFilterData.selectedAttributeValues, null, '\t') + ' ', 'background: #fff; color: #FF0000');

                            }

                            function updateCascadingDataCount(attribute) {
                                var attributes = getAttributesShouldBeUpdated(attribute);
                                angular.forEach(attributes, function (attribute) {
                                    HcmCascading.getCascadingData(attribute, HeadcountManagementFilterData.selectedAttributeValues, function () {
                                        $scope.updateCountsAfterHierarchyNodeUpdates();
                                    });
                                });
                            }

                            function getAttributesShouldBeUpdated(attribute) {
                                switch (attribute) {
                                    case 'PFUNCTION_CURR':
                                        return ['PHRSAREA_CURR', 'PHRSLINE_CURR'];
                                    case 'PHRSAREA_CURR':
                                        return ['PHRSLINE_CURR'];
                                    case 'PFUNCTION':
                                        return ['PHRSAREA', 'PHRSLINE'];
                                    case 'PHRSAREA':
                                        return ['PHRSLINE'];
                                    default:
                                        return [];
                                }
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        //this is called when the modal is closed.
                        $("body").removeClass("modal-open");
                    },
                        function () {
                        //this is called when the modal is dismissed.
                        $("body").removeClass("modal-open");
                    });
                    $("body").addClass("modal-open");                    
                }                

                $scope.doPost = function (userName, filterName, attribute, attributeValue, attributeNameDate, reportingType, selectionType, deleteFlag, reportName, chartScale, newFilterName, callback) {
                    $scope.multiSave = true;
                    var postData = {
                        USER_NAME: userName,
                        FILTER_NAME: filterName,
                        ATTRIBUTE: attribute,
                        ATTRIBUTE_VALUE: attributeValue,
                        ATTRIBUTENAME_DATE: attributeNameDate,
                        REPORTING_TYPE: reportingType,
                        SELECTION_TYPE: selectionType,
                        DELETE_FLAG: deleteFlag,
                        REPORT_NAME: reportName,
                        CHART_SCALE: chartScale.replace('CD-',''),
                        NEW_FILTER_NAME: newFilterName,
                        LAST_USED_FLAG: 'Y',
                        CHART_TYPE: $scope.lineChartHandler.lineChart ? 'Line' : 'Bar'
                    };
                   
                    postData = HcmGetHierarchyPostDataService.fillPostDataOfValidHierarchyData(postData);

                    HeadcountManagementFilterPostService.save(postData, function (data) {
                        var successMessage = "Successfully saved the filter";
                        toaster.pop('success', successMessage);
                        callback(data);
                        $scope.multiSave = false;
                    }, function (err) {
                        $scope.multiSave = false;
                        // Tracking errors
                        if (err && err.data && err.data.error && err.data.error.innererror && err.data.error.innererror.errordetail
                                && err.data.error.innererror.errordetail.STATUS_MESSAGE
                                && err.data.error.innererror.errordetail.STATUS_MESSAGE.indexOf("unique constraint violated") === 0) {
                            var errMessage = "Filter name already exists";
                            console.error(errMessage, err);
                            toaster.pop('warning', errMessage);
                        }
                        else {
                            var errMessage = "An error occured while saving the filter";
                            console.error(errMessage, err);
                            toaster.pop('error', errMessage);
                        }
                    });
                }

                //Modal Show/Hide
                $scope.openSaveAs = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'App/hcm-filter/views/hcm-savefilter-view.html',
                        scope: $scope,
                        controller: 'hcmSavefilterModalController'
                    });
                }

                $scope.editFilterName = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'App/hcm-filter/views/hcm-editfilter-name-view.html',
                        scope: $scope,
                        controller: 'HcmEditfilterNameModalController'
                })
                } 
            },
            link: function (scope, element, attrs) {
            },
            replace: true
        }
    });