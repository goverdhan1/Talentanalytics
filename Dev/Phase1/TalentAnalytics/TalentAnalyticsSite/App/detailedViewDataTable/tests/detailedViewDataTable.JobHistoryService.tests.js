﻿
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../core/services/core.constants.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../services/detailview.jobhistory.service.js" />


describe('detailedViewDataTable Service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('detailedViewDataTable'));

    var DetailedViewJobHistoryService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _DetailedViewJobHistoryService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            DetailedViewJobHistoryService = _DetailedViewJobHistoryService_;
        }));

        var httpBackendResult = JSON.stringify({
            d: {
                results: [
                    { ANSALARY: '100' }
            ]
            }
        });
        var employeeId = '12345';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Job_History_Details.xsodata/EMPLOYEE_QV_JOB_HISTORY_DETAILSParameters(IP_PGEPERSID='" + employeeId + "')/Results?$format=json").respond(httpBackendResult);

        DetailedViewJobHistoryService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response.d.results)).toEqual('[{"ANSALARY":100}]');
        });

        $httpBackend.flush();
    });
});