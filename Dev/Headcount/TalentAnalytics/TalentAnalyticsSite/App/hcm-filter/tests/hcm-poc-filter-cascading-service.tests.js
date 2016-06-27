﻿/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path="../services/hcm-poc-filter-cascading-service.js" />

describe('Hcm poc filter cascading', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('headcountManagementFilter'));

    var $httpBackend;
    var CoreConstants;
    var HcmPocFilterCascading;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HcmPocFilterCascading_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        HcmPocFilterCascading = _HcmPocFilterCascading_;
    }));

    it('Should be capable of returning data through the get protocol', function () {
        var returnValue = '{"returnedValue":"1"}'

        var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_EditFilterCascading.xsodata/HCM_FILTER_CASCADING/?$format=json"

        $httpBackend.expectGET(url).respond('{ "d": ' + returnValue + '}');
        HcmPocFilterCascading.get({ }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});