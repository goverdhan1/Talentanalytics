'use strict';
angular.module('headcountDetailView').controller('HeadcountDetailViewAllViewsController', ['$scope', '$rootScope', '$modal', '$modalInstance',
function ($scope, $rootScope, $modal, $modalInstance) {

    $scope.selectedItem;
    $scope.selectedItemIndex;

    $scope.viewsList = [{
        id: '1',
        title: 'FY14 - Headcount. Consulting, West, Strategy and Operations'
    }, {
        id: '1',
        title: 'FY13 - Headcount. Strategy and Operations'
    }, {
        id: '1',
        title: 'FY13 - HEadcount. Consulting'
    }];

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.selectView = function (index, item) {
        $scope.selectedItem = item;
        $scope.selectedItemIndex = index;
    };

    $scope.renameView = function (index, item) {
        $scope.selectedItem = item;
        $scope.selectedItemIndex = index;
        $modalInstance.dismiss('cancel');
        var _scope = $rootScope.$new();
        _scope.renamedViewName = $scope.viewsList[$scope.selectedItemIndex].title;
        $modal.open({
            templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-rename-view-modal.html',
            controller: 'HeadcountDetailViewRenameViewController',
            scope: _scope
        });

    };

    $scope.removeView = function (index, item) {
        $scope.selectedItem = item;
        $scope.selectedItemIndex = index;
        var _scope = $rootScope.$new();
        _scope.viewName = $scope.viewsList[$scope.selectedItemIndex].title;
        $modal.open({
            templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-remove-view-modal.html',
            controller: 'HeadcountDetailViewRemoveViewController',
            scope: _scope
        });
    };

    $scope.generateView = function () {
        console.log('generateView');
    };

}]);