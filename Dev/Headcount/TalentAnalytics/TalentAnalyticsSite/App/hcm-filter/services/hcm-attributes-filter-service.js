'use strict';

angular.module('headcountManagementFilter').factory('HeadcountManagementFilterAttributesService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterLabels.xsodata/HCM_FILTER_LABELS/?$format=json";
      return $resource(url, {},{
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                 return angular.fromJson(data).d;
              }
          }
      });
  }
]);



