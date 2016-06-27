'use strict';
/*
 Customize View Directive
 Attributes:
 view-type      - Describes Type of View. 
                  Values:"detailedView" or "consolidatedView"
 view-name      - Describes the service name to be passed in case of only Detailed View.
                  Eg: "Activity History Detail"
 view-title     - Title to be displayed in the popup
 label          - Label for the button on click of which it opens Customize popup
 cancel-label   - Label given for the control which has cancel functionality
 apply-label    - Label given for the control which has apply functionality.
 search-label   - Label tobe giveb for the search box above checkboxes
 selected-field-label - Label to be given for header above selected fields
 */
angular.module('customizeView').directive("customizeView", function () {
    return {
        restrict: 'E',
        templateUrl: '../../App/customizeView/views/customizeTableButton.html',
        scope: false,
        controller:'CustomizeViewController',
        link: function (scope, element, attrs) {
            scope.viewName = attrs.viewName;
            scope.viewType = attrs.viewType;
            scope.viewTitle = attrs.viewTitle;
            scope.applyLabel = attrs.applyLabel;
            scope.cancelLabel = attrs.cancelLabel;
            scope.label = attrs.label;
            scope.searchLabel = attrs.searchLabel;
            scope.selectedFieldLabel = attrs.selectedFieldLabel;
        },
        replace: true
    }
});
