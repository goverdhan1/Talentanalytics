'use strict';

angular.module('summary').factory('SummaryModel', ['taCurrencyFilter', 'CoreConstants', 'CoreFunctions', function (taCurrencyFilter, CoreConstants, CoreFunctions) {

    function SummaryModel(){

    }

    SummaryModel.prototype.getModelFromResponse = function(response) {

        if (!response || !response.d || !response.d.results || !response.d.results.length > 0) {
            console.error('No data or unexpected format of data returned by the summary service');
            return new SummaryModel();
        }
        var data = response.d.results[0];
        var employeeUserId = data.WINDOWS_ID || data.USRID;

        var model = new SummaryModel();

        model.profileImg = CoreFunctions.getFormattedString(CoreConstants.profileImageLink, CoreConstants.baseProfileImageUrl, employeeUserId);
        model.dpnNetURL = CoreFunctions.getDPNProfileLink(employeeUserId);
        model.employeeBonusDetailsLink = CoreFunctions.getBonusLink(data.EMPLOYEE, 'Y');

        var PIIData = data.SECURITY_FLAG;
        if (PIIData == "N") { model.PIIDataClass = "PIIDataClass"; }

        model.canDisplayPIIInformation = data.SECURITY_FLAG === 'Y';
        model.PIIData = data.SECURITY_FLAG;
        model.employeeName = data.EMPLOYEE_TXT_MED;
        model.empCounslerName = data.CACOUNSL_TXT;
        model.jobLevel = data.PLEVEL_TXT;
        model.location = data.PERS_SAREA_TXT;
        model.deskPhone = data.PHONEDESK;
        model.primaryAddressStreet1 = data.STREET;
        model.primaryAddressStreet2 = data.STREET2;
        model.primaryAddressCity = data.CITY;
        model.primaryAddressState = data.REGION_TXT;
        model.primaryAddressPostalCode = data.POSTAL_CD;
        model.primaryAddressCountryKey = data.COUNTRY_TXT;
        //model.homeAddress = model.primaryAddressStreet1 && model.primaryAddressCity;
        //console.log(model.homeAddress)
        model.personalNumber = data.EMPLOYEE;
      //  model.annualSalCurrency = data.EMPLOYEE;
        model.annualSalary = taCurrencyFilter(data.ANSALARY, data.CURR_ANSAL);
        model.hireDate = data.PDTORIHIR;
        model.anniversaryDate = data.PDTANNIVERSARY;
        model.lastPromotionDate = data.LASTPRDAT;
        //model.empFunction = data.PFUNCTION_TXT;
        //model.empServiceArea = data.PHRSAREA_TXT;
        //model.empServiceLine = data.PHRSLINE_TXT;
        //model.primaryMarketOffering = data.PPMARKET_TXT;
        //model.seconderyMarketingOffering = data.PSMARKET_TXT;

        return model;
    };

    return SummaryModel;

}]);