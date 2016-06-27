'use strict';

angular.module('hcm-hierarchy-data').factory('HcmCostCenterRootNode', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_CC_TreeRoots.xsodata/GET_TREE_ROOTS/?$format=json";
     // console.log(id)
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