'use strict';

angular.module('headcountManagementFilter').directive("hcmDateFilters", function (HeadcountManagementFilterPostService, HeadcountManagementFilterData, HeadcountManagementDateFilterChangeDates, UserDetails, hcmFilterValidationService, toaster, ustageStatistics) {
    return {
        restrict: 'E',
        templateUrl: 'App/hcm-filter/views/hcm-datefilter-view.html',
        scope: {
            handleToDirectiveFunctions: '='
        },
        controller: function ($scope, ustageStatistics) {
            $scope.fiscalDates = {
                fiscalYearStart: null,
                fiscalYearEnd: null,
                fiscalPeriodStart: '01',
                fiscalPeriodEnd: '01'
            }
            $scope.startDate = '';
            $scope.endDate = '';
            $scope.fiscalPeriods = [{
                id: '1',
                val: '01'
            },
            {
                id: '2',
                val: '02'
            },
            {
                id: '3',
                val: '03'
            },
            {
                id: '4',
                val: '04'
            },
            {
                id: '5',
                val: '05'
            },
            {
                id: '6',
                val: '06'
            },
            {
                id: '7',
                val: '07'
            },
            {
                id: '8',
                val: '08'
            },
            {
                id: '9',
                val: '09'
            },
            {
                id: '10',
                val: '10'
            },
            {
                id: '11',
                val: '11'
            },
            {
                id: '12',
                val: '12'
            },
            {
                id: '13',
                val: '13'
            }];

            var timeFilter = {
                "STANDARD": [
                   { reportName: "R13", reportType: "Rolling 13 last period end", reportNameTitle: "R13", reportTypeTitle: "R13 last period end" },
                   { reportName: "YOY R13", reportType: "YOY Rolling 13 last period end", reportNameTitle: "YoY R13", reportTypeTitle: "YoY R13 last period end" },
                   { reportName: "YTD", reportType: "YTD last period end", reportNameTitle: "YTD", reportTypeTitle: "YTD last period end" },
                   { reportName: "YOY YTD", reportType: "YOY YTD last period end", reportNameTitle: "YoY YTD", reportTypeTitle: "YoY YTD last period end" },
                   { reportName: "PTD", reportType: "Open period (PTD)", reportNameTitle: "PTD", reportTypeTitle: "Open period (PTD)" }
                ],

                "CUSTOM": [
                    { reportName: "CD-FY", reportType: "Fiscal Year" },
                    { reportName: "CD-FQ", reportType: "Fiscal Quarter" },
                    { reportName: "CD-FP", reportType: "Fiscal Period" },
                    { reportName: "CD-DY", reportType: "Days" }
                ],

                "CHARTSCALE": [
                    { reportName: "FY", reportType: "Fiscal Year" },
                    { reportName: "FP", reportType: "Fiscal Period" },
                ]
            }
            $scope.timeFilter = timeFilter;
            $scope.standardtBtn = function () {
                $scope.customView = false;
                if (typeof $scope.standardSelect != 'undefined')
                    $scope.$parent.selectedRadioValues = $scope.standardSelect.reportNameTitle + "-" + $scope.chartScaleSelect.reportName;
                $scope.changeEndDateCheck = function (index, event) {

                    ustageStatistics.analyticsValue("Standard Views- Change End date|HM-Standard-Views");

                    if (!$scope.changeEndDate) {
                        $scope.changeEndDateFY = '';
                        $scope.periodValues = '';
                    }
                    else {
                        $scope.changeEndDateFY = $scope.defaultYear;
                        $scope.periodValues = $scope.defaultPeriod;
                    }
                }
                $scope.standvalidatedyr = function () {
                    ustageStatistics.analyticsValue("Standard Views- Change End date-Year|HM-Standard-Views");
                }
                $scope.standvalidatedvlues = function () {
                    ustageStatistics.analyticsValue("Standard Views- Change End date- Period|HM-Standard-Views");
                }

            }

            HeadcountManagementDateFilterChangeDates.get(function (data) {
                $scope.changeEndDates = data.results;
                var defaultYear = "";
                var defaultPeriod = "";

                angular.forEach($scope.changeEndDates, function (value, key) {
                    if (value.DEFAULT_YEAR > 0) {
                        defaultYear = value.DEFAULT_YEAR;
                    }
                    if (value.DEFAULT_PERIOD > 0) {
                        defaultPeriod = value.DEFAULT_PERIOD;
                    }
                });
                $scope.defaultYearValue = defaultYear;
                $scope.defaultPeriodValue = defaultPeriod;

                $scope.defaultYear = "FY" + $scope.defaultYearValue;
                $scope.defaultPeriod = $scope.defaultPeriodValue;

                var checkStartYear = typeof $scope.fiscalDates.fiscalYearStart == undefined || $scope.fiscalDates.fiscalYearStart == null;
                var checkEndYear = typeof $scope.fiscalDates.fiscalYearEnd == undefined || $scope.fiscalDates.fiscalYearEnd == null;
                var checkStartPeriod = typeof $scope.fiscalDates.fiscalPeriodStart == undefined || $scope.fiscalDates.fiscalPeriodStart == null;
                var checkEndPeriod = typeof $scope.fiscalDates.fiscalPeriodEnd == undefined || $scope.fiscalDates.fiscalPeriodEnd == null;
                if (checkStartYear || checkEndYear || checkStartPeriod || checkEndPeriod)
                    setFiscalDates();
            });

            $scope.customBtn = function () {
                $scope.customView = true;
                $scope.$parent.selectedRadioValues = $scope.customSelect.reportName;
                setCDDates();
                if ($scope.fiscalDates.fiscalYearStart == undefined) {
                    setFiscalDates();
                }
            }

            $scope.FYPDates = function () {
                setFiscalDates();
                $scope.fiscalSectionChecked = true;
                ustageStatistics.analyticsValue("Custom Date Range-  Fiscal Year/Period|HM-Standard-Views");
            }

            $scope.CDDates = function () {
                setCDDates();
                $scope.fiscalSectionChecked = false;
                ustageStatistics.analyticsValue("Custom Date Range- Calendar Dates|HM-Standard-Views");
            }

            $scope.changeEndDateFY = $scope.defaultYear;
            $scope.periodValues = $scope.defaultPeriod;
            $scope.handleToDirectiveFunctions.set = function () {
                if (HeadcountManagementFilterData.selectedAttributeValues && HeadcountManagementFilterData.selectedAttributeValues.DATE) {
                    var dateFilterData = HeadcountManagementFilterData.selectedAttributeValues.DATE;
                    $scope.standardSelect = timeFilter.STANDARD[0];
                    $scope.chartScaleSelect = timeFilter.CHARTSCALE[1];
                    $scope.customSelect = timeFilter.CUSTOM[2];
                    if (dateFilterData.SELECTION_TYPE === 'CUSTOM-CD') {
                        $scope.customView = true;
                        $scope.startDate = dateFilterData.CSTARTYEARPERIOD;
                        $scope.endDate = dateFilterData.CENDYEARPERIOD;
                        $scope.sectionCalendarChecked = true;
                        timeFilter.CUSTOM.forEach(function (val, idx) {
                            if (val.reportName == dateFilterData.CHART_SCALE) {
                                $scope.customSelect = timeFilter.CUSTOM[idx];
                            }
                        });


                    } else if (dateFilterData.SELECTION_TYPE === 'CUSTOM-FYP') {

                        $scope.fiscalSectionChecked = true;
                        $scope.customView = true;

                        $scope.fiscalDates.fiscalYearStart = dateFilterData.CUSTOM_START_YEAR;
                        $scope.fiscalDates.fiscalPeriodStart = dateFilterData.CUSTOM_START_PERIOD;
                        $scope.fiscalDates.fiscalYearEnd = dateFilterData.CUSTOM_END_YEAR;
                        $scope.fiscalDates.fiscalPeriodEnd = dateFilterData.CUSTOM_END_PERIOD;

                        timeFilter.CUSTOM.forEach(function (val, idx) {
                            if (val.reportName == dateFilterData.CHART_SCALE) {
                                $scope.customSelect = timeFilter.CUSTOM[idx];
                            }
                        });

                    }
                    else {
                        $scope.customView = false;
                        $scope.changeEndDateFY = dateFilterData.CDYEAR;
                        $scope.periodValues = dateFilterData.CDPERIOD;
                        if (dateFilterData.CDPERIOD === null) {
                            $scope.changeEndDate = false;
                        } else {
                            $scope.changeEndDate = dateFilterData.CDYEAR.length > 0;
                        }

                        timeFilter.STANDARD.forEach(function (val, idx) {
                            if (val.reportName == dateFilterData.REPORT_NAME) {
                                $scope.standardSelect = timeFilter.STANDARD[idx];
                            }
                        });

                        timeFilter.CHARTSCALE.forEach(function (val, idx) {
                            var reportName = (dateFilterData.CHART_SCALE).substr((dateFilterData.CHART_SCALE).indexOf("-") + 1);
                            if (val.reportName == reportName) {
                                $scope.chartScaleSelect = timeFilter.CHARTSCALE[idx];
                            }
                        });

                    }
                }
            }
            $scope.handleToDirectiveFunctions.get = function () {

                if ($scope.customView) {
                    var radios = document.getElementsByName('customChartScale');

                    $scope.chartScale = $scope.customSelect.reportName;
                    $scope.datePickerRange = $scope.startDate + "," + $scope.endDate;
                    $scope.datePickerValues = $scope.datePickerRange;
                    $scope.miandatavlues;
                    for (var i = 0, length = radios.length; i < length; i++) {
                        if (radios[i].checked) {
                            $scope.miandatavlues = radios[i].value;
                            break;
                        }
                    }

                    if ($scope.checkedsectiontype === "FYP" || $scope.miandatavlues === "FYP") {
                        $scope.selectionType = "CUSTOM" + "-" + document.getElementById("fiscalyearperiod").value;
                        $scope.datePickerValues = $scope.fiscalDates.fiscalYearStart + " " + $scope.fiscalDates.fiscalPeriodStart + "," + $scope.fiscalDates.fiscalYearEnd + " " + $scope.fiscalDates.fiscalPeriodEnd;
                    }
                    else if ($scope.checkedsectiontype === "CD" || $scope.miandatavlues === "CD") {
                        $scope.selectionType = "CUSTOM" + "-" + document.getElementById("calendardates").value;
                        $scope.datePickerValues = $scope.startDate + "," + $scope.endDate;
                    }


                    $scope.report_Name = $scope.standardSelect.reportName;
                    $scope.report_Type = "";

                }

                else {
                    if ($scope.changeEndDateFY && $scope.changeEndDateFY.length && $scope.periodValues && $scope.periodValues.length) {
                        $scope.datePickerValues = $scope.changeEndDateFY + "," + $scope.periodValues;
                    } else {
                        $scope.datePickerValues = "";
                    }
                    $scope.report_Name = $scope.standardSelect.reportName;
                    $scope.report_Type = $scope.standardSelect.reportType;
                    $scope.selectionType = "STANDARD";
                    $scope.chartScale = $scope.standardSelect.reportName + "-" + $scope.chartScaleSelect.reportName;
                }

                return {
                    ATTRIBUTE: "DATE(" + $scope.datePickerValues + ")",
                    REPORTING_TYPE: $scope.report_Type,
                    SELECTION_TYPE: $scope.selectionType,
                    REPORT_NAME: $scope.report_Name,
                    CHART_SCALE: $scope.chartScale,

                };
            };
            $scope.radioButtonChange = function (standardSelect, customSelect, chartScaleSelect) {

                if ($scope.customView)
                    $scope.$parent.selectedRadioValues = $scope.customSelect.reportName;
                else
                    $scope.$parent.selectedRadioValues = $scope.standardSelect.reportNameTitle + '-' + $scope.chartScaleSelect.reportName;

                if (standardSelect.reportName === "R13") {
                    ustageStatistics.analyticsValue("Standard Views- Rolling 13 last Period End|HM-Standard-Views");
                }
                else if (standardSelect.reportName === "YOY R13") {
                    ustageStatistics.analyticsValue("Standard Views-YOY Rolling 13 last Period end|HM-Standard-Views");
                }
                else if (standardSelect.reportName === "YTD") {
                    ustageStatistics.analyticsValue("Standard Views-YTD last period end|HM-Standard-Views");
                }
                else if (standardSelect.reportName === "YOY YTD") {
                    ustageStatistics.analyticsValue("Standard Views-YOY YTD last Period  end|HM-Standard-Views");
                }
                else if (standardSelect.reportName === "PTD") {
                    ustageStatistics.analyticsValue("Standard Views-Open Period (PTD)|HM-Standard-Views");
                }
                else if (standardSelect.reportName === "FY") {
                    if ($scope.customView === true) {
                        ustageStatistics.analyticsValue("Custom Date Range Chart scale- Fiscal Year|HM-Chart-Scale");
                    } else {
                        ustageStatistics.analyticsValue("Standard Views- Chart Scale- Fiscal Year|HM-Chart-Scale");
                    }

                }
                else if (standardSelect.reportName === "FP") {
                    if ($scope.customView === true) {
                        ustageStatistics.analyticsValue("Custom Date Range Chart scale- Fiscal Period|HM-Chart-Scale");
                    } else {
                        ustageStatistics.analyticsValue("Standard Views- Chart Scale- Fiscal Period|HM-Chart-Scale");
                    }

                }
                else if (standardSelect.reportName === "DY") {
                    ustageStatistics.analyticsValue("Custom Date Range Chart scale- Days|HM-Chart-Scale");
                }
                else if (standardSelect.reportName === "FQ") {
                    ustageStatistics.analyticsValue("Custom Date Range Chart scale- Fiscal Quarter|HM-Chart-Scale");
                }
            }
            $scope.startDataUsage = function () {
                ustageStatistics.analyticsValue("Custom Date Range- select start date in Calendar|HM-Standard-Views");
            }
            $scope.endDataUsage = function () {
                ustageStatistics.analyticsValue("Custom Date Range- select end date in Calendar|HM-Standard-Views");
            }
            $scope.validateFiscalYears = function () {
                return hcmFilterValidationService.validateFiscalYears($scope.fiscalDates.fiscalYearStart, $scope.fiscalDates.fiscalPeriodStart, $scope.fiscalDates.fiscalYearEnd, $scope.fiscalDates.fiscalPeriodEnd);
            }
            $scope.validateCalendarDates = function () {
                return hcmFilterValidationService.validateCalendarDates($scope.startDate, $scope.endDate);
            }
            $scope.validateStartDateFormat = function () {
                return hcmFilterValidationService.validateDateFormat($scope.startDate);
            }
            $scope.validateEndDateFormat = function () {
                return hcmFilterValidationService.validateDateFormat($scope.endDate);
            }
            
            function setFiscalDates() {
                setFiscalYears();
                setFiscalPeriods();
            }
            function setFiscalYears() {
                $scope.fiscalDates.fiscalYearStart = $scope.defaultYear;
                $scope.fiscalDates.fiscalYearEnd = $scope.defaultYear;
            }
            function setFiscalPeriods() {
                var defaultPeriodIndex;
                angular.forEach($scope.fiscalPeriods, function (item, index) {
                    if (item.id === $scope.defaultPeriod) {
                        return defaultPeriodIndex = index;
                    }
                });
                if (typeof defaultPeriodIndex === 'undefined') {
                    $scope.fiscalDates.fiscalPeriodEnd = '01';
                    $scope.fiscalDates.fiscalPeriodStart = '01';
                }
                else {
                    $scope.fiscalDates.fiscalPeriodEnd = $scope.fiscalPeriods[defaultPeriodIndex].val;
                    $scope.fiscalDates.fiscalPeriodStart = $scope.fiscalPeriods[defaultPeriodIndex].val;
                }
                
            }
            function setCDDates() {
                var dateFilterData = HeadcountManagementFilterData.selectedAttributeValues.DATE;
                var year, month;

                if (dateFilterData.CSTARTYEARPERIOD.length === 6) {
                    year = dateFilterData.CSTARTYEARPERIOD.substring(0, 4);
                    month = dateFilterData.CSTARTYEARPERIOD.substring(4, 6);
                    $scope.startDate = year + '-' + month+'-' + '01';
                }
                else {
                    $scope.startDate = dateFilterData.CSTARTYEARPERIOD;
                }

                if (dateFilterData.CENDYEARPERIOD.length === 6) {
                    year = dateFilterData.CSTARTYEARPERIOD.substring(0, 4);
                    month = dateFilterData.CSTARTYEARPERIOD.substring(4, 6);
                    $scope.endDate = year + '-' + month + '-' + '01';
                }

                else {
                    $scope.endDate = dateFilterData.CENDYEARPERIOD;
                }
            }
        },
        link: function (scope, element, attrs) {

            $("#date-picker-2").datepicker({
                dateFormat: 'yy-mm-dd',
                onClose: function (selectedDate) {
                    $("#date-picker-3").datepicker("option", "minDate", selectedDate);
                }
            });
            $("#date-picker-3").datepicker({
                dateFormat: 'yy-mm-dd',
                onClose: function (selectedDate) {
                    $("#date-picker-2").datepicker("option", "maxDate", selectedDate);
                }
            });

        }

    }
    function changeElementDisplayProp(elementId, displayTo) {
        var element = document.getElementById(elementId);

        if (element !== null) {
            element.style.display = displayTo;
        }
    }
});
