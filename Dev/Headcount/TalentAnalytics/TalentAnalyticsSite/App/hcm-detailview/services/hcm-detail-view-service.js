(function (angular) {
    'use strict';
    function DetailViewService($resource, CoreConstants) {
        var service = this;
        service.getMetricsForCurrentYear = getMetricsForCurrentYear;
        service.getMetricsForPreviousYear = getMetricsForPreviousYear;
        service.getMetricsForCalendarDateSelection = getMetricsForCalendarDateSelection;
        service.getMetricsForFiscalSelection = getMetricsForFiscalSelection;

        function getMetricsForCurrentYear() {
            var url = CoreConstants.baseHANAUrl + "app-talent-hcm/Services/Employee_HCM_Detailed_Page_View.xsodata/HCM_DETAILED_CURRENTSTD_METRICSParameters(IP_FILTERNAME=':filterName')/Results?$format=json";
            return $resource(url, { filterName: '@filterName' }, {
                'get': {
                    method: 'GET',
                    withCredentials: true,
                    transformResponse: function (data) {
                        return angular.fromJson(data).d;
                    }
                }
            });
        }
        function getMetricsForPreviousYear() {
            var url = CoreConstants.baseHANAUrl + "app-talent-hcm/Services/Employee_HCM_Detailed_Metrics_PY.xsodata/HCM_DETAILED_METRICS_PYParameters(IP_FILTERNAME=':filterName')/Results?$format=json";
            return $resource(url, { filterName: '@filterName' }, {
                'get': {
                    method: 'GET',
                    withCredentials: true,
                    transformResponse: function (data) {
                        return angular.fromJson(data).d;
                    }
                }
            });
        }
        function getMetricsForCalendarDateSelection() {
            var url = CoreConstants.baseHANAUrl + "app-talent-hcm/Services/Employee_HCM_Detailed_Page_Cus_Cd.xsodata/HCM_DETAILED_CUSCD_METRICSParameters(IP_FILTERNAME=':filterName')/Results?$format=json";
            return $resource(url, { filterName: '@filterName' }, {
                'get': {
                    method: 'GET',
                    withCredentials: true,
                    transformResponse: function (data) {
                        return angular.fromJson(data).d;
                    }
                }
            });
        }
        function getMetricsForFiscalSelection() {
            var url = CoreConstants.baseHANAUrl + "app-talent-hcm/Services/Employee_HCM_Detailed_Metrics_Custom.xsodata/HCM_DETAILED_METRICS_CUSTOMParameters(IP_FILTER_NAME=':filterName')/Results?$format=json";
            return $resource(url, { filterName: '@filterName' }, {
                'get': {
                    method: 'GET',
                    withCredentials: true,
                    transformResponse: function (data) {
                        return angular.fromJson(data).d;
                    }
                }
            });
        }
    }
    DetailViewService.$inject = ['$resource', 'CoreConstants'];
    angular.module('headcountDetailView').service('DetailViewService', DetailViewService);
})(window.angular);

