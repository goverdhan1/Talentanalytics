
angular.module('compensationHistory').directive('compensationDirective', function (INRCurrencyFilter) {

    function updateButtonStyles(supportedCurrencies, activeCurrency) {
        setButtonBackgroundColor('update' + activeCurrency, 'button-currency-seleted');
        supportedCurrencies.forEach(function (currency) {
            if (currency !== activeCurrency) {
                setButtonBackgroundColor('update' + currency, 'button-currency-unseleted');
            }
        });
    }

    function setButtonBackgroundColor(buttonId, className) {
        var button = document.getElementById(buttonId);
        if (button) {
            button.setAttribute('class', className);
        }
    }

    function getYearStartDateFromYearValue(year) {
        return new Date(year, 1, 1);
    }

    function getYearEndDateFromYearValue(year) {
        return new Date(year, 12, 31);
    }

    function getPlotPositionForYear(year) {
        return new Date(year, 7, 1);
    }

    function getThinBarPositionForYear(year) {
        return new Date(year, 8, 1);
    }

    function updateGraphForCurrency(supportedCurrencies, chart, chartData, graphData, currency) {
        updateButtonStyles(supportedCurrencies, currency);
        updateChartWithCurrencyData(chart, chartData, graphData[currency]);
    };

    function updateChartWithCurrencyData(chart, chartData, currencyData) {
        chartData.datum(currencyData).transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
    }

    function setTooltipArrowPosition() {
        var tooltip = $('.nvtooltip');

        if (tooltip) {
            var arrowToTheLeft = true;
            var selectedPoint = $('.nv-point.nv-noninteractive.hover');

            if (selectedPoint) {
                var tooltipPosition = tooltip.offset();
                var selectedPointPosition = selectedPoint.offset();
                if (tooltipPosition && selectedPointPosition) {
                    arrowToTheLeft = selectedPointPosition.left > tooltipPosition.left;
                }
            }

            var className = 'nv-changed';
            if (arrowToTheLeft) {
                tooltip.removeClass(className);
            } else {
                tooltip.addClass(className);
            }

        }
    }

    function setTooltipTextFormattingClasses() {
        var row1_td2, row1_td3, row2_td2, row2_td3, row3_td2, row3_td3;

        // code for text formatting in toop tip pop up
        var bonustext, salarytext, prefixtext, suffix;
        row1_td2 = $('.nvtooltip table tbody tr:nth-child(1) td:nth-child(2)');
        row1_td3 = $('.nvtooltip table tbody tr:nth-child(1) td:nth-child(3)');

        row1_td2.addClass('keybonus');
        row1_td3.addClass('valuebonus')

        row2_td2 = $('.nvtooltip table tbody tr:nth-child(2) td:nth-child(2)');
        row2_td3 = $('.nvtooltip table tbody tr:nth-child(2) td:nth-child(3)');

        row2_td2.addClass('keysalary');

        row2_td3.addClass('valuesalary');

        row3_td2 = $('.nvtooltip table tbody tr:nth-child(3) td:nth-child(2)');
        row3_td3 = $('.nvtooltip table tbody tr:nth-child(3) td:nth-child(3)');

        row3_td3.addClass('compensationvalue');
    }

    return {
        restrict: 'E',
        replace: true,

        link: function (scope, element, attr) {
            scope.$watch('readyToRender', function () {

                if (!scope.readyToRender) {
                    return;
                }

                var supportedCurrencies = scope.supportedCurrencies;


                function getGraphData(currency) {
                    var salaries = [];
                    var bonuses = [];
                    function appendCompensation(date, val) {
                        if (!val) {
                            val = {salary: 0, bonus: 0};
                        }
                        salaries.push([date, val.salary]);
                        bonuses.push([date, val.bonus]);
                        xValuesExist = xValuesExist || val.salary || val.bonus;
                    }
                    function getCompensation(index) {
                        var item = yearlyData[index];
                        return { salary: item[currency + 'Salary'], bonus: item[currency + 'Bonus'] };
                    }
                    appendCompensation(minDate);
                    appendCompensation(minTickValue);
                    for(var ctr = 0; ctr < length; ctr++){

                        var year = yearlyData[ctr].year;                       
                        var start = getPlotPositionForYear(year);
                        var end = getPlotPositionForYear(year + 1);

                        var val = getCompensation(ctr);
                        appendCompensation(start, val);

                        if (val.salary === 0) {//draw a line on the x axis
                            appendCompensation(end);
                            continue;
                        }

                        var lastEntry = ctr === length - 1;
                        if (!lastEntry) {
                            var next = getCompensation(ctr +1);
                            var hasNextValues = next.salary !== 0;
                            if(hasNextValues){//join to the next value
                                appendCompensation(end, next);
                                continue;
                            }
                        }
                        
                        var graphAlreadyJoined = false;
                        if (ctr >= 1) {
                            var prev = getCompensation(ctr - 1);
                            var graphAlreadyJoined = prev.salary !== 0;
                        }
                        if (graphAlreadyJoined) {//add a zero value to cut the graph
                            appendCompensation(start);
                            continue;
                        }

                        var thinBarPosition = getThinBarPositionForYear(year);
                        appendCompensation(thinBarPosition, val); //draw a thin bar
                        appendCompensation(thinBarPosition);//cut the graph
                    };

                    return {salaries: salaries, bonuses: bonuses};
                }

                function getGraphDataForCurrency(currency) {

                    var result = [];

                    var graphData = getGraphData(currency);
                    result.push({ 'key': '(' + currency + ') Base Salary:', 'values': graphData.salaries });
                    result.push({ 'key': '(' + currency + ') Bonus:', 'values': graphData.bonuses });
                    return result;
                }

                function getEmptyGraphYearlyData() {
                    var currentYear = new Date().getFullYear();
                    var firstYear = currentYear - 4;
                    var blankYearlyData = [];
                    for (var ctr = firstYear; ctr <= currentYear; ctr++) {
                        blankYearlyData.push({ year: ctr });
                    }
                    return blankYearlyData;
                }

                function getFakeGraphData() {
                    var fakeData = [];
                    yearlyData.forEach(function (val) {
                        fakeData.push([getPlotPositionForYear(val.year), 0]);
                    });
                    return [{ 'key': 'No Data', 'values': fakeData }];
                }

                var fakeYValues = false;
                var xValuesExist = false;
                var yearlyData = scope.yearlyData;
                if (!yearlyData || !yearlyData.length > 0) {
                    yearlyData = getEmptyGraphYearlyData();
                    fakeYValues = true;
                }

                var length = yearlyData.length;
                var lastRecord = yearlyData[length - 1];
                var minYear = yearlyData[0].year;
                var maxYear = lastRecord.year;

                var minDate = getYearStartDateFromYearValue(minYear);
                var maxDate = getYearEndDateFromYearValue(maxYear);

                var xTickValues = [];
                yearlyData.forEach(function (item) {
                    xTickValues.push(getPlotPositionForYear(item.year));
                });
                var minTickValue = xTickValues[0];
                var maxTickValue = xTickValues[xTickValues.length - 1];

                var graphData = {};
                if (!fakeYValues) {
                    scope.supportedCurrencies.forEach(function (currency) {
                        graphData[currency] = getGraphDataForCurrency(currency);
                    });
                } else {
                    graphData.USD = getFakeGraphData();
                }

                nv.addGraph(function () {

                    var chartData;
                    var chart = nv.models.stackedAreaChart()
                        .useInteractiveGuideline(!fakeYValues)
                        .x(function (d) {
                            return d[0]
                        })
                        .xDomain([minDate, maxDate])
                        .y(function (d) {
                            return d[1]
                        })
                        .controlLabels({
                            stacked: 'Stacked'
                        })
                        .duration(300);

                    chart.tooltip.enabled(!fakeYValues);

                    chart.color(['#00A3E1', '#B3E14D']);

                    chart.xAxis.tickValues(xTickValues);

                    chart.xAxis.tickSize(3, 0);

                    chart.xAxis.tickFormat(function (d) {
                        if (!xValuesExist) {
                            return '';
                        }
                        var date = new Date(d);
                        if (date < minTickValue || date > maxTickValue) {
                            return '';
                        }
                        return d3.time.format('%Y')(date);
                    });

                    chart.yAxis.tickFormat(function (val) {
                        if (fakeYValues) {
                            return '';
                        }
                        if (scope.defaultCurrency == 'INR') {
                            val = (val === undefined || val === null) ? '' : val.toString();
                            return INRCurrencyFilter(val, null, true, true);
                        } else {
                            return d3.format(',.0f')(val);
                        }                        
                    });

                    function updateTickFormatForCurrency(currency) {
                        chart.yAxis.tickFormat(function (val) {
                            if (fakeYValues) {
                                return '';
                            }
                            if (currency == 'INR') {
                                val = (val === undefined || val === null) ? '' : val.toString();
                                return INRCurrencyFilter(val, null, true, true);
                            } else {
                                return d3.format(',.0f')(val);
                            }
                        });
                    }

                    chart.legend.vers('furious');

                    var defaultCurrency = 'USD';
                    if (scope.defaultCurrency) {
                        defaultCurrency = scope.defaultCurrency;
                    }
                    chartData = d3.select('#chart1')
                        .datum(graphData[defaultCurrency]);

                    chartData.transition().duration(1000)
                        .call(chart)
                        .each('start', function () {
                            setTimeout(function () {
                                d3.selectAll('#chart1 *').each(function () {
                                    if (this.__transition__)
                                        this.__transition__.duration = 1;
                                });
                            }, 0);
                        });

                    if (!fakeYValues) {
                        updateButtonStyles(scope.supportedCurrencies, scope.defaultCurrency);

                        scope.supportedCurrencies.forEach(function (currency) {
                            var button = d3.select('#update' + currency);
                            if (button) {
                                button.on('click', function () {
                                    updateTickFormatForCurrency(currency);
                                    updateGraphForCurrency(scope.supportedCurrencies, chart, chartData, graphData, currency);
                                });

                            }
                        });

                        element.on('mousemove', '.nv-stackedAreaChart', function () {
                            setTooltipArrowPosition();
                            setTooltipTextFormattingClasses();
                        });
                    }

                    nv.utils.windowResize(chart.update);
                    return chart;
                });
            });
        },
        templateUrl: function (elem, attrs) {
            return attrs.templateUrl || '../../App/compensationHistory/views/compensationHistory.html'
        }
    };
})
