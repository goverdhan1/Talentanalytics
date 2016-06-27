'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="testharness.tests.js" />
/// <reference path="../controllers/certificationSummary.controller.js" />

describe("certificationSummary module", function () {

    beforeEach(module("certificationSummary"));

    describe("CertificationSummary Controller", function () {

        var controller, scope, CertificationSummaryService, stateParams, CoreConstants;
        stateParams = {}; //creating a mock object for stateParams

        beforeEach(inject(function ($rootScope, $controller){
            scope = $rootScope.$new();


            controller = $controller("CertificationSummaryController", {
                $scope: scope,
                $stateParams: stateParams,
                CertificationSummaryService: CertificationSummaryService, //todo: pass a mock object to test methods that calls this service
                CoreConstants: CoreConstants //todo: pass a mock object to test methods that use this
            });
        }));

        it('should set the scope variable for employeeId to the value that is passed as a url parameter', function () {

            var testValue = '123456';
            stateParams.employeeId = testValue;

            scope.setEmployeeId();

            expect(scope.employeeId).toEqual(testValue);

        });
    });

});