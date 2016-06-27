'use strict';

angular.module('consolidatedView').factory('ConsolidatedLayoutService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {
    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Consolidated_Get_Service.xsodata/Consolidated_GetParameters(USERNAME=':userName',IP_PGEPERSID=':employeeId')/Results?$format=json";
        return $resource(url, { userName: '@userName', employeeId: '@employeeId' }, {
            'get': {
                method: 'GET',
                withCredentials: true
            }
        });
}]);



