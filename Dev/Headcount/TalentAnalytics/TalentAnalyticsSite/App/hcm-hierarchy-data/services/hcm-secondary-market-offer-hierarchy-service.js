'use strict';

angular.module('hcm-hierarchy-data').factory('HcmSecondaryMarketOfferHierarchyService', ['$resource', 'CoreConstants',
  function ($resource, CoreConstants) {
      var savedData = null;
      var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_SMarket_Offering_Hier.xsodata/GET_MARKETOFFER_HIERParameters(IP_ROOT=':rootId')/Results?$format=json";
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