'use strict';
angular.module('headcountDetailView').directive("hcmDetailedViewMetricsTreeView", [
    '$timeout', 'hcmDetailedViewDetailedMetricsService', 'hcmDetailedViewMetricsTreeStoreService', 'hcmDetailedViewGraphData', 'DetailViewService', 'toaster',
function ($timeout, hcmDetailedViewDetailedMetricsService, hcmDetailedViewMetricsTreeStoreService, hcmDetailedViewGraphData, DetailViewService, toaster) {
    return {
        restrict: 'E',
        scope: {
            filter: '='
        },
        templateUrl: 'App/hcm-detailview/views/hcm-detailed-view-metrics-tree-view.html',
        controller: function ($scope) {
            $scope.data = hcmDetailedViewMetricsTreeStoreService;
            $scope.values = [];
            var metricsService = DetailViewService.getMetricsForCurrentYear();
            $scope.$watch('filter', function (newVal, oldWal) {
                metricsService.get({ filterName: newVal }, function (data) {
                    console.log('data = ', data);
                    $scope.values = data.results;
                }, function (err) {
                    var errMessage = "Get detailed view detailed metrics service returned an error";
                    console.error(errMessage, err);
                    toaster.pop('error', errMessage);
                });
            });

            /*
            hcmDetailedViewDetailedMetricsService.get({ filterName: $scope.selectedFilter }, function (data) {
                $scope.values = data.results;
            }, function (err) {
                var errMessage = "Get detailed view detailed metrics service returned an error";
                console.error(errMessage, err);
                toaster.pop('error', errMessage);  
            });
            */

            var previousSelected;
            $scope.setSelected = function () {
                var sample = $scope.data;
                var selected;
                // Set isSelected to false in previous selected item
                if (previousSelected) {
                    for (var i = 0; i < previousSelected.length; i++) {
                        selected = sample[previousSelected[i]];
                        sample = sample[previousSelected[i]].children;
                    }
                    selected.isSelected = false
                }
                // Save arguments to previousSelected, so we can set isSelected to false it in next click
                previousSelected = arguments;
                sample = $scope.data;
                selected = null;
                // Set isSelected to true for a cliced item
                for (var i = 0; i < arguments.length; i++) {
                    selected = sample[arguments[i]];
                    sample = sample[arguments[i]].children;
                }
                selected.isSelected = true;
                hcmDetailedViewGraphData.graphData = getDataOfSelected(selected.dataID, $scope.values);
                hcmDetailedViewGraphData.selectedMetricsName = selected.name;
                hcmDetailedViewGraphData.lastUsed = arguments;

            };
            if (hcmDetailedViewGraphData.lastUsed) {
                $scope.setSelected.apply(this, hcmDetailedViewGraphData.lastUsed);
            } else {
                $scope.setSelected(0);
            };

            $scope.isPositiveValue = function (value) {
                if (value > 0) {
                    return true;
                } else {
                    return false;
                }
            };

            $scope.getPeriod = function (item) {
                var period = parseInt(item["TIME_SCALE"].slice(-2));
                return 'P' + period;

            };

            function getDataOfSelected(id, data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i][id]) {
                        result.push(data[i][id]);
                    } else {
                        result.push(0);
                    };
                    
                };
                return result;

            };
        },

        link: function (scope, element, attrs) {
            //synchronized scrolling
            var table = $(element).find('.js-fluid-table-body');
            var header = $(element).find('.js-fluid-table-header');
            var menu = $(element).find('.js-fluid-table-menu');
            var graph = $('#searchVolume');
            table.on('scroll', function (e) {
                var scrollLeft = e.target.scrollLeft;
                var scrollTop = e.target.scrollTop;
                header[0].scrollLeft = scrollLeft;
                graph[0].scrollLeft = scrollLeft;
                menu[0].scrollTop = scrollTop;
            });

            //Some of rows have long name and because of this more height, that way we need this method
            function heigthFix() {
                var menu = $(element).find("[class*='js-menu_']");
                menu.each(function () {
                    var element = $(this);
                    var elementHeight = element.height();
                    if (elementHeight != 36) {
                        var elClasses = element.attr('class').split(' ');

                        for (var index in elClasses) {
                            if (elClasses[index].indexOf('js-menu_') > -1) {
                                var classNum = elClasses[index].split('_')[1];
                                $('.js-data_' + classNum).find('.div-table-col').each(function () {
                                    $(this).css({ height: elementHeight -1 });
                                });

                                break;
                            }
                        }

                    }
                });
            };

            scope.toggleDropdown = function (item) {
                item.showChildren = !item.showChildren;
                $timeout(function () {
                    heigthFix();
                }, 0);
            };

        },
        replace: true
    }
}]);