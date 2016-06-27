'use strict';

angular.module('core').factory('AnalyticsService', function (UserDetails, $timeout, $rootScope) {
    return {
        trackPage: function (pageName) {
            if (UserDetails.userId) {
                //The page is already loaded and there is a route change. But the location url is not set yet
                //Set a rootscope property so that the $locationChangeSuccess logs the data once the url is updated
                $rootScope.analyticsDataToSend = { pageName: pageName, title: ' Headcount Management', userId: UserDetails.userId };
            } else {
                //This is a first time load
                //We still don't have the user id. Set a property on UserDetails so that the analytics data is logged once the user id is available
                UserDetails.analyticsDataToSend = { pageName: pageName, title: ' Headcount Management' };
            }
        }
    };
});