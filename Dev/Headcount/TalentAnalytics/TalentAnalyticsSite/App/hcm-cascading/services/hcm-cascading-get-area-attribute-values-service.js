'use strict';

/*
 * Updates the service area attribute items required for cascading
 */
angular.module('hcm-cascading').factory('HcmCascadingGetAreaAttributeValuesService',
    function (HcmGetCascadingAttributeValuesService) {
        function getCascadingAreaAttributeValues(data, functionKey, selectedAttribute, savedData, attributeValues, isFunctionAttributeExcluded) {
            var selectedValuesArray = savedData[selectedAttribute];
            angular.forEach(angular.fromJson(data), function (item) {

                if (isFunctionAttributeExcluded) {
                    //select the values that are not excluded for the attributes
                    var excludeSelectedAttributeAreaValues = savedData[functionKey] && savedData[functionKey].length > 0 && savedData[functionKey].indexOf(item[functionKey]) == -1;
                    if (excludeSelectedAttributeAreaValues) {
                        HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                    }
                }
                else {
                    var dataNotExistForArea = savedData[functionKey] && savedData[functionKey].length > 0;
                    if (dataNotExistForArea) {
                        angular.forEach(angular.fromJson(savedData[functionKey]), function (savedDatatId) {
                            if (savedDatatId === item[functionKey]) {
                                HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                            }
                        });
                    }
                    else {
                        HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                        removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                    }
                }
            });
            if (selectedValuesArray && selectedValuesArray.length && selectedValuesArray.length > 0)
                savedData[selectedAttribute] = savedData[selectedAttribute].filter(function (value) {
                    return selectedValuesArray.indexOf(value) < 0;
                });
        }
        function removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray) {
            if (selectedValuesArray && selectedValuesArray.length && selectedValuesArray.indexOf(item[selectedAttribute]) > -1)
                selectedValuesArray.splice(selectedValuesArray.indexOf(item[selectedAttribute]), 1);
        }

        return {
            getCascadingAreaAttributeValues: getCascadingAreaAttributeValues
        }
    });
