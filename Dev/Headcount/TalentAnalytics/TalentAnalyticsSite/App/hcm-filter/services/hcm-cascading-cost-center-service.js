'use strict';

angular.module('headcountManagementFilter').factory('HcmCascadingCostCenter',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterCascading_Current_Fields.xsodata/HCM_FILTER_CASCADING_CURR_FIELDS/?$format=json";
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