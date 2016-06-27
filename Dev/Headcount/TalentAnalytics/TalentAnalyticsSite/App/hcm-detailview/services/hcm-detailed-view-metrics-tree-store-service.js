'use strict';

angular.module('headcountDetailView').factory('hcmDetailedViewMetricsTreeStoreService', function (toaster) {
    var startsChildren = [
        {
            name: "Total Starts", showChildren: false, isSelected: false, dataID: 'TOTALSTARTS', children: [
                { name: "Campus", isSelected: false, dataID: 'CAMPUS' },
                { name: "Experienced", isSelected: false, dataID: 'EXPERIENCED' },
                { name: "PPD", isSelected: false, dataID: 'PPD' }
            ]
        },
        { name: "Intens", isSelected: false, dataID: 'intens' },
        {
            name: "Total Future Starts",
            showChildren: false,
            isSelected: false,
            dataID: 'totalFuteresStarts',
            children: [
                { name: "Future - Campus", isSelected: false },
                { name: "Future - Experienced", isSelected: false },
                { name: "Future - PPD", isSelected: false }
            ]
        },
        { name: "Future - Interns", isSelected: false, dataID: 'futureInterns' },
        { name: "Externals", isSelected: false, dataID: 'externals' },
        { name: "JIT", isSelected: false },
        { name: "Veteran Starts", isSelected: false }
    ];

    var separationsChildren = [
        {
            name: "Total Terms", isSelected: false, showChildren: false, dataID: 'TOTALTERMS', children: [
                { name: "Voluntary Terms", isSelected: false, dataID: 'VOLUNTARYTERMS' },
                { name: "Involuntary Terms", isSelected: false, dataID: 'INVOLUNTARYTERMS' }
            ]
        },
        {
            name: "Total Future Terms", isSelected: false, showChildren: false, children: [
                { name: "Voluntary Future Terms", isSelected: false},
                { name: "In Voluntary Future Terms", isSelected: false }
            ]
        },
        {
            name: "Turnover (YTD)", isSelected: false, showChildren: false, dataID: 'TURNOVERYTD', children: [
                { name: "Voluntary Turnover (YTD)", isSelected: false, dataID: 'VOLUNTARYTURNOVERYTD' },
                { name: "Involuntary Turnover (YTD)", isSelected: false, dataID: 'INVOLUNTARYTURNOVERYTD' }
            ]
        },
        {
            name: "Turnover (R13)", isSelected: false, showChildren: false, dataID: 'TURNOVERR13', children: [
                { name: "Voluntary Turnover (R13)", isSelected: false, dataID: 'VOLTURNOVERR13' },
                { name: "Involuntary Turnover (R13)", isSelected: false, dataID: 'INVOLTURNOVERR13' }
            ]
        },

        { name: "Voluntary Terms - Top Performers", isSelected: false, dataID: 'VOLUNTARYTERMSTOPPERFORMER' },
        { name: "Voluntary Terms - Other Performers", isSelected: false, dataID: 'VOLUNTARYTERMSNONTOPPERFORMER' },
        { name: "Voluntary Terms -  New Starts", isSelected: false, dataID: 'VOLUNTARYTERMSNEWSTARTS' },
        { name: "Employee Top Performer Actives", isSelected: false, dataID: 'EMPTOPPERFMACTIVES' },
        { name: "Employee Other Performer Actives", isSelected: false, dataID: 'EMPNONTOPPERFMACTIVES' }, 
        { name: "Voluntary Top Performer Turnover (YTD)", isSelected: false, dataID: 'VOLUNTARYTOPPERFORMAERTURNOVERYTD' },
        { name: "Voluntary Top Performer Turnover (R13)", isSelected: false, dataID: 'VOLUNTARYTOPPERFORMAERTURNOVERR13' },
        { name: "Voluntary Other Performer Turnover (YTD)", isSelected: false, dataID: 'VOLUNTARYNONTOPPERFORMAERTURNOVERYTD' },
        { name: "Voluntary Other Performer Turnover (R13)", isSelected: false, dataID: 'VOLUNTARYNONTOPPERFORMAERTURNOVERR13' },
        { name: "Voluntary New starts Turnover ( YTD )", isSelected: false, dataID: 'VOLUNTARYNEWSTARTSTURNOVERYTD' },
        { name: "Voluntary New starts Turnover ( R13 )", isSelected: false, dataID: 'VOLUNTARYNEWSTARTSTURNOVER13' },

        {
            name: "Female Terms", isSelected: false, showChildren: false, children: [
                { name: "Female Voluntary Terms", isSelected: false },
                { name: "Female Involuntary Terms", isSelected: false }
            ]
        },
        {
            name: "Female Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Female Voluntary Turnover (YTD)", isSelected: false },
                { name: "Female Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Female Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Female Voluntary Turnover (R13)", isSelected: false },
                { name: "Female Involuntary Turnover (R13)", isSelected: false }
            ]
        },
        {
            name: "Male Terms", isSelected: false, showChildren: false, children: [
                { name: "Male Voluntary Terms", isSelected: false },
                { name: "Male Involuntary Terms", isSelected: false }
            ]
        },
        {
            name: "Male Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Male Voluntary Turnover (YTD)", isSelected: false },
                { name: "Male Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Male Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Male Voluntary Turnover (R13)", isSelected: false },
                { name: "Male Involuntary Turnover (R13)", isSelected: false }
            ]
        },
        {
            name: "Gender Gap (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Gender Gap - Voluntary (YTD)", isSelected: false },
                { name: "Gender Gap - Involuntary (YTD)", isSelected: false }
            ]
        },
        {
            name: "Gender Gap (R13)", isSelected: false, showChildren: false, children: [
                { name: "Gender Gap - Voluntary (R13)", isSelected: false },
                { name: "Gender Gap - Involuntary (R13)", isSelected: false }
            ]
        },
        {
            name: "Minority Total Terms", isSelected: false, showChildren: false, children: [
                { name: "Minority Voluntary Terms", isSelected: false },
                { name: "Minority Involuntary Terms", isSelected: false }
            ]
        },
        {
            name: "Minority Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Minority Voluntary Turnover (YTD)", isSelected: false },
                { name: "Minority Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Minority Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Minority Voluntary Turnover (R13)", isSelected: false },
                { name: "Minority Involuntary Turnover (R13)", isSelected: false }
            ]
        },
        {
            name: "Non Minority Total Terms", isSelected: false, showChildren: false, children: [
                { name: "Non Minority Voluntary Terms", isSelected: false },
                { name: "Non Minority Involuntary Terms", isSelected: false }
            ]
        },
        {
            name: "Non-Minority Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Non-Minority Voluntary Turnover (YTD)", isSelected: false },
                { name: "Non-Minority Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Non-Minority Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Non-Minority Voluntary Turnover (R13)", isSelected: false },
                { name: "Non-Minority Involuntary Turnover (R13)", isSelected: false }
            ]
        },
        {
            name: "Minority Gap (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Minority Gap - Voluntary (YTD)", isSelected: false },
                { name: "Minority Gap - Involuntary (YTD)", isSelected: false }
            ]
        },
        {
            name: "Minority Gap (R13)", isSelected: false, showChildren: false, children: [
                { name: "Minority Gap - Voluntary (R13)", isSelected: false },
                { name: "Minority Gap - Involuntary (R13)", isSelected: false }
            ]
        },
        {
            name: "Campus Total Terms", isSelected: false, showChildren: false, children: [
                { name: "Campus Voluntary Terms", isSelected: false },
                { name: "Campus Involuntary Terms", isSelected: false }
            ]
        },
        {
            name: "Campus Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Campus Voluntary Turnover (YTD)", isSelected: false },
                { name: "Campus Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Campus Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Campus Voluntary Turnover (R13)", isSelected: false },
                { name: "Campus Involuntary Turnover (R13)", isSelected: false }
            ]
        },
        {
            name: "Experienced Total Terms", isSelected: false, showChildren: false, children: [
                { name: "Experienced Voluntary Terms", isSelected: false },
                { name: "Experienced Involuntary Terms", isSelected: false }
            ]
        },
        {
            name: "Experienced Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Experienced Voluntary Turnover (YTD)", isSelected: false },
                { name: "Experienced Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Experienced Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Experienced Voluntary Turnover (R13)", isSelected: false },
                { name: "Experienced Involuntary Turnover (R13)", isSelected: false }
            ]
        },
        {
            name: "Veteran Total Terms", isSelected: false, showChildren: false, children: [
                { name: "Veteran Voluntary Terms ", isSelected: false },
                { name: "Veteran Involuntary Terms ", isSelected: false }
            ]
        },
        {
            name: "Veteran Turnover (YTD)", isSelected: false, showChildren: false, children: [
                { name: "Veteran Voluntary Turnover (YTD)", isSelected: false },
                { name: "Veteran Involuntary Turnover (YTD)", isSelected: false }
            ]
        },
        {
            name: "Veteran Turnover (R13)", isSelected: false, showChildren: false, children: [
                { name: "Veteran Voluntary Turnover (R13)", isSelected: false },
                { name: "Veteran Involuntary Turnover (R13)", isSelected: false }
            ]
        },

        { name: "Current Tenure", isSelected: false },
        { name: "Average Tenure at Termination", isSelected: false }
    ];

    var transfersInChildren = [
        { name: "Total Transfers In", isSelected: false },
        { name: "Promotional Transfers In", isSelected: false },
        { name: "Demotion Transfers In", isSelected: false },
        { name: "Lateral Transfers In", isSelected: false }
    ];

    var transfersOutChildren = [
        { name: "Total Transfers Out", isSelected: false },
        { name: "Promotional Transfers Out", isSelected: false },
        { name: "Demotion Transfers Out", isSelected: false },
        { name: "Lateral Transfers Out", isSelected: false }
    ];

    var salaryContinuationChildren = [
        { name: "Number of Employee on Salary Continuation", isSelected: false }
    ];

    var workforceGroupingsChildren = [
        { name: "Headcount", isSelected: false, dataID: 'HEADCOUNT' },
        { name: "Active Externals", isSelected: false },
        { name: "Active Temps", isSelected: false },
        { name: "Active JIT's", isSelected: false },
        { name: "Active LOA", isSelected: false },
        { name: "Part timers less than 20 Hrs", isSelected: false },
        { name: "Seasonal", isSelected: false },
        { name: "Active Interns", isSelected: false }
    ];

    var data = [
        { name: "Beginning Headcount", isSelected: false, dataID: 'beginningHeadcount' },
        { name: "Net Change", isSelected: false, dataID: 'netChange' },
        { name: "Starts", showChildren: false, isSelected: false, children: startsChildren, dataID: 'starts' },

        { name: "Separations", showChildren: false, isSelected: false, children: separationsChildren, dataID: 'separations' },
        { name: "Transfers In", showChildren: false, isSelected: false, children: transfersInChildren, dataID: 'transfersIn' },
        { name: "Transfers Out", showChildren: false, isSelected: false, children: transfersOutChildren, dataID: 'transfersOut' },

        { name: "Miscellaneous Adjustments", isSelected: false },
        { name: "Ending Headcount", isSelected: false },
        { name: "Salary Continuation", showChildren: false, isSelected: false, children: salaryContinuationChildren },

        { name: "Beginning LOA", isSelected: false },
        { name: "Ending LOA", isSelected: false },
        { name: "Workforce Groupings", showChildren: false, isSelected: false, children: workforceGroupingsChildren }
    ];

    return data;
});