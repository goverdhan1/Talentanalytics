'use strict';

angular.module('headcountDetailView').factory('hcmDetailedViewDetailedMetricsService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHANAUrl + "app-talent-hcm/Services/Employee_HCM_Detailed_Metrics.xsodata/HCM_DETAILED_METRICSParameters(IP_FILTERNAME=':filterName')/Results?$format=json";
      return $resource(url, { filterName: '@filterName' }, {
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
