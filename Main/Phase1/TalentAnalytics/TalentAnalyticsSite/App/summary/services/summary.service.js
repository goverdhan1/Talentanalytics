'use strict';

//Service used for communicating with the backend hana service to get the summary details
angular.module('summary').factory('SummaryLeftbarService', ['$resource', 'CoreConstants', 'SummaryModel',
  function ($resource, CoreConstants, SummaryModel) {
     
      var url = CoreConstants.baseHANAUrl + "Services/Employee_QV_Left_Summary_Screen.xsodata/EMPLOYEE_QV_LEFT_SUMMARY_SCREENParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";

      return $resource(url, {employeeId: '@employeeId'}, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                  data = angular.fromJson(data);
                 return SummaryModel.prototype.getModelFromResponse(data);
              }
          }
      });
  }
]);

