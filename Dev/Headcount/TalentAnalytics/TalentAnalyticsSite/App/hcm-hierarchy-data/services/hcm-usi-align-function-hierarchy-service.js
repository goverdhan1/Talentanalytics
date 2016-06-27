'use strict';

angular.module('hcm-hierarchy-data').factory('HcmUSIAlignFunctionHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_USI_AFUNCTION_Hier.xsodata/GET_USI_AFUNCTION_HIERParameters(IP_ROOT=':rootId')/Results?$format=json";
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