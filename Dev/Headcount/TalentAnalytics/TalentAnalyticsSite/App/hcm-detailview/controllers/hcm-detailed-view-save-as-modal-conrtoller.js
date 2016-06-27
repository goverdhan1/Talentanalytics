'use strict';
angular.module('headcountDetailView').controller('HeadcountDetailViewSaveAsController', ['$scope', '$timeout', '$modalInstance', 'UserDetails', 'HeadcountManagementDetailedViewSaveService', 'toaster',
function ($scope, $timeout, $modalInstance, UserDetails, HeadcountManagementDetailedViewSaveService, toaster) {
    var viewName = '';
    Object.defineProperties($scope, {
        'viewName': {
            get: function () {
                return viewName
            },
            set: function (newVal) {
                viewName = newVal
            }

        }
    });


    $scope.nameEnterError = false;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.hideNameEnterError = function () {
        $scope.nameEnterError = false;
    };

    $scope.apply = function () {
        if (!$scope.viewName) {
            $scope.nameEnterError = true;
            return
        };
        var data = {
            "USER_NAME": UserDetails.userId,
            "FILTER_NAME": "TESTING FILTER",
            "VIEW_TYPE": "FV",
            "VIEW_NAME": $scope.viewName,
            "CHART_TYPE": "Line",
            "AXIS_SWAP_FLAG": "Y",
            "METRICS_DRILLDOWN": "Starts",
            "DEL_FLAG_VIEW": "N"
        };

        HeadcountManagementDetailedViewSaveService.save(
        data,
        function (response) {
            console.log('save view response =', response);
            $modalInstance.close();
            var successMessage = "Successfully saved the view";
            toaster.pop('success', successMessage);
        }, function (err) {
            var errMessage = "Headcount management detailed view save view error";
            console.error(errMessage, err);
            toaster.pop('error', errMessage);
        });
    };

}]);