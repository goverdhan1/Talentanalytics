'use strict';
angular.module('hcm-hierarchy').factory('HcmHierarchyUpdateService',
    function (HeadcountManagementFilterData, HcmGetSelectionCountForAllNodes, HierarchyIncludeAll, HierarchyExcludeAll,
              HcmGetHierarchyService) {
        
        var selHierarchyData = [];
        var checked = false;
        var found = false;

        function createInclExclObj(levelNumber, id) {
            if (selHierarchyData[levelNumber] === undefined) {
                selHierarchyData[levelNumber] = {};
            }
            if (selHierarchyData[levelNumber][id] === undefined) {
                selHierarchyData[levelNumber][id] = {};
                selHierarchyData[levelNumber][id]['include'] = [];
                selHierarchyData[levelNumber][id]['exclude'] = [];
            }
        }

        function addInclExclVal(levelNumber, id, inclVal, exclVal) {
            selHierarchyData[levelNumber][id]['include'].push(inclVal);
            selHierarchyData[levelNumber][id]['exclude'].push(exclVal);
        }

        function deletItem(levelNumber, id) {
            if (selHierarchyData[levelNumber] !== undefined) {
                if (selHierarchyData[levelNumber][id] !== undefined) {
                    delete selHierarchyData[levelNumber][id];
                }

                if (jQuery.isEmptyObject(selHierarchyData[levelNumber])) {
                    delete selHierarchyData[levelNumber]
                }
            }
        }

        function removeDefaultVal(levelNumber, id, type) {
            var exclIndex = selHierarchyData[levelNumber][id][type].indexOf(HierarchyIncludeAll);
            if (exclIndex > -1) {
                selHierarchyData[levelNumber][id][type].splice(exclIndex, 1);
            }

            var exclIndex = selHierarchyData[levelNumber][id][type].indexOf(HierarchyExcludeAll);
            if (exclIndex > -1) {
                selHierarchyData[levelNumber][id][type].splice(exclIndex, 1);
            }
        }

        // Calculate checked items in hierarchy data.
        function countCheckedHierarchyData(data) {
            var count = 0;
            function iteration(data) {
                angular.forEach(data, function (item) {
                    if (item.checked)
                        count++;

                    if (item.children != undefined && item.children.length > 0)
                        iteration(item.children);
                });
            }

            iteration(data);
            return count;
        }        

        function isParentChecked(data, parentId, childLevelNumber) {
            for (var i = 0; i < data.length; i++) {
                if (found) {
                    break;
                }
                if (data[i].children != null && data[i].children.length > 0) {
                    if (data[i].id === parentId) {
                        checked = data[i].checked;
                        found = true;
                        break;
                    }
                    if (!found) {
                        isParentChecked(data[i].children, parentId);
                    }
                }
                else {
                    if (data[i].id === parentId) {
                        checked = data[i].checked;
                        found = true;
                        break;
                    }
                }
            }
            return checked;
        }

        // Checking item exist then delete it
        function itemExist_DeleteIt (nodeId) {
            // Looping saved item
            angular.forEach(selHierarchyData, function (item, index) {
                // checking item is available and deleting
                if (item[nodeId] !== undefined) {
                    if (selHierarchyData[index] !== undefined && selHierarchyData[index][nodeId] != undefined) {
                        delete selHierarchyData[index][nodeId];
                        if (jQuery.isEmptyObject(selHierarchyData[index])) {
                            delete selHierarchyData[index]
                        }
                    }
                }
            });
        }

        // doing recursive loop to find nodes and its child nodes
        function removeChild(node) {
            var nodeLevel = node.level_number;

            // checking item exist, then delete it.
            itemExist_DeleteIt(node.id)

            if (node.children != null && node.children.length > 0) {
                for (var ctr = 0; ctr < node.children.length; ctr++) {
                    removeChild(node.children[ctr])
                }
            }
        }

        function updateFlatViewCheckedStatus(node, tree, flatData, infiniteScrollData) {

            var allIdsForThisNode = HcmGetHierarchyService.getAllIdsForAGivenNode(tree, node.id);

            updateFlatViewCheckedStatusClosure(flatData);

            var selectedAttributeValCount = 0;
            updateFlatViewCheckedStatusClosure(infiniteScrollData);

            function updateFlatViewCheckedStatusClosure(flatNodeArray) {
                if (flatNodeArray && flatNodeArray.length) {
                    flatNodeArray.forEach(function (item) {
                        if (allIdsForThisNode[item.id]) {
                            item.checked = node.checked;
                        }

                        if (item.checked) {
                            selectedAttributeValCount++;
                        }
                    });
                }
            }

            return selectedAttributeValCount;
        };

        function updateHierarchyVal(attributeValue, selAttr, tree, isHierarchy, hierarchyData, flatData, infiniteScrollData) {
            
            selHierarchyData = [];

            if (HeadcountManagementFilterData.selectedAttributeValues[selAttr] !== undefined &&
                HeadcountManagementFilterData.selectedAttributeValues[selAttr].data !== undefined)
                selHierarchyData = HeadcountManagementFilterData.selectedAttributeValues[selAttr].data;

            // Delete child item of this node. Becasue this node checked status will cover its child status too.
            removeChild(attributeValue);

            // getting selected node level number and assign into variable.
            var selNodeLevel = attributeValue.level_number;
            var parentNodeLevel = selNodeLevel - 1;
            var parentId = attributeValue.parent_id;

            createInclExclObj(selNodeLevel, attributeValue.id);

            if (attributeValue.checked) {
                // To insert root node
                if (selNodeLevel === 1) {
                    createInclExclObj(selNodeLevel, attributeValue.id);
                    addInclExclVal(selNodeLevel, attributeValue.id, HierarchyIncludeAll, HierarchyExcludeAll);
                }
                else if (selNodeLevel !== 0 && (selHierarchyData[selNodeLevel] == undefined || selHierarchyData[selNodeLevel][parentId] == undefined)) {
                    found = false;
                    var isParentCheckedVar = isParentChecked(angular.copy(tree), parentId);
                    if (isParentCheckedVar) {
                        // if parent item is available then, it should be in exclude so remove it from there
                        if (selHierarchyData[parentNodeLevel][parentId] !== undefined) {
                            index = selHierarchyData[parentNodeLevel][parentId]['exclude'].indexOf(attributeValue.id)
                            if (index > -1) {
                                selHierarchyData[parentNodeLevel][parentId]['exclude'].splice(index, 1);
                                if (selHierarchyData[parentNodeLevel][parentId]['exclude'].length === 0) {
                                    selHierarchyData[parentNodeLevel][parentId]['exclude'].push(HierarchyExcludeAll);
                                }
                            }
                        }
                        else {
                            createInclExclObj(selNodeLevel, parentId);
                            addInclExclVal(selNodeLevel, parentId, attributeValue.id, HierarchyIncludeAll);
                        }

                        deletItem(selNodeLevel, attributeValue.id);
                    }
                    else {
                        createInclExclObj(selNodeLevel, parentId);
                        addInclExclVal(selNodeLevel, parentId, attributeValue.id, HierarchyIncludeAll);

                        deletItem(selNodeLevel, attributeValue.id);
                    }
                }
                else {
                    var index = 0;
                    if (selHierarchyData[selNodeLevel] !== undefined && selHierarchyData[selNodeLevel][parentId]) {
                        index = selHierarchyData[selNodeLevel][parentId]['exclude'].indexOf(attributeValue.id)
                        if (index === -1) {
                            // Remove Y and N
                            removeDefaultVal(selNodeLevel, parentId, 'include');

                            selHierarchyData[selNodeLevel][parentId]['include'].push(attributeValue.id);
                        }
                        else {
                            selHierarchyData[selNodeLevel][parentId]['exclude'].splice(index, 1);
                            if (selHierarchyData[selNodeLevel][parentId]['exclude'].length === 0) {
                                selHierarchyData[selNodeLevel][parentId]['exclude'].push(HierarchyExcludeAll);
                            }
                        }
                        deletItem(selNodeLevel, attributeValue.id);
                    }
                }
            }
            else {
                // To remove root node item from array when it is in uncheck status.
                if (selNodeLevel === 1) {
                    deletItem(selNodeLevel, attributeValue.id);
                }
                else if (selNodeLevel !== 0 && (selHierarchyData[selNodeLevel] == undefined || selHierarchyData[selNodeLevel][parentId] == undefined)) {
                    found = false;
                    var isParentCheckedVar = isParentChecked(angular.copy(tree), parentId);
                    if (isParentCheckedVar) {
                        // if parent item is available in then, append this item too
                        if (selHierarchyData[parentNodeLevel] !== undefined && selHierarchyData[parentNodeLevel][parentId] !== undefined) {
                            if (selHierarchyData[parentNodeLevel][parentId]['exclude'] == HierarchyExcludeAll) {
                                selHierarchyData[parentNodeLevel][parentId]['exclude'] = [];
                            }
                            selHierarchyData[parentNodeLevel][parentId]['exclude'].push(attributeValue.id);
                        }
                        else {
                            createInclExclObj(selNodeLevel, parentId);
                            addInclExclVal(selNodeLevel, parentId, HierarchyIncludeAll, attributeValue.id);
                        }
                    }
                    else {
                        index = selHierarchyData[selNodeLevel][parentId]['include'].indexOf(attributeValue.id)
                        if (index === -1) {
                            // Remove Y and N
                            removeDefaultVal(selNodeLevel, parentId, 'exclude');

                            selHierarchyData[selNodeLevel][parentId]['exclude'].push(attributeValue.id);
                        }
                        else {
                            selHierarchyData[selNodeLevel][parentId]['include'].splice(index, 1);
                            if (selHierarchyData[selNodeLevel][parentId]['include'].length === 0) {
                                // Remove if nothing selected and parent also not selected
                                if (selHierarchyData[(parentNodeLevel)] === undefined) {
                                    $.each(selHierarchyData, function (arrIndex, arrItem) {
                                        if (arrIndex === selNodeLevel) {
                                            delete selHierarchyData[arrIndex];
                                        }
                                    });
                                }
                                else {
                                    selHierarchyData[selNodeLevel][parentId]['include'].push(HierarchyExcludeAll);
                                }
                            }
                        }
                    }
                    deletItem(selNodeLevel, attributeValue.id);
                }
                else {
                    index = selHierarchyData[selNodeLevel][parentId]['include'].indexOf(attributeValue.id)
                    if (index === -1) {
                        // Remove _NONE_ from exclude
                        removeDefaultVal(selNodeLevel, parentId, 'exclude');
                        //Add this node to exclude
                        selHierarchyData[selNodeLevel][parentId]['exclude'].push(attributeValue.id);
                    }
                    else {
                        //Remove the element from the include list
                        selHierarchyData[selNodeLevel][parentId]['include'].splice(index, 1);
                        var noMoreElementsLeftToInclude = selHierarchyData[selNodeLevel][parentId]['include'].length === 0;
                        if (noMoreElementsLeftToInclude) {

                            var parentLevelForThisNodeTreeExists = selHierarchyData[parentNodeLevel] && selHierarchyData[parentNodeLevel][parentId];
                            if (parentLevelForThisNodeTreeExists) {
                                //set current level include array to _NONE_
                                selHierarchyData[selNodeLevel][parentId]['include'].push(HierarchyExcludeAll);
                            } else {
                                //all nodes at current level have been removed. Delete the current level object for the parent id
                                delete selHierarchyData[selNodeLevel][parentId];
                            }
                        }
                    }
                    deletItem(selNodeLevel, attributeValue.id);
                }
            }

            HeadcountManagementFilterData.selectedAttributeValues[selAttr] = { data: selHierarchyData, count: countCheckedHierarchyData(hierarchyData) };

            angular.forEach(selHierarchyData, function (item, level, obj) {
                console.log('%c ' + 'Level ' + level + JSON.stringify(item, null, '\t') + ' ', 'background: #fff; color: #FF0000');
            });

            if (!isHierarchy) {
                // update flat view checked status and count checked items
                var selectedAttributeValCount = updateFlatViewCheckedStatus(attributeValue, tree, flatData, infiniteScrollData);
                HeadcountManagementFilterData.selectedAttributeValues[selAttr].count = selectedAttributeValCount;
            }

            return HcmGetSelectionCountForAllNodes.getSelectionCountForAllNodes(tree);
            //$scope.selectionCountForAllHierarchyNodes = HcmGetSelectionCountForAllNodes.getSelectionCountForAllNodes(tree);
            //console.log('$scope.selectionCountForAllHierarchyNodes', $scope.selectionCountForAllHierarchyNodes);
        }        

        return {
            updateHierarchyVal: updateHierarchyVal            
        }

});