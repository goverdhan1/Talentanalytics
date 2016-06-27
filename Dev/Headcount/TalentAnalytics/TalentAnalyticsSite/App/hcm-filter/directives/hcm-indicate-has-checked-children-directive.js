'use strict';
angular.module('headcountManagementFilter').directive('hcmIndicateHasCheckedChildren', ['HcmGetSelectionCountForAllNodes', function (HcmGetSelectionCountForAllNodes) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.$watch(function () {
                return HcmGetSelectionCountForAllNodes.getSelectedChildCounts;
            }, function (newVal) {
                element[0].indeterminate = !scope.node.checked && newVal[scope.node.id] !== undefined && newVal[scope.node.id] > 0;
            }, true);
        }
    };
}]);