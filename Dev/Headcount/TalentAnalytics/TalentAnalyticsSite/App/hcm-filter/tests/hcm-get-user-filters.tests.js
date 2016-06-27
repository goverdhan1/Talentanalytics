/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />

/// <reference path="../../header/services/userdetails.value.js" />

/// <reference path="../services/hcm-get-user-filters.js" />

describe('hcm attributes filter service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));
    //beforeEach(module('header'));

    var $httpBackend;
    var CoreConstants;
    var hcmGetUserFiltersService;
    var UserDetails;

    // Wrap the parameter in underscores
    beforeEach(inject(function (
        _$httpBackend_,
        _CoreConstants_,
        _UserDetails_,
        _hcmGetUserFiltersService_
        ) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        UserDetails = _UserDetails_;
        UserDetails.userId = 'USERID';
        hcmGetUserFiltersService = _hcmGetUserFiltersService_;
       
    }));

    it('Should be capable of returning data through the get protocol', function () {

        var returnValue = '{"returnedValue":"1"}';

        //mock http service
        $httpBackend.expectGET(CoreConstants.baseHeadcountUrl
            + "Services/Employee_HCM_Filter_Drop_Down_Get_Service.xsodata/FILTER_DROPDOWNParameters(USERNAME='USERID')/Results?$format=json")
                .respond('{ "d": ' + returnValue + '}');

        hcmGetUserFiltersService.get({userName: UserDetails.userId}, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        //flush mock http service to return get results
        $httpBackend.flush();

    });
});
