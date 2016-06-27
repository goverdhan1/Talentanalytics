'use strict';

angular.module('detailedView').config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('detailedview', {
            parent: 'parent',
            url: '/detailedView/:employeeId',
            templateUrl: 'app/detailedView/views/detailedview.html'
        })

        .state('detailedview.basicInfo', {
            url: "/basicInfo",
            template: '<basic-info-directive></basic-info-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                     RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Basic Info');
                }
            },
            data: { activeTab: 'basicInfo' }
        })

        .state('detailedview.education', {
            url: "/education",
            template: '<education-history-directive></education-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Education');
                }
            },
            data: { activeTab: 'education' }
        })

        .state('detailedview.certification', {
            url: "/certification",
            template: '<certification-history-directive></certification-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Certification');
                }
            },
            data: { activeTab: 'certification' }

        })

        .state('detailedview.detailedViewActivityHistory', {
            url: "/detailedViewActivityHistory",
            template: '<activity-history-directive></activity-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Activity');
                }
            },
            data: { activeTab: 'detailedViewActivityHistory' }
        })

        .state('detailedview.jobHistory', {
            url: "/jobHistory",
            template: '<job-history-directive></job-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Job History');
                }
            },
            data: { activeTab: 'jobHistory' }
        })

        .state('detailedview.rating', {
            url: "/rating",
            template: '<rating-history-directive></rating-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Ratings');
                }
            },
            data: { activeTab: 'rating' }
        })

        .state('detailedview.compensation', {
            url: "/compensation",
            template: '<compensation-history-directive></compensation-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - Compensation');
                }
            },
            data: { activeTab: 'compensation' }
        })

        .state('detailedview.loahistory', {
            url: "/loahistory",
            template: '<loa-history-directive></loa-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - LOA History');
                }
            },
            data: { activeTab: 'loahistory' }
        })

        .state('detailedview.cpadetails', {
            url: "/cpadetails",
            template: '<cpa-history-directive></cpa-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - CPA Details');
                }
            },
            data: { activeTab: 'cpadetails' }
        })

        .state('detailedview.fwaHistory', {
            url: "/fwaHistory",
            template: '<fwa-history-directive></fwa-history-directive>',
            resolve: {
                analyticsDataSent: function (RouteLoadUpdatesService) {
                    RouteLoadUpdatesService.updatesBeforeRouteLoad('Detailed - FWA History');
                }
            },
            data: { activeTab: 'fwaHistory' }
        });


})