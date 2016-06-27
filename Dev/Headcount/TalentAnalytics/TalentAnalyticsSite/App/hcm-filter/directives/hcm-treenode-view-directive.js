

angular.module('headcountManagementFilter').directive('hcmTreeNode', function () {
    return {
        template: '<node ng-repeat="node in tree"></node>',
        replace: true,
        restrict: 'E',
        scope: {
            tree: '=children'
        }
    };
});
angular.module('headcountManagementFilter').directive('node', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'App/hcm-filter/views/hcm-treenode-view.html', // HTML for a single node.
        link: function (scope, element) {
            /*
             * Here we are checking that if current node has children then compiling/rendering children.
             * */
            if (scope.node && scope.node.children && scope.node.children.length > 0) {
                scope.node.childrenVisibility = true;
                var childNode = $compile('<ul class="tree" ng-if="!node.childrenVisibility"><hcm-tree-node children="node.children"></hcm-tree-node></ul>')(scope);
                element.append(childNode);
            } else {
                scope.node.childrenVisibility = false;
            }
        },
        controller: ["$scope", function ($scope) {
            // This function is for just toggle the visibility of children
            $scope.toggleVisibility = function (node) {
                if (node.children) {
                    node.childrenVisibility = !node.childrenVisibility;
                }
            };
            // Here We are marking check/un-check all the nodes.
            $scope.checkNode = function (node) {
                console.log('hcm-treenode-view-directive.js node checkNode called');
                node.checked = !node.checked;

                function checkChildren(c) {
                    angular.forEach(c.children, function (c) {
                        c.checked = node.checked;
                        // Call parent directive function to update the selected filter data
                        //$scope.$parent.$parent.updateSelectedValues(c);
                        checkChildren(c);
                    });
                }

                checkChildren(node);

                // Call parent directive function to update the selected filter data
                $scope.$parent.$parent.updateSelectedValues(node);
            };
        }]
    };
});
