'use strict';

angular.module('headcountManagementFilter').factory('HeadcountManagementPartialPeriodDataService', ['GetCacheEnabledResourceService', '$q', 'CoreConstants',
  function (GetCacheEnabledResourceService, $q, CoreConstants) {

      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Custom_Partial_Dates.xsodata/HCM_PARTIAL_DATESParameters(IP_FILTER_NAME=':filterName')/Results?$format=json";
      return GetCacheEnabledResourceService.getCacheEnabledResource(url, { filterName: '@filterName' }, {
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