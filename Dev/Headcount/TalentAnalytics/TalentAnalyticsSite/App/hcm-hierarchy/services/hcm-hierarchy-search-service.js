'use strict';

angular.module('hcm-hierarchy').factory('HcmHierarchySearch', function ($timeout) {

    function hierarchySearchData(resourceList, lowerCaseSearchKeyword) {
        for (var i = 0; i < resourceList.length; i++) {
            if (resourceList[i].children != null && resourceList[i].children.length > 0) {
                hierarchySearchData(resourceList[i].children, lowerCaseSearchKeyword);
                if (resourceList[i].children.length == 0) {
                    var name = resourceList[i].name.toLowerCase();
                    if (!(name.indexOf(lowerCaseSearchKeyword) >= 0)) {
                        resourceList.splice(i, 1);
                        i--;
                    }
                }
            } else {
                if (resourceList[i] != null && resourceList[i].name !== '' && resourceList[i].name != null) {
                    var name = resourceList[i].name.toLowerCase();
                    if (!(name.indexOf(lowerCaseSearchKeyword) >= 0)) {
                        resourceList.splice(i, 1);
                        i--;
                    }
                }
                else {
                    resourceList.splice(i, 1);
                    i--;
                }
            }
        }
    };

    function getHierarchySearchDataForPage(matchText, pageNumber, resultsPerPage, hierarchSearchData) {
        return $timeout(function () {
            var results = [];
            if (resultsPerPage && matchText && matchText.length && hierarchSearchData && hierarchSearchData.length) {
                var initialValue = 0;
                if (resultsPerPage) {
                    initialValue = resultsPerPage * pageNumber;
                }
                for (var ctr = initialValue; ctr < hierarchSearchData.length; ctr++) {
                    var matchWithObject = hierarchSearchData[ctr];
                    if (matchWithObject) {
                        var matchWithName = matchWithObject.CHILD_TEXT;
                        if (matchWithName) {
                            if (matchWithName.toLowerCase().indexOf(matchText.toLowerCase()) >= 0) {
                                results.push(matchWithObject);
                                if (results.length > resultsPerPage) {
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

    return {
        hierarchySearchData: hierarchySearchData,
        getHierarchySearchDataForPage: getHierarchySearchDataForPage
    }

});