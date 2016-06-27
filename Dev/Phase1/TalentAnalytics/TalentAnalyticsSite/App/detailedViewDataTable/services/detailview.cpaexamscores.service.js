'use strict';

angular.module('detailedViewDataTable').factory('DetailedViewCPAExamScoresService', ['$resource', 'CoreConstants','taCurrencyFilter', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_CPA_Exam_Scores.xsodata/EMPLOYEE_QV_CPA_DETAILSParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
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
                          if (row.PDPSPSAL && row.PDPSPSAL.length > 0) {
                              row.PDPSPSAL = parseInt(row.PDPSPSAL);
                          }
                          if (row.PDTANNIVERSARY && row.PDTANNIVERSARY.length > 0) {
                              row.PDTANNIVERSARY = new Date(row.PDTANNIVERSARY);
                          }
                          if (row.PPRIFDAT && row.PPRIFDAT.length > 0) {
                              row.PPRIFDAT = new Date(row.PPRIFDAT);
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
                          if (row.PGETILKF && row.PGETILKF.length > 0) {
                              row.PGETILKF = parseFloat(row.PGETILKF);
                          }
                          if (row.PGEROLLKF && row.PGEROLLKF.length > 0) {
                              row.PGEROLLKF = parseFloat(row.PGEROLLKF);
                          }
                          if (row.PGEPRIMKF && row.PGEPRIMKF.length > 0) {
                              row.PGEPRIMKF = parseFloat(row.PGEPRIMKF);
                          }
                          if (row.DATEBIRTH && row.DATEBIRTH.length > 0) {
                              row.DATEBIRTH = new Date(row.DATEBIRTH);
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
                      });
                  }
                  data.filters = {
                      'PDTANNIVERSARY': { 'filterName': 'date' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'FTEANSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'FTE_CURRENCY' },
                      'PDPSPSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'DPSP_CURR' },
                      'PPRIFDAT': { 'filterName': 'date' },
                      'DATEBIRTH': { 'filterName': 'date' },
                      'LASTPRDAT': { 'filterName': 'date' },
                      'PTILFDAT': { 'filterName': 'date' },
                      'PDTRECHIR': { 'filterName': 'date' },
                      'PDTORIHIR': { 'filterName': 'date' },
                      'PROLFDAT': { 'filterName': 'date' },
                  };
                  return data;
              }
          }
      });
  }
]);