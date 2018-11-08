/* eslint-disable */

import echarts from 'echarts'
import Constants from '@/utils/constants.js'

var source = [[68,56],[5,0],[43,49],[70,79],[53,41],[39,46],[64,49],[81,88],[52,59],[8,17],[34,37],[33,47],[96,98],[58,45],[38,36],[47,52],[7,0],[83,75],[37,44],[20,29],[26,13],[10,13],[63,59],[63,55],[60,71],[77,69],[41,48],[75,81],[81,83],[67,58],[45,30],[8,0],[69,75],[75,77],[25,37],[91,95],[73,58],[6,0],[51,55],[54,41],[12,4],[99,85],[21,12],[50,54],[13,26],[2,0],[36,39],[25,25],[33,41],[11,8],[31,43],[18,4],[59,69],[54,68],[77,91],[8,12],[40,54],[69,60],[98,98],[58,68],[75,66],[30,40],[88,75],[57,49],[36,44],[21,33],[68,74],[46,35],[30,25],[59,71],[71,58],[23,28],[5,0],[76,63],[93,92],[65,71],[31,26],[21,15],[88,91],[85,73],[5,12],[21,29],[22,8],[95,87],[53,56],[32,32],[82,82],[95,85],[48,56],[86,71],[60,58],[9,18],[0,0],[27,33],[58,57],[94,100],[66,59],[11,21],[65,53],[53,53]]

export default {
    defaultConfig: {
        name: '基本散点图',
        type: 'scatter-normal',
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
            type: 'value',
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: Constants.axisLine,
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
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(95,105,114,1)'
                }
            },
            axisTick: {show: false},
            axisLine: {show: false},
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
        tooltip: Constants.tooltip,
        series: [
            {   
                name: '沈阳',
                type: 'line',
                smooth: true,
                symbolSize: 8,
                symbol: 'circle',
                data: source,
                itemStyle: {
                    color: 'rgba(48,197,200,0.4)'
                },
                lineStyle: {
                    opacity: 0
                }
            }
        ],
        animation: false
    }
}
