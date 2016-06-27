/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-market-offer-hierarchy-service.js" />

describe('Hcm market offer hierarchy service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HcmMarketOfferHierarchyService;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HcmMarketOfferHierarchyService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HcmMarketOfferHierarchyService = _HcmMarketOfferHierarchyService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {
        var rootId = 'mockRootId';
        var returnValue = '{"returnedValue":"1"}';
        var url = "https://ushdbhwd.deloitte.com/deloitte/hr/app-talent-analytics/Services/Employee_HCM_Market_Offering_Hier.xsodata/GET_MARKETOFFER_HIERParameters(IP_ROOT='" + rootId + "')/Results?$format=json";
        $httpBackend.expectGET(url).respond('{ "d": ' + returnValue + '}');
        HcmMarketOfferHierarchyService.get({ rootId: rootId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});