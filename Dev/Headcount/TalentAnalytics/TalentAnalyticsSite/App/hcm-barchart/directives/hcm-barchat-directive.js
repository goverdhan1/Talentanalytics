'use strict';
angular.module('headcountBarChat').directive("headcountBarDirective", function () {
    return {
    restrict: 'E',
    templateUrl: 'App/hcm-barchat/views/hcm-barchat.html',
    link: function(scope, attr, element){


        var colors = [["Compus", "#3C8A2E"], ["Experienced", "#81BC00"]];

var dataset = [
{ "keyword": "payday loans", "campus": 1400000, "Experienced": 673000, "joblevel": "manager", periods: "P1" },
{ "keyword": "title loans", "campus": 165000, "Experienced": 160000, "joblevel": "admin", periods: "P2" },
{ "keyword": "personal loans", "campus": 550000, "Experienced": 301000, "joblevel": "manager", periods: "P3" },
{ "keyword": "online personal loans", "campus": 1100000, "Experienced": 163000, "joblevel": "admin", periods: "P4" },
{ "keyword": "online title loans", "campus": 111600, "Experienced": 1000000, "joblevel": "manager", periods: "P5" },
{ "keyword": "title loans", "campus": 155000, "Experienced": 164000, "joblevel": "admin", periods: "P6" },
{ "keyword": "personal loans", "campus": 560000, "Experienced": 301600, "joblevel": "manager", periods: "P7" },
{ "keyword": "car loans", "campus": 567000, "Experienced": 391600, "joblevel": "manager", periods: "P8" }

];
    var margin = { top: 25, right: 40, bottom: 35, left: 105 },
    w = 900 - margin.left - margin.right,
    h = 450 - margin.top - margin.bottom;
    var padding = 10;

    var xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0, w], 0);

// ternary operator to determine if campus or Experienced has a larger scale
    var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) { return (d.Experienced > d.campus) ? d.Experienced : d.campus; })])
    .range([h, 0]);
    var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(function (d) { return dataset[d].joblevel; })
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(5);

    var campus = function (d) {
    return d.campus;
    };

    var commaFormat = d3.format(',');

//SVG element
    var svg = d3.select("#searchVolume")
    .append("svg")
    .attr("width", w + +margin.left + margin.right)
    .attr("height", h + 160 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + 155 + "," + margin.top + ")");

// horizontal lines
    svg.selectAll(".hline").data(d3.range(8)).enter()
    .append("line")
    .attr("y1", function (d) {
    return d * (h / 8);
    })
    .attr("y2", function (d) {
    return d * (h / 8);
    })
    .attr("x1", function (d) {
    return -200;
    })
    .attr("x2", function (d) {
    return w;
    })
    .style("stroke", "#ddd")
    .style("stroke-dasharray", "4,4")

//vertical lines
    svg.selectAll(".vline").data(d3.range(9)).enter()
    .append("line")
    .attr("width", w)
    .attr("x1", function (d) {
    return d * (w / 8);
    })
    .attr("x2", function (d) {
    return d * (w / 8);
    })
    .attr("y1", function (d) {
    return 0;
    })
    .attr("y2", function (d) {
    return h + 50;
    })
    .style("stroke", "#eee")


 // Graph Bars
    var sets = svg.selectAll(".set")
    .data(dataset)
    .enter()
    .append("g")
    .attr("class", "set")
    .attr("transform", function (d, i) {

    return "translate(" + i * (w / 8) + ",0)";
    })
    sets.append("rect")
    .attr("class", "Experienced")
    .attr("width", xScale.rangeBand() / 5)
    .attr("y", function (d) {
    return yScale(d.Experienced);
    })
    .attr("x", xScale.rangeBand() / 6)
    .attr("height", function (d) {
    return h - yScale(d.Experienced);
    })
    .attr("fill", colors[0][1])
    .append("text")
    .text(function (d) {
    return commaFormat(d.Experienced);
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function (d) {
    return h - yScale(d.Experienced) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black");

    sets.append("rect")
    .attr("class", "campus")
    .attr("width", xScale.rangeBand() / 5)
    .attr("y", function (d) {
    return yScale(d.campus);
    })
    .attr("x", xScale.rangeBand() / 2)
    .attr("height", function (d) {
    return h - yScale(d.Experienced);
    })
    .attr("height", function (d) {
    return h - yScale(d.campus);
    })
    .attr("fill", colors[1][1])
    .append("text")
    .text(function (d) {
    return commaFormat(d.campus);
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function (d) {
    return h - yScale(d.campus) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red") ;

// xAxis
    svg.append("g") // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h) + ")")
    .call(xAxis);

// yAxis
    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0 ,0)")
    .call(yAxis);

//yAxis label
    svg.append("text")
    .attr("y", 10)
    .attr("x", -(h / 4))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Headcount");

// add legend
    var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 100)
    .attr("transform", "translate(-780," + 500 + ")")

        var legendRect = legend.selectAll('rect').data(colors);

        legendRect.enter()
            .append("rect")
            .attr("x", w - 77)
            .attr("width", 10)
            .attr("height", 10);

        legendRect
              .attr("y", function (d, i) {
                  return i * 50 + 5;
              })
            .style("fill", function (d) {
                return d[1];
            });

        var legendText = legend.selectAll('text').data(colors);

        legendText.enter()
            .append("text")
            .attr("x", w - 65);

        legendText
            .attr("y", function (d, i) {
                return i * 50 + 15;
            })
            .text(function (d) {
                return d[0];
            });


        //periods  yaxis
        var periodsy = svg.append("g")

        periodsy.selectAll(".vline").data(d3.range(9)).enter()
      .append("line")
       .attr("width", h)
       .attr("x1", function (d) {
           return d * (w / 4);
       })
       .attr("x2", function (d) {
           return d * (w / 4);
       })
       .attr("y1", function (d) {
           return h + 50;
       })
       .attr("y2", function (d) {
           return h + 98;
       })
       .style("stroke", "#eee");


    periodsy.selectAll(".hline").data(d3.range(5)).enter()
    .append("line")
    .attr("y1", function (d) {
    return d * (h / 8) + 390;
    })
    .attr("y2", function (d) {
    return d * (h / 8) + 390;
    })
    .attr("x1", function (d) {
    return -200;
    })
    .attr("x2", function (d) {
    return w;
    })
    .style("stroke", "#ddd")


    periodsy.append("text")
    .attr("y", h + 60)
    .attr("x", -(h / 5))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Periods");

    periodsy.append("g")
    .attr("transform", "translate(90," + 0 + ")")
    .selectAll(".text")
    .data(dataset, function (d, i) {
    return d.periods;
    })
    .enter()
    .append("text")
    .attr("class", "text")
    .text(function (d) {
    return d.periods;
    })
    .attr("x", function (d, i) {
    return i * 192;
    })
    .attr("y", h + 80)
    .style("text-anchor", "middle")

//compus  and experienced  yaxis
    var compusy = svg.append("g")
    compusy.selectAll(".vline").data(d3.range(9)).enter()
    .append("line")
    .attr("width", h)
    .attr("x1", function (d) {
    return d * (w / 8);
    })
    .attr("x2", function (d) {
    return d * (w / 8);
    })
    .attr("y1", function (d) {
    return h + 196;
    })
    .attr("y2", function (d) {
    return h + 98;
    })
    .style("stroke", "#eee");

//compus  text  view
    compusy.append("g")
    .attr("transform", "translate(50," + 50 + ")")
    .selectAll(".text")
    .data(dataset, function (d, i) {
    return d.campus;
    })
    .enter()
    .append("text")
    .attr("class", "text")
    .text(function (d) {
    return d.campus;
    })
    .attr("x", function (d, i) {
    return i * 93;
    })
    .attr("y", h + 80)
    .style("text-anchor", "middle");

//Experienced  text  view
    compusy.append("g")
    .attr("transform", "translate(50," + 100 + ")")
    .selectAll(".text")
    .data(dataset, function (d, i) {
    return d.Experienced;
    })
    .enter()
    .append("text")
    .attr("class", "text")
    .text(function (d) {
    return d.Experienced;
    })
    .attr("x", function (d, i) {
    return i * 93;
    })
    .attr("y", h + 80)
    .style("text-anchor", "middle");
    }
    
    }
});
