'use strict';
angular.module('ratingHistory').directive("ratingDirective", function () {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attr) {
            scope.$watch("totalYrs", function () {

                if (!scope.totalYrs || !scope.totalRnks) {
                      return;
                }
                 var xAxisLabels = scope.totalYrs//.map(function (Ydata) { return Ydata.toString(); });
                 var sampleData = [{
                    "x": 1,
                    "y": scope.totalRnks[0]
                }, {
                    "x": 2,
                    "y": scope.totalRnks[1]
                }, {
                    "x": 3,
                    "y": scope.totalRnks[2]
                }, {
                    "x": 4,
                    "y": scope.totalRnks[3]
                }, {
                    "x": 5,
                    "y": scope.totalRnks[4]
                }];
                drawChart();
                function drawChart() {

                    var graphWidth = 350, graphHeight = 300;
                    var numberOfXUnits = 5, numberOfYUnits = 6;
                    var graphBottomMargin = 50, graphLeftMargin = 30, graphTopMargin = 10;
                    var graphContainer = Raphael('svgVisualize', graphWidth, graphHeight);

                    var xAxis = graphContainer.path('M' + graphLeftMargin + ' ' + (graphHeight - graphBottomMargin) + ' L' + (graphWidth - graphLeftMargin) + ' ' + (graphHeight - graphBottomMargin));
                    xAxis.attr('stroke', '#ccc');

                    var bottomBorder = graphContainer.path('M' + graphLeftMargin + ' ' + (graphHeight - graphTopMargin) + ' L' + (graphWidth - graphLeftMargin) + ' ' + (graphHeight - graphTopMargin));
                    bottomBorder.attr('stroke', '#ccc');

                    var leftBorder = graphContainer.path('M' + graphLeftMargin + ' ' + (graphHeight - graphTopMargin) + ' L' + graphLeftMargin + ' ' + graphTopMargin);
                    leftBorder.attr('stroke', '#ccc');

                    var rightBorder = graphContainer.path('M' + (graphWidth - graphLeftMargin) + ' ' + (graphHeight - graphTopMargin) + ' L' + (graphWidth - graphLeftMargin) + ' ' + graphTopMargin);
                    rightBorder.attr('stroke', '#ccc');

                    var yAxisLength = graphHeight - (graphBottomMargin + graphTopMargin);
                    var yUnitWidth = yAxisLength / numberOfYUnits;

                    var xAxisLength = graphWidth - (2 * graphLeftMargin);
                    var xUnitWidth = xAxisLength / numberOfXUnits;

                    for (var i = 1; i <= numberOfYUnits; i++) {
                        graphContainer.path('M' + graphLeftMargin + ' ' + (graphHeight - graphBottomMargin - (i * yUnitWidth)) + ' L' + (graphWidth - graphLeftMargin) + ' ' + (graphHeight - graphBottomMargin - (i * yUnitWidth))).attr({ 'stroke': '#ccc', 'stroke-dasharray': '- ' });
                    }

                    for (i = 0; i < numberOfXUnits; i++) {
                        
                        if (!xAxisLabels[i] && !sampleData[i].y) {
                             graphContainer.text(graphLeftMargin + (i * xUnitWidth) + (xUnitWidth / 2), graphHeight - graphBottomMargin + 20, xAxisLabels[i]).attr({ 'font-size': 0,});
                            graphContainer.circle(xPosition, yPosition, 0.25 * xUnitWidth).attr({ 'stroke': '#8AC007', 'stroke-width': 0 });
                            graphContainer.text(xPosition, yPosition, sampleData[i].y).attr({ 'stroke': '#8AC007', 'font-size': 0});
                            //console.log('No rating history data available for the given employee');
                        }
                        else {
                        graphContainer.text(graphLeftMargin + (i * xUnitWidth) + (xUnitWidth / 2), graphHeight - graphBottomMargin + 20, xAxisLabels[i]).attr({ 'font-size': 12, });
                        var xPosition = graphLeftMargin + (sampleData[i].x * xUnitWidth) - (xUnitWidth / 2);
                        var yPosition = (sampleData[i].y * yUnitWidth) + graphTopMargin;

                        if (sampleData[i].y == 'RPM' || sampleData[i].y == 'NA') {

                            graphContainer.circle(xPosition, yPosition, 0.25 * xUnitWidth).attr({ 'stroke': '#8AC007', 'stroke-width': 2, 'cy': 50 });
                            graphContainer.text(xPosition, yPosition, sampleData[i].y).attr({ 'stroke': '#8AC007', 'font-size': 12, 'y': 50 });
                        }
                        else if (sampleData[i].y == '' || sampleData[i] == null || sampleData == undefined ) {
                            graphContainer.circle(xPosition, yPosition, 0.25 * xUnitWidth).attr({ 'stroke': '#8AC007', 'stroke-width': 0 });
                            graphContainer.text(xPosition, yPosition, sampleData[i].y).attr({ 'stroke': '#8AC007', 'font-size': 0});
                        }
                        else {
                            graphContainer.circle(xPosition, yPosition, 0.25 * xUnitWidth).attr({ 'stroke': '#8AC007', 'stroke-width': 2 });
                            graphContainer.text(xPosition, yPosition, sampleData[i].y).attr({ 'stroke': '#8AC007', 'font-size': 12 });

                        }
                        }
                    }
                }

            });



        },
        templateUrl: function(elem,attrs) {
            return attrs.templateUrl || '../../App/ratingshistory/views/ratingHistorySummary.html'
        }
    }
})
