
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />
/// <reference path="../models/jobHistory.model.js" />
/// <reference path="../services/jobHistory.services.js" />



describe('JobHistoryService', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('jobHistory'));

    var JobHistoryService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;
    var JobHistoryModel;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _JobHistoryModel_, _JobHistoryService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            JobHistoryModel = _JobHistoryModel_;
            JobHistoryService = _JobHistoryService_;
        }));

        JobHistoryModel.prototype.getModelFromResponse = function (response) {
            return response;
        };

        var returnValue = '{"returnedValue":"1"}';
        var employeeId = '12345';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Job_History_Summary.xsodata/EMPLOYEE_QV_JOB_HISTORY_SUMMARYParameters(IP_PGEPERSID='" + employeeId + "')/Results?$format=json").respond(returnValue);

        JobHistoryService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();
    });
});