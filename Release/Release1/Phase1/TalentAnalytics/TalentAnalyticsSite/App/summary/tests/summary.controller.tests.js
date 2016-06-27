'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="testharness.tests.js" />
/// <reference path="../controllers/summary.controller.js" />

describe("summary module", function () {

    beforeEach(module("summary"));

    describe("Summary Controller", function () {

        var controller, scope, SummaryLeftbarService, stateParams, CoreConstants, toaster;
        stateParams = {}; //creating a mock object for stateParams

        beforeEach(inject(function ($rootScope, $controller){
            scope = $rootScope.$new();


            controller = $controller("SummaryController", {
                $scope: scope,
                $stateParams: stateParams,
                SummaryLeftbarService: SummaryLeftbarService, //todo: pass a mock object to test methods that calls this service
                CoreConstants: CoreConstants, //todo: pass a mock object to test methods that use this,
                toaster: toaster
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