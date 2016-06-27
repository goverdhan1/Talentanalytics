'use strict';

angular.module('headcountManagementFilter').directive("hcmPaypctFilter", function (HeadcountManagementFilterData, hcmFilterValidationService) {
    return {
        restrict: 'E',
        templateUrl: 'App/hcm-filter/views/hcm-paypct-filter-view.html',
        scope: {},
        controller: function ($scope) {
            if (!HeadcountManagementFilterData.selectedAttributeValues.PAYPCT) {
                HeadcountManagementFilterData.selectedAttributeValues.PAYPCT = []
            }
           
            Object.defineProperties($scope, {
                to: {
                    get: function () {
                        var to = HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[1];
                        if (to || to === 0) {
                            return to;
                        } else {
                            return;
                        }
                    },
                    set: function (newVal) {
                        if (newVal || newVal === 0) {
                            HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[1] = newVal;
                        } else {
                            if (!HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[0]) {
                                HeadcountManagementFilterData.selectedAttributeValues.PAYPCT.splice(0, 2);
                            } else {
                                HeadcountManagementFilterData.selectedAttributeValues.PAYPCT.splice(1, 1);
                            }   
                        }
                    }
                },

                from: {
                    get: function () {
                        var from = HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[0];
                        if (from || from === 0) {
                            return from;
                        } else {
                            return;
                        }
                    },
                    set: function (newVal) {
                        if (newVal || newVal === 0) {
                            HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[0] = newVal;
                        } else {
                            if (!HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[1]) {
                                HeadcountManagementFilterData.selectedAttributeValues.PAYPCT.splice(0, 2);
                            } else {
                                delete HeadcountManagementFilterData.selectedAttributeValues.PAYPCT[0];
                            }                            
                        }
                    }
                },
                'showErrorMessage': {
                    get: function () {
                        return  hcmFilterValidationService.validateFTEFilter($scope.from, $scope.to);
                    }
                }
            });
        },
        link: function (scope, element, attrs) {
            scope.updateAttributesValues = function () {
                if (scope.from != "" && scope.from > 0 && (scope.to != undefined ? scope.from < scope.to : scope.from)) {
                    scope.$parent.$parent.updateCountsAfterHierarchyNodeUpdates();
                }
            };
        }

    }
});