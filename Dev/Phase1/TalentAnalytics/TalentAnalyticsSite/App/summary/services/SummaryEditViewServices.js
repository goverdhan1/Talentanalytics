'use strict';


//summary Edit View to get the all field labels with values
angular.module('summary').factory('SummaryEditViewService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      // var url = CoreConstants.baseHANAUrl + "Services/Employee_QV_Left_Edit_View_Summary_Screen.xsodata/EMPLOYEE_QV_LEFT_EDIT_VIEW_SUMMARY_SCREENParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      var url = CoreConstants.baseHANAUrl + "Services/Employee_QV_Left_Edit_View_Summary_Screen.xsodata/EMPLOYEE_QV_LEFT_EDIT_VIEW_SUMMARY_SCREENParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";

      return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true
          }
      });
  }
]);
