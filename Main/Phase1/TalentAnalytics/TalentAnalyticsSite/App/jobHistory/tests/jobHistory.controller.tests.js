'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="testharness.tests.js" />
/// <reference path="../controllers/jobHistory.controller.js" />

describe("Jobhistory summary module", function () {

    beforeEach(module("jobHistory"));

    describe("JobHistory Controller", function () {

        var controller, scope, JobHistoryService, stateParams, CoreConstants;
        stateParams = {}; //creating a mock object for stateParams

        beforeEach(inject(function ($rootScope, $controller){
            scope = $rootScope.$new();


            controller = $controller("JobHistoryController", {
                $scope: scope,
                $stateParams: stateParams,
                JobHistoryService: JobHistoryService, 
                CoreConstants: CoreConstants 
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