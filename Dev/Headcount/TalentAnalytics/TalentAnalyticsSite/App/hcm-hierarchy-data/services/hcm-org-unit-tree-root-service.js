'use strict';

angular.module('hcm-hierarchy-data').factory('HcmOrgUnitRootNode', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_ORGUNIT_TreeRoots.xsodata/GET_TREE_ROOTS/?$format=json";
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