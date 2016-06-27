angular.module('headcountManagementFilter').directive('hcmInfiniteScroll', function ($anchorScroll) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            scope.visibleHeight = element.height();
            scope.chunk = 0;
            element.scrollTop(0);
            element.scroll(function () {

                var currentScrollableHeight = element.prop('scrollHeight');
                var hiddenContentHeight = currentScrollableHeight - scope.visibleHeight;
                var scrollTop = element.scrollTop();

                if (scope.chunk >= 0 && scrollTop >= (hiddenContentHeight - 40) && scope.isScrollDown) {
                    scope.chunk++;
                    console.log("Down ", scope.chunk)
                    scope.isScrollDown = scope.loadMoreRecords(scope.chunk);
                    scope.$apply(attrs.hcmInfiniteScroll);
                    element.scrollTop(10);
                }

                if (scope.chunk > 0 && scrollTop == 0) {
                    scope.chunk--;
                    console.log("Up ", scope.chunk)
                    scope.isScrollDown = scope.loadMoreRecords(scope.chunk);
                    scope.$apply(attrs.hcmInfiniteScroll);
                    if (scope.chunk > 0)
                    {
                      element.scrollTop(currentScrollableHeight / 2);
                    }

                }
            });
        }
    };
});