<template>
    <div class="content-box-text" 
        :class="{ editing: editing }"
        :style="editStyle" 
        @mousedown="onMouseDown">
         <div class="content-box-header" v-show="headerShow">
            <div class="content-box-header-actions">
                 <svg class="icon" aria-hidden="true" @click="edit">
                    <use xlink:href="#icon-pen"></use>
                </svg> 
            </div>
        </div>
        <div class="content-box-text-container" ref="text">
            <g-text-editor 
                :value="options.content"
                :editable="editing"
                :scale="scale"
                @input="change"
                @on-complete="onComplete"></g-text-editor>
        </div>
    </div>
</template>

<script>
import GTextEditor from './g-text-editor'

export default {

    name: 'content-box-text',
    props: {
        options: Object,
        width: Number,
        height: Number,
        scale: Number,
        isPreviewing: Boolean,
        idx: Number
    },
    computed: {
        headerShow: function(){

            if( this.$store.state.panelInfo.focusedIdx === this.idx ) return true;

            return false;
        },
        editStyle: function(){

            return { background: this.options.backgroundColor }
            
        }
    },
    data () {
        return {
            editing: false
        }
    },
    methods: {
        edit () {
            this.editing = true;
        },
        remove () {
            //this.$store.commit( REMOVE_CHART, { uuid: this.chartData.uuid } );
        },
        change ( val ) {

            //this.$store.commit('updateLayerOptions', { field:['content'],val, idx: this.idx});
            
            //this.$store.commit( UPDATE_CHART, {
            //     uuid: this.chartData.uuid,
            //     options: {
            //         content: val
            //     }
            // } )
        },
        onComplete () {
            this.editing = false;
        },
        onMouseDown () {
            //this.$emit( 'change-draggable', true );
            window.addEventListener( 'mouseup', this.onMouseUp, false );
        },
        onMouseUp () {
            //this.$emit( 'change-draggable', false );
            window.removeEventListener( 'mouseup', this.onMouseUp, false );
        }
    },
    components: {
        GTextEditor
    }
}
</script>

<style lang="scss">

.content-box-text {
    width: 100%;
    height: 100%;
    cursor: move;
    transition: box-shadow .2s ease-in-out;
    position: relative;

    .content-box-header {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 46px;
        line-height: 46px;
        padding: 0;
        font-size: 13px;
        cursor: move;
        color: #000;    

        .content-box-header-actions {
            float: right;
            line-height: 46px;
            padding: 0 16px;
            font-size: 14px;
            color: #fff;

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

    &.editing {
        cursor: auto;
        background: rgba(255,255,255,1);
        box-shadow: 0 0 0 2px rgba(81,130,227,.15),inset 0 0 0 2px rgba(80,134,226,.74);
    }

    &:hover {
        .content-box-text-header {
            display: block;
        }
    }

    .content-box-text-container {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        padding: 40px;
    }
}
    
</style>