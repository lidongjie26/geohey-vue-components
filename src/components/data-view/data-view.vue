<template>
    <div class="data-view" @mousemove="mousemove">
        <div
            class="project"
            :style="{
                height: `${content.height}px`,
                width: `${content.width}px`
            }">
            <view-component
                class="item"
                v-for="item in content.items"
                :key="item.idx"
                :idx="item.idx"
                :slot="item.idx"
                :type="item.type"
                :width="item.width"
                :height="item.height"
                :ak="ak"
                :mapviz="mapviz"
                :options-with-data="item.options"
                :isPreviewing = "true"
                :isFullScreen = false
                :style="{
                    top: `${item.y}px`,
                    left: `${item.x}px`,
                    zIndex: `${item.z}`
                }">
            </view-component>
        </div>
        <loading :is-show="loading"
            backgroundColor="#071326"></loading>
        <loading-line />
        <full-screen 
            v-if = "isFullScreen"
            :height = "content.height"
            :width = "content.width"
            :item = "fullScreenItem">
        </full-screen>
    </div>
</template>

<script>
    import API from '@/API'
    import ViewComponent from './view-component'
    import Loading from './loading'
    import FullScreen from './full-screen'
    import LoadingLine from './loading-line'
    import { eventBus } from '@/event-bus'
    import '../../../static/iconfont/iconfont.js'
    export default {
        name: 'g-data-view',
        props: {
           content: Object,
           ak: String,
           mapviz: Object
        },
        data () {
            return {
                isMouseMoveing: false,
                timer: null,
                fullScreenItem: null,
                isFullScreen: false,
                loading: false,
            }
        },
        components: {
            ViewComponent,
            Loading,
            LoadingLine,
            FullScreen
        },
        created () {
            this.subscribe();
        },
        methods: {
            mousemove () {
                clearTimeout(this.timer)
                this.isMouseMoveing = true
                this.timer = setTimeout(function(){
                    this.isMouseMoveing = false
                }, 1500)
            },
            fullScreen (el) {
                const fullScreen=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;
                if (!fullScreen) {//进入全屏,多重短路表达式
                    (el.requestFullscreen&&el.requestFullscreen())||
                    (el.mozRequestFullScreen&&el.mozRequestFullScreen())||
                    (el.webkitRequestFullscreen&&el.webkitRequestFullscreen())||(el.msRequestFullscreen&&el.msRequestFullscreen());

                } else {	//退出全屏,三目运算符
                    document.exitFullscreen?document.exitFullscreen():
                    document.mozCancelFullScreen?document.mozCancelFullScreen():
                    document.webkitExitFullscreen?document.webkitExitFullscreen():'';
                }
            },

            subscribe() {
                eventBus.$on('full-screen-show', function(item){
                    this.isFullScreen = true;
                    console.log(this.isFullScreen );
                    this.$nextTick( ()=> {
                        this.fullScreenItem = item;
                    })
                    
                })

                eventBus.$on('full-screen-hide', function(){
                    console.log('1111');
                    this.isFullScreen = false
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .data-view {
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        overflow auto
        background: #071326

        .icon {
           width: 1em; height: 1em;
           vertical-align: -0.15em;
           fill: currentColor;
           overflow: hidden;
        }
        
        .project {
            height 100%
            width 100%
            position relative
            .item {
                position absolute
            }
        }
        .back {
            height 60px
            width 60px
            position fixed
            cursor pointer
            color #fff
            top 20px
            left 20px
            font-size 40px
            line-height 60px
            text-align center
            z-index: 9999;
            svg{
                color rgba(255, 255, 255, 0.5)
            }
        }
        .full-screen {
            height 60px
            width 60px
            background red
            position absolute
            color #fff
            top 0
            right 0
            z-index 9999999
        }
    }
</style>
