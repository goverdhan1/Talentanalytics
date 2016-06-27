'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../header/services/userdetails.value.js" />

/// <reference path="../controllers/hcm-editfilter-name-modal-controller.js" />


describe('Hcm editfilter name modal Controller', function () {

    beforeEach(module('headcountManagementFilter'));

    var scope,
        compile,
        UserDetails,
        modalInstance,
        selectedFilterNaneMock,
        HcmEditfilterNameModalController;

    var isBindSavedFilterWasCalled = false;

    beforeEach(inject(function ($rootScope, $controller, $compile, _UserDetails_) {
        selectedFilterNaneMock = 'selectedFilterNane';
        compile = $compile;
        //Create scope components that used in this controller
        scope = $rootScope.$new();
        scope.$parent = {
            form: {
                selectedFilter: selectedFilterNaneMock
            }
        };

        scope.doPost = function (p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, callback) {
            callback();
        };

        scope.bindSavedFilter = function () {
            isBindSavedFilterWasCalled = true;
        };



        UserDetails = _UserDetails_;

        UserDetails.userId = 'USERID';

        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };


        HcmEditfilterNameModalController = $controller("HcmEditfilterNameModalController", {
            $scope: scope,
            $modalInstance: modalInstance,
            UserDetails: _UserDetails_
        });
        
    }));

    it("Should create local variable", function () {
        expect(scope.newFilterName).toBeDefined();
        expect(scope.newFilterName.fileName).toBeDefined();
        expect(scope.newFilterName.fileName).toEqual(selectedFilterNaneMock);
    });

    it("Should close a modal window, when cancel call", function () {
        scope.cancel();
        expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it("Should update variables when apply call", function (done) {
        scope.Apply();
        setTimeout(function () {
            expect(scope.selectedFilter).toBeDefined();
            expect(scope.selectedFilter).toEqual(selectedFilterNaneMock);
            expect(isBindSavedFilterWasCalled).toEqual(true);
            done();
        }, 100);
    });

    it('Should select all content', function () {
        var inputValue = 'test text';
        var testInput = "<input type='text' ng-focus='selectAllContent($event)' value='" + inputValue +"'/>"
        var element = angular.element(testInput);
        var compiled = compile(element)(scope);
        compiled.triggerHandler('focus');
        compiled = compiled[0];
        var selection = compiled.value.substring(compiled.selectionStart, compiled.selectionEnd);
        expect(selection).toEqual(inputValue);
    });
    
});
