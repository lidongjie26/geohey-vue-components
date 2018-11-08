<template>
    <div
        @mousemove="mousemove"
        class="factory"
        :style="{
            width: `${width}px`,
            height: `${height}px`
        }">
        <div
            v-if="isChart"
            class="chart">
        </div>
        <div
            class="text"
            v-if="type === 'text'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                fontStyle: optionsWithData.fontStyle,
                fontFamily: optionsWithData.fontFamily,
                fontSize: `${optionsWithData.fontSize}px`,
                color: optionsWithData.color,
                backgroundColor: optionsWithData.backgroundColor,
                fontWeight: optionsWithData.fontWeight,
                textAlign: optionsWithData.textAlign,
                lineHeight: `${height}px`
            }">
            {{ optionsWithData.content }}
        </div>
        <div
            class="rich-text"
            v-if="type === 'rich-text'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: optionsWithData.backgroundColor,
            }">
            <content-box-text
                :options="optionsWithData"
                :width="width"
                :height="height"
                :scale="scale"
                :idx="idx"
                :is-previewing="isPreviewing"></content-box-text>
        </div>
        <div class="map-2d"
            v-if="type === 'map-2d'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: optionsWithData.backgroundColor, 
            }">
            <content-box-map 
                :options="optionsWithData"
                :is-previewing="isPreviewing"
                :width="width"
                :height="height"
                :idx="idx"
                :focusedIdx="focusedIdx"
                :dragging="dragging"
                :scale="scale"></content-box-map>
        </div>
        <div
            class="background-gradient"
            v-if="type === 'background-gradient'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                background: backgroundGradient
            }">
        </div>
        <div
            class="image"
            v-if="type === 'image'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                backgroundSize: `${width}px ${height}px`,
                backgroundImage: getImageUrl(optionsWithData.uid)
            }">
        </div>
        <div
            class="bg"
            v-if="isBg"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url(${optionsWithData.imageURL})`
            }">
        </div>
        <div
            class="border-corner"
            v-if="type === 'border-corner'"
            :style="{
                width: `${width}px`,
                height: `${height}px`
            }">
            <div :style="{
                width: `${optionsWithData.size * 10}px`,
                height: `${optionsWithData.size * 10}px`,
                borderTop: `${optionsWithData.thickness}px solid ${optionsWithData.color}`,
                borderLeft: `${optionsWithData.thickness}px solid ${optionsWithData.color}`
            }">
            </div>
            <div :style="{
                width: `${optionsWithData.size * 10}px`,
                height: `${optionsWithData.size * 10}px`,
                borderTop: `${optionsWithData.thickness}px solid ${optionsWithData.color}`,
                borderLeft: `${optionsWithData.thickness}px solid ${optionsWithData.color}`
            }">
            </div>
            <div :style="{
                width: `${optionsWithData.size * 10}px`,
                height: `${optionsWithData.size * 10}px`,
                borderTop: `${optionsWithData.thickness}px solid ${optionsWithData.color}`,
                borderLeft: `${optionsWithData.thickness}px solid ${optionsWithData.color}`
            }">
            </div>
            <div :style="{
                width: `${optionsWithData.size * 10}px`,
                height: `${optionsWithData.size * 10}px`,
                borderTop: `${optionsWithData.thickness}px solid ${optionsWithData.color}`,
                borderLeft: `${optionsWithData.thickness}px solid ${optionsWithData.color}`
            }">
            </div>
        </div>
        <div
            class="time-shower"
            v-if="type === 'time-shower'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                fontStyle: optionsWithData.fontStyle,
                fontFamily: optionsWithData.fontFamily,
                fontSize: `${optionsWithData.fontSize}px`,
                color: optionsWithData.color,
                backgroundColor: optionsWithData.backgroundColor,
                fontWeight: optionsWithData.fontWeight,
                textAlign: optionsWithData.textAlign,
                lineHeight: `${height}px`
            }">
            {{ time }}
        </div>
        <div 
            class="web-page"
            v-if="type === 'web-page'"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                padding: `20px`
            }">
            <iframe
                :width = "width-40"
                :height = "height-40"
                frameborder = 0
                scrolling = "no"
                :src = "optionsWithData.linkUrl"
            >
            </iframe>
        </div>
        <link-text
            class="link-text"
            v-if="type === 'link-text'"
            :optionsWithData = 'optionsWithData'
            :width = 'width'
            :height = 'height'
            :type = 'link-text'
            :isPreviewing = 'isPreviewing'
            :idx = 'idx'>
        </link-text>

        <div class="full-screen-btn jimu-show" 
            v-if="(isChart || type === 'map-2d') && isPreviewing && !isFullScreen" 
            v-show="isMouseMoveing"
            @click = "chartsFullScreen">
            <svg class="icon fullscreen-btn" aria-hidden="true" style="font-size: 40px;">
                <use xlink:href="#icon-fullscreen"></use>
            </svg> 
        </div>

        <div class="reset-btn jimu-show" 
            v-if="(type === 'relation-graph') && isPreviewing && !isFullScreen" 
            v-show="isMouseMoveing"
            @click = "resetReletionChart">
            <svg class="icon fullscreen-btn" aria-hidden="true" style="font-size: 40px;">
                <use xlink:href="#icon-refresh"></use>
            </svg> 
        </div>
    </div>
</template>

<script>
    // DEPENDENCE
    import echarts from 'echarts'
    // MAP

    import ContentBoxMap from '../map/content-box-map'

    //RICH TEXT

    import ContentBoxText from '../rich-text/content-box-text'

    import LinkText from '../link-text/link-text'

    // CONFIG
    import CONFIG from './config'

    import { eventBus } from '@/event-bus'

    // INSTANCE
    export default {
        props: {
            width: {
                type: Number,
                default: 400
            },
            height: {
                type: Number,
                default: 300
            },
            type: {
                type: String,
                default: 'bar-normal'
            },
            idx: {
                type: Number,
                default: 0
            },
            optionsWithData: {
                type: Object,
                default () {
                    return {}
                }
            },
            isPreviewing: {
                type: Boolean,
                default: false
            },
            timestamp: {
                type: String,
                default: ''
            },
            dragging: {
                type: Boolean,
                default: false
            },
            scale: {
                type: Number,
                default: 100
            },
            isFullScreen: {
                type: Boolean,
                default: false
            },
            chartLinkage: {
                type: String | Boolean,
                default: false
            },
            focusedIdx: {
                type: Number,
                default: -1
            }

        },
        data () {
            return {
                time: '',
                eventBreak: false, // 事件中断 避免重复响应
                isMouseMoveing: false,
            }
        },
        created(){
            this.subscribe()
        },
        watch: {
            optionsWithData: {
                deep: true,
                handler(val){
                },
                time: '',
                draggable: false
            }
        },
        computed: {
            size () {
                return this.width + this.height
            },
            isChart () {
                const condition = ['bar', 'line', 'pie', 'scatter', 'combine', 'radar', 'airline', 'relation']
                let re = false
                for (let i = 0; i < condition.length; i++) {
                    if (this.type.indexOf(condition[i]) > -1) {
                        re = true
                        break
                    }
                }
                return re
            },
            isBg () {
                const condition = ['bg', 'title']
                let re = false
                for (let i = 0; i < condition.length; i++) {
                    if (this.type.indexOf(condition[i]) > -1) {
                        re = true
                        break
                    }
                }
                return re
            },
            backgroundGradient () {
                if (this.type === 'background-gradient') {
                    const direction = this.optionsWithData.direction === 'horizontal' ? 'left' : 'top'
                    return `-webkit-linear-gradient(${direction}, ${this.optionsWithData.colors[0]}, ${this.optionsWithData.colors[1]})`
                }
            }
        },
        watch: {
            timestamp () {
                if (this.isChart) {
                    this.$nextTick(() => {
                        this.echartsEle.resize()
                    })
                }
               
            },
            optionsWithData: {
                deep: true,
                handler(val){
                    // console.log(val)
                }
            },
            width (){
                if (this.isChart) {
                    this.$nextTick(() => {
                        this.echartsEle.resize()
                    })
                }
            },
            height (){
                if (this.isChart) {
                    this.$nextTick(() => {
                        this.echartsEle.resize()
                    })
                }
            },
             draggable ( val ) {
                this.$parent.draggable = val;
            },
        },
        methods: {
            updateOptions (val) {
                if (this.isChart) {
                    this.echartsEle.clear()
                    this.echartsEle.setOption(val)
                }
            },
            updateLoadingState(val){
                this.$store.commit('updateLoadingState', val);
            },

            /* 事件订阅 */
            subscribe: function(){
                
            },

            /* 订阅图表相关事件 */
            subscribeChartEvent: function(){
                // 更新图表 解决图表series数组更新后 原数据不删除的问题
                eventBus.$on('update-chart',(idx)=>{
                    if(this.idx === idx) {
                        this.updateOptions(this.optionsWithData)
                    }
                })
                
                // 预览模式下响应
                if(this.isPreviewing && this.isChart){
                     eventBus.$on('district-changed',(name,idx)=>{
                        //console.log(name,idx)
                        if(this.idx === idx || (!name&& name!==0)) return //不响应自身emit事件
                        let index = -1
                        //console.log(name)
                        // 取消高亮
                        this.downplayCharts()
                        
                        // 关系图节点高亮触发
                        if(this.type === 'relation-graph'){
                            index = this.getDataIndex(name)
                            if(index<0)return
                            this.echartsEle.dispatchAction({
                                type: 'focusNodeAdjacency',
                                seriesIndex: 0,
                                dataIndex: index,
                            })
                            return 
                        }
                        

                        // 普通饼图、雷达图高亮触发
                        if(this.type === 'pie-normal' || this.type === 'radar-normal'){
                            index = this.getDataIndex(name)
                            if(index < 0) return
                            this.echartsEle.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: index,
                            })
                            return
                        }
                        
                        // 栅格面积图高亮触发
                        if(this.type === 'line-area-gap'){
                            index = this.optionsWithData.xAxis.data.indexOf(name)
                            if(index < 0) return
                            this.echartsEle.dispatchAction({
                                type: 'highlight',
                                seriesIndex: [0,1],
                                dataIndex: index,
                            })
                            return
                        }


                        // 基本折线图、基本散点图、面积图高亮触发
                        if(this.type === 'line-normal' || this.type === 'scatter-normal' || this.type === 'line-area'){
                            index = this.getSeriesIndex(name)
                            if(index < 0) return
                            this.echartsEle.dispatchAction({
                                type: 'highlight',
                                seriesIndex: index
                            })
                            return
                        }

                        // 柱状图、双向柱状图、双向对比图、三角柱图高亮触发
                        if(this.type === 'bar-normal' || this.type === 'bar-sharp' || this.type === 'bar-negative' || this.type === 'bar-contrast'){
                            if(this.type === 'bar-negative'|| this.type === 'bar-contrast'){
                                // 双向柱状图标识轴不一样
                                index = this.optionsWithData.yAxis.data.indexOf(name)
                            }else{
                                index = this.optionsWithData.xAxis.data.indexOf(name)
                            }
                            
                            if(index < 0) return
                            this.echartsEle.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 0,
                                dataIndex: index,
                            })
                            this.echartsEle.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 0,
                                dataIndex: index,
                            })
                            return
                        }
                        
                    })
                }

            },

            /* 绑定图表事件 */
            bindChartEvent: function(){
                if(this.isPreviewing && this.isChart){
                    let that = this
                    // 关系图节点选中事件
                    this.echartsEle.on('mouseover', (event)=>{
                        if(!this.chartLinkage){
                            return
                        }
                        eventBus.$emit('district-changed',event.name,that.idx)
                    })
                }
                
            },

            getImageUrl: function(uid){
                return `url(/apps/data-view/api/${ uid }/image)`
            },
            changeDraggable ( value ) {
                this.draggable = value;
            },

            downplayCharts(){
                let indexList = []
                this.optionsWithData.series.forEach((item,index)=>{
                    indexList.push(index)
                })
                this.echartsEle.dispatchAction({
                    type: 'downplay',
                    seriesIndex: indexList,
                })
            },

            getDataIndex(name){
                let nodeList = this.optionsWithData.series[0].data
                for(let i = 0; i < nodeList.length; i++){
                    let node = nodeList[i]
                    if(node.name === name){
                        return i
                    }
                }
                return -1
            },

            getSeriesIndex(name){
                let seriesList = this.optionsWithData.series
                for(let i = 0; i < seriesList.length; i++){
                    let series = seriesList[i]
                    if(series.name === name){
                        return i
                    }
                }
                return -1
            },

            mousemove () {
                clearTimeout(this.timer)
                this.isMouseMoveing = true
                this.timer = setTimeout(() => {
                    this.isMouseMoveing = false
                }, 1500)
            },

            chartsFullScreen() {
                 eventBus.$emit('full-screen-show', {
                    idx: this.idx,
                    type: this.type,
                    showType: 'center',
                    width: this.width,
                    height: this.height,
                    optionsWithData: this.optionsWithData,
                })
            },

            /* 复位重置关系图 */
            resetReletionChart() {
                this.updateOptions(this.optionsWithData)
            }
        },
        mounted () { 
            if (this.isChart) {
                // 图表绑定鼠标点击事件

                this.echartsEle = echarts.init(this.$el.children[0])
                this.optionsWithData.silent = !this.isPreviewing
                if(this.optionsWithData.tooltip){
                    this.optionsWithData.tooltip.show = this.isPreviewing
                }
                if(this.isPreviewing){
                    // 预览模式下，绑定鼠标点击事件
                    this.echartsEle.on('click',  (params) => {
                         eventBus.$emit('district-changed',params)
                    });
                    // 预览模式下 3d地图可以进行交互
                    if(this.optionsWithData.geo3D){
                        this.optionsWithData.geo3D.silent = false
                        this.optionsWithData.geo3D.viewControl.rotateSensitivity = 1
                        this.optionsWithData.geo3D.viewControl.zoomSensitivity = 1
                        this.optionsWithData.geo3D.viewControl.panSensitivity = 1
                    }
                    if(this.type === 'relation-graph'){
                        this.optionsWithData.series[0].roam = true
                        this.optionsWithData.series[0].silent = false
                    }
                }

                /**
                 * 横向对比图 保存的配置信息丢失了 formatter配置的信息 在此处恢复
                 *  formatter: 函数
                 * */
                if (this.type === 'bar-contrast') {
                    this.optionsWithData.tooltip.formatter = function(data){
                        return data[0].axisValue+'<br/>'+ data[0].seriesName+ ':'+data[0].value+ '<br/>'+data[1].seriesName+ ':'+-data[1].value
                    }
                    this.optionsWithData.xAxis.axisLabel.formatter = function(data){
                        if(data>0){
                            return data
                        }else{
                            return -data
                        }
                    }
                    if(this.optionsWithData.series.length>1){
                        this.optionsWithData.series[1].label.normal.formatter = function (obj) {
                            return -obj.data;
                        }
                    }
                }
                if(this.type === 'pie-number') {
                    this.optionsWithData.series[1].data[0].label.formatter = function(data){
                        return data.percent.toFixed(1)+"%"
                    }
                } 
                this.echartsEle.setOption(this.optionsWithData)
                this.subscribeChartEvent()
                this.bindChartEvent()

            }
            if (this.type === 'time-shower') {
                const getTimeNow = () => {
                    const weekDayMapRealWeekDay = ['一', '二', '三', '四', '五', '六', '日']
                    const date = new Date()
                    const year = date.getFullYear()
                    const month = date.getMonth()
                    const day = date.getDate()
                    const weekDay = date.getDay()
                    const hour = date.getHours()
                    const minute = date.getMinutes()

                    this.time = `${year}-${month + 1}-${day} 周${weekDayMapRealWeekDay[weekDay]} ${hour}:${minute}`
                }
                setInterval(getTimeNow, 60000)
                getTimeNow()
            }

            
        },
        components: {
            ContentBoxMap,
            ContentBoxText,
            LinkText,
        }
    }
</script>

<style lang="scss">
    .factory {

        .icon {
           width: 1em; height: 1em;
           vertical-align: -0.15em;
           fill: currentColor;
           overflow: hidden;
        }
        .full-screen-btn{
            position: absolute;
            height: 40px;
            width: 40px;
            top: 5px;
            right: 5px;
            cursor: pointer;
            color: #b7b7b7;
        }
        .reset-btn{
            position: absolute;
            height: 40px;
            width: 40px;
            top: 5px;
            right: 50px;
            cursor: pointer;
            color: #b7b7b7;
        }
        > div {
            height: 100%;
            width: 100%;
        }
        .text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .image {
            overflow: hidden;
            position: relative;
            img {
                display: block;
                height: 100%;
                width: auto;
                position: absolute;
                left: 50%;
                transform :translateX(-50%);
            }
        }
        .bg {
            background-size: 100% 100%;
        }
        .border-corner {
            position: relative;
            > div {
                position: absolute;
                transform-origin: center center;
                box-sizing: border-box;
            }
            > :nth-child(1) {
                top: 0;
                left: 0;
                transform :rotate(0);
            }
            > :nth-child(2) {
                top: 0;
                right: 4px;
                transform: rotate(90deg);
            }
            > :nth-child(3) {
                bottom: 4px;
                right: 4px;
                transform: rotate(180deg);
            }
            > :nth-child(4) {
                bottom: 4px;
                left: 0;
                transform: rotate(270deg);
            }
        }
    }
</style>

