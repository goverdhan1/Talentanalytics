'use strict';

angular.module('headcountManagementFilter').factory('hcmFilterValidationService', function (toaster) {
    function validateFTEFilter(attr) {
        var validateDecimalsRegExp = /^[0-9]+(\.[0-9]{1,3})?$/;
        if (typeof attr === 'string') {
            var regularExpression = /(([0-9]{1,}(\.[0-9]{1,})?)(\-([0-9]{1,}(\.[0-9]{1,})?))?)/;
            var filterData = regularExpression.exec(attr)[0].split('-');
            var from = parseFloat(filterData[0]);
            var to = parseFloat(filterData[1]);
        } else {
            var from = arguments[0];
            var to = arguments[1];
        }

        if (to && (to > 999.999 || to < 0 || !validateDecimalsRegExp.exec(to))) {
            return "FTE% filter: Invalid to value"
        } else if (from && (from > 999.999 || from < 0 || !validateDecimalsRegExp.exec(from))) {
            return "FTE% filter: Invalid from value"
        } else if (!from && to) {
            return "FTE% filter: From value can't be blank"
        } else if (from && to && from > to) {
            return "FTE% filter: From value should always be less than the To value"
        } else {
            return false
        }
    };
    function validateFiscalYears(fromYear, fromPeriod, toYear, toPeriod) {
        if (fromYear === toYear) {
            return fromPeriod <= toPeriod
        }
        else {
            return fromYear < toYear;
        }
    }

    function validateCalendarDates(start, end) {
        var start = new Date(start.replace(/-/g, "/"));
        var end = new Date(end.replace(/-/g, "/"));
        return start <= end;
    }
    function validateDateFormat(date)  
    {
        var re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
        if (date != '' && !date.match(re)) {
            return false;
        }
        else {
            return true;
        }
    }


    function validateAllData(attributesString, selectionType) {
        var isHaveInvalidData = false;
        var attributes = attributesString.split(",");
        for (var i = 0; i < attributes.length; i++) {
            var attributeName = attributes[i].split('(')[0];

            switch (attributeName) {
                case 'PAYPCT':
                    var errorMessage = validateFTEFilter(attributes[i]);
                    if (errorMessage) {
                        isHaveInvalidData = true;
                        console.error(errorMessage);
                        toaster.pop('warning', errorMessage);
                    }
                    break;
                case 'DATE':
                    
                    if (selectionType === "CUSTOM-FYP") {
                        var regularExpression = /[^,]*,[^),]*/;
                        var filterData = regularExpression.exec(attributesString)[0].split('(');
                        filterData = filterData[1].split(',');
                        var from = filterData[0].split(" ");
                        var to = filterData[1].split(" ");
                        if (!validateFiscalYears(from[0].slice(-4), from[1], to[0].slice(-4), to[1])) {
                            isHaveInvalidData = true;
                            toaster.pop('warning', "Date Filter: Fiscal end year should be greater than Fiscal start year");
                        }
                    }

                    if (selectionType === "CUSTOM-CD") {
                        var regularExpression = /[^,]*,[^),]*/;
                        var filterData = regularExpression.exec(attributesString)[0].split('(');
                        filterData = filterData[1].split(',');

                        if (!validateCalendarDates(filterData[0], filterData[1]))
                        {
                            isHaveInvalidData=true;
                            toaster.pop('warning', 'Date Filter: Calendar end date should be greater than Calendar start date' )
                        }
                        if (!validateDateFormat(filterData[0])) {
                            isHaveInvalidData = true;
                            toaster.pop('warning', 'Date Filter: Start date format is invalid')
                        }
                        if (!validateDateFormat(filterData[1])) {
                            isHaveInvalidData = true;
                            toaster.pop('warning', 'Date Filter: End date format is invalid')
                        }

                    }
                    break;

            }
        };
        return isHaveInvalidData
    };
    return {
        validateAllData: validateAllData,
        validateFTEFilter: validateFTEFilter,
        validateFiscalYears: validateFiscalYears,
        validateCalendarDates: validateCalendarDates,
        validateDateFormat: validateDateFormat

    };
});