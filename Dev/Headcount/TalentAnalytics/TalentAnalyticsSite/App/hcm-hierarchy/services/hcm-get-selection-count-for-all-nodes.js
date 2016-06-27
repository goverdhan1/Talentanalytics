'use strict';

/*
 * Returns an object with node names as properties. Each property value is equal to the count of the child nodes that are checked at all levels
 */
angular.module('hcm-hierarchy').factory('HcmGetSelectionCountForAllNodes', function () {
    var selectedChildCounts = {};

    return {
        getSelectionCountForAllNodes: getSelectionCountForAllNodes,
        getSelectedChildCounts: selectedChildCounts
    };

    function getSelectionCountForAllNodes(nodeTree) {
        for (var property in selectedChildCounts) {
            delete selectedChildCounts[property];
        }
        var parentLevelIds = {}; //stores the parent level ids for all levels that are currently being processed

        nodeTree.forEach(function (parentNode) {
            processChildren(parentNode);
        });

        function processChildren(parentNode) {
            if (!parentNode.children) {
                return;
            }

            parentLevelIds[parentNode.level_number] = parentNode.id;
            parentNode.children.forEach(function (childNode) {
                if (childNode.checked) {
                    updateCountsForAllParents(childNode.level_number);
                }
                processChildren(childNode);
            });
        }


        function updateCountsForAllParents(currentLevel) {
            for (var ctr = 1; ctr < currentLevel; ctr++) {
                var parentId = parentLevelIds[ctr];
                if (!parentId) {
                    console.error('Logic error. Missing parent id for level', ctr);
                }
                incrementChildCount(parentId);
            }
        }

        function incrementChildCount(nodeId) {
            if (!selectedChildCounts[nodeId]) {
                selectedChildCounts[nodeId] = 0;
            }
            selectedChildCounts[nodeId]++;
        }

        return selectedChildCounts;
    }
});