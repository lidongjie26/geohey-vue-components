<template>
    <div class="full-screen-wrapper  jimu-show"
            :class="{'full-screen-center':  item.showType==='center'}"
            @mousemove="mousemove"
            @click.self = "closeFullScreen"
            :style="{
                height: `${height}px`,
                width: `${width}px`
            }">
        <view-component
                :key="item.idx"
                :idx="item.idx"
                :slot="item.idx"
                :type="item.type"
                :width="viewWidth"
                :height="viewHeight"
                :options-with-data="item.optionsWithData"
                :isPreviewing = true
                :isFullScreen = true
                :style="{
                    marginTop: `${viewOffsetY}px`,
                    marginLeft: `${viewOffsetX}px`
                }">
        </view-component>

        <div class="full-screen-btn jimu-show" 
            v-show="isMouseMoveing"
            @click = "closeFullScreen">
            <svg class="icon fullscreen-btn" aria-hidden="true" style="font-size: 40px;">
                <use xlink:href="#icon-fullscreen-exit"></use>
            </svg> 
        </div>

        <div class="reset-btn jimu-show" 
            v-if="(item.type === 'relation-graph')" 
            v-show="isMouseMoveing"
            @click = "resetReletionChart">
            <svg class="icon fullscreen-btn" aria-hidden="true" style="font-size: 40px;">
                <use xlink:href="#icon-refresh"></use>
            </svg> 
        </div>
    </div>
   
</template>

<script>
/**
 * 全屏显示目前支持两种显示模式
 * 1、图表、地图 全屏居中大小 自动填充
 * 2、ifream    位置自定义 大小 viewWidth，viewHeight
 * 第二种针对同衡特殊需求开发 后期考虑移除
 */
import ViewComponent from '../view-component'
import { eventBus } from '@/event-bus'
export default {
    name: 'full-screen',
    props: ["height", "width", "item"],
    data() {
        return {
            isMouseMoveing: false,
        }
    },

    computed:{
        viewWidth() {
            // 全屏指定大小使用指定大小，否则使用默认大小
            return this.item.showType==='auto'?this.item.optionsWithData.viewWidth:this.width * 0.6 
        },
        viewHeight() {
            // 全屏指定大小使用指定大小，否则使用默认大小
            return this.item.showType==='auto'?this.item.optionsWithData.viewHeight:this.height * 0.8
        },
        viewOffsetX() {
            return this.item.showType==='auto'? this.item.optionsWithData.offsetX: ''
        },
        viewOffsetY() {
            return this.item.showType==='auto'? this.item.optionsWithData.offsetY: ''
        },

    },

    methods: {
        closeFullScreen: function(){
            eventBus.$emit('full-screen-hide')
        },

        mousemove () {
            clearTimeout(this.timer)
            this.isMouseMoveing = true
            this.timer = setTimeout(() => {
                this.isMouseMoveing = false
            }, 1500)
        },
        resetReletionChart() {
            eventBus.$emit('update-chart',this.item.idx)
        }
    },
    components: {
        ViewComponent
    },

}
</script>

<style lang="scss">

.full-screen-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    z-index: 9998;

    .item {
        position: absolute;
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
}

.full-screen-center{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>