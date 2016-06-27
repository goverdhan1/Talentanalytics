
'use strict';
/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />

/// <reference path="../models/ratingHistory.model.js" />
/// <reference path="../services/ratingHistory.service.js" />


describe('Rating Service', function () {
    beforeEach(module('ratingHistory'));

    var RatingHistoryService;
    var $resource;
    var $httpBackend;
    var $stateParams;
    var $state;
    var CoreConstants;
    var RatingHistoryModel;

    it('Should be capable of returning data through the get protocol', function () {

        // Wrap the parameter in underscores
        beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _RatingHistoryModel_, _RatingHistoryService_
            ) {
            $httpBackend = _$httpBackend_;
            CoreConstants = _CoreConstants_;
            RatingHistoryModel = _RatingHistoryModel_;
            RatingHistoryService = _RatingHistoryService_;
        }));

        RatingHistoryModel.prototype.getModelFromResponse = function (response) {
            return response;
        };

        var returnValue = '{"returnedValue":"1"}';
        var employeeId = '12345';

        $httpBackend.expectGET(CoreConstants.baseHANAUrl + "Services/Employee_Quickview_Ratings_History_Summary.xsodata/EMPLOYEE_QV_RATINGS_HISTORY_SUMMARYParameters(IP_PGEPERSID='" + employeeId +"')/Results?$format=json").respond(returnValue);

        RatingHistoryService.get({ employeeId: employeeId }, function (response) {
            expect(JSON.stringify(response)).toEqual(returnValue);
        });

        $httpBackend.flush();
    });
});
