'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('detailedViewDataTable').factory('DetailedViewBasicInfoService', ['$resource', 'CoreConstants', 'taCurrencyFilter', function ($resource, CoreConstants, taCurrencyFilter) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Basic_Info_Detailed.xsodata/EMPLOYEE_QV_BASIC_INFO_DETAILEDParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
    return $resource(url, { employeeId: '@employeeId' }, {
        'get': {
            method: 'GET',
            withCredentials: true,
            transformResponse: function (data) {
                data = angular.fromJson(data);
                if (data && data.d && data.d.results && data.d.results.length > 0) {
                    if (data.d.results[0].ANSALARY !== undefined && data.d.results[0].ANSALARY !== null) {
                        data.d.results[0].ANSALARY = taCurrencyFilter(data.d.results[0].ANSALARY, data.d.results[0].CURR_ANSAL);
                    }
                }
                return data;

            }

        }
    });
}
]);