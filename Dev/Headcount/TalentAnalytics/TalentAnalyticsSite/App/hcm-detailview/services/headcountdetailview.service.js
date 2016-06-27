'use strict';

angular.module('headcountDetailView').factory('HeadcountDetailViewMetricsService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHANAUrl + "Services/POC_HCM_SUMMARY_METRICS.xsodata/HCM_SUMMARY_METRICSParameters(FILTER_NAME=':filterName')/Results?$format=json";
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
