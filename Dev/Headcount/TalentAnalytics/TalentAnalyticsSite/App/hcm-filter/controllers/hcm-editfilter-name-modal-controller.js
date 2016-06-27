'use strict';
angular.module('headcountManagementFilter').controller('HcmEditfilterNameModalController', function ($scope, $modalInstance, UserDetails) {
    $scope.newFilterName = { fileName: $scope.$parent.form.selectedFilter };

    $scope.selectAllContent = function ($event) {
        $event.target.select();
    };
    $scope.Apply = function () {
        $scope.doPost(UserDetails.userId, $scope.$parent.form.selectedFilter, '', '', '', '', '', '', '', '', $scope.newFilterName.fileName,
            function (data) {
                $scope.$parent.form.selectedFilter = $scope.newFilterName.fileName;
                $modalInstance.dismiss('cancel');
                $scope.bindSavedFilter($scope.selectedFilter);
                $scope.selectedFilter = $scope.newFilterName.fileName;
            });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});