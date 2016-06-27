'use strict';

angular.module('headcountDetailView').factory('HeadcountManagementDetailedViewSaveService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHANAUrl + "Services/Employee_HCM_Filter_View_Post_Service.xsodata/Post";
      

      return $resource(url, {
      }, {
          'save': {
              method: 'POST',
              withCredentials: true
          }
      });
  }
]);

