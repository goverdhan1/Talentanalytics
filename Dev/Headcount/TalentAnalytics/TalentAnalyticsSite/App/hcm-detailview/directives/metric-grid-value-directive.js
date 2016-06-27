'use strict';
angular.module('headcountDetailView').directive("metricGridValue", function () {
    return {
        scope: {
            value: "@",
            maxval: "@"
        },
        restrict: 'E',

        controller: function ($scope, $stateParams) {
            $scope.setEmployeeId = function () {
                $scope.employeeId = $stateParams.employeeId;
            };

            $scope.loadHeadCountFullViewData = function () {
                $scope.setEmployeeId();
            };
        },

        link: function (scope, element, attrs) {
            //calculations for the grid view starts
            var gridvalue = parseInt(scope.value);
            var gridmaxvalue = parseInt(scope.maxval);

            //without backgroundcolor
            if (gridvalue === 0) {
                scope.staticzerovalue = "staticzerovalue";
            }

            //to check the value is positive or negative
            if (gridvalue > 0) {
                scope.gridshow = true;
            }
            else {
                scope.gridshow = false;
            }

            //for gridwidth
            scope.checkgridwidth = (gridvalue / gridmaxvalue) * 100;

            if (scope.checkgridwidth < 0) {
                scope.gridwidth = Math.abs(scope.checkgridwidth);
            }
            else {
                scope.gridwidth = scope.checkgridwidth;
            }


            //value is out of gridwidth if it is small number
            if (scope.checkgridwidth >= -30 && scope.checkgridwidth < 0) {
                scope.negativelessgridwidth = "negativelessgridwidth";
            }
            else if (scope.checkgridwidth <= 30 && scope.checkgridwidth > 0) {
                scope.positivelessgridwidth = "positivelessgridwidth";
            }

            //minimum gridwidth to apply
            if (scope.gridwidth <= 0.5 && gridvalue != 0) {
                scope.staticgridwidth = "staticgridwidth";
            }
            //calculations for the grid view ends
        },
        templateUrl: 'App/hcm-detailview/views/metric-grid-value.html'
    }
});