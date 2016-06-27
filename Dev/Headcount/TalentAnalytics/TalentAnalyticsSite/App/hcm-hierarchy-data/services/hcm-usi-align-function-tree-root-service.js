'use strict';

angular.module('hcm-hierarchy-data').factory('HcmUSIAlignFunctionRootNode', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_USIFunction_TreeRoots.xsodata/GET_AFUNCTION_ROOTS/?$format=json";
      return $resource(url, {}, {
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