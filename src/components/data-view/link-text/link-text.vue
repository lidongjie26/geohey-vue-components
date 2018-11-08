<template>
    <div class="link-text-wrapper">
        <div class='text-content'
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
            }"
            @click="openPopContent"
        >
        {{ optionsWithData.text }}
        </div>
        <div class="popup-content jimu-show" v-show = "optionsWithData.isOpen " ref = "popup"
            v-if = "optionsWithData.mode !== 'full'"
            :style="{
                width: `${ optionsWithData.popupWidth }px`,
                height: `${ optionsWithData.popupHeight }px`,
                marginTop: `${ -(height + 20 + optionsWithData.offsetY + optionsWithData.popupHeight) }px`,
                marginLeft: `${ optionsWithData.offsetX }px`,
                backgroundColor: `${ optionsWithData.popupColor }px`,
            }"
        >
            <iframe
                :width = "optionsWithData.popupWidth"
                :height = "optionsWithData.popupHeight"
                :style="{
                    border: `${ popupBorderStyle }`,
                    boxShadow: `${ popupShadowStyle}`,
                    boxSizing: 'content-box',
                }"
                frameborder = 0
                scrolling = "no"
                :src = "optionsWithData.linkUrl"
            >
            </iframe>
            <div class="popup-tip-container" v-if = "optionsWithData.mode !== 'full'">
                <div class="popup-tip"
                    :style="{
                        backgroundColor: `${ this.optionsWithData.borderColor }`,
                        boxShadow: `${ popupTipShadowStyle}`,
                    }"
                >
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>

import { eventBus } from '@/event-bus'

export default {
    name: 'link-text',
    props: ['optionsWithData', 'width', 'height', 'isPreviewing', 'type', 'idx'],
    data() {
        return {
            
        }
    },
    created(){
        if(this.isPreviewing){
            this.optionsWithData.isOpen = false
        }
    },

    watch:{
        'optionsWithData.mode': {
            deep: true,
            handler( val ){
                
            }
        },
    },
    computed:{
        popupBorderStyle() {
            return this.optionsWithData.borderWidth + 'px ' + 'solid ' + this.optionsWithData.borderColor
        },

        popupShadowStyle() {
            return '0px 0px 10px ' + this.optionsWithData.shadowColor
        },

        popupTipShadowStyle() {
            return '0 3px 14px ' + this.optionsWithData.shadowColor;
        },
    },

    methods: {
        openPopContent: function(){
            if(this.optionsWithData.mode === 'popup'){
                this.$nextTick(()=>{
                    this.addBodyCLick()
                })
                if(this.isPreviewing){
                    this.optionsWithData.isOpen = true
                    return 
                }
                this.$store.commit('updateLayerOptions', { field: ['isOpen'], val: true })
            }else{
                this.optionsWithData.viewWidth = this.optionsWithData.popupWidth
                this.optionsWithData.viewHeight = this.optionsWithData.popupHeight
                eventBus.$emit('full-screen-show', {
                    idx: this.idx,
                    type: 'web-page',
                    showType: 'auto',
                    width: this.optionsWithData.popupWidth,
                    height: this.optionsWithData.popupHeight,
                    optionsWithData: this.optionsWithData,
                })
            }

        },

        addBodyCLick: function(){
			document.body.addEventListener('click', this.closePoup);
        },
        
		removeBodyClick: function(){
			document.body.removeEventListener('click', this.closePoup);
        },
        
        closePoup: function(){
            if(this.isPreviewing){
                this.optionsWithData.isOpen = false
            }else{
                this.$store.commit('updateLayerOptions', { field: ['isOpen'], val: false })
            }
            
            this.removeBodyClick()
        }
        
    }

}
</script>

<style lang="scss">
.link-text-wrapper {
    .text-content{
        cursor: pointer;
    }
    .fix-center{
        background-color: aqua;
        position:absolute;
        top: 50%;
        left:50%;
    }
    .popup-content{
        .popup-tip-container{
            width: 40px;
            height: 20px;
            position: absolute;
            left: 50%;
            margin-left: -20px;
            margin-top: -5px;
            overflow: hidden;
            pointer-events: none;
            .popup-tip{
                background: white;
                color: #333;
                box-shadow: 0 3px 14px rgba(0,0,0,0.4);
                width: 17px;
                height: 17px;
                padding: 1px;
                margin: -10px auto 0;
                transform: rotate(45deg);
            }
        }
    }
}
@keyframes fadeIn {
    0% { 
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fadeOut {
    0% { 
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.jimu-show {
    -webkit-animation: fadeIn .5s;
    animation: fadeIn .5s;	
}
.jimu-hide {
    -webkit-animation: fadeOut .5s;
    animation: fadeOut .5s;	
}
</style>