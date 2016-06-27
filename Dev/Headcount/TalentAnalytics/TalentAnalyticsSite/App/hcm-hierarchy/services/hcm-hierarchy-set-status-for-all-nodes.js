'use strict';

/*
* sets the checked status for all hierarchy nodes to true or false
*/
angular.module('hcm-hierarchy').factory('HcmHierarchySetStatusForAllNodes', function () {
    return {
        hierarchySetStatusForAllNodes: hierarchySetStatusForAllNodes
    };

    function hierarchySetStatusForAllNodes(nodeArrayWithChildren, flag) {
        nodeArrayWithChildren.forEach(function (node) {
            node.checked = flag;
            if (node.children && node.children.length) {
                hierarchySetStatusForAllNodes(node.children, flag);
            }
        });
    }

});