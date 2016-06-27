'use strict';

angular.module('hcm-hierarchy-data').factory('HcmOrgUnitHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_ORGUNIT_Hier.xsodata/GET_ORGUNIT_HIERParameters(IP_ROOT = ':rootId')/Results?$format=json";
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