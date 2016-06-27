
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />
/// <reference path="../models/certificationSummary.model.js" />
/// <reference path="../services/certificationSummary.services.js" />



describe('CertificationSummaryService', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('certificationSummary'));

    var CertificationSummaryService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;
    var CertificationSummaryModel;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _CertificationSummaryModel_, _CertificationSummaryService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            CertificationSummaryModel = _CertificationSummaryModel_;
            CertificationSummaryService = _CertificationSummaryService_;
        }));

        CertificationSummaryModel.prototype.getModelFromResponse = function (response) {
            return response;
        };

        var returnValue = '{"returnedValue":"1"}';
        var employeeId = '12345';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Certifications_Summary.xsodata/EMPLOYEE_QV_CERTIFICATIONS_SUMMARYParameters(IP_PGEPERSID='" + employeeId + "')/Results?$format=json").respond(returnValue);

        CertificationSummaryService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();
    });
});