'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('detailedViewDataTable').factory('DetailedViewEducationDetailsService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Educations_Detailed.xsodata/EMPLOYEE_QV_EDUCATIONS_DETAILSParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
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
                    if (row.FTEANSAL && row.FTEANSAL.length > 0) {
                    row.FTEANSAL = parseInt(row.FTEANSAL);
                    }
                    if (row.DEGREE_COMPL_DATE && row.DEGREE_COMPL_DATE.length > 0) {
                        var dateArray = row.DEGREE_COMPL_DATE.split('/');
                        if (dateArray.length === 2) {
                            var newDate = new Date(dateArray[1], Number(dateArray[0]) - 1);
                            row.DEGREE_COMPL_DATE = newDate;
                        }
                        else {
                            row.DEGREE_COMPL_DATE = row.DEGREE_COMPL_DATE;
                        }
                    }
                        
                    if (row.PDTRECHIR && row.PDTRECHIR.length > 0) {
                    row.PDTRECHIR = new Date(row.PDTRECHIR);
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
                    if (row.C_TENURE && row.C_TENURE.length > 0) {
                        row.C_TENURE = parseFloat(row.C_TENURE);
                    }
                    if (row.T_TENURE && row.T_TENURE.length > 0) {
                        row.T_TENURE = parseFloat(row.T_TENURE);
                    }
                    if (row.PROLFDAT && row.PROLFDAT.length > 0) {
                    row.PROLFDAT = new Date(row.PROLFDAT);
                          }
                      });
                  }
                  data.filters = {
                      'EFFECTIVE_DATE': { 'filterName': 'date' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'FTEANSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'FTE_CURRENCY' },
                      'DEGREE_COMPL_DATE': { 'filterName': 'date', 'dateFormat':'MM/yyyy' },
                      'PDTRECHIR': { 'filterName': 'date' },
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