'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('activityHistory').factory('ActivityHistoryService', ['$resource', 'CoreConstants', 'ActivityHistoryModel',
  function ($resource, CoreConstants, ActivityHistoryModel) {

      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Activity_History_Summary.xsodata/EMPLOYEE_QV_ACTIVITY_HISTORY_SUMMARYParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
      return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                  data = angular.fromJson(data);
                  return ActivityHistoryModel.prototype.getModelFromResponse(data);
              }
          }
      });
  }
]);


