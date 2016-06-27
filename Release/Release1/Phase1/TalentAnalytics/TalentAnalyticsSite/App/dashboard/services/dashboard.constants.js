'use strict';

angular.module('dashboard').constant('DashboardConstants', {
    defaultTabIndex: 1,
    tiles: [{
            title: 'Employee Quickview',
            iconClass: 'employeeQuickview',
            tabIndex: 1,
            analyticsCode: 'Employee Quickview tile'
        },
        //{
        //    title: 'Total Rewards',
        //    iconClass: 'totalRewards',
        //    tabIndex: 2,
        //    analyticsCode:'Total Rewards tile'
        //},
        {
            title: 'Ad hoc Reporting',
            iconClass: 'adhocReporting',
            tabIndex: 3,
            analyticsCode:'AD-hoc Reporting tile'
        }//,
        //{
        //    title: 'Visualizations and Analytics',
        //    iconClass: 'visandAnalytics',
        //    tabIndex: 4,
        //    analyticsCode: 'Visualizations and Analytics tile'
        //}
    ],

    intakeFormLink: "https://talentsites.deloittenet.deloitte.com/CTS/goTOD.aspx?Key=TRT",

    SOBSTalentLink: "{0}opendoc.htm?document=SOBS_TALENT%2FSOBS_TALENT.qvw&host=QVS%40Cluster"
});