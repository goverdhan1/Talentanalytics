'use strict';

angular.module('hcm-hierarchy-data').factory('HcmFunctionHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Function_Hier.xsodata/GET_FUNCTION_HIERParameters(IP_ROOT=':rootId')/Results?$format=json";
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