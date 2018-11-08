/* eslint-disable */

import echarts from 'echarts'
// 综合超载指数
var source = 70
var max = 300

export default {
    defaultConfig: {
        name: '数字饼图',
        type: 'pie-number',
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
            type:'scroll',
            textStyle: {
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        series: [
            {
                name: 'Line 1',
                type: 'pie',
                clockWise: false,
                radius: ['50%', '51%'],
                center:['50%','50%'],
                hoverAnimation: false,
                startAngle: 90,
                label:{
                    borderRadius:'10',
                },
                data: [
                    {
                        value: max,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(81,255,206,1)'},
                                        {offset: 1, color: 'rgba(255,255,255,0)'}
                                    ]
                                )
                            }
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                ]
            },
            {
                name: 'Line 2',
                type: 'pie',
                radius: ['65%', '76%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                startAngle: 270,
                data: [
                    {
                        value: source,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: 'rgba(81,255,206,1)'
                            }
                        },
                        label: {
                            color: 'rgba(81,255,206,1)',
                            fontSize: 36,
                            position: 'center',
                            formatter: function(data){
                                return data.percent.toFixed(1)+"%"
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    {
                        value: max - source <= 0 ? 0 : max - source,
                        name: '',
                        tooltip: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: 'rgba(57,61,80,1)'
                        }
                    }
                ]
            }
        ],
        animation: false
    }
}
