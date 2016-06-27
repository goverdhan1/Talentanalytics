'use strict';

angular.module('exports').factory('GetXLSContentService', ['ExportData', 'HeadcountFormattingNumbersService',
    function (ExportData, HeadcountFormattingNumbersService) {
    return {
        get: function () {

            var exportData = {};
            exportData.employeeName = ExportData.filterName;
            var rowHeaders = [{ rowLabel: 'Beginning Headcount', rowField: 'BEGIN_HC' },
                              { rowLabel: 'Starts', rowField: 'STARTS' },
                              { rowLabel: 'Terms', rowField: 'TERMS' },
                              { rowLabel: 'Transfers In', rowField: 'TRANSFERS_IN' },
                              { rowLabel: 'Transfers Out', rowField: 'TRANSFERS_OUT' },
                              { rowLabel: 'Miscellaneous Adjustments', rowField: 'MISC_ADJ' },
                              { rowLabel: 'Ending Headcount', rowField: 'ENDING_HC' },
                              { rowLabel: 'Beginning LOA', rowField: 'BEGIN_LOA' },
                              { rowLabel: 'Ending LOA', rowField: 'ENDING_LOA' }];

            var gridData = {};
            gridData.title = "";            

            //Populate Header
            var gridHeaders = [];

            var obj1 = {};
            obj1.FIELD_LABEL = '';
            obj1.FIELD_NAME = 'ROWHEADER';
            gridHeaders.push(obj1);

            angular.forEach(ExportData.selectedData, function (val) {
                var obj = {};
                obj.FIELD_LABEL = val.TIME_SCALE;
                obj.FIELD_NAME = val.TIME_SCALE;

                gridHeaders.push(obj);
            });

            gridData.header = gridHeaders;

            //Populate Grid
            var gridBody = [];            

            for (var i = 0; i < rowHeaders.length; i++) {

                var bodyRow1Obj = {};
                bodyRow1Obj['ROWHEADER'] = rowHeaders[i].rowLabel;

                for (var j = 1; j < gridHeaders.length; j++) {

                    for (var k = 0; k < ExportData.selectedData.length; k++) {

                        if (gridHeaders[j].FIELD_NAME == ExportData.selectedData[k]['TIME_SCALE']) {
                            var value = ExportData.selectedData[k][rowHeaders[i].rowField];
                            bodyRow1Obj[gridHeaders[j].FIELD_NAME] = HeadcountFormattingNumbersService.addCommasToNumber(value);
                        }

                    }

                }

                gridBody.push(bodyRow1Obj);
            }

            gridData.data = gridBody;

            exportData.sections = [];
            exportData.sections.push(gridData);
            
            var stringifiedData = JSON.stringify(exportData);
            return stringifiedData;
        }
    }
}]);