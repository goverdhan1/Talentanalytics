'use strict';
angular.module('headcountDetailView').controller('HeadcountDetailViewRemoveViewController', ['$scope', '$modalInstance',
function ($scope, $modalInstance) {
    $scope.deleteView = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);