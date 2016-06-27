'use strict';


angular.module('summary').factory('SummaryEditViewPostService', ['$resource', 'CoreConstants', 
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Post_Service.xsodata/Post";

      return $resource(url, {
      }, {
          'save': {
              method: 'POST', 
              withCredentials: true
          }
      });
  }
]);

