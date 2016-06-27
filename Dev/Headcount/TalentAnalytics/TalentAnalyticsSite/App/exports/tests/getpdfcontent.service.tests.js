/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />

/// <reference path="../services/getpdfcontent.service.js" />

describe('exports get PDF content service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('exports'));

    var $httpBackend;
    var CoreConstants;
    var GetPDFContentService;

    // Wrap the parameter in underscores
    beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _GetPDFContentService_) {
        $httpBackend = _$httpBackend_;
        CoreConstants = _CoreConstants_;
        GetPDFContentService = _GetPDFContentService_;
    }));

    it('Should be capable of returning data through the get protocol', function () {

        var returnValue = '{"returnedValue":"1"}';
        $httpBackend.expectGET('/Export/PDF').respond(returnValue);
        GetPDFContentService.get({}, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();

    });
});
