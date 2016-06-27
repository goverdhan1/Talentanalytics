'use strict';

angular.module('compensationHistory').factory('CompensationHistoryModel', function () {

    function CompensationHistoryModel() {

    }

    function setSupportedCurrencies(model, data) {
        model.supportedCurrencies = [];
        model.supportedCurrencyPropertyChecker = {};
        model.defaultCurrency = 'USD';

        if (data.length > 0) {
            model.defaultCurrency = data[0].DEFAULT_CURR;
            data.forEach(function (row) {
                var currency = row.CURR_ANSAL;
                if (currency && !model.supportedCurrencyPropertyChecker[currency]) {
                    model.supportedCurrencies.push(currency);
                    model.supportedCurrencyPropertyChecker[currency] = true;
                }
            });
        } else {
            model.supportedCurrencies.push('USD');
        }

        model.hasMultipleCurrencies = model.supportedCurrencies.length > 1;
    }

    function getParsedYear(val) {
        if (!val) {
            return 0;
        }
        var dt = new Date(val);
        var yr = dt.getFullYear();
        return new Date(yr);
    }

    function getIntValueOrZero(value) {
        if (value && value.length > 0) {
            return Math.round(value);
        }
        return 0;
    }

    function getDateTicks(val) {
        if (!val || !val.length === 23) {
            return 0;
        }
        return parseInt(val.substring(6, val.length - 2));
    }

    function arrrayMatched(array, val) {
        for (var ctr = 0; ctr < array.length; ctr++) {
            if (array[ctr] === val) {
                return true;
            }
        }
        return false;
    }
    
    function getSortedYearsAndSetYearwiseProperties(model, data) {
        var minYear = null, maxYear = null;
        data.forEach(function (row) {

            row.year = getIntValueOrZero(row.PERSONNEL_YEAR);
            if (!row.year) {
                return;
            }

            if (!minYear) {
                minYear = row.year;
                maxYear = row.year;
                return;
            }

            if (minYear > row.year) {
                minYear = row.year;
            }

            if (maxYear < row.year) {
                maxYear = row.year;
            }
        });

        if (minYear) {
            var years = [];
            for (var year = minYear; year <= maxYear; year++) {

                var entry = { year: year };
                model.supportedCurrencies.forEach(function(currency){
                    entry[currency + 'Salary'] = 0;
                    entry[currency + 'Bonus'] = 0;
                    entry[currency + 'Compensation'] = 0;
                    entry[currency + 'SalaryLatestStartDate'] = 0;
                    entry[currency + 'BonusLatestStartDate'] = 0;
                    entry[currency + 'CompensationLatestStartDate'] = 0;
                });

                years.push(entry);
            }
            return years;
        }

        return null;
    }

    function getSpecificYearData(yearlyData, year) {
        var first = yearlyData[0].year;
        var index = year - first;
        return yearlyData[index];
    }

    function assignValueAfterProperChecks(amount, date, obj, amountPropertyName, datePropertyName){
        if(amount > 0 || amount < 0){
            var notAssignedYet = obj[amountPropertyName] === 0;
            var haveMoreLatest = date >= obj[datePropertyName];
            if(notAssignedYet || haveMoreLatest){
                obj[amountPropertyName] = amount;
                obj[datePropertyName] = date;
            }
        }
    }

    CompensationHistoryModel.prototype.getModelFromResponse = function (response) {

        if (!response || !response.d || !response.d.results) {
            console.error('Invalid response returned by the summary compensation history service.');
            return new CompensationHistoryModel();
        }

        var data = response.d.results;
        var model = new CompensationHistoryModel();

        setSupportedCurrencies(model, data);

        model.yearlyData = getSortedYearsAndSetYearwiseProperties(model, data);
        if (!model.yearlyData) {
            return model;
        }

        data.forEach(function (row) {
            if (!row.year) { //Skip any rows without personnel year
                return;
            }

            var specificYearData = getSpecificYearData(model.yearlyData, row.year);

            var parsedStartDate = getDateTicks(row.PERSONNEL_YEAR_START_DATE);
            var salary =  getIntValueOrZero(row.ANSALARY);
            var bonus = getIntValueOrZero(row.TOTAL_BONUS);
            var tcompensation = getIntValueOrZero(row.TOTAL_COMPENSATION);
            var currency = row.CURR_ANSAL;

            assignValueAfterProperChecks(salary, parsedStartDate, specificYearData, currency + 'Salary', currency + 'SalaryLatestStartDate');
            assignValueAfterProperChecks(bonus, parsedStartDate, specificYearData, currency + 'Bonus', currency + 'BonusLatestStartDate');
            assignValueAfterProperChecks(tcompensation, parsedStartDate, specificYearData, currency + 'Compensation', currency + 'CompensationLatestStartDate');

        });

        return model;
    };

    return CompensationHistoryModel;

});