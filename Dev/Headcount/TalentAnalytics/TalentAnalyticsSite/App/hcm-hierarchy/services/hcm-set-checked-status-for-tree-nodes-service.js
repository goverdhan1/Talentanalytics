angular.module('hcm-hierarchy').factory('HcmSetCheckedStatusForTreeNodesService', function () {

    return {
        setCheckedStatusForTreeNodes: setCheckedStatusForTreeNodes
    };

    function itemExistInArray(item, type, checkedStatus) {
        if (checkedStatus[item.level_number] !== undefined) {
            if (type == 'check') {
                var data = checkedStatus[item.level_number];
                for (i = 0; data.checked.length > i; i += 1) {
                    if (data.checked[i].toString() === item.id) {
                        return true;
                    }
                }
            }
            else {
                var data = checkedStatus[item.level_number];
                for (i = 0; data.unchecked.length > i; i += 1) {
                    if (data.unchecked[i].toString() === item.id) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function setCheckedStatusForTreeNodes(treeData, checkedStatus) {
        console.log('Setting checked status for ', checkedStatus);
        var parentStatus = {};
        var selectedAttributeValCount = 0;

        function iteration(data) {
            for (var i = 0; i < data.length; i++) {
                  var levelNumber = data[i].level_number;
                if (!levelNumber) {
                    console.error('Data issue. No level number found for ', data[i]);
                }

                if (levelNumber === 1) { //reset
                    parentStatus = {};
                    var isChecked = itemExistInArray(data[i], 'check', checkedStatus);
                    setStatusForCurrentNodeAndOneLevelDown(data, i, isChecked);
                }
                else {

                    //destroy all down levels and start afresh for a given node
                    for (var key in parentStatus) {
                        if (key > levelNumber) {
                            delete parentStatus[key];
                        }
                    }

                    if (levelNumber === 2) {
                        var temp = parentStatus;
                        parentStatus = {};
                        parentStatus[2] = temp[2];
                    }
                    
                    var parentLevelStatus = false;
                    if (parentStatus[levelNumber] !== undefined) {
                        parentLevelStatus = parentStatus[levelNumber];
                    }
                    else if (parentStatus[levelNumber - 1] !== undefined) {
                        parentLevelStatus = parentStatus[levelNumber - 1];
                    }

                    setCheckboxStatus(data, i, parentLevelStatus);
                }

                if (data[i].children != null && data[i].children.length > 0) {
                    iteration(data[i].children);
                }
            }
        }

        function setCheckboxStatus(data, i, parentLevelStatus) {
            var flag = parentLevelStatus;
            if (parentLevelStatus && itemExistInArray(data[i], 'uncheck', checkedStatus)) {// find if it is available in unchecked item
                flag = false;
            } else if (itemExistInArray(data[i], 'check', checkedStatus)) { // find if it is availbale in checked item
                flag = true;
            }
            setStatusForCurrentNodeAndOneLevelDown(data, i, flag);
        }

        function setStatusForCurrentNodeAndOneLevelDown(data, i, flag) {
            parentStatus[data[i].level_number + 1] = flag;
            data[i].checked = flag;
            if (flag) {
                selectedAttributeValCount++
            };
        }

        iteration(treeData);
        return selectedAttributeValCount;
    }
});