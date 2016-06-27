'use strict';

angular.module('exports').factory('GetPDFContentService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {
    var url = '/Export/PDF';
    return $resource(url, {}, {
        'get': {
            method: 'GET',
            withCredentials: true
        }
    });
}
]);