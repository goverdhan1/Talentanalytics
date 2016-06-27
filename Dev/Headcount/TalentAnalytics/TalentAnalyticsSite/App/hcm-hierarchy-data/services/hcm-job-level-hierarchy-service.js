'use strict';

angular.module('hcm-hierarchy-data').factory('HcmJobLevelHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Job_Level_Hier.xsodata/GET_JOBLEVEL_HIERParameters(IP_ROOT=':rootId')/Results?$format=json";
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