/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-poc-edit-filter-values-service.js" />

describe('Hcm poc edit filter values', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HcmPocEditFilterValues;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HcmPocEditFilterValues_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HcmPocEditFilterValues = _HcmPocEditFilterValues_;
    }));

    it('Should be capable of returning data through the get protocol', function () {
        var returnValue = '{"returnedValue":"1"}';
        var selectedAttribute = 'selectedAttributeMock';

        var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterValues.xsodata/HCM_EDIT_FILTER_VALUESParameters(IP_ATTRIBUTE='" + selectedAttribute + "')/Results?$format=json";

        $httpBackend.expectGET(url).respond('{ "d": ' + returnValue + '}');
        HcmPocEditFilterValues.get({ selectedAttribute: selectedAttribute }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});