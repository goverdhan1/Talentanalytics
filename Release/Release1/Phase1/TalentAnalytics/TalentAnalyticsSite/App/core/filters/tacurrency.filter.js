'use strict';

angular.module('core').filter('taCurrency', ['INRCurrencyFilter', 'currencyFilter', function (INRCurrencyFilter, currencyFilter) {

    return function (amount, currency) {

        if (!amount || amount.length <= 0) {
            return null;
        }

        switch(currency){
            case 'INR':
                return INRCurrencyFilter(amount, currency + ' ', true);
            default:
                if (amount === parseInt(amount)) {
                    return currencyFilter(parseInt(amount), currency + ' ', 0);
                } else {
                    return currencyFilter(amount, currency + ' ', 2);
                }                
        }

    };
}]);