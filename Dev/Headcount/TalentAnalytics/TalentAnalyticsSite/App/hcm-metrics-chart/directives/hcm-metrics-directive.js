'use strict';
angular.module('headCountMatrics').directive("headcountMetricsDirective", function () {
    return {
    restrict: 'E',
    templateUrl: 'App/hcm-metrics-chat/views/hcm-fullview-metrics-chat.html',
    link: function(scope,attr, element){
    var data = {
    labels: [
    '20/10/2010', '20/10/2011', '20/10/2012',
    '20/10/2013', '20/10/2014', '20/10/2015'
    ],
    status: [{
    comp: ["Experienced HC", "Compus HC"],
    }, ],

    series: [
    {
        label: 'WEST',
        values: [4, 8, 15, 16, 23, 42]
    },
    {
        label: 'SOUTH',
        values: [12, 43, 22, 11, 73, 25]
    },
    {
        label: 'NORTH',
        values: [31, 28, 14, 8, 15, 21]
    },
    {

        label: 'EAST',
        values: [12, 43, 22, 11, 64, 25]
    }

    ]
    };

var chartWidth = 600,
    barHeight = 10,
    groupHeight = barHeight * data.series.length,
    gapBetweenGroups = 20,
    spaceForLabels = 150,
    spaceForLegend = 150;

// Zip the series data together (first values, second values, etc.)
    var zippedData = [];
    for (var i = 0; i < data.labels.length; i++) {
    for (var j = 0; j < data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
    } }

// Color scale
    var color = d3.scale.category20();

    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

    var x = d3.scale.linear()
        .domain([0, d3.max(zippedData)])
        .range([0, chartWidth]);

    var y = d3.scale.linear()
        .range([chartHeight - 59, 0]);

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat('')
    .ticks(5)
    .innerTickSize(spaceForLabels)
    .tickPadding(3);

    var yAxislinesecound = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat('')
    .ticks(6)
    .outerTickSize(0)
    .innerTickSize(spaceForLabels / 2);


    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(8)
    .innerTickSize(-chartWidth)
    .outerTickSize(0)
    .tickPadding(3);

// Specify the chart area and dimensions
    var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight + 30);


// Create bars
    var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function (d, i) {
        return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
    });

// Create rectangles of the correct width
    bar.append("rect")
    .attr("fill", function (d, i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight);

// Draw labels text
    bar.append("text")
    .attr("class", "label")
    .attr("x", function (d, i) { return chartHeight / 48; })
    .attr("y", -140)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text(function (d, i) {
    if (i % data.series.length === 0)
        return data.labels[Math.floor(i / data.series.length)];
        else
        return ""
    });

// y axis experience text 
    var yexp = chart.append('g')
    .attr("transform", "translate(" + -gapBetweenGroups + ", " + 24 + ")")

    var periodsx = yexp.selectAll('.legend')
    .data(data.labels)
    .enter()
    .append('g')
    .attr("transform", function (d, i) {
      return "translate(" + spaceForLabels + "," + (i * chartHeight / 6) + ")";
    });

    periodsx.append("text")
    .attr("class", "label")
    .text(function (d) {
     return data.status[0].comp[0];
    });

// y axis compus text 
    var ytext = chart.append('g')
    .attr("transform", "translate(" + -gapBetweenGroups + ", " + 45 + ")")

    var periodytext = ytext.selectAll('.legend')
    .data(data.labels)
    .enter()
    .append('g')
    .attr("transform", function (d, i) {
        return "translate(" + spaceForLabels + "," + (i * chartHeight / 6) + ")";
    });

    periodytext.append("text")
    .attr("class", "label")
    .text(function (d) {
        return data.status[0].comp[1];
    });

    chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + spaceForLabels + ", " + 59 + ")")
    .call(yAxis);

    chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + spaceForLabels + ", " + 30 + ")")
    .call(yAxislinesecound);

    chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + spaceForLabels + ", " + chartHeight + ")")
    .call(xAxis);

// Draw legend
    var legendRectSize = 18,
    legendSpacing = 4;

    var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
    var height = legendRectSize + legendSpacing;
    var offset = -gapBetweenGroups / 2;
    var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
    var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

    legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

    legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
     return d.label;

    });


        }
    
    }
});
