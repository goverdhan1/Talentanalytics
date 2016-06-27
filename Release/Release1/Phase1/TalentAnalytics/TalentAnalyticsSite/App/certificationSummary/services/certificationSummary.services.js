'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('certificationSummary').factory('CertificationSummaryService', ['$resource', 'CoreConstants', 'CertificationSummaryModel',
  function ($resource, CoreConstants, CertificationSummaryModel) {

      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Certifications_Summary.xsodata/EMPLOYEE_QV_CERTIFICATIONS_SUMMARYParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
      return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                  data = angular.fromJson(data);
                  return CertificationSummaryModel.prototype.getModelFromResponse(data);
              }
          }
      });
  }
]);
