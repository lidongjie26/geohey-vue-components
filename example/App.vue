<template>
    <div id="app">
        <g-data-view :content="content"
            :ak="ak"
            :mapviz="mapviz"></g-data-view>
        <g-color-picker></g-color-picker>
        <g-color-picker hideAlpha></g-color-picker>
        <g-button @click="test1">message</g-button>
        <g-button @click="test2">alert</g-button>
        <g-button @click="test3">notify</g-button>
        <g-button size="small">small</g-button>
        <g-button size="normal">normal</g-button>
        <g-button size="large">large</g-button>
        <input v-model="value"/>
        <g-button size="large" @click="testBreaks">确定</g-button>
        <g-color-bar-picker v-model="colors1" @input="log" :breaks="breaks" type="alpha"></g-color-bar-picker>
        <div class="color-bar-list">
            <g-color-bar :colors="colors"></g-color-bar>
            <g-color-bar gradient :colors="colors"></g-color-bar>
        </div>
        <g-switch></g-switch>
        <g-logo></g-logo>
        <g-slider range v-model="arr" show-tooltip  :min="1" :max="40" :step="0.1"></g-slider>
    </div>
</template>
<script>
import * as G from '@'
import Vue from 'vue'

Vue.use( G );

export default {
    name: 'app',
    data() {
        return {
            // colors1: [ '#5182e4', '#ce62d6', '#9bcc66', '#8954d4', '#3fb27e' ],
            colors1: [ '#c00000', '#ffffff' ],
            colors: [ '#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5' ],
            arr: [ 10, 20 ],
            breaks: 5,
            value: 5,
            content: JSON.parse('{"paddingX":0,"paddingY":0,"gapSize":20,"height":1080,"width":1920,"itemMinWidth":40,"itemMinHeight":20,"normalBorderStyle":"2px solid transparent","activeBorderStyle":"2px solid skyblue","focusedIdx":-1,"isPreviewing":false,"scale":50,"items":[{"name":"基本饼图","type":"pie-normal","x":120,"y":500,"width":800,"height":498,"isFocused":false,"icon":"chart_2","idx":3,"fields":{"normal":[],"noText":[]},"filters":[],"choosedXFields":[],"choosedYFields":[],"aggregateTypes":[],"sortField":null,"sortType":null,"dataInfo":{"uid":0,"type":"public_data","name":""},"timestamp":"1541104622000 0.14226183145005056","expectNumber":0,"options":{"backgroundColor":"rgba( 0, 0, 0, 0 )","colors":["#006bc2","#e39230","#6fb1c4","#7ea1b4","#bac393","#80adc5"],"legend":{"show":false,"align":"left","type":"scroll","textStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"silent":true,"series":[{"name":"姓名","type":"pie","label":{"show":true,"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal","position":"outside","formatter":"{b}: {d}%"},"labelLine":{"show":true},"radius":["0%","75%"],"data":[{"name":"石家庄","value":88160,"itemStyle":{"color":"#006bc2"}},{"name":"大连","value":84341,"itemStyle":{"color":"#e39230"}},{"name":"济南","value":41398,"itemStyle":{"color":"#6fb1c4"}},{"name":"杭州","value":8034,"itemStyle":{"color":"#7ea1b4"}},{"name":"哈尔滨","value":48972,"itemStyle":{"color":"#bac393"}},{"name":"沈阳","value":44865,"itemStyle":{"color":"#80adc5"}}]}],"tooltip":{"show":false},"animation":false},"z":1003,"dragging":true},{"name":"正负条形图","type":"bar-negative","x":900,"y":140,"width":698,"height":812,"isFocused":false,"icon":"chart_2","idx":2,"fields":{"normal":[{"label":"城市","value":"城市","type":"text"},{"label":"常住人口","value":"常住人口","type":"integer"},{"label":"常住人口同比增速","value":"常住人口同比增速","type":"integer"},{"label":"城镇人口","value":"城镇人口","type":"double"},{"label":"城镇人口同比增速","value":"城镇人口同比增速","type":"integer"},{"label":"gdp","value":"gdp","type":"double"},{"label":"gdp增速","value":"gdp增速","type":"integer"},{"label":"城镇建设用地","value":"城镇建设用地","type":"double"},{"label":"城镇建设用地增速","value":"城镇建设用地增速","type":"integer"}],"noText":[{"label":"常住人口","value":"常住人口","type":"integer"},{"label":"常住人口同比增速","value":"常住人口同比增速","type":"integer"},{"label":"城镇人口","value":"城镇人口","type":"double"},{"label":"城镇人口同比增速","value":"城镇人口同比增速","type":"integer"},{"label":"gdp","value":"gdp","type":"double"},{"label":"gdp增速","value":"gdp增速","type":"integer"},{"label":"城镇建设用地","value":"城镇建设用地","type":"double"},{"label":"城镇建设用地增速","value":"城镇建设用地增速","type":"integer"}]},"filters":[],"choosedXFields":["城市"],"choosedYFields":["常住人口同比增速","城镇人口"],"aggregateTypes":["sum","sum"],"sortField":null,"sortType":null,"dataInfo":{"uid":"3e3922f97f75491fb4f86ab9836b37e9","type":"private","name":"城市特征"},"timestamp":"1541104597000 0.4049743955673091","expectNumber":0,"options":{"backgroundColor":"rgba( 0, 0, 0, 0 )","colors":["#a1cb80","#75b55e"],"grid":{"left":"10%","right":"10%","bottom":"60","top":"60","containLabel":false},"silent":true,"legend":{"show":false,"align":"left","type":"scroll","textStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"xAxis":{"show":true,"title":"","position":"bottom","type":"value","splitLine":{"show":false},"axisLabel":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"},"name":"","unit":"","nameTextStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"yAxis":{"show":true,"position":"left","splitLine":{"show":false},"axisTick":{"show":false},"axisLine":{"show":false},"axisLabel":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"},"data":["滁州","嘉兴","马鞍山","上海 ","镇江","盐城","台州 ","湖州","南京","铜陵","扬州","无锡","宁波","绍兴","常州","杭州","泰州","合肥","安庆","舟山","金华","苏州","宣城","池州","南通","芜湖"],"title":"","name":"","unit":"","nameTextStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"tooltip":{"show":false,"trigger":"axis","axisPointer":{"type":"shadow"}},"series":[{"type":"bar","label":{"normal":{"show":true,"position":"right","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"itemStyle":{"color":"#a1cb80"},"data":[3,1,3,1,2,3,3,2,1,1,1,2,3,3,3,2,3,1,2,2,1,1,2,1,2,2],"name":"常住人口同比增速"},{"type":"bar","label":{"normal":{"show":true,"position":"right","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"itemStyle":{"color":"#75b55e"},"data":[207.8609,207.8609,215.6597,215.6597,243.3219,93.6733,172.5349,92.0917,364.5134,177.2125,172.5349,207.8609,364.5134,171.091,92.0917,177.2125,145.4783,243.3219,364.5134,93.6733,132.9274,171.091,171.091,92.0917,132.9274,145.4783],"name":"城镇人口"}],"animation":false},"z":1002,"dragging":true},{"name":"基本柱图","type":"bar-normal","x":20,"y":20,"width":920,"height":420,"isFocused":false,"icon":"chart_2","idx":1,"fields":{"normal":[{"label":"城市","value":"城市","type":"text"},{"label":"常住人口","value":"常住人口","type":"integer"},{"label":"常住人口同比增速","value":"常住人口同比增速","type":"integer"},{"label":"城镇人口","value":"城镇人口","type":"double"},{"label":"城镇人口同比增速","value":"城镇人口同比增速","type":"integer"},{"label":"gdp","value":"gdp","type":"double"},{"label":"gdp增速","value":"gdp增速","type":"integer"},{"label":"城镇建设用地","value":"城镇建设用地","type":"double"},{"label":"城镇建设用地增速","value":"城镇建设用地增速","type":"integer"}],"noText":[{"label":"常住人口","value":"常住人口","type":"integer"},{"label":"常住人口同比增速","value":"常住人口同比增速","type":"integer"},{"label":"城镇人口","value":"城镇人口","type":"double"},{"label":"城镇人口同比增速","value":"城镇人口同比增速","type":"integer"},{"label":"gdp","value":"gdp","type":"double"},{"label":"gdp增速","value":"gdp增速","type":"integer"},{"label":"城镇建设用地","value":"城镇建设用地","type":"double"},{"label":"城镇建设用地增速","value":"城镇建设用地增速","type":"integer"}]},"filters":[],"choosedXFields":["城市"],"choosedYFields":["城市","常住人口同比增速","城镇人口同比增速"],"aggregateTypes":["count","sum","sum"],"sortField":null,"sortType":null,"dataInfo":{"uid":"3e3922f97f75491fb4f86ab9836b37e9","type":"private","name":"城市特征"},"timestamp":"1541653957000 0.9319528994769055","expectNumber":0,"options":{"backgroundColor":"rgba( 0, 0, 0, 0 )","colors":["#5182e4","#9358a8","#d42d6b"],"grid":{"left":"10%","right":"10%","bottom":"60","top":"60","containLabel":false},"legend":{"show":false,"type":"scroll","align":"left","textStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"silent":true,"xAxis":{"show":true,"position":"bottom","data":["滁州","嘉兴","马鞍山","上海 ","镇江","盐城","台州 ","湖州","南京","铜陵","扬州","无锡","宁波","绍兴","常州","杭州","泰州","合肥","安庆","舟山","金华","苏州","宣城","池州","南通","芜湖"],"splitLine":{"show":false},"axisLabel":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal","rotate":0},"title":"","name":"","unit":"","interval":0,"nameTextStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"yAxis":{"title":"","name":"","unit":"","show":true,"position":"left","splitLine":{"show":false},"axisTick":{"show":false},"axisLine":{"show":false},"axisLabel":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"},"nameTextStyle":{"color":"rgba(255, 255, 255, 1)","fontFamily":"Microsoft YaHei","fontSize":12,"fontWeight":"normal"}},"dataZoom":[{"type":"inside"}],"tooltip":{"show":false,"trigger":"axis","axisPointer":{"type":"shadow"}},"series":[{"type":"bar","data":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"large":true,"itemStyle":{"color":"#5182e4"},"largeThreshold":100,"name":"城市"},{"type":"bar","data":[3,1,3,1,2,3,3,2,1,1,1,2,3,3,3,2,3,1,2,2,1,1,2,1,2,2],"large":true,"itemStyle":{"color":"#9358a8"},"largeThreshold":100,"name":"常住人口同比增速"},{"type":"bar","data":[3,1,3,1,2,3,3,2,1,1,1,2,3,3,3,2,3,1,2,2,1,1,2,1,2,2],"large":true,"itemStyle":{"color":"#d42d6b"},"largeThreshold":100,"name":"城镇人口同比增速"}],"animation":false},"z":1001,"dragging":false},{"name":"图片","type":"bg2","x":0,"y":0,"width":1920,"height":1080,"isFocused":false,"icon":"decoration_2","idx":0,"fields":{"normal":[],"noText":[]},"choosedFields":["",""],"dataInfo":{"uid":0,"type":"public_data","name":""},"expectNumber":0,"options":{"imageURL":"/apps/data-view/img/bg2.0012637.png"},"z":1000}],"lastIdx":3,"highestLevel":1003,"lowestLevel":1000}'),
      ak: 'MjNiYTRkYjg1NzRhNGUyMmE4NWIxYzY4ZTc1MzE4MzQ',
      mapviz: {tileHost:null,cluster:null}
        }
    },
    watch: {
        // colors1: {
        //     deep: true,
        //     handler( val ) {
        //         console.log( val )
        //     }
        // }
    },
    methods: {
        log() {
            console.log( 'change' )
        },
        test1 () {
            this.$message( '1dasdsadasd' )
        },
        test2 () {
            this.$alert( '内容', '标题' )
        },
        test3 () {
            this.$notify( {
              title: '标题名称',
              message: '内容内容内容'
            } );
        },
        testBreaks (){
            this.breaks = Number( this.value );
        }
    }
}
</script>
<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.color-bar-list {
    width: 300px;
}
</style>
