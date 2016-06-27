'use strict';

angular.module('headcountManagementFilter').factory('HeadcountManagementDateFilterChangeDates', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {

      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_CD_Drop_Down_Get_Service.xsodata/CD_DROPDOWN/?$format=json";
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



