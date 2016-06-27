'use strict';


angular.module('headcountManagementFilter').factory('HeadcountManagementFilterPostService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Post_Service.xsodata/Post";

      return $resource(url, {
      }, {
          'save': {
              method: 'POST',
              withCredentials: true
          }
      });
  }
]);

