'use strict';
angular.module('headcountDetailView').directive("hcmDetailedViewGraph", ['$timeout', 'hcmDetailedViewGraphData', function ($timeout, hcmDetailedViewGraphData) {
    return {
        restrict: 'E',
        template: '<div id="searchVolume"></div>',
        controller: function ($scope) {},
        link: function (scope, element, attrs) {
            // fix to hide extra values
            $timeout(function () {
                var width = $('.js-fluid-table-header').width();
                $('#searchVolume').width(width);
            }, 100);


            var margin = { top: 0, right: 0, bottom: 0, left: 16 };
            var w = 2200 - margin.left - margin.right;
            var h = 260 - margin.top - margin.bottom;
            var padding = 10;
            var graphType;

            var colors = ["#345391"];

            var spaceBetweenLines = 147;

            //var dataset = hcmDetailedViewGraphData.graphData;
            var dataset = [];
            
            var yScale = geterateYScale(dataset, h);

            //SVG element
            var svg = d3.select("#searchVolume")
                        .append("svg")
                        .attr("width", w + +margin.left + margin.right)
                        .attr("height", h + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            buildLines(dataset, yScale);


            scope.$watch(
              function () { return hcmDetailedViewGraphData.graphType; },
              function (newValue, oldValue) {
                  if (newValue === oldValue) {
                      return;
                  };
                  removeGraphs();
                  if (newValue == 'linechart') {
                      buildLinesGraph(dataset, yScale);
                      graphType = 'linechart';
                  } else if (newValue == 'barchart') {
                      graphType = 'barchart';
                      buildBarsGraph(dataset, yScale);
                  };
              }
            );

            scope.$watch(
                function () { return hcmDetailedViewGraphData.graphData; },
                function (newValue, oldValue) {
                    svg.selectAll(".line").remove();
                    removeGraphs();
                    dataset = newValue;
                    yScale = geterateYScale(dataset, h);
                    buildLines(dataset, yScale);
                    if (graphType === 'linechart') {
                        buildLinesGraph(dataset, yScale);
                    } else if (graphType === 'barchart') {
                        buildBarsGraph(dataset, yScale);
                    };
                    
                }
            );

            function removeGraphs() {
                svg.selectAll(".set").remove();
                svg.selectAll(".dot").remove();
                svg.select("path").remove();
                svg.selectAll(".linetext").remove();
            };

            function buildBarsGraph(dataset, yScale) {
                // Graph Bars
                var barWidth = 52;
                var barMargin = 47;
                var sets = svg.selectAll(".set")
                    .data(dataset)
                    .enter()
                    .append("g")
                    .attr("class", "set")
                    .attr("transform", function (d, i) {
                        return "translate(" + i * (barWidth + barMargin * 2) + ",0)";
                    });

                sets.append("rect")
                    .attr("class", "campus")
                    .attr("width", barWidth)
                    .attr("y", function (d) {
                        return yScale(d);
                    })
                    .attr("x", barMargin)
                    .attr("height", function (d) {
                        return h - yScale(d);
                    })
                    .attr("fill", colors[0]);
                //Add lables
                sets.append("text")
                    .attr("class", "bartext")
                    .attr("text-anchor", "middle")
                    .attr("fill", "white")
                    .attr("x", 70)
                    .attr("y", function (d, i) {
                        return yScale(d) + 15;
                    })
                    .text(function (d) {
                        return d;
                    });
            };

            function buildLinesGraph(dataset, yScale) {
                // Line Graph
                var lineGen = d3.svg.line()
                .x(function (d, i) {
                    return spaceBetweenLines * i;
                })
                .y(function (d) {
                    return yScale(d);
                });

                svg.append('svg:path')
                    .attr('d', lineGen(dataset))
                    .attr('stroke', colors[0])
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');

                // Add the scatterplot
                svg.selectAll("dot")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("r", 3.5)
                    .attr("class", "dot")
                    .attr("cx", function (d, i) { return spaceBetweenLines * i; })
                    .attr("cy", function (d) { return yScale(d); });

                //Add lables
                svg.selectAll(".linetext")
                    .data(dataset)
                    .enter()
                    .append("text")
                      .attr("class", "linetext")
                      .attr("text-anchor", "middle")
                      .attr("fill", colors[0])
                      .attr("x", function (d, i) { return spaceBetweenLines * i; })
                      .attr("y", function (d, i) {
                          return yScale(d) + 15;
                      })
                      .text(function (d) {
                          return d;
                      });
            };

            function buildLines(dataset, yScale) {
                // horizontal lines
                svg.selectAll(".hline").data([dataset[0]]).enter()
                    .append("line")
                    .attr("y1", function (d) {
                        if (!d) {
                            return 0;
                        }
                        return yScale(d);
                    })
                    .attr("y2", function (d) {
                        if (!d) {
                            return 0;
                        }
                        return yScale(d);
                    })
                    .attr("x1", function (d) {
                        return 0;
                    })
                    .attr("x2", function (d) {
                        return w;
                    })
                    .attr("class", "line")
                    .style("stroke", "#ddd");

                //vertical lines
                svg.selectAll(".vline").data(d3.range(dataset.length + 1)).enter()
                    .append("line")
                    .attr("width", w)
                    .attr("x1", function (d) {
                        return d * spaceBetweenLines;
                    })
                    .attr("x2", function (d) {
                        return d * spaceBetweenLines;
                    })
                    .attr("y1", function (d) {
                        return 0;
                    })
                    .attr("y2", function (d) {
                        return h + 50;
                    })
                    .attr("class", "line")
                    .style("stroke", "#eee");
            };

            function geterateYScale(dataset, h) { 
                return d3.scale.linear()
                .domain([0, d3.max(dataset, function (d) { return d; })])
                .range([h, 0]);
            };
            

        },
        replace: true
    }
}]);