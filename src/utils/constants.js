export default {
	defaultColors: [ '#5182e4', '#ce62d6', '#9bcc66', '#8954d4', '#3fb27e', '#5156b8', '#f7cb4a', '#51b4f1', '#f88d48', '#69d4db', '#f35352', '#d42d6b' ], 

    // 普通图表悬浮标签
	tooltip: {
        show: false,
    },
    // 格网边距
    grid: {
        left: '10%',
        right: '10%',
        bottom: '60',
        top: '60',
        containLabel: false
    },

    // 柱状图悬浮标签 + 柱体阴影显示
    barTooltip:{
        show: false,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    // 坐标轴样式
    axisLine: {
        lineStyle:{
            color: '#333',
            width: 1
        }
    }
}