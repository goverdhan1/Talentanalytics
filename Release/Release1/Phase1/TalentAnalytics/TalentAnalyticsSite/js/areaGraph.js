var expandLegend = function () {
    var exp = chart.legend.expanded();
    chart.legend.expanded(!exp);
    chart.update();
}

var histcatexplong = [
    {
        "key": "Base Salary",
        "values": [[1322709595000, 50000], [1342709595000, 100000], [1358709594000, 200000], [1392709594000, 300000], [1442709594000, 400000]]
    },
    {
        "key": "Bonus",
        "values": [[1322709595000, 5000], [1342709595000, 10000], [1358709594000, 15000], [1392709594000, 20000], [1442709594000, 30000]]
    }
];

var colors = d3.scale.category20();

var chart;
nv.addGraph(function () {
    chart = nv.models.stackedAreaChart()
        .useInteractiveGuideline(true)
        .x(function (d) { return d[0] })
        .y(function (d) { return d[1] })
        .controlLabels({ stacked: "Stacked" })
        .duration(700);
    chart.color(["#00A3E1", "#B3E14D"]);
   

    chart.xAxis.tickFormat(function (d) { return d3.time.format('%Y')(new Date(d)) });
    chart.yAxis.tickFormat(d3.format(',.0f'));

    chart.legend.vers('furious');
    var histcatexplong = [{
        "key": "INR - Base Salary",
        "values": [
            [1138683600000, 50000],
            [1141102800000, 50000],
            [1143781200000, 50000],
            [1146369600000, 50000],
            [1149048000000, 100000],
            [1151640000000, 100000],
            [1154318400000, 200000],
            [1156996800000, 200000],
            [1159588800000, 300000],
            [1162270800000, 300000],
            [1164862800000, 400000],
            [1167541200000, 400000],
            [1167609600000, 0],
            [1172638800000, 0],
            [1177804800000, 0],
            [1177905600000, 500000],
            [1180584000000, 500000],
            [1183176000000, 700000],
            [1185854400000, 700000]



        ]
    }, {
        "key": "INR -  Bonus",
        "values": [
            [1138683600000, 10000],
            [1141102800000, 20000],
            [1143781200000, 25000],
            [1146369600000, 30000],
            [1149048000000, 3000],
            [1151640000000, 40000],
            [1154318400000, 30000],
            [1156996800000, 35000],
            [1159588800000, 40000],
            [1162270800000, 50000],
            [1164862800000, 50000],
            [1167541200000, 50000],
            [1167609600000, 0],
            [1172638800000, 0],
            [1177804800000, 0],
            [1177905600000, 60000],
            [1180584000000, 60000],
            [1183176000000, 70000],
            [1185854400000, 50000],


        ]
    }];

    var colors = d3.scale.category20();

    var chart;
    var chartData;
    nv.addGraph(function () {
        chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function (d) {
                return d[0]
            })
            .y(function (d) {
                return d[1]
            })
            .controlLabels({
                stacked: "Stacked"
            })
            .duration(300);
        chart.color(["#00A3E1", "#B3E14D"]);

        chart.xAxis.tickFormat(function (d) {
            return d3.time.format('%Y')(new Date(d))
        });
        chart.yAxis.tickFormat(d3.format(',.0f'));

        chart.legend.vers('furious');

        chartData = d3.select('#chart1')
            .datum(histcatexplong);

        chartData.transition().duration(1000)
            .call(chart)
            .each('start', function () {
                setTimeout(function () {
                    d3.selectAll('#chart1 *').each(function () {
                        if (this.__transition__)
                            this.__transition__.duration = 1;

                    })
                }, 0)
            });

        nv.utils.windowResize(chart.update);
        return chart;
    });

    function updateUSD() {
        var data = [{
            "key": "Consumer Discretionary",
            "values": [
                [1138683600000, 0],
                [1141102800000, 0],
                [1143781200000, 0],
                [1146369600000, 0],
                [1149048000000, 0],
                [1151640000000, 0],
                [1154318400000, 0],
                [1156996800000, 0],
                [1159588800000, 0],
                [1162270800000, 0],
                [1164862800000, 0],
                [1167541200000, 0],
                [1167609600000, 580000],
                [1172638800000, 680000],
                [1177804800000, 700000],
                [1177905600000, 0],
                [1180584000000, 0],
                [1183176000000, 0],
                [1185854400000, 0]


            ]
        }, {
            "key": "Consumer Staples",
            "values": [
                [1138683600000, 0],
                [1141102800000, 0],
                [1143781200000, 0],
                [1146369600000, 0],
                [1149048000000, 0],
                [1151640000000, 0],
                [1154318400000, 0],
                [1156996800000, 0],
                [1159588800000, 0],
                [1162270800000, 0],
                [1164862800000, 0],
                [1167541200000, 0],
                [1167609600000, 10000],
                [1172638800000, 100000],
                [1177804800000, 150000],
                [1177905600000, 0],
                [1180584000000, 0],
                [1183176000000, 0],
                [1185854400000, 0]


            ]
        }];


        // Update the SVG with the new data and call chart
        chartData.datum(data).transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
    };

    function updateINR() {
        var data = [{
            "key": "INR - Base Salary",
            "values": [
                [1138683600000, 50000],
                [1141102800000, 50000],
                [1143781200000, 50000],
                [1146369600000, 50000],
                [1149048000000, 100000],
                [1151640000000, 100000],
                [1154318400000, 200000],
                [1156996800000, 200000],
                [1159588800000, 300000],
                [1162270800000, 300000],
                [1164862800000, 400000],
                [1167541200000, 400000],
                [1167609600000, 0],
                [1172638800000, 0],
                [1177804800000, 0],
                [1177905600000, 500000],
                [1180584000000, 500000],
                [1183176000000, 700000],
                [1185854400000, 700000]



            ]
        }, {
            "key": "INR -  Bonus",
            "values": [
                [1138683600000, 10000],
                [1141102800000, 20000],
                [1143781200000, 25000],
                [1146369600000, 30000],
                [1149048000000, 3000],
                [1151640000000, 40000],
                [1154318400000, 30000],
                [1156996800000, 35000],
                [1159588800000, 40000],
                [1162270800000, 50000],
                [1164862800000, 50000],
                [1167541200000, 50000],
                [1167609600000, 0],
                [1172638800000, 0],
                [1177804800000, 0],
                [1177905600000, 60000],
                [1180584000000, 60000],
                [1183176000000, 70000],
                [1185854400000, 50000],


            ]
        }];

        // Update the SVG with the new data and call chart
        chartData.datum(data).transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
    };


    d3.select("#updateUSD").on("click", updateUSD);
    d3.select("#updateINR").on("click", updateINR);

    d3.select('#chart1')
        .datum(histcatexplong)
        .transition().duration(1000)
        .call(chart)
        .each('start', function () {
            setTimeout(function () {
                d3.selectAll('#chart1 *').each(function () {
                    if (this.__transition__)
                        this.__transition__.duration = 1;
                })
            }, 0)
        });

    nv.utils.windowResize(chart.update);
    return chart;
});
