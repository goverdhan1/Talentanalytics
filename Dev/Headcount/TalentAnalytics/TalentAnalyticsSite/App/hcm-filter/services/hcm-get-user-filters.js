'use strict';

angular.module('headcountManagementFilter').factory('hcmGetUserFiltersService',
    function ($resource, CoreConstants, UserDetails, GetCacheEnabledResourceService) {

      var url = CoreConstants.baseHeadcountUrl
          + "Services/Employee_HCM_Filter_Drop_Down_Get_Service.xsodata/FILTER_DROPDOWNParameters(USERNAME=':userName')/Results?$format=json";
      return GetCacheEnabledResourceService.getCacheEnabledResource(url, { userName: UserDetails.userId }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                  return angular.fromJson(data).d;
              }
          }
      });
  }
);



