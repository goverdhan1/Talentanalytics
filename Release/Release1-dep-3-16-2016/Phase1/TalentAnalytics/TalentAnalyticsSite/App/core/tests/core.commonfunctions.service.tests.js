/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>


/// <reference path='testharness.tests.js'/>
/// <reference path="../services/core.commonfunctions.service.js" />

describe('core common functions service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(module('core'));

    var CoreFunctions;

    it('Should format a string replacing argument placeholders', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_CoreFunctions_) {
            CoreFunctions = _CoreFunctions_;
        }));

        var formatted = CoreFunctions.getFormattedString("{0} and {1}", 1, 2);
        expect(formatted).toEqual("1 and 2");
    });
});
