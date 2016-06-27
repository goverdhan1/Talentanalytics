'use strict';

//Service used for communicating with the a test OData endpoints
angular.module('jobHistory').factory('JobHistoryService', ['$resource', 'CoreConstants', 'JobHistoryModel', function ($resource, CoreConstants, JobHistoryModel) {
    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Job_History_Summary.xsodata/EMPLOYEE_QV_JOB_HISTORY_SUMMARYParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
    return $resource(url, { employeeId: '@employeeId' }, {
        'get': {
            method: 'GET',
            withCredentials: true,
            transformResponse: function (data) {
                data = angular.fromJson(data);
                return JobHistoryModel.prototype.getModelFromResponse(data);
            }
        }
    });
}
]);