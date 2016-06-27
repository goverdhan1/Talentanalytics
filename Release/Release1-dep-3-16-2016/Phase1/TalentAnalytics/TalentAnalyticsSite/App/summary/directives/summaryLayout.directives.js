angular.module('summary').directive('summaryLayoutDirective', ['$compile', 'CoreFunctions', function ($compile, CoreFunctions) {

    var getTemplate = function (securityFlagType) {
        var template = '';

        switch (securityFlagType) {
            case 'Y':
                template = PIIData;
                break;
            case 'N':
                template = NonPIIData;
                break;
            
        }

        return template;
    }

    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            
            if (!attrs.directiveName) {
                console.error('Cannot compile directive. Name is missing');
                return;
            }

            var directiveHtml = CoreFunctions.getFormattedString('<{0}></{0}>', attrs.directiveName);

            var el = $compile(directiveHtml)(scope);
            element.append(el);
        }
    };

}]);