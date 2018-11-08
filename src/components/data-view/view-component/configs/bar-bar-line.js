/* eslint-disable */

import echarts from 'echarts'

var source = {
    x: [ '2009', '2010', '2011', '2012', '2013' ],
    a: [ 60, 80, 50, 40, 50 ],
    b: [ 30, 60, 40, 20, 60 ],
    c: [ 10, 15, 30, 90, 70 ]
}

export default {
    defaultConfig: {
        name: '柱线组合图',
        type: 'bar-bar-line',
        x: 20,
        y: 20,
        width: 600,
        height: 400,
        isFocused: true,
        icon: 'chart_2'
    },
    defaultOptions: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        legend: {
            show: false,
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
            data: ['a','b','c']
        },
        xAxis: [
            {
                type: 'category',
                data: source.x,
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(204, 204, 204, 1)'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '(水量)',
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(204, 204, 204, 1)'
                    }
                }
            },
            {
                type: 'value',
                name: '(温度)',
                splitLine: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(204, 204, 204, 1)'
                    }
                }
            }
        ],
        series: [
            {
                name:'a',
                type:'bar',
                data: source.a,
                itemStyle: {
                    color: 'rgba(67,186,254,1)',
                    barBorderRadius: [ 3, 3, 0, 0 ]
                },
                barWidth: '20%'
            },
            {
                name:'b',
                type:'bar',
                data: source.b,
                itemStyle: {
                    color: 'rgba(81,255,193,1)',
                    barBorderRadius: [ 3, 3, 0, 0 ]
                },
                barWidth: '20%'
            },
            {
                name:'c',
                type:'line',
                yAxisIndex: 1,
                data: source.c,
                showSymbol: false,
                lineStyle: {
                    color: 'rgba(246,163,76,1)'
                }
            }
        ]
    }
}
