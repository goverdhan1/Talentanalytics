angular.module('consolidatedView').directive('consolidatedLayoutDirective', ['$compile', 'CoreFunctions', function ($compile, CoreFunctions) {

    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            
            if (!attrs.directiveName) {
                console.error('Cannot compile directive. Name is missing');
                return;
            }
            else {
                var directiveHtml = '<' + attrs.directiveName + '>';
                var el = $compile(directiveHtml)(scope);
                element.append(el);
            }
            
        }
    };

}]);