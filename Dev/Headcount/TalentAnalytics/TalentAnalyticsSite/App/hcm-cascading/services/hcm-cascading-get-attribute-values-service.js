'use strict';

/*
 * Updates the attribute items required for cascading
 */
angular.module('hcm-cascading').service('HcmGetCascadingAttributeValuesService',
    function (HeadcountManagementFilterData) {
        function getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues, isExclude) {
            var key_id = selectedAttribute;
            var key_name;
            switch (selectedAttribute) {
                case 'PFUNCTION_CURR':
                    key_name = 'PFUNCTION_CURR_TXT';
                    break;
                case 'PHRSAREA_CURR':
                    key_name = 'PHRSAREA_CURR_TXT';
                    break;
                case 'PHRSLINE_CURR':
                    key_name = 'PHRSLINE_CURR_TXT';
                    break;
                case 'PFUNCTION':
                    key_name = 'PFUNCTION_TXT';
                    break;
                case 'PHRSAREA':
                    key_name = 'PHRSAREA_TXT';
                    break;
                case 'PHRSLINE':
                    key_name = 'PHRSLINE_TXT';
                    break;
            }

                if (item[key_id] && item[key_name]) {
                    var attributeVal = {};
                    attributeVal.id = angular.copy(item[key_id]);
                    attributeVal.name = angular.copy(item[key_name]);
                    attributeVal.checked = isAttributeValueChecked(savedData, item[key_id], selectedAttribute);
                    attributeValues.push(angular.copy(attributeVal));
                }
           
        }

        function isAttributeValueChecked(savedData, id, selectedAttribute) {
            savedData = HeadcountManagementFilterData.selectedAttributeValues[selectedAttribute];
            var curValue;
            if (savedData) {
                curValue = savedData.filter(function (savedVal) {
                    return (savedVal === id);
                });
            }

            if (savedData && curValue && curValue.length > 0)
                return true;
            else
                return false;
        }
        return {
            getCascadingAttributeValues: getCascadingAttributeValues
        }
    }
);