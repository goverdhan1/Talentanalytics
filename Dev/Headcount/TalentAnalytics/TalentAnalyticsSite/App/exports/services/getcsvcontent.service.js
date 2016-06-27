'use strict';

angular.module('exports').factory('GetCSVContentService', ['ExportData', 'HeadcountFormattingNumbersService',
    function (ExportData, HeadcountFormattingNumbersService) {
    return {
        get: function () {

            var nextRow = '\n';
            var nextColumn = ',';
            var csvString = nextRow;
            var rowHeaders = [{ rowLabel: '', rowField: 'TIME_SCALE' },
                              { rowLabel: 'Beginning Headcount', rowField: 'BEGIN_HC' },
                              { rowLabel: 'Starts', rowField: 'STARTS' },
                              { rowLabel: 'Terms', rowField: 'TERMS' },
                              { rowLabel: 'Transfers In', rowField: 'TRANSFERS_IN' },
                              { rowLabel: 'Transfers Out', rowField: 'TRANSFERS_OUT' },
                              { rowLabel: 'Miscellaneous Adjustments', rowField: 'MISC_ADJ' },
                              { rowLabel: 'Ending Headcount', rowField: 'ENDING_HC' },
                              { rowLabel: 'Beginning LOA', rowField: 'BEGIN_LOA' },
                              { rowLabel: 'Ending LOA', rowField: 'ENDING_LOA' }];
            

            //Pushing Filtername
            csvString = csvString + '"' + ExportData.filterName + '"' + nextRow;               
            

            //Each row header (left most column) is taken from 'rowHeaders' and respecctive data is taken from ExportData.rangevalues
            //At end of nestedloops csvString contains data as it's shown in Grid view in app
            angular.forEach(rowHeaders, function (rowHeader) {
                csvString = csvString + '"' + rowHeader.rowLabel + '"' + nextColumn;
                angular.forEach(ExportData.selectedData, function (griddata) {
                    csvString = csvString + '"' + HeadcountFormattingNumbersService.addCommasToNumber(griddata[rowHeader.rowField]) + '"' + nextColumn;
                });
                csvString = csvString + nextRow;
            });            

            return csvString;
        }
    }
}]);