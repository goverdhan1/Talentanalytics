'use strict';

angular.module('core').factory('ustageStatistics', function ( UserDetails) {
    return{

        analyticsValue: function (trackNavigation) {
          

                var pageName, page;
                if (trackNavigation && trackNavigation.length > 0) {

                    var newValArr = trackNavigation.split('|');
                    if (newValArr.length === 2) {
                        pageName = newValArr[0];
                        page = newValArr[1];
                    }
                }
                if (!pageName || !page) {
                    console.error('track navigation values missing');
                    return;
                }
                if (pageName != '') {
                    var s = s_gi(s_account);
                    var origLinkTrackVars = s.linkTrackVars;
                    var origLinkTrackEvents = s.linkTrackEvents;
                    s.linkTrackVars = 'events,channel,prop14,eVar14,eVar75,prop75,eVar75,prop60,eVar60,prop61,eVar61,prop64,eVar64,prop65,eVar65,prop66,eVar66,prop67,eVar67';

                    switch (page) {
                        case 'home':
                            s.prop60 = s.eVar60 = pageName;
                            s.linkTrackEvents = 'event31';
                            s.events = 'event31';
                            break;
                        case 'home_page_links':
                            s.prop61 = s.eVar61 = pageName;
                            s.linkTrackEvents = 'event32';
                            s.events = 'event32';
                            break;
                        case 'HM_Summary':
                            s.prop64 = s.eVar64 = pageName;
                            s.linkTrackEvents = 'event35';
                            s.events = 'event35';
                            break;
                        case 'HM_Filter_Selection':
                            s.prop65 = s.eVar65 = pageName;
                            s.linkTrackEvents = 'event36';
                            s.events = 'event36'
                            break;
                        case 'HM-Standard-Views':
                            s.prop66 = s.eVar66 = pageName;
                            s.linkTrackEvents = 'event37';
                            s.events = 'event37';
                            break;
                        case 'HM-Chart-Scale':
                            s.prop67 = s.eVar67 = pageName;
                            s.linkTrackEvents = 'event38';
                            s.events = 'event38';
                            break;
                    }
                    s.tl(this, 'o', 'Button Click');
                    s.linkTrackVars = origLinkTrackVars;
                    s.linkTrackEvents = origLinkTrackEvents;
                    s.events = '';
                    switch (page) {
                        case 'home':
                            s.prop60 = s.eVar60 = '';
                            break;
                        case 'home_page_links':
                            s.prop61 = s.eVar61 = '';
                            break;
                        case 'HM_Summary':
                            s.prop64 = s.eVar64 = '';
                            break;
                        case 'HM_Filter_Selection':
                            s.prop65 = s.eVar65 = '';
                            break;
                        case 'HM-Standard-Views':
                            s.prop66 = s.eVar66 = '';
                            break;
                        case 'HM-Chart-Scale':
                            s.prop67 = s.eVar67 = '';
                            break;
                    }
                }



        }

}

})
