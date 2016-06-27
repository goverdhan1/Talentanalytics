'use strict';

angular.module('hcm-hierarchy-data').factory('HcmFilterHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Cost_Center_Hier.xsodata/GET_COSTCENTER_HIERParameters(IP_ROOT=':rootId')/Results?$format=json";
     // console.log(id)
      return $resource(url, { rootId: '@rootId' }, {
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