/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-datefilter-post-service.js" />

describe('Headcount management filter post service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HeadcountManagementFilterPostService;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HeadcountManagementFilterPostService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HeadcountManagementFilterPostService = _HeadcountManagementFilterPostService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {

        var returnValue = '{"returnedValue":"1"}';
        $httpBackend.expectPOST(CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Post_Service.xsodata/Post").respond(returnValue);
        HeadcountManagementFilterPostService.save({}, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});
