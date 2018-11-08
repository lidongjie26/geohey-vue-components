/* eslint-disable */

import echarts from 'echarts'
import Constants from '@/utils/constants.js'

// 空气质量
// var source = {
//     y: [ '03', 'PM10', 'PM2.5', 'SO2', 'NO2', 'CO' ],
//     x: [ 116, 71, 55, 26, 22, 1 ]
// }

// var source = {
//     y: [ '唐山', '鄂尔多斯', '上海', '天津', '平顶山' ],
//     x: [ 16336, 15150, 14177, 13920, 12924 ]
// }
var source = {
    y: [ '平顶山', '天津', '上海', '鄂尔多斯', '唐山' ],
    x: [ 12924, 13920, 14177, 15150, 16336 ]
}

var xAxisMax = Math.max.apply( null, source.x )

export default {
    defaultConfig: {
        name: '圆角柱图',
        type: 'bar-radius',
        x: 20,
        y: 20,
        width: 600,
        height: 400,
        isFocused: true,
        icon: 'chart_2'
    },
    defaultOptions: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        colors: Constants.defaultColors,
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
        grid: {
            left: '20%',
        },
        xAxis: {
            show: true,
            type: 'value',
            splitLine: { show: false },
            axisTick: {
                    show: false
            },
            axisLine: { show: true },
            data: source.x,
            silent: true,
            axisLabel: {
                inside: false,
                textStyle: {
                    color: 'rgba(255, 255, 255, 1)',
                    fontWeight: 'normal',
                    fontSize: 12,
                    fontFamily: 'Microsoft YaHei'
                }
            },
        },
        yAxis: [
            {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 1)',
                        fontWeight: 'normal',
                        fontSize: 12,
                        fontFamily: 'Microsoft YaHei'
                    }
                },
                data: source.y,
                silent: true
            },
            {
                show: true,
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: source.y,
                silent: true
            }
        ],
        tooltip: Constants.tooltip,
        series: [
            {
                name: '',
                type: 'bar',
                itemStyle: {
                    color: '#5182e4',
                    show: true,
                    barBorderRadius: 50,
                    borderWidth: 0,
                },
                data: source.x,
                large: true,
                largeThreshold: 100,
                silent: true
            }
        ],
        animation: false
    }
}
