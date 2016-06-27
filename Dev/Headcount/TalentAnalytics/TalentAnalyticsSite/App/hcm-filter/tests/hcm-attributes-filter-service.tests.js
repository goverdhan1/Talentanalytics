/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-attributes-filter-service.js" />

describe('hcm attributes filter service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HeadcountManagementFilterAttributesService;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HeadcountManagementFilterAttributesService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HeadcountManagementFilterAttributesService = _HeadcountManagementFilterAttributesService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {

        var returnValue = '{"returnedValue":"1"}';
        $httpBackend.expectGET(CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterLabels.xsodata/HCM_FILTER_LABELS/?$format=json").respond('{ "d": ' + returnValue + '}');
        HeadcountManagementFilterAttributesService.get({}, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});
