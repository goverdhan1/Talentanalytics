'use strict';

/*
 * Updates the service line attribute items required for cascading
 */
angular.module('hcm-cascading').factory('HcmCascadingGetLineAttributeValuesService',
    function (HcmGetCascadingAttributeValuesService) {

        function getCascadingLineAttributeValues(data, functionKey, areaKey, selectedAttribute, savedData, attributeValues, isFunctionAttributeExcluded, isAreaAttributeExcluded) {
            var selectedValuesArray = savedData[selectedAttribute];
            var areaValuesSelected = savedData[areaKey] && savedData[areaKey].length;
            var functionValuesSelected = savedData[functionKey] && savedData[functionKey].length;

            angular.forEach(angular.fromJson(data), function (item) {

                if (isFunctionAttributeExcluded || isAreaAttributeExcluded) {
                    if (isFunctionAttributeExcluded) {
                        var dataValueNotExcludedForFunctionKey = savedData[functionKey].indexOf(item[functionKey]) == -1;
                        if (dataValueNotExcludedForFunctionKey) {
                            if (isAreaAttributeExcluded) {
                                //Filter item that is excluded from function and area selections both
                                if (savedData[areaKey] && savedData[areaKey].length && savedData[areaKey].indexOf(item[areaKey]) == -1) {
                                    HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                    removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                }
                                else {
                                    if (attributeValues.indexOf(item[functionKey]) == -1 && attributeValues.indexOf(item[areaKey]) == -1)
                                        removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                }
                            }
                            else if (!isAreaAttributeExcluded) {
                                if (areaValuesSelected) {
                                    if (savedData[areaKey].indexOf(item[areaKey]) > -1) {
                                        //Include every item that is excluded from function selections
                                        HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                        removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                        if (savedData[functionKey].indexOf(item[functionKey]) > -1 && savedData[areaKey])
                                            savedData[areaKey].splice(savedData[areaKey].indexOf(item[areaKey]), 1);
                                    }
                                }
                                else {
                                    HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                    removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                    if (savedData[functionKey].indexOf(item[functionKey]) > -1 && savedData[areaKey])
                                        savedData[areaKey].splice(savedData[areaKey].indexOf(item[areaKey]), 1);

                                }
                            }
                        }
                    }
                    else {
                        //Filter item that is excluded from area selections and included in function key selections
                        if (isAreaAttributeExcluded) {
                            if (savedData[areaKey].indexOf(item[areaKey]) == -1) {
                                if (functionValuesSelected) {
                                    if (savedData[functionKey].indexOf(item[functionKey]) > -1) {
                                        HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                        removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                    }
                                    else
                                        if (savedData[areaKey].indexOf(item[areaKey]) == -1 && savedData[selectedAttribute] && savedData[selectedAttribute].length) {
                                            savedData[selectedAttribute].splice(savedData[selectedAttribute].indexOf(item[selectedAttribute]), 1);
                                            removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                        }
                                }
                                else {
                                    HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                    removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                }
                            }
                        }
                    }
                }
                else if (!isFunctionAttributeExcluded && !isAreaAttributeExcluded) {
                    var dataNotExistForLine = !savedData[areaKey] || !savedData[areaKey].length;
                    if (dataNotExistForLine) {
                        var dataNotExistForFunctionKey = !savedData[functionKey] || !savedData[functionKey].length;
                        if (dataNotExistForFunctionKey) {
                            HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                            removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                        }
                        else {
                            // Add the items whose function key exists in the SavedData
                            angular.forEach(angular.fromJson(savedData[functionKey]), function (savedDataId) {
                                var itemMatchesWithSavedDataId = savedDataId === item[functionKey];
                                if (itemMatchesWithSavedDataId) {
                                    HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                    removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                                }
                            });
                        }
                    }
                    else {
                        angular.forEach(angular.fromJson(savedData[areaKey]), function (savedDataId) {
                            var dataExistForLine = savedDataId === item[areaKey] && (!savedData[functionKey] || !savedData[functionKey].length);
                            if (dataExistForLine) {
                                HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                            }
                            else if (savedDataId === item[areaKey] && savedData[functionKey].indexOf(item[functionKey]) != -1) {
                                HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                                removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray);
                            }
                        });
                    }
                }
            });
            if (selectedValuesArray && selectedValuesArray.length && selectedValuesArray.length > 0 )
                savedData[selectedAttribute] = savedData[selectedAttribute].filter(function (value) {
                    return selectedValuesArray.indexOf(value) < 0 && attributeValues.indexOf(value) < 0;
                });
        }
        function removeItemsFromSelectedValueArray(item, selectedAttribute, selectedValuesArray) {
            if (selectedValuesArray && selectedValuesArray.length && selectedValuesArray.indexOf(item[selectedAttribute]) > -1)
                selectedValuesArray.splice(selectedValuesArray.indexOf(item[selectedAttribute]), 1);
        }
        return {
            getCascadingLineAttributeValues: getCascadingLineAttributeValues
        }
    });