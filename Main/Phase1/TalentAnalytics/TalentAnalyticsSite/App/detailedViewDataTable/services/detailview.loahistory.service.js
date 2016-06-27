'use strict';

angular.module('detailedViewDataTable').factory('DetailedViewLOAHistoryService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Detailed_LOA_History.xsodata/EMPLOYEE_QV_DETAILED_LOA_HISTORY_SCREENParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
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
                          if (row.PHRLYRATE && row.PHRLYRATE.length > 0) {
                              row.PHRLYRATE = parseInt(row.PHRLYRATE);
                          }
                          if (row.LBRATE && row.LBRATE.length > 0) {
                              row.LBRATE = parseInt(row.LBRATE);
                          }
                          if (row.NBRATE && row.NBRATE.length > 0) {
                              row.NBRATE = parseInt(row.NBRATE);
                          }
                          if (row.DATEBIRTH && row.DATEBIRTH.length > 0) {
                              row.DATEBIRTH = new Date(row.DATEBIRTH);
                          }
                          if (row.PDTANNIVERSARY && row.PDTANNIVERSARY.length > 0) {
                              row.PDTANNIVERSARY = new Date(row.PDTANNIVERSARY);
                          }
                          if (row.PPRIFDAT && row.PPRIFDAT.length > 0) {
                              row.PPRIFDAT = new Date(row.PPRIFDAT);
                          }
                          if (row.LASTPRDAT && row.LASTPRDAT.length > 0) {
                              row.LASTPRDAT = new Date(row.LASTPRDAT);
                          }
                          if (row.PTILFDAT && row.PTILFDAT.length > 0) {
                              row.PTILFDAT = new Date(row.PTILFDAT);
                          }
                          if (row.PDTRECHIR && row.PDTRECHIR.length > 0) {
                              row.PDTRECHIR = new Date(row.PDTRECHIR);
                          }
                          if (row.PDTORIHIR && row.PDTORIHIR.length > 0) {
                              row.PDTORIHIR = new Date(row.PDTORIHIR);
                          }
                          if (row.PROLFDAT && row.PROLFDAT.length > 0) {
                              row.PROLFDAT = new Date(row.PROLFDAT);
                          }
                          if (row.GLOBAL_DEPLOYMENT_END_DATE && row.GLOBAL_DEPLOYMENT_END_DATE.length > 0) {
                              row.GLOBAL_DEPLOYMENT_END_DATE = new Date(row.GLOBAL_DEPLOYMENT_END_DATE);
                          }
                          if (row.C_TENURE && row.C_TENURE.length > 0) {
                              row.C_TENURE = parseFloat(row.C_TENURE);
                          }
                          if (row.T_TENURE && row.T_TENURE.length > 0) {
                              row.T_TENURE = parseFloat(row.T_TENURE);
                          }
                          if (row.PTILPRKF && row.PTILPRKF.length > 0) {
                              row.PTILPRKF = parseFloat(row.PTILPRKF);
                          }
                          if (row.PTILKF && row.PTILKF.length > 0) {
                              row.PTILKF = parseFloat(row.PTILKF);
                          }
                          if (row.PTILRRKF && row.PTILRRKF.length > 0) {
                              row.PTILRRKF = parseFloat(row.PTILRRKF);
                          }
                          if (row.PGEPRIMKF && row.PGEPRIMKF.length > 0) {
                              row.PGEPRIMKF = parseFloat(row.PGEPRIMKF);
                          }
                          if (row.PGETILKF && row.PGETILKF.length > 0) {
                              row.PGETILKF = parseFloat(row.PGETILKF);
                          }
                          if (row.PGEROLLKF && row.PGEROLLKF.length > 0) {
                              row.PGEROLLKF = parseFloat(row.PGEROLLKF);
                          }
                          if (row.DATEFROM && row.DATEFROM.length > 0) {
                              row.DATEFROM = new Date(row.DATEFROM);
                          }
                          if (row.DATETO && row.DATETO.length > 0) {
                              row.DATETO = new Date(row.DATETO);
                          }
                      });
                  }
                  data.filters = {
                      'DATEBIRTH': { 'filterName': 'date' },
                      'PDTANNIVERSARY': { 'filterName': 'date' },
                      'PPRIFDAT': { 'filterName': 'date' },
                      'LASTPRDAT': { 'filterName': 'date' },
                      'PTILFDAT': { 'filterName': 'date' },
                      'PDTRECHIR': { 'filterName': 'date' },
                      'PDTORIHIR': { 'filterName': 'date' },
                      'PROLFDAT': { 'filterName': 'date' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'FTEANSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'FTE_CURRENCY' },
                      'PHRLYRATE': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURRENCY' },
                      'LBRATE': { 'filterName': 'taCurrency', 'currencyColumnName': 'LCURR' },
                      'NBRATE': { 'filterName': 'taCurrency', 'currencyColumnName': 'NCURR' },
                      'GLOBAL_DEPLOYMENT_END_DATE': { 'filterName': 'date' },
                      'DATEFROM': { 'filterName': 'date' },
                      'DATETO': { 'filterName': 'date' },
                  };
                  return data;
              }
          }
      });
  }
]);