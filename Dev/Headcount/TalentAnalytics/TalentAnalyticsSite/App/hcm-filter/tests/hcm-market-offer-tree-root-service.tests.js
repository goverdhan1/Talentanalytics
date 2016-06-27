/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-market-offer-tree-root-service.js" />

describe('Hcm market offer root node', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HcmMarketOfferRootNode;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HcmMarketOfferRootNode_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HcmMarketOfferRootNode = _HcmMarketOfferRootNode_;
    }));

    it('Should be capable of returning data through the get protocol', function () {
        var returnValue = '{"returnedValue":"1"}';
        var url = "https://ushdbhwd.deloitte.com/deloitte/hr/app-talent-analytics/Services/Employee_HCM_Market_Offering_TreeRoots.xsodata/GET_TREE_ROOTS/?$format=json";
        $httpBackend.expectGET(url).respond('{ "d": ' + returnValue + '}');
        HcmMarketOfferRootNode.get({}, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});