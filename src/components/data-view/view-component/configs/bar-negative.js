import echarts from 'echarts'
import Constants from '@/utils/constants.js'

export default {
    defaultConfig: {
        name: '正负条形图',
        type: 'bar-negative',
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
        silent: false,
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
        xAxis :{
            show: true,
            title: '',
            position: 'bottom',
            type : 'value',
            splitLine: {
                show: false
            },
            axisLine: Constants.axisLine,
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
        yAxis : {
            show: true, 
            position: 'left',
            splitLine: {
                show: false
            },
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            },
            data : ['沈阳','哈尔滨','石家庄','杭州','济南','大连','长春'],
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
        series : [
            {
                name:'利润',
                type:'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12,
                        fontWeight: 'normal'
                    }
                },
                itemStyle: {
                    color:null,
                },
                data:[200, 170, 240, 244, 200, 220, 210]
            },
            {
                name:'收入',
                type:'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12,
                        fontWeight: 'normal'
                    }
                },
                itemStyle: {
                    color:null,
                },
                data:[320, 302, 341, 374, 390, 450, 420]
            },
            {
                name:'支出',
                type:'bar',
                stack: '总量',
                large: true,
                itemStyle: {
                    color:'rgba(0, 55, 155, 1)',
                },
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12,
                        fontWeight: 'normal'
                    }
                },
                data:[-120, -132, -101, -134, -190, -230, -210]
            }
        ],
        animation: false
    }
}
