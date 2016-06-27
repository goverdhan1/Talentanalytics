'use strict';

angular.module('hcm-hierarchy').factory('HCMParseHierarchyViewService', function (HierarchyIncludeAll, HierarchyExcludeAll) {    

    function nthChar(string, character, n) {
        var count = 0, i = 0;
        while (count < n && (i = string.indexOf(character, i) + 1)) {
            count++;
        }
        if (count == n) return i - 1;
        return NaN;
    }

    /** READ HIERARCHY DATA FROM STRING **/
    function parsedJson(string) {
        var data = [];
        //var string = 'LEVEL 2(Total)[INCLUDE(029,027),EXCLUDE(_ALL_)];LEVEL 3(028)[INCLUDE(NORPAC),EXCLUDE(_ALL_)];LEVEL 3(029)[INCLUDE(_ALL_),EXCLUDE(001)]';
        var strings = string.split(';');
        for (var i = 0; i < strings.length; i++) {
            // Removing LEVEL word from the string
            var item = strings[i].replace('LEVEL', '');
            console.log('Leve Items :' + item.trim());

            item = item.trim();

            // find level number (Consider two digits)
            var levelNumber = item.substring(0, 2);
            var startIndex = 3;

            // if levelNumber[1] === ')', then it should be one digit
            if (levelNumber[1] == '(') {
                levelNumber = item.substring(0, 1);
                startIndex = 2;
            }
            console.log('Level Number : ' + levelNumber);

            // Find Parentids using index
            var parentIds = item.substring(startIndex, item.indexOf(')'));
            parentIds = parentIds.split(',');
            console.log('ParentIds : ' + parentIds);

            // Getting include and exclude items
            var incl_excl = item.substring(item.indexOf('[') + 1, item.indexOf(']'));
            console.log('incl_excl :' + incl_excl);

            // Separate include and exclude content
            var include = incl_excl.substring(nthChar(incl_excl, '(', 1) + 1, nthChar(incl_excl, ')', 1));
            var exclude = incl_excl.substring(nthChar(incl_excl, '(', 2) + 1, nthChar(incl_excl, ')', 2));

            console.log('Include :' + include);
            console.log('Exclude :' + exclude);

            // Generate Json
            for (var j = 0; j < parentIds.length; j++) {
                if (data[levelNumber] === undefined) {
                    data[levelNumber] = {};
                }

                // iterate parent Ids

                data[levelNumber][parentIds[j]] = {};

                data[levelNumber][parentIds[j]] = { include: [], exclude: [] };

                var arrInclude = include.split(',');
                var arrExclude = exclude.split(',');

                for (var inCounter = 0; inCounter < arrInclude.length; inCounter++) {
                    data[levelNumber][parentIds[j]]['include'].push(arrInclude[inCounter]);
                }

                for (var exCounter = 0; exCounter < arrExclude.length; exCounter++) {
                    data[levelNumber][parentIds[j]]['exclude'].push(arrExclude[exCounter]);
                }
            }
        }
        return data;
    }

    function hasSpecificKeyValues(str) {
        var yesNoFlags = [HierarchyIncludeAll, HierarchyExcludeAll];
        return str.length > 0 && yesNoFlags.indexOf(str) < 0;
    }

    function createCheckedItem(savedItem, checkedStatus) {
        //checkedStatus = [];
        angular.forEach(savedItem, function (item, level) {
            if (checkedStatus[level] === undefined) {
                checkedStatus[level] = { checked: [], unchecked: [] };
            }
            if (level === 1) {
                for (var key in item) {
                    if (item[key]['include'] == HierarchyIncludeAll) {
                        checkedStatus[level].checked.push(key);
                    }

                    if (item[key]['exclude'].toString().length > 1) {
                        // for leve 1 item exclude item will be in level 2
                        if (checkedStatus[level + 1] === undefined) {
                            checkedStatus[level + 1] = { checked: [], unchecked: [] };
                        }

                        var arr = item[key]['exclude'].toString().split(',');
                        angular.forEach(arr, function (value, key) {
                            checkedStatus[level + 1].unchecked.push(value);
                        });

                    }
                }
            }
            else {
                for (var key in item) {
                    if (item[key]['include'] === HierarchyIncludeAll) {
                        if (checkedStatus[level - 1] === undefined) {
                            checkedStatus[level - 1] = { checked: [], unchecked: [] };
                        }
                        checkedStatus[level - 1].checked.push(key);
                    }
                    if (hasSpecificKeyValues(item[key]['include'].toString())) {
                        var arr = item[key]['include'].toString().split(',');
                        angular.forEach(arr, function (value, key) {
                            checkedStatus[level].checked.push(value);
                        });
                    }

                    if (item[key]['exclude'] === HierarchyIncludeAll) {
                        if (checkedStatus[level - 1] === undefined) {
                            checkedStatus[level - 1] = { checked: [], unchecked: [] };
                        }
                        checkedStatus[level - 1].unchecked.push(key);
                    }
                    if (hasSpecificKeyValues(item[key]['exclude'].toString())) {
                        if (checkedStatus[level] === undefined) {
                            checkedStatus[level] = { checked: [], unchecked: [] };
                        }
                        var arr = item[key]['exclude'].toString().split(',');
                        angular.forEach(arr, function (value, key) {
                            checkedStatus[level].unchecked.push(value);
                        });
                    }
                }

            }
        });
    }

    return {
        //checkedStatus: checkedStatus,
        parsedJson: parsedJson,
        createCheckedItem: createCheckedItem
    }

});