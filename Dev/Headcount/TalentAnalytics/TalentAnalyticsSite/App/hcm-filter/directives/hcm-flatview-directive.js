

angular.module('headcountManagementFilter').directive('hcmFlatView', function () {
    return {
        template: '<flat-view ng-repeat="node in tree"></flat-view>',
        replace: true,
        restrict: 'E',
        scope: {
            tree: '=children',
            //updateValue: '&'
        }
    };
});
angular.module('headcountManagementFilter').directive('flatView', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'App/hcm-filter/views/hcm-flat-view.html', // HTML for a single node.
        link: function (scope, element) {
            /*
             * Here we are checking that if current node has children then compiling/rendering children.
             * */
            if (scope.node && scope.node.children && scope.node.children.length > 0) {
                scope.node.childrenVisibility = true;
                var childNode = $compile('<hcm-flat-view children="node.children"></hcm-flat-view>')(scope);
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
                console.log('hcm-flatview-directive.js hcmFlatView checkNode called');
                node.checked = !node.checked;

                // Call parent directive function to update the selected filter data
                $scope.$parent.$parent.updateOnCheckOfNodeInFlatView(node);
            };
        }]
    };
});
