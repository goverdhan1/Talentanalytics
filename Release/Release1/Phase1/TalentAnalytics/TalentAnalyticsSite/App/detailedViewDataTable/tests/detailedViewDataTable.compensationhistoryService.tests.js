'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../core/services/core.constants.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../services/detailview.compensationhistory.service.js" />

describe('detailedViewCompensation Service', function () {

    // You need to load modules that you want to test,
     beforeEach(module('detailedViewDataTable'));

    var DetailedViewCompensationHistoryService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _DetailedViewCompensationHistoryService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            DetailedViewCompensationHistoryService = _DetailedViewCompensationHistoryService_;
        }));

        var httpBackendResult = JSON.stringify({
            d: {
                results: [
                    { ANSALARY: '10' }
                ]
            }
        });
        var employeeId = '12345';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Compensation_Detailed.xsodata/EMPLOYEE_QV_COMPENSATION_DETAILEDParameters(IP_PGEPERSID='" + employeeId + "')/Results?$format=json").respond(httpBackendResult);

        DetailedViewCompensationHistoryService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response.d.results)).toEqual('[{"ANSALARY":10}]');
        });

        $httpBackend.flush();
    });
});