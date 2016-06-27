'use strict';

angular.module('compensationHistory').factory('CompensationHistoryService', ['$resource', 'CoreConstants', 'CompensationHistoryModel',
  function ($resource, CoreConstants, CompensationHistoryModel) {
     
      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Compensation_Summary.xsodata/EMPLOYEE_QV_COMPENSATION_SUMMARYParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
           return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                  data = angular.fromJson(data);
                  return CompensationHistoryModel.prototype.getModelFromResponse(data);
              }
          }
      });
  }
]);



