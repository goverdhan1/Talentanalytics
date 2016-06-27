'use strict';

angular.module('certificationSummary').controller('CertificationSummaryController', ['$scope', '$stateParams', 'CertificationSummaryService', 'CoreConstants', 'ExportData',

function ($scope, $stateParams, CertificationSummaryService, CoreConstants, ExportData) {

    $scope.setEmployeeId = function () {
        $scope.employeeId = $stateParams.employeeId;
    };

    $scope.loadDataCertificationSummary = function () {

        //  Clean ExportData object as empty. To keep  updated data. (First time load)
        ExportData.sections = null;
   
        $scope.setEmployeeId();

        CertificationSummaryService.get({
            employeeId: $scope.employeeId
        }, function (data) {

            $scope.CertificationSummaryModel = data;
            $scope.certificationSummaryNoDataFound = !data || !data.list || data.list.length <= 0;

            /***START- Set data to ExportData obj. ***/

            if (ExportData.sections == undefined || ExportData.sections == null)
                ExportData.sections = [];

            // TO-DO File name need to change
            ExportData.filename = 'Employee Quickview Summary';
            ExportData.page = $scope.viewType;

            // Bind data based on page.
            var section = {};
            section.header = [{ 'FIELD_LABEL': 'Certification', 'FIELD_NAME': 'certificationDesc' }, { 'FIELD_LABEL': 'Proficiency Q/R', 'FIELD_NAME': 'proficiency' }, { 'FIELD_LABEL': 'Effective Date', 'FIELD_NAME': 'certificationeffectiveDate' }];
            section.filters = data.filters;
            section.data = data.list;
            section.title = 'CERTIFICATION DETAILS';
            section.display_order = 5;
            ExportData.sections.push(section);

            /***END- Set data to ExportData obj. ***/
        }, function (err) {
            console.error('Error occured while trying to fetch information from Detailed View Service is as follows: ');
            console.error(err);
        });

    };
}]);
