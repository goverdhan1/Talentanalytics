'use strict';

angular.module('exports').factory('GetCSVContentService', ['ExportData', 'taDetailedViewColumnFilter', function (ExportData, taDetailedViewColumnFilter) {
    return {
        get: function () {

            var nextRow = '\n';
            var nextColumn = ',';
            var csvString = nextRow;
            
            csvString = csvString + '"' + ExportData.employeeName + '"' + nextRow;

            //var geturl = document.URL;
            //if (geturl.search("detailedView") > 0 || geturl.search("consolidatedView") > 0) {
            //    csvString = csvString + 'Personnel Sub Area Desc' + nextColumn + 'Employee Job Level' + nextColumn + 'Desk Phone' + nextRow;
            //    csvString = csvString + " " + ExportData.location + nextColumn + ExportData.jobLevel + nextColumn + ExportData.desphone + nextRow + nextRow;
            //}

            if (ExportData.showHeaderInfo != null && ExportData.showHeaderInfo == true) {
                csvString = csvString + 'Personnel Sub Area Desc' + nextColumn + 'Employee Job Level' + nextColumn + 'Desk Phone' + nextRow;
                csvString = csvString + " " + ExportData.location + nextColumn + ExportData.jobLevel + nextColumn + ExportData.desphone + nextRow + nextRow;
            }


            // Sorting array
            ExportData.sections.sort(function (a, b) {return a.display_order - b.display_order;});


            // Loop All section
            angular.forEach(ExportData.sections, function (section) {
               

              csvString = csvString + nextRow + section.title + nextRow;

              

 
                angular.forEach(section.header, function (headerRow) {

                     // For basic info bind in column
                    if (section.title != 'BASIC INFO DETAIL')
                        csvString = csvString + '"' + headerRow.FIELD_LABEL + '"' + nextColumn
          
                });

                csvString = csvString + nextRow;

                if (section.data.length == 0) {
                    csvString = csvString + 'No data avilable' + nextRow;
                }
                else {
                    angular.forEach(section.data, function (dataRow) {
                      
                        angular.forEach(section.header, function (headerRow, index) {
                            

                            var columnValue = '';
                            var columnValue = taDetailedViewColumnFilter(dataRow, headerRow.FIELD_NAME, section.filters);
                          
                         
                            if (columnValue == null)
                                columnValue = '';

                            if (section.title != 'BASIC INFO DETAIL') {
                                csvString = csvString  + '"' + columnValue + '"' + nextColumn;
                            }
                            else {
                                if (index == 0 || index % 2 == 0) {
                                    csvString = csvString + '"' + headerRow.FIELD_LABEL + '"' + nextColumn  +'"' + columnValue + '"';
                                }
                                else {
                                    csvString = csvString + nextColumn + '"' + headerRow.FIELD_LABEL + '"' + nextColumn  +'"' + columnValue + '"' + nextRow;
                                }
                            }
                        });

                        csvString = csvString + nextRow;

                    });
                    csvString = csvString + nextRow;

                }
               
            });

            return csvString;
        }
    }
}]);