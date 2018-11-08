/* eslint-disable */

import echarts from 'echarts'

var source = [
    [
        [ 30, 30, 85, '湖南' ],
        [ 50, 50, 96, '北京' ],
        [ 70, 20, 73, '广西' ]
    ],
    [
        [ 60, 70, 35, '天津' ],
        [ 40, 15, 56, '郑州' ],
        [ 20, 20, 64, '西安' ]
    ]
]

export default {
    defaultConfig: {
        name: '气泡图',
        type: 'scatter-bubble',
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
            align: 'left',
            textStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        xAxis: {
            show: true,
            position: 'bottom',
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false}
        },
        yAxis: {
            show: true,
            position: 'left',
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false},
            scale: true
        },
        series: [{
            data: source[0],
            type: 'scatter',
            symbolSize: function (data) {
                return data[2];
            },
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[2] + '\n' + param.data[3];
                },
                position: 'inside'
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 0, 0.9)',
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                        offset: 0,
                        color: 'rgba(244, 219, 0, 0)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 255, 0, 1)'
                    }])
                }
            }
        }, {
            data: source[1],
            type: 'scatter',
            symbolSize: function (data) {
                return data[2];
            },
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[2] + '\n' + param.data[3];
                },
                position: 'inside'
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                        offset: 0,
                        color: 'rgba(28, 50, 86, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(28, 50, 86, 0)'
                    }])
                }
            }
        }]
    }
}
