/* eslint-disable */
import Constants from '@/utils/constants'

import echarts from 'echarts'
// 人均地区生产总值
var source = {
    x: [ '石家庄', '沈阳', '大连', '长春', '哈尔滨', '南京', '杭州', '厦门', '济南', '青岛', '郑州', '济南' ],
    y: [ 6.18, 9.1, 13.6, 10, 7.6, 11.8, 12, 9, 10, 12, 7, 11.1 ]
}

var yAxisMax = Math.max.apply( null, source.y )

export default {
    defaultConfig: {
        name: '栅格面积图',
        type: 'line-area-gap',
        x: 20,
        y: 20,
        width: 600,
        height: 400,
        isFocused: true,
        icon: 'chart_2'
    },
    
    defaultOptions: {
        silent: false,
        backgroundColor: 'rgba(5, 16, 23, 0)',

        colors: Constants.defaultColors,
        grid: Constants.grid,
        tooltip: Constants.tooltip,

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
            nameRotate: 1,
            show: true,
            position: 'bottom',
            type: 'category',
            data: source.x,
            axisTick: { show: false },
            axisLine: Constants.axisLine,
            axisLabel: {
                color: 'rgba(204, 204, 204, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal',
                rotate: 0,
            },
            axisPointer: {
                show: true,
                type: 'shadow',
                shadowStyle: {
                    opacity: 0
                }
            },
            name: '',
            title: '',
            unit: '',
            nameTextStyle: {
                color: 'rgba(204, 204, 204, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        yAxis: [{
            show: true,
            position: 'left',
            silent: true,
            name: '',
            title: '',
            unit: '',
            nameTextStyle: {
                color: 'rgba(204, 204, 204, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { 
                show: true,
                color: 'rgba(204, 204, 204, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        }],
        series: [
            {
                data: source.y.map((item) => item * 1.3),
                type: 'bar',
                itemStyle: {
                    color: 'rgba(100, 124, 217, 0.2)',
                },
                emphasis: {
                    itemStyle: {
                        color: 'rgba(100, 124, 217, 0.7)',
                    }
                },
                lineStyle:{
                    width:2
                },
                symbolSize: 4,
                large: false,
                largeThreshold: 100,
                silent: true
            },
        ],
        animation: false
    }
}
