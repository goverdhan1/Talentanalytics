/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/headcountdetailview.service.js" />

describe('Headcount detail viewM mtrics service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountDetailView'));

    var $httpBackend;
    var CoreConstants;
    var HeadcountDetailViewMetricsService;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HeadcountDetailViewMetricsService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HeadcountDetailViewMetricsService = _HeadcountDetailViewMetricsService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {

        var returnValue = '{"returnedValue":"1"}';
        var filterName = 'filterNameMock';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/POC_HCM_SUMMARY_METRICS.xsodata/HCM_SUMMARY_METRICSParameters(FILTER_NAME='" + filterName + "')/Results?$format=json").respond('{ "d": ' + returnValue + '}');

        HeadcountDetailViewMetricsService.get({ filterName: filterName }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});
