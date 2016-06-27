/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-hierarchy-filter-service.js" />

describe('Hcm filter hierarchy service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var headcountDetailView;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HcmFilterHierarchyService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HcmFilterHierarchyService = _HcmFilterHierarchyService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {
        var rootId = 'mockRootId';
        var returnValue = '{"returnedValue":"1"}';
        $httpBackend.expectGET(CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_Cost_Center_Hier.xsodata/GET_COSTCENTER_HIERParameters(IP_ROOT='" + rootId + "')/Results?$format=json").respond('{ "d": ' + returnValue + '}');
        HcmFilterHierarchyService.get({ rootId: rootId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});