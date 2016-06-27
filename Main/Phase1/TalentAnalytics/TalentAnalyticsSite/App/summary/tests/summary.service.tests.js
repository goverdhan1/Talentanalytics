'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />
/// <reference path="../models/summary.model.js" />
/// <reference path="../services/summary.service.js"/>



describe('Summary SummaryLeftbarService', function () {
    beforeEach(module('summary'));

    var SummaryLeftbarService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;
    var SummaryModel;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _SummaryModel_, _SummaryLeftbarService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            SummaryModel = _SummaryModel_;
            SummaryLeftbarService = _SummaryLeftbarService_;
        }));

        SummaryModel.prototype.getModelFromResponse = function (response) {
            return response;
        };

        var returnValue = '{"returnedValue":"1"}';
        var employeeId = '12345';
        
        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_QV_Left_Summary_Screen.xsodata/EMPLOYEE_QV_LEFT_SUMMARY_SCREENParameters(IP_PGEPERSID='"+ employeeId + "')/Results?$format=json").respond(returnValue);

        SummaryLeftbarService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();
    });
});
