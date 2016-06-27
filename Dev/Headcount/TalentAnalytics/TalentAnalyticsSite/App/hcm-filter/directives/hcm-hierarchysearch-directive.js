'use strict';
angular.module('headcountManagementFilter').directive("hcmHierarchySearch",
    function (HcmGetHierarchy,toaster, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'App/hcm-filter/views/hcm-hierarchy-search-view.html',
            scope: false,
            controller: function ($scope, $timeout) {

                $scope.openAttributeValueSearchTool = function () {
                    $scope.openAttributeValueSearch = true;
                    var hierarchSearchData = HcmGetHierarchy.getHierarchySearch();
                    $scope.hierarchSearchData = hierarchSearchData.results;
                }
                $scope.excludeSearch = function () {
                    $scope.openAttributeValueSearch = false;
                    $scope.hierarchySearch = false;
                    if ($scope.hierarchy) {
                        $scope.tree = $scope.hierarchyData;
                    }
                    else {
                        $scope.loadMoreRecords();
                    }
                }
                $scope.resultsPerPage = 5;
                $scope.getHierarchySearchData = function (matchText) {
                    return $scope.getHierarchySearchDataForPage(matchText, 0);
                };
                $scope.getPage = function (matchText, pageNumber) {
                    return $scope.getHierarchySearchDataForPage(matchText, pageNumber);
                };
                $scope.getHierarchySearchDataForPage = function (matchText, pageNumber) {
                    return $timeout(function () {
                        var results = [];
                        if ($scope.resultsPerPage && matchText && matchText.length && $scope.hierarchSearchData && $scope.hierarchSearchData.length) {
                            var initialValue = 0;
                            if ($scope.resultsPerPage) {
                                initialValue = $scope.resultsPerPage * pageNumber;
                            }
                            for (var ctr = initialValue; ctr < $scope.hierarchSearchData.length; ctr++) {
                                var matchWithObject = $scope.hierarchSearchData[ctr];
                                if (matchWithObject) {
                                    var matchWithName = matchWithObject.CHILD_TEXT;
                                    if (matchWithName) {
                                        if (matchWithName.toLowerCase().indexOf(matchText.toLowerCase()) >= 0) {
                                            results.push(matchWithObject);
                                            if (results.length > $scope.resultsPerPage) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return results;
                    }, 10);
                };

            },

            link: function (scope, element, attrs) {
            },
            replace: true
        }
    });