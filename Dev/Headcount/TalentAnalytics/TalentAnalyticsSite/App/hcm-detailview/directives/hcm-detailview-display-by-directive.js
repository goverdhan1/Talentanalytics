'use strict';
angular.module('headcountDetailView').directive("hcmDetailviewDisplayBy", ['$timeout', 'HeadcountManagementFilterAttributesService', 'toaster', function ($timeout, HeadcountManagementFilterAttributesService, toaster) {
    return {
        restrict: 'E',
        templateUrl: 'App/hcm-detailview/views/hcm-detailview-display-by-view.html',
        scope: {},
        controller: function ($scope) {
            $scope.itemsList = [];

            $scope.selectedItem;

            HeadcountManagementFilterAttributesService.get(function (data) {
                $scope.itemsList = data.results;
                $scope.itemsList.unshift({ATTRIBUTE_NAME: '(None)'});
                /*
                data.results = [{
                    ATTRIBUTE_LABEL: "Capability (Employee)"
                    ATTRIBUTE_LABEL: "Capability (Employee)"
                    ATTRIBUTE_NAME: "EMP_CAPABILITY"
                    COUNT: 1
                    HIERARCHY_FLAG: "N"
                    ID: "43794017309960322"
                }]
                */


            }, function (err) {
                // Tracking errors
                var errMessage = "Attribute filter service returned an error";
                console.error(errMessage, err);
                toaster.pop('error', errMessage);
            });

            $scope.selectItem = function (option) {
                if (option.ID) {
                    $scope.selectedItem = option;
                } else {
                    $scope.selectedItem = '';
                };
                
            };
        },
        link: function (scope, element, attrs) { },
        replace: true
    };
}]);