'use strict';

angular.module('exports').controller('ExportController', ['$scope', 'UserDetails', 'GetCSVContentService', 'GetXLSContentService', 'GetPDFContentService', 'ExportData', '$location',
function ($scope, UserDetails, GetCSVContentService, GetXLSContentService, GetPDFContentService, ExportData, $location) {

    var filename;

    $scope.exportCSV = function () {
        if (ExportData.filename != null)
            filename = ExportData.filename;

        // Making file name empty
        ExportData.filename = null;

        var csvData = GetCSVContentService.get();
        $('#exportValue').val(csvData);
        $('#fileExtension').val('csv');
        $('#exportFilename').val(filename);
        $("#submit").trigger("click");

       
      
    }
    $scope.exportXLS = function () {
        if (ExportData.filename != null)
            filename = ExportData.filename;

        // Making file name empty
        ExportData.filename = null;

        var xlsData = GetXLSContentService.get();
        $('#exportValue').val(xlsData);
        $('#fileExtension').val('xlsx');
        $('#exportFilename').val(filename);
        $("#submit").trigger("click");

    }
    $scope.exportPDF = function () {
       

        var pdfData = GetPDFContentService.get({
        }, function (response) {


        }, function (error) {
            console.log("Unable to export. Error: " + error.statusText)
        });
      

        $('#exportUrl').val(document.URL);
        $('#exportPDFFilename').val(ExportData.filename + '.pdf');

        //$('#exportUrl').val('<html>' + $('html').html()+ '</html>');
        //$('#exportPDFFilename').val(document.URL);
      
        $("#submitPDF").trigger("click");
       
    }
}]);