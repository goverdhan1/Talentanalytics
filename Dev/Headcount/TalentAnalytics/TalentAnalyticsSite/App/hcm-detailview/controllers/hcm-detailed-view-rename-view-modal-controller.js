'use strict';
angular.module('headcountDetailView').controller('HeadcountDetailViewRenameViewController', ['$scope', '$modal', '$modalInstance',
function ($scope, $modal, $modalInstance) {
    var previousName = $scope.renamedViewName;
    Object.defineProperties($scope, {
        localName: {
            get: function () {
                return $scope.renamedViewName
            },
            set: function (newVal) {
                $scope.renamedViewName = newVal
            }
        }
    });

    $scope.nameEnterError = false;

    $scope.cancel = function () {
        $scope.renamedViewName = previousName;
        $modalInstance.dismiss('cancel');
        $modal.open({
            templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-all-views-modal.html',
            controller: 'HeadcountDetailViewAllViewsController'
        });
    };

    $scope.save = function () {
        if (!$scope.renamedViewName) {
            $scope.nameEnterError = true;
            return
        };
        $modalInstance.dismiss('cancel');
        $modal.open({
            templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-all-views-modal.html',
            controller: 'HeadcountDetailViewAllViewsController'
        });
    };
}]);