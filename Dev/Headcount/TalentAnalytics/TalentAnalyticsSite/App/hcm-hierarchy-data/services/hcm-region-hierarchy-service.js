'use strict';

angular.module('hcm-hierarchy-data').factory('HcmRegionHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Region_Hier.xsodata/GET_REGION_HIERParameters(IP_ROOT=':rootId')/Results?$format=json";
      return $resource(url, { rootIdrootId: '@rootId' }, {
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