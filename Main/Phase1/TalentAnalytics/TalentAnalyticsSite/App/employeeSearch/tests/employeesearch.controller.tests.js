'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../core/services/core.constants.js" />
/// <reference path='testharness.tests.js'/>

/// <reference path="../controllers/employeeSearch.controller.js" />


describe('employeeSearch Controller', function () {

    beforeEach(module('employeeSearch'));

    var scope, employeeSearch;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        
        $controller("EmployeeSearchController", {
            $scope: scope,
            employeeSearch: null,
            toaster: null,
            $state: null
        });
    }));

    it("should return value", function () {
        expect('placeholder').toEqual('placeholder');
    });
});