'use strict';

angular.module('headcountManagementFilter').factory('HcmPocEditFilterValues',
  function ($resource, CoreConstants) {
    var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterValues.xsodata/HCM_EDIT_FILTER_VALUESParameters(IP_ATTRIBUTE=':selectedAttribute')/Results?$format=json";
  	return $resource(url, { selectedAttribute: '@selectedAttribute' }, {
  		'get': {
  			method: 'GET',
  			withCredentials: true,
  			transformResponse: function (data) {
  			    var responseJson = angular.fromJson(data).d;
  			    return responseJson;
  			}
  		}
  	});
});