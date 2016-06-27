'use strict';

angular.module('detailedViewDataTable').filter('taDetailedViewColumn', ['dateFilter', 'taCurrencyFilter', function (dateFilter, taCurrencyFilter) {

    return function (row, column, filters) {
        
        var value = row[column];
        if (!value) {
            return value;
        }

        if (filters && filters[column]) {
            var filterForTheColumn = filters[column];
            var filterName = filterForTheColumn.filterName;
            switch(filterName){
                case 'date':
                    return dateFilter(value, filterForTheColumn.dateFormat || "MM/dd/yyyy");
                case 'taCurrency':
                    return taCurrencyFilter(value, row[filterForTheColumn.currencyColumnName]);
            }
        }

        return (value || ' ');
    };
}]);