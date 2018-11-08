import echarts from 'echarts'

const data = [
    { value: 335, name: '直接访问' },
    { value: 310, name: '邮件营销' },
    { value: 234, name: '联盟广告' },
    { value: 135, name: '视频广告' },
    { value: 1548, name: '搜索引擎' }
]

var xAxisData = []
var data1 = []
var data2 = []
for (var i = 0; i < 20; i++) {
    xAxisData.push('类目' + i)
    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}
const defaultData = [
    {
        fields: ['default1', 'default2'],
        features: [
            {
                id: 0,
                attrs: {
                    defaultX: '直接访问',
                    defaultY1: 335,
                    defaultY2: 200
                }
            },
            {
                id: 1,
                attrs: {
                    default1: '邮件营销',
                    default2: 310,
                    defaultY2: 250
                }
            },
            {
                id: 2,
                attrs: {
                    default1: '联盟广告',
                    default2: 234,
                    defaultY2: 220
                }
            },
            {
                id: 3,
                attrs: {
                    default1: '视频广告',
                    default2: 135,
                    defaultY2: 110
                }
            },
            {
                id: 4,
                attrs: {
                    default1: '搜索引擎',
                    default2: 1548,
                    defaultY2: 1200
                }
            }
        ]
    }
]

export default {
    defaultFields: ['defaultX', 'defaultY1', 'defaultY2'],
    defaultData,
    defaultConfig: {
        name: '组合图',
        type: 'bar-bar',
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
            show: true,
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
            silent: false,
            splitLine: {
                show: false
            },
            axisLabel: {
                color: 'rgba(0, 0, 0, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        yAxis: {
            show: true,
            position: 'left',
            axisLabel: {
                color: 'rgba(0, 0, 0, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal'
            }
        },
        series: [
            {
                name: 'bar1',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10
                },
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 1,
                    [
                        {offset: 0, color: 'rgba(0, 100, 255, 1)'},
                        {offset: 1, color: 'rgba(255, 0, 100, 1)'}
                    ]
                ),
                large: false,
                largeThreshold: 100,
                silent: true
            },
            {
                name: 'bar2',
                type: 'bar',
                data: data2,
                animationDelay: function (idx) {
                    return idx * 10
                },
                color: new echarts.graphic.LinearGradient(
                    1, 0, 0, 1,
                    [
                        {offset: 0, color: 'rgba(0, 255, 100, 1)'},
                        {offset: 1, color: 'rgba(190, 0, 0, 1)'}
                    ]
                ),
                large: false,
                largeThreshold: 100,
                silent: true
            }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5
        }
    }
}
