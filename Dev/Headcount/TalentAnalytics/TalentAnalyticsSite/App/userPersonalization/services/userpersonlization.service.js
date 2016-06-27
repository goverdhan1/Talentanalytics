'use strict';
angular.module('userPersonalization').factory('UserPersonalizationService', ['$resource', 'CoreConstants', 
    function ($resource, CoreConstants) {
        var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Detailed_Screen.xsodata/EMPLOYEE_QV_DETAILED_SCREENParameters(USERNAME=':userName',SERVICENAME=':serviceName', IP_PGEPERSID=':employeeId')/Results?$format=json";
        return $resource(url, { userName: '@userName', serviceName: '@serviceName', employeeId: '@employeeId' }, {
            'get': {
                method: 'GET',
                withCredentials: true
            }
        });
     
    }
]);

