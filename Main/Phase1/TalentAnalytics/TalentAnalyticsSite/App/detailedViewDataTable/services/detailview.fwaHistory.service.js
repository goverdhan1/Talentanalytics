'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('detailedViewDataTable').factory('DetailedViewFWAHistoryService', ['$resource', 'CoreConstants', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_FWA_History_Detailed.xsodata/FWA_HISTORY_DETAILParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
      
      return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {

                  data = angular.fromJson(data);
                  if (data && data.d && data.d.results && data.d.results.length > 0) {

                      data.d.results.forEach(function (row) {
                          if (row.AGE_IN_YRS && row.AGE_IN_YRS.length > 0) {
                              row.AGE_IN_YRS = parseInt(row.ANSAAGE_IN_YRSLARY);
                          }
                          if (row.ANSALARY && row.ANSALARY.length > 0) {
                              row.ANSALARY = parseInt(row.ANSALARY);
                          }
                          if (row.FTEANSAL && row.FTEANSAL.length > 0) {
                              row.FTEANSAL = parseInt(row.FTEANSAL);
                          }
                          if (row.C_TENURE && row.C_TENURE.length > 0) {
                              row.C_TENURE = parseFloat(row.C_TENURE);
                          }
                          if (row.PTILPRKF && row.PTILPRKF.length > 0) {
                              row.PTILPRKF = parseInt(row.PTILPRKF);
                          }
                          if (row.PTILKF && row.PTILKF.length > 0) {
                              row.PTILKF = parseInt(row.PTILKF);
                          }
                          if (row.PTILRRKF && row.PTILRRKF.length > 0) {
                              row.PTILRRKF = parseInt(row.PTILRRKF);
                          } 
                          if (row.PDPSPSAL && row.PDPSPSAL.length > 0) {
                              row.PDPSPSAL = parseInt(row.PDPSPSAL);
                          }
                          if (row.PAYPCT && row.PAYPCT.length > 0) {
                              row.PAYPCT = parseInt(row.PAYPCT);
                          }
                          if (row.PGEPRIMKF && row.PGEPRIMKF.length > 0) {
                              row.PGEPRIMKF = parseInt(row.PGEPRIMKF);
                          }
                          if (row.PGETILKF && row.PGETILKF.length > 0) {
                              row.PGETILKF = parseInt(row.PGETILKF);
                          }
                          if (row.PGEPRIMKF && row.PGEPRIMKF.length > 0) {
                              row.PGEPRIMKF = parseInt(row.PGEPRIMKF);
                          }
                          if (row.PGEPERSID && row.PGEPERSID.length > 0) {
                              row.PGEPERSID = parseInt(row.PGEPERSID);
                          }
                          if (row.PGEROLLKF && row.PGEROLLKF.length > 0) {
                              row.PGEROLLKF = parseInt(row.PGEROLLKF);
                          }
                          if (row.JOB && row.JOB.length > 0) {
                              row.JOB = parseInt(row.JOB);
                          }
                          if (row.ORGUNIT && row.ORGUNIT.length > 0) {
                              row.ORGUNIT = parseInt(row.ORGUNIT);
                          }
                          if (row.EMPLOYEE && row.EMPLOYEE.length > 0) {
                              row.EMPLOYEE = parseInt(row.EMPLOYEE);
                          }
                          if (row.HRPOSITION && row.HRPOSITION.length > 0) {
                              row.HRPOSITION = parseInt(row.HRPOSITION);
                          }
                          if (row.T_TENURE && row.T_TENURE.length > 0) {
                              row.T_TENURE = parseFloat(row.T_TENURE);
                          }
                          if (row.PDTANNIVERSARY && row.PDTANNIVERSARY.length > 0) {
                              row.PDTANNIVERSARY = new Date(row.PDTANNIVERSARY);
                          }
                          if (row.PPRIFDAT && row.PPRIFDAT.length > 0) {
                              row.PPRIFDAT = new Date(row.PPRIFDAT);
                          }
                          if (row.DATEBIRTH && row.DATEBIRTH.length > 0) {
                              row.DATEBIRTH = new Date(row.DATEBIRTH);
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
                          if (row.DATEFROM && row.DATEFROM.length > 0) {
                              row.DATEFROM = new Date(row.DATEFROM);
                          }
                          if (row.DATETO && row.DATETO.length > 0) {
                              row.DATETO = new Date(row.DATETO);
                          }
                      });
                  }
                  data.filters = {
                      'PDTANNIVERSARY': { 'filterName': 'date' },
                      'PPRIFDAT': { 'filterName': 'date' },
                      'DATEBIRTH': { 'filterName': 'date' },
                      'PTILFDAT': { 'filterName': 'date' },
                      'PDTRECHIR': { 'filterName': 'date' },
                      'PDTORIHIR': { 'filterName': 'date' },
                      'PROLFDAT': { 'filterName': 'date' },
                      'DATEFROM': { 'filterName': 'date' },
                      'DATETO': { 'filterName': 'date' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'FTEANSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'FTE_CURRENCY' },
                      'PDPSPSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'DPSP_CURR' },
                  };
                  return data;
              }
          }
      });
  }
]);