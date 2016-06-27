/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-job-level-hierarchy-service.js" />

describe('Hcm jobLevel hierarchy service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HcmJobLevelHierarchyService;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HcmJobLevelHierarchyService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HcmJobLevelHierarchyService = _HcmJobLevelHierarchyService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {
        var rootId = 'mockRootId';
        var returnValue = '{"returnedValue":"1"}';
        var url = "https://ushdbhwd.deloitte.com/deloitte/hr/app-talent-analytics/Services/Employee_HCM_Job_Level_Hier.xsodata/GET_JOBLEVEL_HIERParameters(IP_ROOT='" + rootId + "')/Results?$format=json";
        $httpBackend.expectGET(url).respond('{ "d": ' + returnValue + '}');
        HcmJobLevelHierarchyService.get({ rootId: rootId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});
