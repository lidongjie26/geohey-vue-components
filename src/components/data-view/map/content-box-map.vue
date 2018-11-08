<template>
    <div class="content-box-map">
        <div class="content-box-header" v-show="headerShow">
            <div class="content-box-header-actions">
                <svg class="icon" aria-hidden="true" @click="refresh">
                    <use xlink:href="#icon-refresh"></use>
                </svg> 
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pen"></use>
                </svg> 
               
            </div>
        </div>
         <div class="content-box-map-wrapper">
            <div v-if="isLoading" class="content-box-map-content-hint">
                <span>
                     <svg class="icon icon-pulse icon-spin" aria-hidden="true">
                        <use xlink:href="#icon-loading"></use>
                    </svg> loading...
                </span>
            </div>
            <div class="content-box-map-container" ref="container">
                <g-map ref="map" 
                    @on-load="onLoad"
                    :uid="options.uid" 
                    :ak="ak"
                    :option="mapviz"
                    :status="status"
                    :linkage = "options.linkage"
                    :linkageField = "options.linkageField"
                    :isPreviewing = "isPreviewing"
                    :showBaseMap="options.showBaseMap"
                    @view-change="onViewChange"
                    @update-base-map-color="updateBaseMapColor"
                    @update-field-list = "updateFieldList"
                    :style="mapStyle"
                    v-bind:class="{ 'dark-map-style': isDarkStyle }"></g-map>
            </div>
        </div>
        

    </div>
   
</template>

<script>
import GMap from './g-map'
import { eventBus } from '@/event-bus'

export default {

    name: 'content-box-map',
    props: {
        options: {},
        idx: Number,
        height: Number,
        width: Number,
        dragging: Boolean,
        scale: Number,
        isPreviewing: Boolean,
        ak: String,
        mapviz: Object,
        focusedIdx: {
            type: Number,
            default: -1
        }
    },
    data () {
        return {
            val: '',
            state: 'loading',
            titleEditing: false,
            isLoading: true,
            isDarkStyle: this.options.theme === 'dark'
        }
    },
    watch:{
        height(){
            this.resize();
        },
        width(){
            this.resize();
        },
        scale(){
            this.resize();
        },
        'options.showBaseMap': {
            deep: true,
            handler( val ){
                if( val ){
                    if( this.$refs.map.baseMapLayer ){
                        this.$refs.map.baseMapLayer.addTo( this.$refs.map.map );
                        this.$refs.map.baseMapLayer.bringToBottom();
                    }
                    
                    this.$refs.map.baseMapColor = this.options.baseMapColor;
                    
                }else{
                    this.$refs.map.baseMapColor = 'rgba(0,0,0,0)'    
                    if( this.$refs.map.baseMapLayer ) this.$refs.map.baseMapLayer.remove();

                }
            }
        },
        'options.showLayerList': {
            deep: true,
            handler( val ){
                if( val ){
                    
                }else{

                }
            }
        },
        'options.theme': {
            deep: true,
            handler( val ){
                let classVal = this.$refs.map.$el.getAttribute("class");
                if(val === 'dark'){
                    if(classVal.indexOf("dark-map-style") < 0){
                        classVal = classVal.concat(" dark-map-style");
                    }
                }else{
                    classVal = classVal.replace("dark-map-style","");
                }
                this.$refs.map.$el.setAttribute("class",classVal );
            }
        },
    },
    computed: {

        status: function(){
            if( this.options && this.options.center && this.options.res ){

                return {
                    center: this.options.center,
                    res: this.options.res,
                    rotate: this.options.rotate 
                }
            }

            return null
        },
        headerShow: function(){

            if( this.isPreviewing ) return false;

            if( this.focusedIdx === this.idx ) return true;

            return false;
        },
        mapStyle: function(){
            return {
                zoom: this.isPreviewing ? 'normal' : 100 / this.scale
            }
        },
    },
    methods: {
        resize () {

            this.$refs.map.resize();
        },
        refresh () {
            // this.isLoading = true;
            this.$refs.map.refresh();
        },
        getThumb () {
            return new Promise( (resolve, reject) => {
                const thumb = this.$refs.map.print();
                const img = new Image();
                img.src = thumb;

                img.onload = () => {
                    const canvas = document.createElement( 'canvas' );
                    canvas.width = img.width;  
                    canvas.height = img.height;  
                    canvas.getContext('2d').drawImage(img, 0, 0); 

                    resolve( canvas );
                }

                img.onerror = err => {
                    reject( err );
                }
            } )
        },
        onLoad () {
            this.isLoading = false;
        },
        onMouseDown () {
            this.$emit( 'change-draggable', true );
            window.addEventListener( 'mouseup', this.onMouseUp, false );
        },
        onMouseUp () {
            this.$emit( 'change-draggable', false );
            window.removeEventListener( 'mouseup', this.onMouseUp, false );
        },
        onViewChange ( event ) {
            if(this.options.linkage){
                eventBus.$emit('view-change', event)
            }
            if( !this.isPreviewing ){
                this.$store.commit('updateLayerOptions', { field:['res'],val:event.res, idx: this.idx});
                this.$store.commit('updateLayerOptions', { field:['center'],val:event.center, idx: this.idx});
                this.$store.commit('updateLayerOptions', { field:['rotate'],val:event.rotate, idx: this.idx});
            }
            
        },
        updateBaseMapColor( val ){
            if( !this.isPreviewing ){
                this.$store.commit('updateLayerOptions', { field:[ 'baseMapColor' ], val, idx: this.idx});
            }
            
        },

        updateFieldList(val) {
            if( !this.isPreviewing ){
                this.$store.commit('updateLayerOptions', { field:[ 'fieldList' ], val:val});
            }
            
        },
    },
    components: {
        GMap
    }
}
</script>

<style lang="scss">

$darkBgColor: rgba(0, 0, 0, 0.8);
$darkColor: #fff;
$darkBorder: 1px solid #3a3a3a;;
.content-box-map{
    width: 100%;
    height: 100%;

    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }

   .content-box-header {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 46px;
        line-height: 46px;
        padding: 0;
        font-size: 13px;
        cursor: move;
        color: #fff;    

        .content-box-header-actions {
            float: right;
            line-height: 46px;
            padding: 0 16px;
            font-size: 14px;

            > svg {
                transition: opacity .2s;
               
                margin-left: 4px;
                cursor: pointer;

                &.active {
                    display: inline-block;
                }
            }

        }
    }

    .content-box-map-wrapper {
        width: 100%;
        height: 100%;
        transition: box-shadow .3s ease-in-out;
        padding: 40px;

        &:hover {
            .content-box-map-header .content-box-map-header-actions {
                display: block;
            }
        }

        .insight-loader {
            left: 12px;
            right: 12px;
        }

        .content-box-map-container {
            width: 100%;
            height: 100%;
        }

        .content-box-map-content-hint {
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1000;
            margin-top: -30px;
            margin-left: -50px;
            font-size: 12px;
        }
    }
    .dark-map-style{
        .g-container .g-map-frame{
            .result{
                .arrow{
                    &::before{
                        border-top: 10px solid rgba(0,0,0,0.6);
                    }
                    &::after{
                        border-top: 10px solid rgba(0,0,0,0.6);
                    }
                }
                .result-container{
                    background-color: rgba(0,0,0,0.8);
                    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                }
                .result-title{
                    color: #fff;
                    border-bottom: 1px solid #fff;
                }
                .title-close{
                    background-color: #000;
                    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                }
                .result-content{
                    .result-key{
                        color: #fff;
                    }
                    .result-val{
                        color: #fff;
                    }
                }
            }

            .g-layers-frame{
                .g-utf-board{
                    background-color: rgba(0,0,0,0.8);
                    color: #fff;
                    .g-utf-board-key{
                        color: #d4d4d4;
                    }
                }
            }
        }
        .g-container .g-panel-frame{
            .g-control{
                .g-control-zoom{
                    border: $darkBorder;
                    background: rgba(0, 0, 0, 0);
                    .g-control-zoom-button{
                        border: $darkBorder;
                        background: $darkBgColor;
                        .g-icon-zoom-in{
                            background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAgMjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CiAgPHBhdGggc3R5bGU9J2ZpbGw6I2ZmZmZmZjsnIGQ9J00gMTAgNiBDIDkuNDQ2IDYgOSA2LjQ0NTk5MDQgOSA3IEwgOSA5IEwgNyA5IEMgNi40NDYgOSA2IDkuNDQ2IDYgMTAgQyA2IDEwLjU1NCA2LjQ0NiAxMSA3IDExIEwgOSAxMSBMIDkgMTMgQyA5IDEzLjU1NDAxIDkuNDQ2IDE0IDEwIDE0IEMgMTAuNTU0IDE0IDExIDEzLjU1NDAxIDExIDEzIEwgMTEgMTEgTCAxMyAxMSBDIDEzLjU1NCAxMSAxNCAxMC41NTQgMTQgMTAgQyAxNCA5LjQ0NiAxMy41NTQgOSAxMyA5IEwgMTEgOSBMIDExIDcgQyAxMSA2LjQ0NTk5MDQgMTAuNTU0IDYgMTAgNiB6JyAvPgo8L3N2Zz4K)
                        }
                        .g-icon-zoom-out{
                            background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAgMjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CiAgPHBhdGggc3R5bGU9J2ZpbGw6I2ZmZmZmZjsnIGQ9J20gNyw5IGMgLTAuNTU0LDAgLTEsMC40NDYgLTEsMSAwLDAuNTU0IDAuNDQ2LDEgMSwxIGwgNiwwIGMgMC41NTQsMCAxLC0wLjQ0NiAxLC0xIDAsLTAuNTU0IC0wLjQ0NiwtMSAtMSwtMSB6JyAvPgo8L3N2Zz4K)
                        }
                    }
                    .g-control-geolocation{
                        border: $darkBorder;
                        background: $darkBgColor;
                    }
                }
                .g-control-layers{
                        border: $darkBorder;
                        background: $darkBgColor;
                        color: $darkColor;
                    .g-layer-header .g-layer-button{
                        background: rgba(0, 0, 0, 0);
                    }
                    .g-switch-wrap{
                        background: rgba(0, 0, 0, 0);
                    }
                    .g-switch.g-switch-off{
                        background: #565656;
                    }
                }
            }
            .g-legend .g-legend-wrapper {
                border: $darkBorder;
                .g-legend-container{
                    background: $darkBgColor;
                    color: $darkColor;
                    .g-legend-container-list .g-legend-layer .g-legend-tilte-container .g-legend-title{
                        color: $darkColor !important;
                    }
                }
                .g-legend-button{
                    background: $darkBgColor;
                    color: $darkColor;
                }
            }
        }

        .g-map-clear{
            background: $darkBgColor;
            color: $darkColor;
            border: 2px solid #3a3a3a;
            &:hover{
                background: rgba(0,0,0,0.8);
            }
        }
    }
}

    
</style>