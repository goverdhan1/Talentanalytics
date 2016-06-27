'use strict';

angular.module('ratingHistory').factory('RatingHistoryService', ['$resource', 'CoreConstants', 'RatingHistoryModel',
  function ($resource, CoreConstants, RatingHistoryModel) {
     
      var url = CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Ratings_History_Summary.xsodata/EMPLOYEE_QV_RATINGS_HISTORY_SUMMARYParameters(IP_PGEPERSID=':employeeId')/Results?$format=json";
           return $resource(url, { employeeId: '@employeeId' }, {
          'get': {
              method: 'GET',
              withCredentials: true,
              transformResponse: function (data) {
                  if(!data) return data;
                  data = angular.fromJson(data);
                return RatingHistoryModel.prototype.getModelFromResponse(data);
              }
          }
      });
  }
]);



