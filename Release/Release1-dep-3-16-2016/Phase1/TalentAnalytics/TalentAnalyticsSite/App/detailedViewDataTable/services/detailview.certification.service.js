'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('detailedViewDataTable').factory('DetailedViewCertificationService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Certifications_Details.xsodata/EMPLOYEE_QV_CERTIFICATIONS_DETAILSParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
    return $resource(url, { defaultSort: '@defaultSort', employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
                  transformResponse: function (data) {
                  
                      data = angular.fromJson(data);
                      if (data && data.d && data.d.results && data.d.results.length > 0) {
                    
                          data.d.results.forEach(function (row) {
                              if (row.ANSALARY && row.ANSALARY.length > 0) {
                                  row.ANSALARY = parseInt(row.ANSALARY);
                              }
                              if (row.FTEANSAL && row.FTEANSAL.length > 0) {
                                  row.FTEANSAL = parseInt(row.FTEANSAL);
                              }
                              if (row.EFFECTIVE_DATE && row.EFFECTIVE_DATE.length > 0) {
                                  row.EFFECTIVE_DATE = new Date(row.EFFECTIVE_DATE);
                              }
                          });
                      }
                      data.filters = {
                          'EFFECTIVE_DATE': { 'filterName': 'date' },
                          'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                          'FTEANSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'FTE_CURRENCY' },
                      };
                      return data;
                  }
          }
      });
  }
]);