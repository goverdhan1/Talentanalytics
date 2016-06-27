'use strict';

angular.module('hcm-hierarchy').factory('HcmCountHierarchySelectedValuesService', function () {
    // To show selected attribute value count in left section
    function setSelectedAttributeValCount(HeadcountManagementFilterData, $scope) {
        try {
            var selectedlAttrVal = HeadcountManagementFilterData.selectedAttributeValues;

            angular.forEach(selectedlAttrVal, function (selectedItems, attributeName) {
                var matchingAttribute = $scope.attributes.filter(function (match) {
                    return match.ATTRIBUTE_NAME === attributeName;
                });

                var excludeSetKey = attributeName + '_EXCLUDE';

                if (selectedItems.length === 0 && matchingAttribute[0] !== undefined) {
                    matchingAttribute[0]['selectedCount'] = '';
                }

                if (matchingAttribute && matchingAttribute.length) {
                    if (selectedlAttrVal[excludeSetKey] !== undefined && selectedlAttrVal[excludeSetKey] && selectedItems.length > 0) {
                        matchingAttribute[0]['selectedCount'] = 'Excl ' + selectedItems.length + " item";
                    }
                    else if (selectedItems.length > 0) {
                        matchingAttribute[0]['selectedCount'] = selectedItems.length + " item";
                    }
                    else if (selectedItems.count != undefined) {
                        if (selectedlAttrVal[excludeSetKey] !== undefined && selectedlAttrVal[excludeSetKey] && selectedItems.count > 0) {
                            matchingAttribute[0]['selectedCount'] = 'Excl ' + selectedItems.count + " item";
                        }
                        else {
                            matchingAttribute[0]['selectedCount'] = selectedItems.count > 0 ? selectedItems.count + " item" : '';
                        }

                    }
                }
            });
        } catch (e) {
        }
    }

    // To show filter count on top left corner of the pop up window
    function setFilterCount(HeadcountManagementFilterData, $scope) {        
        var filterCount = 0;
        angular.forEach(HeadcountManagementFilterData.selectedAttributeValues, function (attributeValue, attribute) {
            try {
                if (attributeValue) {
                    if (attributeValue.TYPE_OF_FILTER === "DATE") {
                        if (attributeValue.CHART_SCALE.indexOf('YOY') >= 0)
                            attributeValue.CHART_SCALE = attributeValue.CHART_SCALE.replace('YOY', 'YoY');
                        else
                            if (attributeValue.CHART_SCALE.indexOf('-') == -1)
                                attributeValue.CHART_SCALE = 'CD-' + attributeValue.CHART_SCALE;

                        $scope.selectedRadioValues = attributeValue.CHART_SCALE;
                    }
                    var isHierarchyWithSelectedValues = attributeValue.count && attributeValue.count > 0;
                    var isArrayWithSomeElements = angular.isArray(attributeValue) && attributeValue.length > 0;
                    if (isHierarchyWithSelectedValues || isArrayWithSomeElements) {
                        filterCount++;
                    }
                }
            } catch (e) {
                console.log('Error occurred ', e);
            }
        });

        $scope.filterCount = filterCount;
    }

    function updateCountsAfterHierarchyNodeUpdates(HeadcountManagementFilterData, $scope){
        setFilterCount(HeadcountManagementFilterData, $scope);
        setSelectedAttributeValCount(HeadcountManagementFilterData, $scope);
    }

    return {
        setSelectedAttributeValCount: setSelectedAttributeValCount,
        setFilterCount: setFilterCount,
        updateCountsAfterHierarchyNodeUpdates: updateCountsAfterHierarchyNodeUpdates
    }
});