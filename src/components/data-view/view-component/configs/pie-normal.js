import Constants from '@/utils/constants.js'
const data = [

    {name: "石家庄", value: 88160},
    {name: "大连", value: 84341},
    {name: "济南", value: 41398},
    {name: "杭州", value: 8034},
    {name: "哈尔滨", value: 48972},
    {name: "沈阳", value: 44865}
]

export default {
    defaultConfig: {
        name: '基本饼图',
        type: 'pie-normal',
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
        silent: true,
        series: [
            {
                name: '姓名',
                type: 'pie',
                label: {
                    show: true,
                    color: 'rgba(255, 255, 255, 1)',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: 12,
                    fontWeight: 'normal',
                    position: 'outside',
                    formatter: '{b}: {d}%'
                },
                labelLine: {
                    show: true
                },
                radius: ['0%', '75%'],
                data,
            }
        ],
        tooltip: Constants.tooltip,
        animation: false
    }
}
