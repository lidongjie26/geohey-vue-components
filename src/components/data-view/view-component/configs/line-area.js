import echarts from 'echarts'
import Constants from '@/utils/constants.js'
var xAxisData = []
for (var i = 0; i < 31; i++) {
    xAxisData.push(1950 + i * 2)
}
var data = [1850, 1570, 4280, 2210, 1670, 3100, 1620, 2310, 2250, 5700, 3930, 3640, 2650, 2850, 6100, 5170, 3590, 3980, 7910, 2650, 560, 2110, 4470, 1820, 2410, 105, 2310, 1280, 340, 420, 1330]
export default {
    defaultConfig: {
        name: '面积图',
        type: 'line-area',
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
        grid: Constants.grid,
        legend: {
            show: false,
            align: 'left',
            type:'scroll',
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
                data,
                smooth: false,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: 'rgba(0, 100, 200, 0.7)'},
                        {offset: 1, color: 'rgba(0, 80, 150, 0.2)'}
                    ]
                ),
                areaStyle: {}
            }
        ],
        animation: false
    }
}
