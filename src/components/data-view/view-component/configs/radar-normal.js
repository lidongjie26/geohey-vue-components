/* eslint-disable */

import echarts from 'echarts'
import Constants from '@/utils/constants.js'

var source = {
    x: [ '交通运输', '居民点', '园地', '林地', '水利', '牧墓地', '耕地', '其它' ],
}

export default {
    defaultConfig: {
        name: '雷达图',
        type: 'radar-normal',
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
        color: [ 'rgba(81,255,255,1)', 'rgba(254,255,138,1)' ],
        legend: {
            show: false,
            right: '20%',
            type:'scroll',
            itemWidth: 10,
            itemGap: 30,
            itemHeight: 10,
            textStyle: {
                color: 'rgba(152,172,192,1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        radar: {
            name: {
                fontSize: 16,
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
                color: 'rgba(152,172,192,1)'
            },
            axisLine: { //坐标轴轴线
               show: true,
               lineStyle: {
                   color: 'rgba(86,77,142,1)',
                   width: 1,
               },
            },
            splitLine: {
               show: true,
               lineStyle: {
                   color: 'rgba(67,186,254,1)',
                   opacity: 0.6,
                   width: 1,
               }
            },
            splitArea: {
               show: false
            },
            indicator: [
                {name: '一月', max: 720},
                {name: '二月', max: 720},
                {name: '三月', max: 720},
                {name: '四月', max: 720},
                {name: '五月', max: 720},
                {name: '六月', max: 720},
                {name: '七月', max: 720},
                {name: '八月', max: 660}
            ]
        },
        tooltip: Constants.tooltip,
        series: [
            {
                type: 'radar',

                label: {
                    fontSize: 18
                },

                emphasis: {
                    areaStyle: {
                        opacity: 0.3
                    }
                },
                data : [
                    {
                        value : [600,300,290,600,300,600,330,550],
                        name : '大连',
                        itemStyle: {
                            color: null,
                            borderWidth: 4,
                            borderColor: null
                        },
                        areaStyle: {
                            color: null,
                            opacity: 0.1
                        }
                    },
                    {
                        value : [400,340,600,378,600,512,444,500],
                        name : '沈阳',
                        itemStyle: {
                            color: null,
                            borderWidth: 4,
                            borderColor: null
                        },
                        areaStyle: {
                            color: null,
                            opacity: 0.1
                        }
                    },
                    {
                        value : [500,600,450,410,300,600,600,550],
                        name : '北京',
                        itemStyle: {
                            color: null,
                            borderWidth: 4,
                            borderColor: null
                        },
                        areaStyle: {
                            color: null,
                            opacity: 0.1
                        }
                    }
                ]
            }
        ],
        animation: false
    }
}
