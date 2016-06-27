'use strict';


angular.module('exports').controller('ExportController',
function ($scope, $modal, ExportData, GetCSVContentService, GetXLSContentService, ustageStatistics) {
    var filename;
    $scope.export = function (value) {
        if (ExportData.rangevalues && ExportData.rangevalues.length) {
            switch (value) {
                case "CSV":
                    exportCSV();
                    break;
                case "XLSX":
                    exportXLS();
                    break;
                case "PDF":
                    if (validateExport(value))
                        exportPDF();
                    else {
                       var modalInstance = $modal.open({
                            templateUrl: 'App/exports/views/hcm-export-warning-modal.html',
                            scope: $scope,
                            controller: 'ExportPopUpController'
                        });
                        modalInstance.result.then(function () {
                            //this is called when the modal is closed.
                            $("body").removeClass("modal-open");
                        },
                        function () {
                            //this is called when the modal is dismissed.
                            $("body").removeClass("modal-open");
                        });
                    
                    }
                    break;
            }
            $('#exportPDFFilename').val(ExportData.filename + '.pdf');
        }
    }
    var exportPDF = function () {
        ustageStatistics.analyticsValue("HM Summary- Export Button|HM_Summary")

        if (ExportData.filename != null)
            filename = ExportData.filename;

        // Making file name empty
        ExportData.filename = null;


        $('#exportUrl').val(document.URL);
        $('#exportPDFFilename').val(filename + '.pdf');
        $('#clientHeight').val(document.body.clientHeight); 
        var content = $('html').html();
        $('#docHTML').val(content);
        $("#submitPDF").trigger("click");
    }

    var exportXLS = function () {
        ustageStatistics.analyticsValue("HM Summary- Export Button|HM_Summary")
        if (ExportData.filename != null)
            filename = ExportData.filename;

        // Making file name empty
        ExportData.filename = null;

        var xlsData = GetXLSContentService.get();
        $('#exportValue').val(xlsData);
        $('#fileExtension').val('xlsx');
        $('#exportFilename').val(filename);
        createImage(function (chartImageData) {
            $('#chartImageData').val(chartImageData);
            $("#submit").trigger("click");
        });
    }

    var exportCSV = function () {
        ustageStatistics.analyticsValue("HM Summary- Export Button|HM_Summary")
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

    var validateExport = function (value) {
        // TODO check file size
        var validate = false;
        var exportRangeValues = ExportData.rangevalues;
        var chartScate = exportRangeValues[0].CHART_SCALE;

        validate = exportRangeValues[0].SELECTION_TYPE != "STANDARD" ?
            (chartScate == 'DY' || chartScate == 'FP' || chartScate == "FY" || chartScate == 'FQ') && ExportData.rangevalues.length <= 16 : true;

        return validate;
    }

    function createImage(callBack) {
        setTimeout(function () {
            var svgOriginal = document.getElementById('svgChart');
            if (svgOriginal === null) {
                return;
            }

            // Svg object need to be modified therefore create new one.
            var svg = svgOriginal.cloneNode(true);
            updateInlineStylesFromClasses(svg);

            var svgString = new XMLSerializer().serializeToString(svg);            
            var DOMURL = self.URL || self.webkitURL || self;
            var img = new Image();
            var svg = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
            var url = DOMURL.createObjectURL(svg);
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0);
                var data = canvas.toDataURL("image/png");
                callBack(data);
            };
            img.src = url;
        });
    }

    function updateInlineStylesFromClasses(svg) {
        var used = "";        

        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            var rules = sheets[i].cssRules;
            if (rules === null) {
                continue;
            }

            for (var j = 0; j < rules.length; j++) {
                var rule = rules[j];
                if (typeof (rule.style) != "undefined") {
                    try {
                        var elems = svg.querySelectorAll(rule.selectorText);
                        if (elems.length > 0) {
                            used += rule.selectorText + " { " + rule.style.cssText + " }\n";
                        }
                    }
                    catch (e) { }
                }
            }
        }

        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.innerHTML = used;

        var defs = document.createElement('defs');
        defs.appendChild(s);
        svg.insertBefore(defs, svg.firstChild);
    }    
});
angular.module('exports').controller('ExportPopUpController',
function ($scope, $modalInstance) {
    $("body").addClass("modal-open");
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
    $scope.exportToExcel = function (value) {
        $scope.export("XLSX");
        $scope.cancel();
    }
});