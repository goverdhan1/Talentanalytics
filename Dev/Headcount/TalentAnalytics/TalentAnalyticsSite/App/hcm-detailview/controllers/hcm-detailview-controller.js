(function (angular) {
    'use strict';
    function HeadcountDetailViewController($scope, $stateParams, HeadcountDetailViewMetricsService, toaster) {
        var vm = this;
        vm.title = 'This ctrl title';
        vm.loading = false;
    }
    HeadcountDetailViewController.$inject = ['$scope', '$stateParams', 'HeadcountDetailViewMetricsService', 'toaster'];
    angular.module('headcountDetailView').controller('HeadcountDetailViewController', HeadcountDetailViewController);
})(window.angular);