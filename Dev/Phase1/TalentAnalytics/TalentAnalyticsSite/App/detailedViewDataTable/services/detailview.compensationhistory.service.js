'use strict';

//Service used for communicating with the backend hana service to get the data for activity history
angular.module('detailedViewDataTable').factory('DetailedViewCompensationHistoryService', ['$resource', 'CoreConstants',  function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Compensation_Detailed.xsodata/EMPLOYEE_QV_COMPENSATION_DETAILEDParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
       
      return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {

                  data = angular.fromJson(data);
                  if (data && data.d && data.d.results && data.d.results.length > 0) {
                      data.d.results.forEach(function (row) {
                          if (row.TOTAL_COMPENSATION && row.TOTAL_COMPENSATION.length > 0) {
                              row.TOTAL_COMPENSATION = parseFloat(row.TOTAL_COMPENSATION);
                          }
                          if (row.ANSALARY && row.ANSALARY.length > 0) {
                              row.ANSALARY = parseFloat(row.ANSALARY);
                          }
                          if (row.FTEANSAL && row.FTEANSAL.length > 0) {
                              row.FTEANSAL = parseFloat(row.FTEANSAL);
                          }
                          if (row.AIP_BONUS && row.AIP_BONUS.length > 0) {
                              row.AIP_BONUS = parseFloat(row.AIP_BONUS);
                          }
                          if (row.IND_BONUS && row.IND_BONUS.length > 0) {
                              row.IND_BONUS = parseFloat(row.IND_BONUS);
                          }
                          if (row.MISC_BONUS && row.MISC_BONUS.length > 0) {
                              row.MISC_BONUS = parseFloat(row.MISC_BONUS);
                          }
                          if (row.RR_BONUS && row.RR_BONUS.length > 0) {
                              row.RR_BONUS = parseFloat(row.RR_BONUS);
                          }
                          if (row.BONUS && row.BONUS.length > 0) {
                              row.BONUS = parseFloat(row.BONUS);
                          }
                          if (row.RETENTION_BONUS && row.RETENTION_BONUS.length > 0) {
                              row.RETENTION_BONUS = parseFloat(row.RETENTION_BONUS);
                          }
                          if (row.LBRATE && row.LBRATE.length > 0) {
                              row.LBRATE = parseFloat(row.LBRATE);
                          }
                          if (row.NBRATE && row.NBRATE.length > 0) {
                              row.NBRATE = parseFloat(row.NBRATE);
                          }
                          if (row.PDPSPSAL && row.PDPSPSAL.length > 0) {
                              row.PDPSPSAL = parseFloat(row.PDPSPSAL);
                          }
                          if (row.PHRLYRATE && row.PHRLYRATE.length > 0) {
                              row.PHRLYRATE = parseFloat(row.PHRLYRATE);
                          }
                          if (row.EFFECTIVE_DATE && row.EFFECTIVE_DATE.length > 0) {
                              row.EFFECTIVE_DATE = new Date(row.EFFECTIVE_DATE);
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
                          if (row.PERCENT_INCREASE_ANSAL && row.PERCENT_INCREASE_ANSAL.length > 0) {
                              row.PERCENT_INCREASE_ANSAL = parseFloat(row.PERCENT_INCREASE_ANSAL);
                          }
                          if (row.PROLFDAT && row.PROLFDAT.length > 0) {
                              row.PROLFDAT = new Date(row.PROLFDAT);
                          }
                      });
                  }
                  data.filters = {
                      'EFFECTIVE_DATE': { 'filterName': 'date' },
                      'TOTAL_COMPENSATION': { 'filterName': 'taCurrency', 'currencyColumnName': 'TOTAL_COMP_CURRENCY' },
                      'ANSALARY': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURR_ANSAL' },
                      'FTEANSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'FTE_CURRENCY' },
                      'AIP_BONUS': { 'filterName': 'taCurrency', 'currencyColumnName': 'AIP_CURRENCY' },
                      'IND_BONUS': { 'filterName': 'taCurrency', 'currencyColumnName': 'IND_CURRENCY' },
                      'MISC_BONUS': { 'filterName': 'taCurrency', 'currencyColumnName': 'MISC_CURRENCY' },
                      'RR_BONUS': { 'filterName': 'taCurrency', 'currencyColumnName': 'RR_BONUS_CURRENCY' },
                      'BONUS': { 'filterName': 'taCurrency', 'currencyColumnName': 'BONUS_CURRENCY' },
                      'RETENTION_BONUS': { 'filterName': 'taCurrency', 'currencyColumnName': 'RETEN_CURRENCY' },
                      'LBRATE': { 'filterName': 'taCurrency', 'currencyColumnName': 'LCURR' },
                      'NBRATE': { 'filterName': 'taCurrency', 'currencyColumnName': 'NCURR' },
                      'PDPSPSAL': { 'filterName': 'taCurrency', 'currencyColumnName': 'DPSP_CURR' },
                      'PHRLYRATE': { 'filterName': 'taCurrency', 'currencyColumnName': 'CURRENCY' },
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
