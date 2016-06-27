'use strict';

angular.module('employeeSearch').controller('EmployeeSearchController', ['$scope', 'employeeSearch', 'toaster', '$state',
    function ($scope, employeeSearch, toaster, $state) {

        //parameter $scope.resultsPerPage is defined as an attribute to the directive and assigned to scope in the directive definition

        $scope.clearSelection = function () {
            $scope.selectedEmployee = null;
            $(".tatypeahead.dropdown-menu.ng-isolate-scope").css("display", "none");
          
        };

        $scope.getEmployees = function (searchParam) {

            if (!searchParam || searchParam.length < 1) {
                console.error('searchParam is required for the getEmployees function');
                return null;
            }

            if (!$scope.resultsPerPage) {
                console.error('Required attribute results-per-page missing');
                return;
            }

            return $scope.callService(searchParam, 0);
        };

        $scope.getPage = function (searchParam, pageNumber) {
            if (!searchParam || searchParam.length < 1 || !pageNumber) {
                console.error('searchParam and pageNumber are required for the getPage function');
                return;
            }

            if (!$scope.resultsPerPage) {
                console.error('Required attribute results-per-page missing');
                return;
            }

            var pagesToSkip = pageNumber - 1;
            var skipRecords = pagesToSkip * $scope.resultsPerPage;

            return $scope.callService(searchParam, skipRecords);
        };

        $scope.callService = function (searchParam, skipRecords) {
           return employeeSearch.query({
                searchParam: searchParam,
                skipRecords: skipRecords,
                resultsPerPage: parseInt($scope.resultsPerPage,10) + 1 //added an extra row which will be hidden in display but helps in deciding whether the next page button should be enabled
           }).$promise.then(function (data) {
                return data.d.results;
           
           
            }, function (err) {
                console.error('Error returned from the search service: ');
                console.log(err);
                toaster.pop('error', "Employee Search service returned an error");
            });
        };
    }
]);