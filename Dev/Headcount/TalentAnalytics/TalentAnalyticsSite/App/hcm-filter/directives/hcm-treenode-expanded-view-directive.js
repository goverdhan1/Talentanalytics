

angular.module('headcountManagementFilter').directive('hcmTreeNodeExpanded', function () {
    return {
        template: '<hcm-node-expanded ng-repeat="node in tree"></node-expanded>',
        replace: true,
        restrict: 'E',
        scope: {
            tree: '=children'
        }
    };
});
angular.module('headcountManagementFilter').directive('hcmNodeExpanded', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'App/hcm-filter/views/hcm-treenode-expanded-view.html', // HTML for a single node.
        link: function (scope, element) {
            /*
             * Here we are checking that if current node has children then compiling/rendering children.
             * */
            if (scope.node && scope.node.children && scope.node.children.length > 0) {
                scope.node.childrenVisibility = true;
                var childNode = $compile('<ul class="tree"><hcm-tree-node-expanded children="node.children"></hcm-tree-node-expanded></ul>')(scope);
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
                console.log('hcm-treenode-expanded-view-directive.js hcmTreeNodeExpanded checkNode called');
                // Show filered data checked
                node.checked = !node.checked;                
                function checkChildren(c) {
                    angular.forEach(c.children, function (c) {
                        c.checked = node.checked;                       
                        checkChildren(c);
                    });
                }
                checkChildren(node);

                // Search checked node from original json to update the checked status
                $scope.hierarchySearchData = function (resourceList) {                  
                    for (var i = 0; i < resourceList.length; i++) {

                        if (resourceList[i].name == node.name) {
                            node = resourceList[i];
                            return;
                        }
                        if (resourceList[i].children != null && resourceList[i].children.length > 0) {
                            $scope.hierarchySearchData(resourceList[i].children);
                        }
                    }
                };
                $scope.hierarchySearchData($scope.$parent.$parent.hierarchyData)              

                // update checked status of original json
                node.checked = !node.checked;                
                function checkChildrenAndUpdate(c) {
                    angular.forEach(c.children, function (c) {
                        c.checked = node.checked;
                        // Call parent directive function to update the selected filter data
                        //$scope.$parent.$parent.updateSelectedValues(c);
                        checkChildrenAndUpdate(c);
                    });
                }
                checkChildrenAndUpdate(node);

                // Call parent directive function to update the selected filter data
                $scope.$parent.$parent.updateSelectedValues(node);
            };
        }]
    };
});
