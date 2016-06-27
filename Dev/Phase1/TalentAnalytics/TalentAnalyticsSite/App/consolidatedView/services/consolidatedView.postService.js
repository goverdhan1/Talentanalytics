'use strict';


angular.module('consolidatedView').factory('ConsolidatedViewPostService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Consolidated_Post_Service.xsodata/Consolidated_Post";

      return $resource(url, {
      }, {
          'save': {
              method: 'POST', 
              withCredentials: true
          }
      });
  }
]);

