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
        //var request = new FormData();
        //request.append('docHTML', $('html').html());

        //$.ajax({
        //    type: 'POST',
        //    url: 'http://localhost:35150/Views/Home/Export.aspx',
        //    data: request,
        //    processData : false,
        //    contentType : false, 
        //    success: function (responseData, textStatus, jqXHR) {
        //        var value = responseData.someKey;
        //    },
        //    error: function (responseData, textStatus, errorThrown) {
        //        alert('POST failed.');
        //    }
        //});
        // window.open('http://localhost:35150/Views/Home/Export.aspx');

        var pdfData = GetPDFContentService.get({
        }, function (response) {
            console.log(response)


        }, function (error) {
            console.log("Unable to export. Error: " + error.statusText)
        });

        $('#exportUrl').val(document.URL);
        if (ExportData.filename != null)
            filename = ExportData.filename;

        // Making file name empty
        ExportData.filename = null;

        $('#exportPDFFilename').val(filename + '.pdf');

        var content = $('html').html();

        $('#docHTML').val(content);


        // $('#docHTML').val($('html').html());
        //$('#exportUrl').val('<html>' + $('html').html()+ '</html>');
        //$('#exportPDFFilename').val(document.URL);

        $("#submitPDF").trigger("click");

    }
}]);
