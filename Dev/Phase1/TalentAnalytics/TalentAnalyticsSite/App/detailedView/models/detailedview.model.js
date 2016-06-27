'use strict';

angular.module('detailedView').factory('DetailedViewModel', ['currencyFilter', 'CoreConstants', 'CoreFunctions',
    function (currencyFilter, CoreConstants, CoreFunctions) {

    function DetailedViewModel() {

    }

    DetailedViewModel.prototype.getModelFromResponse = function (response) {
        if (!response || !response.d || !response.d.results || !response.d.results.length > 0) {
            console.error('No data or unexpected format of data returned by the detail view service');
            return new DetailedViewModel();
        }

        var data = response.d.results[0];
        var employeeUserId = data.WINDOWS_ID || data.USRID;
        var model = new DetailedViewModel();

        model.profileImg = CoreFunctions.getFormattedString(CoreConstants.profileImageLink, CoreConstants.baseProfileImageUrl, employeeUserId);
        model.dpnNetURL = CoreFunctions.getDPNProfileLink(employeeUserId);
        model.bonusURL = CoreFunctions.getBonusLink(data.EMPLOYEE, 'Y');
        
        model.employeeName = data.EMPLOYEE_TXT_MED;
        model.jobLevel = data.PLEVEL_TXT;
        model.location = data.PERS_SAREA_TXT;
        model.deskPhone = data.PHONEDESK;
        model.canDisplayPIIInformation = data.SECURITY_FLAG === 'Y';
        return model;
    };

    return DetailedViewModel;

}]);