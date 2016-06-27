
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../core/services/core.constants.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../services/detailview.ratinghistory.service.js" />


describe('detailedViewDataTable Service',
    function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('detailedViewDataTable'));

    var DetailedViewRatingHistoryService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _DetailedViewRatingHistoryService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            DetailedViewRatingHistoryService = _DetailedViewRatingHistoryService_;
        }));

        var httpBackendResult = JSON.stringify({
            d: {
                results: [
                    { ANSALARY: '10' }
            ]
            }
        });
        var employeeId = '12345';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Ratings_History_Detailed.xsodata/EMPLOYEE_QV_RATINGS_HISTORY_DETAILEDParameters(IP_PGEPERSID='" + employeeId + "')/Results?$format=json").respond(httpBackendResult);

        DetailedViewRatingHistoryService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response.d.results)).toEqual('[{"ANSALARY":10}]');
        });

        $httpBackend.flush();
    });
});