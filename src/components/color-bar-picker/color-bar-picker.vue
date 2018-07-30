<template>
    <div class="g-color-bar-picker">
        <div class="color-bar-panel-list" v-if="!editPanelVisible">
            <div class="color-bar-current" :class="[ type ]">
                <color-bar :colors="selectedColors"></color-bar>
                <div class="color-bar-alpha" v-if="type === 'alpha'">
                    <alpha v-model="alphaColor" size="small"></alpha>
                </div>
            </div>
            <div class="color-bar-list-box" @wheel.stop>
                <g-scrollbar class="color-bar-list-wrapper">
                    <ul class="color-bar-list">
                        <li v-for="( colors, index ) in colorBars"
                            :class="{ 'active': selected === index }"
                            :key="index" 
                            @click="select( index )">
                            <color-bar :colors="colors"></color-bar>
                            <i class="color-bar-icon icon icon-exchange"
                                @click.stop="reverse( index )"></i>
                        </li>
                    </ul>
                </g-scrollbar>
                <div class="custom-color-bar" v-show="customizable">
                    <div class="custom-color-bar-box" :class="{ 'active': selected === -1 }" @click.stop="select( -1 )" v-if="customColors.length > 0">
                        <color-bar :colors="customColors"></color-bar>
                        <i class="color-bar-icon icon icon-close" @click.stop="cleanCustomColor"></i>
                    </div>
                    <p v-else @click.stop="edit">自定义色带</p>
                </div>
            </div>
        </div>
        <div class="color-bar-panel-edit" v-if="editPanelVisible">
            <div class="color-bar-current">
                <color-bar :colors="customColors" @on-select="editColor"></color-bar>
                <div class="edit-pointer" :style="pointerStyle"></div>
                <i class="color-bar-icon icon icon-check" @click="confirm"></i>
            </div>
            <color-picker hide-preset :value="editedColor" @input="changeColor" :hideAlpha="type === 'alpha' "></color-picker>
        </div>
    </div>
</template>

<script>
import ColorBar from './color-bar'
import GScrollbar from '../scrollbar'
import Slider from '../slider'
import Alpha from '../color-picker/alpha'
import { gradient } from '@/utils/lut'
import ColorPicker from '../color-picker'
import Vue from 'vue'
import c from '@/utils/color'

const presetcolor = [
    [ '#5182e4', '#ce62d6', '#9bcc66', '#8954d4', '#3fb27e', '#5156b8', '#f7cb4a', '#51b4f1', '#f88d48', '#69d4db', '#f35352', '#d42d6b' ],
    [ '#d73027','#fc8d59','#fee08b','#ffffbf','#d9ef8b','#91cf60','#1a9850'],
    [ '#3d5941','#778868','#b5b991','#f6edbd','#edbb8a','#de8a5a','#ca562c'],

    //纯色
    [ '#f7fbff','#d6e6f4','#a8cce7','#6baed6','#3a85c0','#195b9c','#08306b'],
    [ '#edf8fb','#c6e9ea','#99d7cd','#66c2a4','#3fad76','#1d904e','#006d2c'],
    [ '#edf8fb','#c6dbeb','#a6bbd9','#8c96c6','#896bb1','#863e99','#810f7c'],
    [ '#fef0d9','#fdd8a4','#fdb77a','#fc8d59','#eb6040','#d33122','#b30000'],
    [ '#fff5f0','#fdd4c2','#fca082','#fb6a4a','#e32f27','#b21218','#67000d'],
    [ '#fafafa','#d1d1d1','#a8a8a8','#808080','#575757','#2e2e2e','#050505'],
    //黄色开始
    [ '#ffffcc','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#005a32'],
    [ '#ffffcc','#c0e6bc','#81ceb9','#41b6c4','#3391bc','#2a66ac','#253494'],
    [ '#ffffb2','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026'],
    [ '#ffffd4','#fee391','#fec44f','#fe9929','#ec7014','#cc4c02','#8c2d04'],

    [ '#a6611a','#cca25c','#e6d3a5','#f5f5f5','#a7dad2','#56b5a6','#018571'],
    [ '#762a83','#af8dc3','#e7d4e8','#f7f7f7','#d9f0d3','#7fbf7b','#1b7837'],
    [ '#c51b7d','#e9a3c9','#fde0ef','#f7f7f7','#e6f5d0','#a1d76a','#4d9221'],
    [ '#d53e4f','#fc8d59','#fee08b','#ffffbf','#e6f598','#99d594','#3288bd'],

    
    [ '#008080','#70a494','#b4c8a8','#f6edbd','#edbb8a','#de8a5a','#ca562c'],
    [ '#009392','#39b185','#9ccb86','#e9e29c','#eeb479','#e88471','#cf597e'],

    [ '#f3e0f7','#e4c7f1','#d1afe8','#b998dd','#9f82ce','#826dba','#63589f'],
    [ '#f3e79b','#fac484','#f8a07e','#eb7f86','#ce6693','#a059a0','#5c53a5'],
    [ '#fcde9c','#faa476','#f0746e','#e34f6f','#dc3977','#b9257a','#7c1d6f'],
    [ '#ede5cf','#e0c2a2','#d39c83','#c1766f','#a65461','#813753','#541f3f'],

     //黄色结束
    [ '#440154','#443b83','#30698d','#21938c','#3cba75','#9ad83c','#fde725'],
    [ '#000004','#2f0a5b','#71196e','#b0315b','#e45a31','#fb9d07','#f2ea69'],
    [ '#0d0887','#5e01a6','#9d199c','#cd4a76','#ef7d51','#f3d92c','#f3f027'],
    
]

export default {
    name: 'g-color-bar-picker',
    components: {
        ColorBar,
        GScrollbar,
        ColorPicker,
        Alpha,
        Slider
    },
    props: {
        type: {
            type: String,
            default: 'default'
        },
        customizable: {
            type: Boolean,
            default: true
        },
        colors: {
            type: Array,
            default () {
                return presetcolor
            }
        },
        breaks: {
            type: Number
        },
        value: {
            type: Array,
            default () {
                return []
            }
        },
        alpha: {
            type: Number,
            default: 1
        }
    },
    created () {
        this.colorBars = this.colorBuckets;

        this.update();

        if ( this.selected === -1 && 
                this.customColors && 
                this.customColors.length > 0 &&
                this.breaks !== undefined &&
                this.customColors.length !== this.breaks ) {

            this.customColors = gradient( this.customColors, this.breaks );
            this.$emit( 'input', this.formatColors( [ ...this.customColors ] ) );
        }
    },
    computed: {
        colorBuckets () {
            if ( this.breaks === undefined ) return this.colors;

            return this.colors.map( ( item, i ) => {

                if( this.selected === i && this.currentColors ){
                    return gradient( this.currentColors, this.breaks );
                }else{
                    return gradient( item, this.breaks );
                }
            } )
        },
        selectedColors () {
            if ( this.selected === -1 ) return this.customColors;
            return this.colorBars[ this.selected ] || []
        },
        editedColor () {
            return this.customColors[ this.edited ];
        },
        pointerStyle () {
            const itemWidth = 176 / this.customColors.length;
            return {
                width: itemWidth + 'px',
                left: 16 + this.edited * itemWidth + 'px'
            }
        },
        alphaColor: {
            get () {
                return {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: this.a
                }
            },
            set ( val ) {
                this.a = val.a;

                this.emitAlpha();
            }
        }
    },
    data () {
        return {
            customColors: [],
            editPanelVisible: false,
            colorBars: this.colorBuckets,
            selected: 0,
            edited: 0,
            a: this.alpha,
            _updateTimer: null,
            currentColors: null
        }
    },
    watch: {
        colors ( val ) {
            this.colorBars = this.colorBuckets;
            this.update();
        },
        breaks ( val ) {
            this.colorBars = this.colorBuckets;

            if ( this.customColors && this.customColors.length > 0 ) {
                this.customColors = gradient( this.customColors, this.breaks );
            }
            this.$emit( 'input', this.formatColors( [ ...this.selectedColors ] ) );
            // this.update();
        },
        value: {
            deep: true,
            handler () {
                this.update();
            }
        },
        alpha () {
            this.a = this.alpha;
        },
        customColors ( val ) {
            if ( this.breaks !== undefined && val && val.length > 0 && val.length !== this.breaks ) {
                this.customColors = gradient( this.customColors, this.breaks );
            }
            // if ( val && this.selected === -1 && val.length > 0 ) {
            //     // this.$emit( 'input', [ ...this.customColors ] )
            // }
        }
    },
    methods: {
        formatColors( colors ) {

            if ( this.type === 'alpha' ) {
                return colors.map( color => c( color ).getStyle( 'hex' )  )
            }
            return colors;

        },
        update () {

            let index = this.colorBars.findIndex( ( colors, index ) => {

                if ( colors.length !== this.value.length ) return false;

                if ( colors.every( ( item, index ) => item === this.value[ index ] ) ) return true;

                if ( colors.every( ( item, index ) => item === this.value[ colors.length - index - 1 ] ) ) {
                    this.colorBars[ index ].reverse();
                    return true;
                }

                return false;

            } )

            if ( index === -1 ) {
                this.customColors = [ ...this.value ];
                this.selected = -1;
            } else {
                this.selected = index;
            }
        },
        select ( index ) {
            
            if ( this.selected !== index ) {
                this.selected = index;
                this.currentColors = null;
                this.$emit( 'input', this.formatColors( [ ...this.selectedColors ] ) )
            } else {
                this.edit();
            }
        },
        reverse ( index ) {
            this.selected = index;
            this.colorBars[ index ].reverse();
            this.currentColors = this.colorBars[ index ];
            this.$emit( 'input', this.formatColors( [ ...this.selectedColors ] ) )
        },
        edit () {
            this.customColors = [ ...this.selectedColors ];
            this.editPanelVisible = true;
        },
        emitAlpha () {
            if ( this._updateTimer ) {
                clearTimeout( this._updateTimer )
            }

            this._updateTimer = setTimeout( () => {
                this.$emit( 'input-alpha', this.a );
                this._updateTimer = null;
            }, 250 );
        },
        cleanCustomColor () {
            this.selected = 0;
            this.customColors = [];
        },
        editColor ( event ) {
            this.edited = event.index;
        },
        changeColor ( color ) {
            Vue.set( this.customColors, this.edited, color )
        },
        confirm () {
            this.selected = -1;
            this.currentColors = null;
            this.editPanelVisible = false;
            this.$emit( 'input', this.formatColors( [ ...this.selectedColors ] ) )
        }
    }
}

</script>
<style lang="scss">
@import 'common';

.g-color-bar-picker {
    width: 230px;
    position: relative;
    z-index: 10;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);

    .color-bar-icon {
        position: absolute;
        right: 10px;
        top: 8px;
        display: block;
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        color: $primary;
        cursor: pointer;
    }
    
    .color-bar-panel-list {
        width: 100%;
        position: relative;

        .color-bar-current {
            width: 100%;
            border-bottom: 1px solid #ddd;
            background: #f2f6f9;

            &.alpha {
                .color-bar {
                    height: 26px;
                    padding-bottom: 0;
                }
            }

            .color-bar-alpha {
                width: 100%;
                height: 6px;
                position: relative;
                padding: 0 16px;
                margin: 10px 0;

                .g-color-picker-c-alpha {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .color-bar-list-box {
            width: 100%;
            height: 185px;
            background: #fff;
            overflow: hidden;

            .color-bar-list-wrapper {
                display: block;
                width: 100%;
                height: 148px;
                overflow: hidden;

                .vue-scrollbar__scrollbar-vertical {
                    width: 4px;
                    opacity: 0.4;

                    &:hover {
                        opacity: 1;
                        width: 10px;
                    }
                }

                .color-bar-list {
                    display: block;
                    width: 100%;

                    > li {
                        cursor: pointer;
                        display: block;
                        position: relative;
                        border-bottom: 1px solid #eee;
                        padding-right: 22px;

                        > i {
                            display: none;
                        }

                        &:hover {
                            background: rgba( $primary, .1 );
                            > i {
                                display: block;
                            }
                        }

                        &.active {
                            &::before {
                                content: '';
                                display: block;
                                position: absolute;
                                // z-index: -1;
                                top: 9px;
                                bottom: 9px;
                                left: 10px;
                                right: 32px;
                                border: 1px solid rgba(17, 129, 251, 0.64);
                                border-radius: 8px;
                                background: rgba(17, 129, 251, 0.08);
                            }
                        }
                    }
                }

            }

            .custom-color-bar {
                position: relative;
                height: 36px;
                line-height: 36px;
                font-size: 12px;
                text-align: center;
                color: $primary;
                cursor: pointer;
                border-top: 1px solid #ddd;
                padding-right: 22px;

                .custom-color-bar-box {
                    &.active {
                        &::before {
                            content: '';
                            display: block;
                            position: absolute;
                            // z-index: -1;
                            top: 9px;
                            bottom: 9px;
                            left: 10px;
                            right: 32px;
                            border: 1px solid rgba(17, 129, 251, 0.64);
                            border-radius: 8px;
                            background: rgba(17, 129, 251, 0.08);
                        }
                    }
                }

                > p {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
            }
        }

    }

    .color-bar-panel-edit {
        .color-bar-current {
            position: relative;
            width: 100%;
            border-bottom: 1px solid #ddd;
            background: #fff;
            padding-right: 22px;

            .edit-pointer {
                height: 1px;
                background: #000;
                position: absolute;
                bottom: 0;
            }

            .edit-confirm {
                position: absolute;
                right: 10px;
                top: 8px;
                display: block;
                text-align: center;
                width: 20px;
                height: 20px;
                line-height: 20px;
                color: $primary;
                cursor: pointer;
            }
        }
    }

}

</style>