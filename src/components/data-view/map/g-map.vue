<template>
    <div class="g-map-wrapper">
        <div class = "g-map" ref = "map"
        :style="mapStyle"></div>
        <div class = "g-map-clear" v-if = "showClear" @click = "clearMapHandle">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-custom-clear"></use>
            </svg>
        </div>
        <div id="result" class="result" ref="queryResult" v-show="showResult">
            <div class="result-container" >
                <div class="result-title">
                    <div class="title-content">属性信息</div>
                    <div id="closeButton" class="title-close">
                       <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>

                <div class="result-content">
                    <div class="hide-scroll">

                        <div v-for="(result, idx) in queryResults" :key="idx" class="result-list">
                            <div class="result-key">{{result.key}}</div>
                            <div class="result-val">{{result.val}}</div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="arrow"></div>
        </div>
    </div>
    
</template>

<script>
import 'geohey-javascript-sdk/dist/lib/g.css'
import G from 'geohey-javascript-sdk'
import 'geohey-javascript-sdk/dist/lib/g-canvas.min.js'
import 'geohey-javascript-sdk/dist/lib/g-maps.min.js'
import 'geohey-javascript-sdk/dist/lib/g-heat.min.js'
import 'geohey-javascript-sdk/dist/lib/g-fluid.min.js'
import 'geohey-javascript-sdk/dist/lib/g-mapviz.min.js'
import API from '@/API'
import { eventBus } from '@/event-bus'
const generateMap = ( container, center = [ 0, 0 ], res = 19567.879241 ) => {

    const map = new G.Map( container, {
        minRes: 0.298582,
        maxRes: 19567.879241,
        zoomAnim: true,
        panAnim: true,
        hideLogo: true,
        recordStatus: false,
        wrap: true,
        continuouslyZoom: false,
        canvasExpandFactor: 0.25,
        scrollZoom: false,
        initStatus: {
            center, 
            res, 
            rotate: 0, 
            pitch: 0 
        },
    } );

    return map;
}

export default {
    props: {
        uid: String,
        ak: String,
        status: Object,
        showBaseMap: Boolean,
        linkage: Boolean, //是否地图联动
        linkageField: String,
        isPreviewing: Boolean,
        option: {
            type: Object,
            default () {
                return {};
            }
        }
    },

    created(){
        this.subscribe()
    },
    mounted () {
        if ( this.map ) return;

        this.$nextTick( () => {

            this.refresh();

        } )

    },
    computed:{
        mapStyle: function(){
            return {
                background: this.baseMapColor
            }
        }
    },
    watch:{
        uid: function(){
            if( this.uid ){
                this.refresh();
            }
        }
    },
    data () {
        return {
            map: null,
            baseMapLayer: null,
            dataLayers: [],
            baseMapColor: 'rgb(0,0,0,0)',
            mapStatus: this.status,
            waiting: false,
            highLayer: null,
            defaultGraphics:'',
            defaultHtmlLayer:'',
            htmlLayerMark:'',
            queryResults:[],
            showResult: false,
            fieldList: [],
            showClear: false,
        }
    },
    methods: {

        /* 订阅事件 */
        subscribe () {

            eventBus.$on('view-change', (view) => {
                if(!this.linkage){
                    return
                }
                if(this.mapStatus.res === view.res && this.mapStatus.center[0] === view.center[0] && this.mapStatus.center[1] === view.center[1]){
                    return
                }else{
                    if(this.map){
                        this.map.zoomRes(view.center, view.res)
                    }
                    
                }
            })

        },

        print () {
            return this.map.print();
        },
        resize () {
            this.map.resize();
            if( !this.isPreviewing ){
                this.$refs.map.children[0].children[0].children[0].style.marginLeft = '-' + this.map._canvasOffset[0] + 'px';
                this.$refs.map.children[0].children[0].children[0].style.marginTop = '-' + this.map._canvasOffset[1] + 'px';
                this.$refs.map.children[0].children[0].children[0].style.transform = 'translate3d(0px,0px,0px)';

            }
        },
        refresh () {
            G.MapViz.get( this.uid, {
                host: `//${ document.domain }`,
                ak: this.ak,
                tileHost: this.option.tileHost,
                cluster: this.option.cluster
            }, null, result => {
                this.$emit( 'on-load' );

                if ( this.map ) {
                    this.map.destroy();
                }

                const center = this.status ? this.status.center : result.mapData.center;
                const res = this.status ? this.status.res : result.mapData.resolution;
                this.map = generateMap( this.$refs.map, center, res );

                const map = this.map;

                if( this.showBaseMap ) this.baseMapColor = result.mapData.backgroundColor;

                this.$emit('update-base-map-color', result.mapData.backgroundColor );
                
                this.baseMapLayer = result.baseLayer;
                const layerList = result.layerList;
                
                if( result.mapData.uid  === 'colorMap'){
                    this.baseMapLayer = new G.Layer.Tile(null, {
                        cluster: ['a', 'b', 'c'],
                        filter: 'dark'
                    });
                }
                if( this.showBaseMap ){
                     map.addLayer( this.baseMapLayer )
                }
                this.fieldList = []
                layerList.map( item => {
                    const layer = item.layer;
                    map.addLayer( layer );
                    // 获取图层字段
                    item.fields.forEach((field)=>{
                        this.fieldList.push(field)
                    })
                    if ( item.animated ) {
                        const timelineControl = new G.Control.Timeline();
                        map.addControl( timelineControl );
                        timelineControl.setLayer( layer )
                    }

                    if ( item.utfGridLayer ) {
                        item.utfGridLayer.options.showAttr = this.isPreviewing
                        map.addLayer( item.utfGridLayer );

                        const utfFields = item.vizData.utfFields;
                        const gridLayer = item.utfGridLayer;
                        gridLayer.addListener('gridMouseMove',(e) => {
                            if(!this.isPreviewing){
                                return
                            }
                            if(e.data && (this.linkageField || this.linkageField===0)){
                                eventBus.$bus.$emit('district-changed',e.data[this.linkageField], false)
                            }
                            if(!e.data){
                                gridLayer._board.style.display = 'none';
                            }else{
                                let html = '';
                                for(let key in e.data){
                                    if( key === '_id' ) continue;   // 不显示_id字段

                                    let alias = key;
                                    let val = e.data[key];
                                    if( utfFields ){
                                        for( let i=0;i< utfFields.length;i++ ){
                                            if( utfFields[i].name === key){

                                                alias = utfFields[i].alias;

                                                if( utfFields[i].digital || utfFields[i].digital === 0 ){
                                                    val = e.data[key].toFixed(utfFields[i].digital);
                                                }
                                                break;
                                            }
                                        }
                                    }

                                    html += '<div><span class="g-utf-board-key">' + alias + ': </span><span>' + val + '</span></div>'
                                    // break
                                }

                                gridLayer._board.innerHTML = html;
                                gridLayer._board.style.display = 'block';
                                gridLayer._board.style.backgroundColor = '#fff';
                            }
                        })
                    }
                } )

                this.defaultGraphics = new G.Layer.Graphic();
                this.defaultHtmlLayer = new G.Layer.Html();
                this.defaultGraphics.addTo(map);
                this.defaultHtmlLayer.addTo(map);
                this.$emit('update-field-list', this.fieldList );
                map.addControl( new G.Control.Zoom() );
                this.highLayer = new G.Layer.Graphic() 
                map.addLayer( this.highLayer );
                map.bind( 'viewChanged', event => {
                    this.mapStatus = event.to
                    this.$emit( 'view-change', event.to );   
                } )

                //绑定地图点击事件
                map.bind('click', (event) => {
                    if (!this.waiting && this.isPreviewing) {
                        this.query(event, layerList);
                    }
                });

                // map.resize();

                if ( this.status ) {
                    map.zoomRes( this.status.center, this.status.res );
                } else {
                    map.zoomRes( result.mapData.center, result.mapData.resolution );
                }

                map.resize();

                const PLUGIN = {
                    GEO_LOCATION: 'geo-location',
                    LAYER_LIST: 'layer-list',
                    LEGEND: 'legend',
                    LOGO: 'logo',
                    PLUGIN: 'scale'
                }

                const plugin = ( result.vizData.setting && result.vizData.setting.plugin ) ? result.vizData.setting.plugin : [];

                map._hideLogo();

                plugin.map( item => {
                    if ( item === PLUGIN.LAYER_LIST ) {

                        const layersControl = new G.Control.Layers({
                            exclude: [ result.baseLayer, this.defaultGraphics, this.defaultHtmlLayer, this.highLayer ]
                        });
                        map.addControl( layersControl );

                        //纯色地图增加底图在图层列表上隐藏
                        if( result.mapData.uid === 'colorMap'){
                            const layerLegendList = document.getElementsByClassName('g-control-layers-item');
                            layerLegendList[ layerLegendList.length -1 ].style.display = 'none';
                        }
                        

                    } else if ( item === PLUGIN.GEO_LOCATION ) {

                        // TODO

                    } else if ( item === PLUGIN.LEGEND ) {

                        const legend = new G.Legend();
                        map.addLegend( legend );

                    } else if ( item === PLUGIN.LOGO ) {

                        map._hideLogo();

                    }else if( item === PLUGIN.SCALE ) {

                        let scaleControl = new G.Control.Scale();
                        this.map.addControl( scaleControl );
                        
                    }
                } )

                this.$emit( 'updateOption');

                if( !this.isPreviewing ){
                    this.$refs.map.children[0].children[0].children[0].style.marginLeft = '-' + this.map._canvasOffset[0] + 'px';
                    this.$refs.map.children[0].children[0].children[0].style.marginTop = '-' + this.map._canvasOffset[1] + 'px';
                    this.$refs.map.children[0].children[0].children[0].style.transform = 'translate3d(0px,0px,0px)';

                }
                
            } );
        }, 
        getDataURL () {
            return this.map.print();
        },

        /* 点击地图查询 */
        query(e, layerList) {
            let dataList  = layerList.map((layer) => {
                return {
                    uid: layer.dataUid,
                    type: layer.dataType
                }
            })
            dataList = dataList.reverse()
            let map = this.map;
            let ld = map.toMap([e.screenX - 4, e.screenY + 4]);
            let ru = map.toMap([e.screenX + 4, e.screenY - 4]);
            let rect = [ld[0], ld[1], ru[0], ru[1]];
            let params = {
                geometry: JSON.stringify(rect),
                dataList: JSON.stringify(dataList),
                ak: this.ak
            }
            this.waiting = true;
            eventBus.$bus.$emit('showLoading', true)
            API.dataviz.identify(params).then((result) => {
                this.waiting = false
                eventBus.$bus.$emit('showLoading', false)
                if(result.data.code === 0 && result.data.data && result.data.data.length > 0 && result.data.data[0].featureSet){
                    let featureSet = result.data.data[0].featureSet
                    this.showQueryAttr(featureSet.features[0].attrs, e)
                    this.drawResult(featureSet)
                    
                }else{
                    this.highLayer.clear()
                    this.closeQueryPanel()
                }       
            })
        },

        /* 绘制查询结果 */
        drawResult(featureSet) {
            this.highLayer.clear();
            this.highLayer.bringToTop();
            let geometryType = featureSet.geometryType
            let highlightStyle = {
                polygon: {fillColor: '#000', fillOpacity: 0, outlineColor: '#fff'},
                polyline:{lineColor: '#000', lineOpacity: 0.8},
                point1: {
                    shape: 'circle',
                    fillOpacity: 0
                },
                point2: null,

            }
            switch(geometryType){
                case 'Point':
                    let point = featureSet.features[0].geom;
                    graphic = new G.Graphic.Point(point,null,highlightStyle.point1);
                    graphic.addTo(this.highLayer);
                    break;

                case 'MultiPoint':
                    for (let j = 0; j <featureSet.features[0].geom.m.length; j++){
                        let point = featureSet.features[0].geom.m[j];
                        graphic = new G.Graphic.Point(point,null,highlightStyle.point1);
                        graphic.addTo(this.highLayer);
                    }
                    break;

                case 'Polygon':
                    let feature = featureSet.features[0].geom.m;
                    let graphic = new G.Graphic.Polygon(feature,null,highlightStyle.polygon);
                    graphic.addTo(this.highLayer);
                    break;

                case 'MultiPolygon':
                    for (let i = 0; i < featureSet.features[0].geom.m.length; i++){
                        let feature = featureSet.features[0].geom.m[i];
                        let graphic = new G.Graphic.Polygon(feature,null,highlightStyle.polygon);
                        graphic.addTo(this.highLayer);
                    }
                    break;

                case 'Polyline':
                    let polyline = featureSet.features[0].geom;
                    graphic = new G.Graphic.Polyline(polyline,null,highlightStyle.polyline);
                    graphic.addTo(this.highLayer);
                    break;

                case 'MultiPolyline':
                    for (let j = 0; j < featureSet.features[0].geom.m.length; j++){
                        let polyline = featureSet.features[0].geom.m[j];
                        graphic = new G.Graphic.Polyline(polyline,null,highlightStyle.polyline);
                        graphic.addTo(this.highLayer);
                    }

                    break;
            }
            // 点类型数据进行缩放
            if(geometryType === "Point" || geometryType === "MultiPoint"){
                return
            }
            this.showClear = true
            this.toHighLayerExtent()
        },

        showQueryAttr: function(element, event){
            let self = this;
            let arr = [];
            let keys = Object.keys(element).sort();
            let val = '';

            for(var key of keys){
                let alias = this.turnField2Alias(key)
                if(!alias && alias!==0){
                    continue
                }
                val = element[key];

                if(!val){
                    continue;
                }

                arr.push(
                    {key:alias, val: element[key]}
                )

            }

            this.queryResults = arr;
            this.closeQueryPanel();
            this.showResult = true;

            this.$nextTick(() => {
                let result = this.getDomString();
                this.htmlLayerMark = this.defaultHtmlLayer.addHtml(result, event.mapX, event.mapY);

                let closeButton = document.getElementById('closeButton');

                closeButton.onmousedown = () => {
                    this.closeQueryPanel();
                };

                let resultDom = document.getElementById('result');

                let option = this.isMobel ? 'touchend' : 'mousedown';

                resultDom.addEventListener(option, (e) => {
                    e.stopPropagation();
                });

                // let wheelEvent = (/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll": "mousewheel";
                // console.log(wheelEvent);
                resultDom.addEventListener('mousewheel', (e) => {
                    e.stopPropagation();
                })

            });
        },

        toHighLayerExtent() {
            let extent = this.highLayer.calcDataExtent()
            this.map.zoomExtent(extent)
        },

        closeQueryPanel: function(){
            this.defaultHtmlLayer.removeHtml(this.htmlLayerMark);
            this.htmlLayerMark = '';
            this.showResult = false;
            this.defaultGraphics.clear();
        },

        getDomString() {
            let dom = this.$refs.queryResult;

            let tmpNode = document.createElement( "div" );
            tmpNode.appendChild( dom );
            var str = tmpNode.innerHTML;
            tmpNode = null;

            return str;
        },

        turnField2Alias(key) {
            for(let i = 0; i < this.fieldList.length; i++){
                let field = this.fieldList[i]
                if(key === field.name && field.visible){
                    return field.alias
                }
            }
            return null
        },

        clearMapHandle() {
            this.highLayer.clear()
            this.closeQueryPanel()
            this.showClear = false
        }
    }
}

</script>

<style lang="scss">

@import '~@/assets/styles/common';

.g-map-wrapper{
    width: 100%;
    height: 100%;

   .result {
        position: absolute;
        height: 196px;
        bottom: 0;
        left: -130px;

        .arrow{
            height: 10px;

            &::before{
                content:"";
                display: block;
                position: absolute;
                right: 125px;
                bottom: 0px;
                width: 0;
                height: 0;
                border-radius: 2px;
                border-right: 8px solid transparent;
                border-left: 8px solid transparent;
                border-top: 10px solid #ababab;
            }

            &::after{
                content:"";
                display: block;
                position: absolute;
                right: 125px;
                bottom: 1px;
                width: 0;
                height: 0;
                border-radius: 2px;
                border-right: 8px solid transparent;
                border-left: 8px solid transparent;
                border-top: 10px solid  #fff;
            }
        }
    }
    .g-map-clear{
        height: 33px;
        width: 33px;
        position: absolute;
        right: 50px;
        top: 123px;
        border: 1px solid #ddd;
        cursor: pointer;
        border-radius: 4px;
        background: white;
        font-size: 18px;
        font-weight: 900;
        text-align: center;
        line-height: 32px;
        box-sizing: border-box;
        &:hover{
            background: #efefef;
        }
    }
    .result-container{
        width: 260px;
        height: 186px;
        padding: 3px 20px 0 20px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        border-radius: 10px;

        .result-title{
            width: 100%;
            height: 36px;
            line-height: 24px;
            padding: 6px 12px;
            font-weight: 400;
            font-size:14px;
            border-bottom: 1px solid #ddd;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;

            .title-content{
                font-size: 12px;
                float: left;
            }

            .title-close{
                float: right;
                cursor: pointer;
                position: absolute;
                right: -9px;
                top: -9px;
                height: 25px;
                width: 25px;
                background-color: #fff;
                border-radius: 50%;
                text-align: center;
                box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
                
            }
        }

        .result-content{
            width: 100%;
            height: 150px;
            font-size: 12px;

            .hide-scroll{
                // width: 100%;
                height: 100%;
                overflow-y: scroll;
                margin-right: -36px;
            }

            .result-list{
                overflow: hidden;
                padding: 8px 12px
            }

            .result-key{
                color: #8a9194;
                padding-right: 3px;
                overflow: hidden;
                word-wrap: break-word;
                @include text-overflow;
            }

            .result-val{
                text-align: left;
                font-weight: 500;
                color: $dark;
                word-wrap: break-word;
                overflow: hidden;
                @include text-overflow;
            }
        }
    }
    .g-map {
        width: 100%;
        height: 100%;
        .g-switch-button{
            width: 10px !important;
            height: 10px !important;
        }
    }
}



</style>
