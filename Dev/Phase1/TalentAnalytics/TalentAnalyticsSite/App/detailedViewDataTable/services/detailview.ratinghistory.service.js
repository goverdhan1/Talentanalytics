'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('detailedViewDataTable').factory('DetailedViewRatingHistoryService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Ratings_History_Detailed.xsodata/EMPLOYEE_QV_RATINGS_HISTORY_DETAILEDParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
      return $resource(url, { employeeId: '@employeeId' }, {
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
                          if (row.EFFECTIVE_DATE && row.EFFECTIVE_DATE.length > 0) {
                              row.EFFECTIVE_DATE = new Date(row.EFFECTIVE_DATE);
                          }
                          if (row.PDTANNIVERSARY && row.PDTANNIVERSARY.length > 0) {
                              row.PDTANNIVERSARY = new Date(row.PDTANNIVERSARY);
                          }
                          if (row.LASTPRDAT && row.LASTPRDAT.length > 0) {
                              row.LASTPRDAT = new Date(row.LASTPRDAT);
                          }
                          if (row.PTILFDAT && row.PTILFDAT.length > 0) {
                              row.PTILFDAT = new Date(row.PTILFDAT);
                          }
                          if (row.PDTORIHIR && row.PDTORIHIR.length > 0) {
                              row.PDTORIHIR = new Date(row.PDTORIHIR);
                          }
                          if (row.PROLFDAT && row.PROLFDAT.length > 0) {
                              row.PROLFDAT = new Date(row.PROLFDAT);
                          }
                      });
                  }
                  data.filters = {
                      'EFFECTIVE_DATE': { 'filterName': 'date' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'PDTANNIVERSARY': { 'filterName': 'date' },
                      'LASTPRDAT': { 'filterName': 'date' },
                      'PTILFDAT': { 'filterName': 'date' },
                      'PDTORIHIR': { 'filterName': 'date' },
                      'PROLFDAT': { 'filterName': 'date' },
                  };
                  return data;
              }
          }
      });
  }
]);