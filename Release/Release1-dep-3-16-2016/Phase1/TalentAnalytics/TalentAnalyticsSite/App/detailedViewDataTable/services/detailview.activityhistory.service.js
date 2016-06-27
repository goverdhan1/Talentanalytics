'use strict';

angular.module('detailedViewDataTable').factory('DetailedViewActivityHistoryService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Activity_History_Details.xsodata/EMPLOYEE_QV_ACTIVITY_HISTORY_DETAILSParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
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
                          if (row.PREV_ANSALARY && row.PREV_ANSALARY.length > 0) {
                              row.PREV_ANSALARY = parseInt(row.PREV_ANSALARY);
                          }

                          if (row.EFFECTIVE_DATE && row.EFFECTIVE_DATE.length > 0) {
                              row.EFFECTIVE_DATE = new Date(row.EFFECTIVE_DATE);
                          }
                          if (row.ACTION_START_DATE && row.ACTION_START_DATE.length > 0) {
                              row.ACTION_START_DATE = new Date(row.ACTION_START_DATE);
                          }
                          if (row.C_TENURE && row.C_TENURE.length > 0) {
                              row.C_TENURE = parseFloat(row.C_TENURE);
                          }
                          if (row.T_TENURE && row.T_TENURE.length > 0) {
                              row.T_TENURE = parseFloat(row.T_TENURE);
                          }
                          if (row.LASTPRDAT && row.LASTPRDAT.length > 0) {
                              row.LASTPRDAT = new Date(row.LASTPRDAT);
                          }
                      });
                  }
                  data.filters = {
                      'EFFECTIVE_DATE': { 'filterName': 'date' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'PREV_ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'PREV_CURR_ANSAL' },
                      'ACTION_START_DATE': { 'filterName': 'date' },
                      'LASTPRDAT': { 'filterName': 'date' },
                  };
                  return data;
              }
          }
      });
  }
]);