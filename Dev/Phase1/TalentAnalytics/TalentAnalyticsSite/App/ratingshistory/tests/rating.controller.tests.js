
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="testharness.tests.js" />
/// <reference path="../controllers/ratingHistory.controller.js" />

describe("Rating History  Module", function () {

    beforeEach(module("ratingHistory"));

    describe("Rating History Controller", function () {

        var controller, scope, RatingHistoryService, stateParams, CoreConstants;;
        RatingHistoryService = {}; 
        stateParams = {};

           beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            controller = $controller("RatingHistoryController", {
                $scope: scope,
                RatingHistoryService: RatingHistoryService,
                $stateParams: stateParams,
                CoreConstants: CoreConstants
            });
        }));

        it('should set the scope variable for employeeId to the value that is passed as a url parameter', function () {
            var testValue = '123456';
            stateParams.employeeId = testValue;
            scope.setEmployeeId();

            expect(scope.employeeId).toEqual(testValue)
        });

    });

});