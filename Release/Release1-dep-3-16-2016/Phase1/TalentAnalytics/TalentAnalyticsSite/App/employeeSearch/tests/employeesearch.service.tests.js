
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../core/services/core.constants.js" />
/// <reference path='testharness.tests.js'/>

/// <reference path="../services/employeeSearch.service.js" />
/// <reference path="../controllers/employeeSearch.controller.js" />


describe('employeesearch service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('employeeSearch'));

    var employeeSearch;
    var $httpBackend;
    var CoreConstants;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _employeeSearch_) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            employeeSearch = _employeeSearch_;
        }));

        var returnValue = '{"returnedValue":"1"}';
        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Employee_Quickview_Search.xsodata/EMPLOYEE_QV_SEARCHParameters%28IP_EQV_SEARCH=':searchParam'%29/Results?$top=10&$format=json").respond(returnValue);

        employeeSearch.get({}, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        //$httpBackend.flush();
    });
});
