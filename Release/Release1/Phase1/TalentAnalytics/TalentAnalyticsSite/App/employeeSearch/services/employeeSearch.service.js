'use strict';

//Service used for communicating with the backend hana service to get the summary details
angular.module('employeeSearch').factory('employeeSearch', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Search.xsodata/EMPLOYEE_QV_SEARCHParameters%28IP_EQV_SEARCH=':searchParam'%29/Results?$skip=:skipRecords&$top=:resultsPerPage&$format=json";
      return $resource(url, {
          searchParam: '@searchParam',
          skipRecords: '@skipRecords',
          resultsPerPage: '@resultsPerPage'
      }, {
          'query': {
              method: 'GET',
              withCredentials: true
          }
      });
  }
]);