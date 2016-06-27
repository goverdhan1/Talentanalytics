var summary = angular.module('consolidatedView', ['detailedView']);

summary.controller('consolidatedViewController', ['$scope', 'ConsolidatedLayoutService', '$stateParams', 'UserDetails', 'ConsolidatedViewPostService', 'consolidatedViewMappingModel', 'DetailedViewService','ExportData', function ($scope, ConsolidatedLayoutService, $stateParams, UserDetails, ConsolidatedViewPostService, consolidatedViewMappingModel, DetailedViewService, ExportData) {

    //  Clean ExportData object as empty. To keep  updated data. (First time load)
    ExportData.sections = null;
    ExportData.filename = 'Employee Quickview Detail - Consolidated View';


    $scope.customizeTable = [];
    $scope.$on('consolidatedViewChanged', function (event, data) {

        // Clean ExportData object as empty. To keep  updated data. (When apply column filter)
        ExportData.sections = null;
        ExportData.filename = 'Employee Quickview Detail - Consolidated View';

        $scope.loadVisibleSections();        
    });
    $scope.loadVisibleSections = function () {
        $scope.getEmployeeDetails();
        $scope.allSections = [];
        $scope.visibleSections = [];
        //Get the data for all the available columns
        ConsolidatedLayoutService.get({
            userName: UserDetails.userId,
            employeeId: $stateParams.employeeId
        }, function (data) {
            $scope.allSections = [];
            //Model data for all Visible sections in the consolidated view
            if (data && data.d && data.d.results) {
                angular.forEach(data.d.results, function (key, value) {
                    $scope.allSections.push(key);
                    if (key.REPORT_ORDER && key.REPORT_ORDER > 0) {
                        $scope.visibleSections.push(key);
                    }
                });
                $scope.visibleSections.sort(function (a, b) {
                    return a.REPORT_ORDER - b.REPORT_ORDER;
                });
                ExportData.consolidatedViewReportOrder = $scope.visibleSections;
            }
            
        }, function (err) {
            console.error('Error occured while trying to fetch information from Consolidated View Service is as follows: ' + err);
        });
    }
    $scope.setEmployeeId = function () {
        $scope.employeeId = $stateParams.employeeId;
    };
    $scope.getEmployeeDetails = function(){
        $scope.setEmployeeId();
        DetailedViewService.get({
            employeeId: $scope.employeeId
        }, function (data) {

            $scope.model = data;
        }, function (err) {
            console.error('Error occured while trying to fetch information from Detailed View Service is as follows: ' + err);
        });
    }
    $scope.redirect = function (url) {
        window.open(url, '_blank');
    }

}]);
