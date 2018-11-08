import echarts from 'echarts'
import Constants from '@/utils/constants.js'

export default {
    defaultConfig: {
        name: '横向对比图',
        type: 'bar-contrast',
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
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(data){
                return data[0].axisValue+'<br/>'+ data[0].seriesName+ ':'+data[0].value+ '<br/>'+data[1].seriesName+ ':'+-data[1].value
            }
        },
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
        xAxis : {
            show: true,
            type : 'value',
            position: 'bottom',
            splitLine: {show: false},
            axisLine: Constants.axisLine,
            axisLabel:{
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Microsoft YaHei',
                fontSize: 12,
                fontWeight: 'normal',
                formatter:function(data){
                    if(data>0){
                        return data
                    }else{
                        return -data
                    }
                }
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
        yAxis :{
            show: true,
            type : 'category',
            axisTick : {show: false},
            position: 'left',
            data : ['北京','大连','济南','沈阳','石家庄','杭州','长春'],
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
        }
        ,
        series : [
            {
                name:'利润',
                type:'bar',
                stack: 'one',
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
                data:[300, 280, 260, 220, 150, 120, 100]
            },
            
            {
                name:'支出',
                type:'bar',
                stack: 'one',
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        formatter: function (obj) {
                            return -obj.data;
                        },
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12,
                        fontWeight: 'normal'
                    }
                },
                itemStyle: {
                    color:null,
                },
                data:[-320, -270, -250, -200, -140, -110, -90]
            }
        ],
        animation: false
    }
}
