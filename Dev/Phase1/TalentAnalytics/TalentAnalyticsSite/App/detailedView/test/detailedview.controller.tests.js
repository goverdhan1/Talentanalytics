'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="testharness.tests.js" />
/// <reference path="../controllers/detailedView.controller.js" />

describe("detailedView module", function () {

    beforeEach(module("detailedView"));

	describe("DetailedView Controller", function () {

	    var controller, scope, DetailedViewService, $stateParams, CoreConstants, currencyFilter, $state, ExportData;
		stateParams = {}; //creating a mock object for stateParams

		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();


			controller = $controller("DetailedViewController", {
				$scope: scope,
				$stateParams: $stateParams,
				$state:$state,
				currencyFilter:currencyFilter,
			    ExportData:ExportData,
				DetailedViewService: DetailedViewService, //todo: pass a mock object to test methods that calls this service
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