/* eslint-disable */

import echarts from 'echarts'

var source = {
    x: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
    a: [ 80, 71, 58, 60, 69, 55, 80, 71, 58, 60, 79, 45 ],
    b: [ 60, 80, 50, 40, 50, 60, 69, 55, 80, 71, 58, 23 ],
    c: [ 30, 60, 40, 20, 60, 80, 50, 40, 50, 60, 69, 55 ],
    d: [47, 39, 36, 7, 47, 64, 35, 83, 22, 86, 67, 20],
    e: [55, 86, 42, 48, 48, 89, 14, 27, 19, 48, 66, 20]
}

export default {
    defaultConfig: {
        name: '线线组合图',
        type: 'line-line',
        x: 20,
        y: 20,
        width: 600,
        height: 400,
        isFocused: true,
        icon: 'chart_2'
    },
    defaultOptions: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: [ 'rgba(67,186,254,1)', 'rgba(81,255,255,1)', 'rgba(81,255,206,1)',  'rgba(248,164,65,1)', 'rgba(254,255,138,1)' ],
        legend: {
            show: true,
            right: '20%',
            itemWidth: 10,
            itemGap: 30,
            itemHeight: 10,
            textStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            },
            data: [ {
                name: 'a',
                icon: 'rect'
            },
            {
                name: 'b',
                icon: 'rect'
            },
            {
                name: 'c',
                icon: 'rect'
            },
            {
                name: 'd',
                icon: 'rect'
            },
            {
                name: 'e',
                icon: 'rect'
            }]
        },
        xAxis: [
            {
                type: 'category',
                name: '(月)',
                data: source.x,
                splitLine: {show: false},
                axisLine: {show: false},
                axisTick: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    }
                },
                axisLabel: {
                    color: 'rgba(152,172,192,1)'
                },
                nameTextStyle: {
                    color: 'rgba(152,172,192,1)'
                },
                boundaryGap: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '(水量)',
                splitLine: {show: false},
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    color: 'rgba(152,172,192,1)'
                },
                nameTextStyle: {
                    color: 'rgba(152,172,192,1)'
                }
            }
        ],
        series: [
            {
                name:'a',
                type:'line',
                data: source.a,
                smooth: true,
                showSymbol: false
            },
            {
                name:'b',
                type:'line',
                data: source.b,
                smooth: true,
                showSymbol: false
            },
            {
                name:'c',
                type:'line',
                data: source.c,
                smooth: true,
                showSymbol: false
            },
            {
                name:'d',
                type:'line',
                data: source.d,
                smooth: true,
                showSymbol: false
            },
            {
                name:'e',
                type:'line',
                data: source.e,
                smooth: true,
                showSymbol: false
            }
        ]
    }
}
