'use strict';

angular.module('exports').factory('GetXLSContentService', ['ExportData', 'taDetailedViewColumnFilter', function (ExportData, taDetailedViewColumnFilter) {
    return {
        get: function () {
            
            var exportData = angular.copy(ExportData);

            // Sorting array
            exportData.sections.sort(function (a, b) { return a.display_order - b.display_order; });

            // Loop all sections
            angular.forEach(exportData.sections, function (section) {

                // Looping per section objects
                angular.forEach(section.data, function (dataRow) {

                    var formattedDataRow = {};

                    // Loop header to get correct column name
                    angular.forEach(section.header, function (headerRow) {

                        // Calling filter functin to get formatted data
                        dataRow[headerRow.FIELD_NAME] = taDetailedViewColumnFilter(dataRow, headerRow.FIELD_NAME, section.filters);
                    });

                });
            });

            var stringifiedData = JSON.stringify(exportData);
            return stringifiedData;
        }
    }
}]);