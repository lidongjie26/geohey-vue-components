import echarts from 'echarts'
import Constants from '@/utils/constants.js'
// 地均地区生产总值
var xAxisData = [ '石家庄', '沈阳', '大连', '长春', '哈尔滨', '南京', '杭州', '厦门', '济南', '青岛', '郑州', '济南' ]

//var xAxisData = [ '城镇化促进区', '城镇化适度发展地区', '特色乡村发展地区', '人口疏解与生态保育区', '城镇化优化拓展区', '南京', '杭州', '厦门', '济南', '青岛', '郑州', '济南' ]

var data2 = [12, 11, 7, 5, 4, 14, 16, 22, 9, 19, 38, 12]

export default {
    defaultConfig: {
        name: '基本柱图',
        type: 'bar-normal',
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
            type:'scroll',
            align: 'left',
            textStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        silent: false,
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
            interval: 0,
            nameTextStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        yAxis: {
            title: '',
            name: '',
            unit: '',
            show: true,
            position: 'left',
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            },
            nameTextStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        
        tooltip: Constants.barTooltip,
        series: [
            
            {
                name: 'bar',
                type: 'bar',
                data: data2,
                large: true,
                itemStyle: {
                    color:'rgba(0, 55, 155, 1)',
                },
                largeThreshold: 100,
            }
        ],
        animation: false
    }
}
