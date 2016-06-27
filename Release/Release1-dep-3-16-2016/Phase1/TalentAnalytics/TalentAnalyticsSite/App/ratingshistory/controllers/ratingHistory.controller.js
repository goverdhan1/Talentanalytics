'use strict';

angular.module('ratingHistory').controller('RatingHistoryController', ['$scope', 'RatingHistoryService', '$stateParams', 'CoreConstants', 'ExportData',
    function ($scope, RatingHistoryService, $stateParams, CoreConstants, ExportData) {

        $scope.setEmployeeId = function () {
            $scope.employeeId = $stateParams.employeeId;
        };

        $scope.loadDataRating = function () {

            //  Clean ExportData object as empty. To keep  updated data. (First time load)
            ExportData.sections = null;

            $scope.setEmployeeId();
            RatingHistoryService.get({ employeeId: $scope.employeeId }, function (data) {

                var listyrs = [];
                var listRnk = [];
                if (data && data.list) {
                    data.list.forEach(function (value) {

                        listyrs.push(value.RatingYear)
                        listRnk.push(value.YearRank)
                    })

                    $scope.totalYrs = listyrs;
                    $scope.totalRnks = listRnk;
                  
                }
                /***START- Set data to ExportData obj. ***/

                if (ExportData.sections == undefined || ExportData.sections == null)
                    ExportData.sections = [];

                // TO-DO File name need to change
                ExportData.filename = 'Employee Quickview Summary';
                ExportData.page = $scope.viewType;

                // Bind data based on page.
                var section = {};
                section.header = [{ 'FIELD_LABEL': 'Fiscal Year', 'FIELD_NAME': 'RatingYear' }, { 'FIELD_LABEL': 'GE Appraisal Rating', 'FIELD_NAME': 'YearRank' }];
                section.filters = data.filters;
                var copyratingdata = data.list;
                section.data = angular.copy(copyratingdata);
                section.data.sort(function (a, b) { return b['RatingYear'] - a['RatingYear']; });
                section.title = 'RATINGS HISTORY';
                section.display_order = 4;
                ExportData.sections.push(section);

                /***END- Set data to ExportData obj. ***/
            }, function (err) {
                console.error('The following error occured on trying to retrieve the summary left bar information: ');
                console.log(err);
      
            });
        };
    }]);
