'use strict';

angular.module('summary').factory('SummaryLayoutService', function ($resource, CoreConstants) {

    var url = CoreConstants.baseHANAUrl + "Services/Talent_Analytics_Security_Check.xsodata/SECURITY_CHECK(PGEPERSID=':employeeId')?$format=json";

    return $resource(url, { employeeId: '@employeeId' }, {
        'get': {
            method: 'GET',
            withCredentials: true,
            isArray: true,
            transformResponse: function (data) {
                data = angular.fromJson(data);
                if (!data || !data.d) {
                    console.error('Invalid response returned from the security check service');
                    return null;
                }
                var userHasSecureDataAccess = data.d.SECURE_FLAG === 'Y';
                if (userHasSecureDataAccess) {
                    return [['activity-history-summary', 'compensation-directive'], ['job-history-summary', 'rating-directive'], ['certification-details-summary']];
                } else {
                    return [['activity-history-summary', 'job-history-summary'], ['certification-details-summary']];
                }
            }
        }
    });
});
