/* eslint-disable */

import echarts from 'echarts'
import Constants from '@/utils/constants.js'

// 空气质量
var source = {
    x: [ '北京', '武汉', '大连', '沈阳', '哈尔滨', '杭州' ],
    y: [ 116, 71, 55, 26, 22, 1 ]
}

export default {
    defaultConfig: {
        name: '三角柱图',
        type: 'bar-sharp',
        x: 20,
        y: 20,
        width: 600,
        height: 400,
        isFocused: true,
        icon: 'chart_2'
    },
    defaultOptions: {
        silent: true,
        backgroundColor: 'rgba(5, 16, 23, 0)',
        colors: Constants.defaultColors,
        grid: Constants.grid,
        legend: {
            show: false,
            align: 'left',
            type:'scroll',
            textStyle: {
                color: 'rgba(0, 0, 0, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        xAxis: {
            show: true,
            position: 'bottom',
            data: source.x,
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.6)',
                    type: 'dotted',
                    width: 1
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal',
                rotate: 0,
            },
            title: '',
            name: '',
            unit: '',
            nameTextStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            },
        },
        tooltip: Constants.barTooltip,
        yAxis: {
            show: true,
            position: 'left',
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            },
            title: '',
            name: '',
            unit: '',
            nameTextStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        series: [{
            name: 'hill',
            type: 'pictorialBar',
            symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            label: {
                show: true,
                position: 'insideTop',
                offset: [0, -20],
                color: 'rgba(48,227,253,1)',
                fontSize: 12
            },
            markLine: {
                symbolSize: 0,
                data: source.y.map((v, i) => [{ coord: [i, 0] }, { coord: [i, v] }]),
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    type: 'dotted'
                },

            },
            markPoint: {
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: 'rgba(154,239,156,1)',
                    shadowColor: 'rgba(255, 255, 0, 1)',
                    shadowBlur: 10
                },
                data: source.y.map((v, i) => ({ coord: [i, v / 2] })),
            },
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: 'rgba(48,227,253,1)'},
                    {offset: 1, color: 'rgba(212,215,217,0)'}
                ]
            ),
            data: source.y,
            large: false,
            largeThreshold: 100,
        }],
        animation: false
    }
}
