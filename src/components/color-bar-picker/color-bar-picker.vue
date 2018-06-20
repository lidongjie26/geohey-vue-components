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
    [ 'rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)'],
    [ 'rgb(166,97,26)','rgb(223,194,125)','rgb(245,245,245)','rgb(128,205,193)','rgb(1,133,113)'],
    [ 'rgb(237,248,251)','rgb(178,226,226)','rgb(102,194,164)','rgb(44,162,95)','rgb(0,109,44)'],
    [ 'rgb(237,248,251)','rgb(179,205,227)','rgb(140,150,198)','rgb(136,86,167)','rgb(129,15,124)'],
    [ 'rgb(240,249,232)','rgb(186,228,188)','rgb(123,204,196)','rgb(67,162,202)','rgb(8,104,172,255)'],
    [ 'rgb(247,252,245)','rgb(229,245,224)','rgb(199,233,192)','rgb(161,217,155)','rgb(116,196,118)','rgb(65,171,93)','rgb(35,139,69)','rgb(0,109,44)','rgb(0,68,27)'],
    [ 'rgb(250,250,250)','rgb(5,5,5)'],
    [ 'rgb(0,0,4)','rgb(16,9,45)','rgb(47,10,91)','rgb(81,14,108)','rgb(113,25,110)','rgb(144,37,104)','rgb(176,49,91)','rgb(204,66,72)','rgb(228,90,49)','rgb(244,121,24)','rgb(251,157,7)','rgb(250,196,42)','rgb(242,234,105)'],
    [ 'rgb(0,0,4)','rgb(14,11,43)','rgb(41,17,90)','rgb(74,16,121)','rgb(106,28,129)','rgb(137,40,129)','rgb(170,51,125)','rgb(202,62,114)','rgb(231,82,99)','rgb(247,114,92)','rgb(253,152,105)','rgb(254,189,130)','rgb(253,226,163)'],
    [ 'rgb(254,240,217)','rgb(253,204,138)','rgb(252,141,89)','rgb(227,74,51)','rgb(179,0,0)'],
    [ 'rgb(255,245,235)','rgb(254,230,206)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(241,105,19)','rgb(217,72,1)','rgb(166,54,3)','rgb(127,39,4)'],
    [ 'rgb(123,50,148)','rgb(194,165,207)','rgb(247,247,247)','rgb(166,219,160)','rgb(0,136,55)'],
    [ 'rgb(208,28,139,255)','rgb(241,182,218)','rgb(247,247,247)','rgb(184,225,134)','rgb(77,172,38)'],
    [ 'rgb(13,8,135)','rgb(56,4,154)','rgb(89,1,165)','rgb(120,1,168)','rgb(149,17,161)','rgb(174,40,146)','rgb(196,62,127)','rgb(214,85,109)','rgb(230,108,92)','rgb(243,133,75)','rgb(251,161,57)','rgb(254,190,42)','rgb(248,223,37)','rgb(243,240,39)'],
    [ 'rgb(241,238,246)','rgb(189,201,225)','rgb(116,169,207)','rgb(43,140,190)','rgb(4,90,141)'],
    [ 'rgb(246,239,247)','rgb(189,201,225)','rgb(103,169,207)','rgb(28,144,153)','rgb(1,108,89)'],
    [ 'rgb(230,97,1)','rgb(253,184,99)','rgb(247,247,247,)','rgb(178,171,210)','rgb(94,60,153)'],
    [ 'rgb(241,238,246)','rgb(215,181,216)','rgb(223,101,176)','rgb(221,28,119)','rgb(152,0,67)'],
    [ 'rgb(252,251,253)','rgb(239,237,245)','rgb(218,218,235)','rgb(188,189,220','rgb(158,154,200)','rgb(128,125,186)','rgb(106,81,163)','rgb(84,39,143)','rgb(63,0,125)'],
    [ 'rgb(202,0,32)','rgb(244,165,130)','rgb(247,247,247)','rgb(146,197,222)','rgb(5,113,176)'],
    [ 'rgb(202,0,32)','rgb(244,165,130)','rgb(255,255,255)','rgb(186,186,186)','rgb(64,64,64)'],
    [ 'rgb(254,235,226)','rgb(251,180,185)','rgb(247,104,161)','rgb(197,27,138)','rgb(122,1,119)'],
    [ 'rgb(215,25,28)','rgb(253,174,97)','rgb(255,255,191)','rgb(171,217,233)','rgb(44,123,182)'],
    [ 'rgb(215,25,28)','rgb(253,174,97)','rgb(255,255,192,)','rgb(166,217,106)','rgb(26,150,65)'],
    [ 'rgb(255,245,240)','rgb(254,224,210)','rgb(252,187,161)','rgb(252,146,114)','rgb(251,106,74)','rgb(239,59,44)','rgb(203,24,29)','rgb(165,15,21)','rgb(103,0,13)'],
    [ 'rgb(215,25,28)','rgb(253,174,97)','rgb(255,255,191)','rgb(171,221,164)','rgb(43,131,186)'],
    [ 'rgb(68,1,84)','rgb(72,29,111)','rgb(69,55,129)','rgb(61,78,138)','rgb(51,99,141)','rgb(42,118,142)','rgb(35,137,142)','rgb(30,156,137)','rgb(40,174,128)','rgb(70,192,111)','rgb(112,207,87)','rgb(162,218,55)',"rgb(216,226,25)",'rgb(253,231,37)'],
    [ 'rgb(255,255,204)','rgb(194,230,153)','rgb(120,198,121)','rgb(49,163,84)','rgb(0,104,55)'],
    [ 'rgb(255,255,204)','rgb(161,218,180)','rgb(65,182,196)','rgb(44,127,184)','rgb(37,52,148)'],
    [ 'rgb(255,255,212)','rgb(254,217,142)','rgb(254,153,41)','rgb(217,95,14)','rgb(153,52,4)' ],
    [ 'rgb(255,255,178)','rgb(254,204,92)','rgb(253,141,60)','rgb(240,59,32)','rgb(189,0,38)'],
    [ 'rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()'],
    [ 'rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()','rgb()'],
    [ '#5182e4', '#ce62d6', '#9bcc66', '#8954d4', '#3fb27e', '#5156b8', '#f7cb4a', '#51b4f1', '#f88d48', '#69d4db', '#f35352', '#d42d6b' ],
    [ '#4a72c9',  '#4966b7',  '#33418e',  '#479ce2',  '#78a9f2',  '#7560bf',  '#a3ccf8',  '#47b8e2',  '#89a0d3',  '#6087bf' ], 
    [ '#006bc2', '#4d8cae', '#ff8500', '#72c8f2', '#0fa8e0', '#ffbf9a', '#2b5b75', '#b6d0de', '#324598', '#dce292', '#ad5600', '#80adc5' ], 
    [ '#a1cb80', '#8b736e', '#3d8a6f', '#739e90', '#ffcd5d', '#245443', '#c74a66', '#4294b8', '#42a4b8', '#75b55e' ], 
    [ '#b7d62d', '#eb4b5c', '#8d9e69', '#d6d6d7', '#67b9cd', '#a4ded9', '#8ac98b' ], 
    [ '#7260af', '#a563ac', '#d3c3db', '#a999c9', '#daa6d6' ],
    [ '#ffc6c4', '#f4a3a8', '#e38191', '#cc607d', '#ad466c', '#8b3058', '#672044' ],
    [ '#fbe6c5', '#f5ba98', '#ee8a82', '#dc7176', '#c8586c', '#9c3f5d', '#70284a' ],
    [ '#f6d2a9', '#f5b78e', '#f19c7c', '#ea8171', '#dd686c', '#ca5268', '#b13f64' ],
    [ '#ecda9a', '#efc47e', '#f3ad6a', '#f7945d', '#f97b57', '#f66356', '#ee4d5a' ],
    [ '#fde0c5', '#facba6', '#f8b58b', '#f59e72', '#f2855d', '#ef6a4c', '#eb4a40' ],
    [ '#fef6b5', '#ffdd9a', '#ffc285', '#ffa679', '#fa8a76', '#f16d7a', '#e15383' ],
    [ '#e4f1e1', '#b4d9cc', '#89c0b6', '#63a6a0', '#448c8a', '#287274', '#0d585f' ],
    [ '#c4e6c3', '#96d2a4', '#6dbc90', '#4da284', '#36877a', '#266b6e', '#1d4f60' ],
    [ '#d2fbd4', '#a5dbc2', '#7bbcb0', '#559c9e', '#3a7c89', '#235d72', '#123f5a' ],
    [ '#d3f2a3', '#97e196', '#6cc08b', '#4c9b82', '#217a79', '#105965', '#074050' ],
    [ '#f7feae', '#b7e6a5', '#7ccba2', '#46aea0', '#089099', '#00718b', '#045275' ],
    [ '#d1eeea', '#a8dbd9', '#85c4c9', '#68abb8', '#4f90a6', '#3b738f', '#2a5674' ],
    [ '#b0f2bc', '#89e8ac', '#67dba5', '#4cc8a3', '#38b2a3', '#2c98a0', '#257d98' ],
    [ '#f3e0f7', '#e4c7f1', '#d1afe8', '#b998dd', '#9f82ce', '#826dba', '#63589f' ],
    [ '#f9ddda', '#f2b9c4', '#e597b9', '#ce78b3', '#ad5fad', '#834ba0', '#573b88' ],
    [ '#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5' ],
    [ '#f3cbd3', '#eaa9bd', '#dd88ac', '#ca699d', '#b14d8e', '#91357d', '#6c2167' ],
    [ '#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f' ],
    [ '#ede5cf', '#e0c2a2', '#d39c83', '#c1766f', '#a65461', '#813753', '#541f3f' ],
    [ '#798234', '#a3ad62', '#d0d3a2', '#fdfbe4', '#f0c6c3', '#df91a3', '#d46780' ],
    [ '#3d5941', '#778868', '#b5b991', '#f6edbd', '#edbb8a', '#de8a5a', '#ca562c' ],
    [ '#008080', '#70a494', '#b4c8a8', '#f6edbd', '#edbb8a', '#de8a5a', '#ca562c' ],
    [ '#009392', '#39b185', '#9ccb86', '#e9e29c', '#eeb479', '#e88471', '#cf597e' ],
    [ '#009392', '#72aaa1', '#b1c7b3', '#f1eac8', '#e5b9ad', '#d98994', '#d0587e' ],
    [ '#009B9E', '#42B7B9', '#A7D3D4', '#F1F1F1', '#E4C1D9', '#D691C1', '#C75DAB' ],
    [ '#A16928', '#bd925a', '#d6bd8d', '#edeac2', '#b5c8b8', '#79a7ac', '#2887a1' ],
    [ '#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32' ],
    [ '#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84' ],
    [ '#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026' ],
    [ '#ffffd4', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04' ],
    [ '#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486' ],
    [ '#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594' ],
    [ '#f7f7f7', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525' ],
    [ '#8c510a', '#d8b365', '#f6e8c3', '#f5f5f5', '#c7eae5', '#5ab4ac', '#01665e' ],
    [ '#762a83', '#af8dc3', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#7fbf7b', '#1b7837' ],
    [ '#c51b7d', '#e9a3c9', '#fde0ef', '#f7f7f7', '#e6f5d0', '#a1d76a', '#4d9221' ],
    [ '#d53e4f', '#fc8d59', '#fee08b', '#ffffbf', '#e6f598', '#99d594', '#3288bd' ],
    [ '#d73027', '#fc8d59', '#fee08b', '#ffffbf', '#d9ef8b', '#91cf60', '#1a9850' ],
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