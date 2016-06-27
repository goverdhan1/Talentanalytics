/// <reference path='../../../Scripts/angular.min.js'/>
/// <reference path='../../../Scripts/angular-resource.min.js'/>
/// <reference path='../../../Scripts/angular-mocks.js'/>

/// <reference path="../../core/tests/testharness.tests.js" />
/// <reference path="../../header/tests/testharness.tests.js" />
/// <reference path='testharness.tests.js'/>
/// <reference path="../../core/services/core.constants.js" />


/// <reference path='../services/hcm-detailed-view-save-service.js'/>

describe('hcm detailed view save service', function () {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
	beforeEach(module('headcountDetailView'));

	var $httpBackend;
	var CoreConstants;
	var HeadcountManagementDetailedViewSaveService;

    // Wrap the parameter in underscores
	beforeEach(inject(function (_$httpBackend_, _CoreConstants_, _HeadcountManagementDetailedViewSaveService_) {
	    $httpBackend = _$httpBackend_;
	    CoreConstants = _CoreConstants_;
	    HeadcountManagementDetailedViewSaveService = _HeadcountManagementDetailedViewSaveService_;
	}));

	it('Should be capable of returning data through the get protocol', function () {
		
		var returnValue = '{"returnedValue":"1"}';
		$httpBackend.expectPOST(CoreConstants.baseHANAUrl + 'Services/Employee_HCM_Filter_View_Post_Service.xsodata/Post').respond(returnValue);
		HeadcountManagementDetailedViewSaveService.save({}, function (response) {
			expect(JSON.stringify(response)).toEqual(returnValue);
		});

		$httpBackend.flush();
		
	});
});
