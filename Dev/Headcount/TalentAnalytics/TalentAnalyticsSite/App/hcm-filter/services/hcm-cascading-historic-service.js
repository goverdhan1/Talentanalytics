'use strict';

angular.module('headcountManagementFilter').factory('HcmCascadingHistoricFunction',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterCascading.xsodata/HCM_FILTER_CASCADING/?$format=json";
      return $resource(url, {}, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
              	return angular.fromJson(data).d;
              }
          }
      });
  });