import echarts from 'echarts'
import Constants from '@/utils/constants.js'
// 年末总人口
var data = [6169, 8285, 13073, 13045, 14424, 16030, 19140, 25094, 30195, 35174, 45906, 56212, 66978, 77116]
var xAxisData = []
for (var i = 0; i < 14; i++) {
    xAxisData.push(1950 + i * 5)
}

export default {
    defaultConfig: {
        name: '基本折线图',
        type: 'line-normal',
        x: 20,
        y: 20,
        width: 600,
        height: 400,
        isFocused: true,
        icon: 'chart_2'
    },
    defaultOptions: {
        silent: true,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        colors: Constants.defaultColors,
        grid: Constants.grid,
        legend: {
            show: false,
            type:'scroll',
            align: 'left',
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
            data: xAxisData,
            splitLine: {
                show: false
            },
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
            show: true,
            splitLine: {
                show: false
            },
            axisTick: {show: false},
            axisLine: {show: false},
            position: 'left',
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
                itemStyle: {
                    color:null,
                },
                lineStyle:{
                    width:2
                },
                symbolSize: 4,
                data: [6169, 8285, 13073, 13045, 14424, 16030, 19140, 25094, 30195, 35174, 45906, 56212, 66978, 77116],
                smooth: false,
            },
            {
                name: '哈尔滨',
                type: 'line',
                itemStyle: {
                    color:null,
                },
                lineStyle:{
                    width:2
                },
                symbolSize: 4,
                data: [6000, 8000, 12500, 12200, 13333, 14030, 18140, 22094, 26000, 27000, 30000, 32000, 33000, 54000],
                smooth: false,
            },
            {
                name: '大连',
                type: 'line',
                itemStyle: {
                    color:null,
                },
                lineStyle:{
                    width:2
                },
                symbolSize: 4,
                data: [5000, 6000, 7000, 8000, 9000, 12000, 13000, 15000, 18000, 20000, 22000, 24000, 26000, 46000],
                smooth: false,
            }
        ],
        animation: false
    }
}
