'use strict';

angular.module('hcm-hierarchy').factory('HcmGetHierarchyPostDataService', function (HierarchyIncludeAll, HierarchyExcludeAll, HeadcountManagementFilterData) {

    function keyNeedsToBeAddedToCommonIds(includeString, excludeString) {
        var yesNoFlags = [HierarchyIncludeAll, HierarchyExcludeAll];
        return yesNoFlags.indexOf(includeString) >= 0 && yesNoFlags.indexOf(excludeString) >= 0;
    }

    function getHierarchyPostData(HeadcountManagementFilterData, selAttribute) {
        var costCenterData = '';
        angular.forEach(HeadcountManagementFilterData.selectedAttributeValues, function (attributeValue, attribute) {
            if (attribute === selAttribute && attributeValue.data != undefined && attributeValue.data.length > 0) {
                var excludeSetKey = attribute + '_EXCLUDE';

                var selectedKeyData = [];
                angular.forEach(attributeValue.data, function (item, level, obj) {
                    var commonIds = '';
                    for (var key in item) {
                        var includeString = item[key].include.toString();
                        var excludeString = item[key].exclude.toString();

                        var noSelection = includeString.length === 0 && excludeString.length === 0;
                        if (noSelection) {
                            continue;
                        }

                        var keyToBeAddedToCommonIds = keyNeedsToBeAddedToCommonIds(includeString, excludeString);
                        if (keyToBeAddedToCommonIds) {
                            if (commonIds === '') {
                                commonIds = key;
                            }
                            else {
                                commonIds = commonIds + ',' + key;
                            }
                        }
                        else {
                            selectedKeyData.push('LEVEL ' + level + '(' + key + ')[INCLUDE(' + includeString + '),EXCLUDE(' + excludeString + ')]');
                        }
                    }
                    if (commonIds != '') {
                        selectedKeyData.push('LEVEL ' + level + '(' + commonIds + ')[INCLUDE(' + HierarchyIncludeAll + '),EXCLUDE(' + HierarchyExcludeAll + ')]');
                    }
                });
                if (selectedKeyData.length) {
                    //For Include/Exclude implementation
                    if (HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] == true) {
                        costCenterData = selAttribute + '|EXCLUDE_ALL{' + HeadcountManagementFilterData.selectedAttributeValues[attribute + '_root_id'] + ';' + selectedKeyData.join(';') + '}';
                    }
                    else {
                        costCenterData = selAttribute + '|INCLUDE_ALL{' + HeadcountManagementFilterData.selectedAttributeValues[attribute + '_root_id'] + ';' + selectedKeyData.join(';') + '}';
                    }
                }
            }
        });
        console.log('Post data for ' + selAttribute, costCenterData);
        return costCenterData;
    }

    function getPostData(HeadcountManagementFilterData, handleToDateDirective) {
        var result = {};
        var dateData;
        var postAttribute = '';
        if (!handleToDateDirective) {
            console.error('Could not get a handle to the date directive');
        } else {
            if (handleToDateDirective.get) {
                dateData = handleToDateDirective.get();
                postAttribute = postAttribute + dateData.ATTRIBUTE + ',';
            }
            else {
                console.error('Missing get function in date directive');
            }
        }
        console.log('Going to loop through filter data');
        angular.forEach(HeadcountManagementFilterData.selectedAttributeValues, function (attributeValue, attribute) {
            if (attributeValue && attribute && attributeValue.length > 0 && attribute.length > 0) {
                var excludeSetKey = attribute + '_EXCLUDE';
                if (attribute !== 'MAST_CCTR_HIER' && attribute !== 'PLEVEL_HIER' && attribute !== 'PFUNCTION_HIER' && attribute !== 'ORGUNIT_HIER' && attribute !== 'PHRREGN_HIER' && attribute !== 'USI_FUNC_TXT_HIER' && attribute !== 'PPMARKET_HIER' && attribute !== 'PSMARKET_HIER' && attribute !== 'AGE_GENERATION_HIER' && attribute.indexOf('_EXCLUDE') === -1 && attribute.indexOf('_root_id') === -1 && attribute.indexOf('EXCLUDE_ALL') === -1) {
                    if (HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey]) {
                        if (attribute === 'PAYPCT') {
                            var from = attributeValue[0] || 0;
                            var to = attributeValue[1];
                            if (to) {
                                postAttribute = postAttribute + attribute + '(EX(' + from + '-' + to + ')),';
                            } else {
                                postAttribute = postAttribute + attribute + '(EX(' + from + ')),';
                            }
                        } else {
                            postAttribute = postAttribute + attribute + '(EX(' + attributeValue.toString() + ')),';
                        }
                    }
                    else {
                        if (attribute === 'PAYPCT') {
                            var from = attributeValue[0] || 0;
                            var to = attributeValue[1];
                            if (to) {
                                postAttribute = postAttribute + attribute + '(' + from + '-' + to + '),';
                            } else {
                                postAttribute = postAttribute + attribute + '(' + from + '),';
                            }
                        } else {
                            postAttribute = postAttribute + attribute + '(' + attributeValue.toString() + '),';
                        }
                    }
                }
            }
        });
        // Remove last comma (,)
        postAttribute = postAttribute.substring(0, postAttribute.length - 1);

        result['dateData'] = dateData;
        result['postAttribute'] = postAttribute;

        return result;
    }

    function fillPostDataOfValidHierarchyData(postData) {

        var hierarchyChanges = {
            COST_CENTER_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'MAST_CCTR_HIER'),
            FUNCTION_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'PFUNCTION_HIER'),
            JOB_LEVEL_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'PLEVEL_HIER'),
            REGION_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'PHRREGN_HIER'),
            ORGUNIT_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'ORGUNIT_HIER'),
            PMARKET_OFFER_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'PPMARKET_HIER'),
            SMARKET_OFFER_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'PSMARKET_HIER'),
            USI_AFUNCTION_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'USI_FUNC_TXT_HIER'),
            AGE_GENERATION_HIER: getHierarchyPostData(HeadcountManagementFilterData, 'AGE_GENERATION_HIER')
        }

        for (var propertyName in hierarchyChanges) {
            // only if not empty string
            if (hierarchyChanges[propertyName]) {
                postData[propertyName] = hierarchyChanges[propertyName];
            }
        }

        return postData;
    }

    

    return {
        getHierarchyPostData: getHierarchyPostData,
        getPostData: getPostData,
        fillPostDataOfValidHierarchyData: fillPostDataOfValidHierarchyData
    };
});