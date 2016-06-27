'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="testharness.tests.js" />
/// <reference path="../controllers/activityHistory.controller.js" />

describe("Activityhistory summary module", function () {

    beforeEach(module("activityHistory"));

    describe("ActivityHistory Controller", function () {

        var controller, scope, ActivityHistoryService, stateParams, CoreConstants;
        stateParams = {}; //creating a mock object for stateParams

        beforeEach(inject(function ($rootScope, $controller){
            scope = $rootScope.$new();


            controller = $controller("ActivityHistoryController", {
                $scope: scope,
                $stateParams: stateParams,
                ActivityHistoryService: ActivityHistoryService, //todo: pass a mock object to test methods that calls this service
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