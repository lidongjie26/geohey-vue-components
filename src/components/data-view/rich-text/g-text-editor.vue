<template>
    <div class="g-text-editor">
        <div class="g-text-editor-editable" 
            ref="editor"
            v-html="val"
            :contenteditable="editable" spellcheck="false"
            :style="textStyle"></div>
    </div>
</template>

<script>

export default {
    name: 'g-text-editor',
    props: {
        value: {
            type: String,
            default: ''
        },
        editable: {
            type: Boolean,
            default: true
        },
        scale: {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            val: this.value,
            selectionState: null,
            showColorPicker: false,
            options: {
                fontColor: 'rgba( 0, 0, 0, 1 )',
                fontSize: [
                    {
                        name: '12px',
                        command: 'fontSize',
                        value: 1,
                        active: false
                    },
                    {
                        name: '13px',
                        command: 'fontSize',
                        value: 2,
                        active: false
                    },
                    {
                        name: '16px',
                        command: 'fontSize',
                        value: 3,
                        active: false
                    },
                    {
                        name: '18px',
                        command: 'fontSize',
                        value: 4,
                        active: false
                    },
                    {
                        name: '24px',
                        command: 'fontSize',
                        value: 5,
                        active: false
                    },
                    {
                        name: '32px',
                        command: 'fontSize',
                        value: 6,
                        active: false
                    },
                    {
                        name: '48px',
                        command: 'fontSize',
                        value: 7,
                        active: false
                    }
                ],
                textAlign: [
                    {
                        name: '左对齐',
                        icon: 'left',
                        command: 'justifyLeft',
                        active: false
                    },
                    {
                        name: '居中对齐',
                        icon: 'center',
                        command: 'justifyCenter',
                        active: false
                    },
                    {
                        name: '右对齐',
                        icon: 'right',
                        command: 'justifyRight',
                        active: false
                    },
                    {
                        name: '两端对齐',
                        icon: 'justify',
                        command: 'justifyFull',
                        active: false
                    }
                ],
                fontStyle: [
                    {
                        name: '粗体',
                        icon: 'bold',
                        command: 'bold',
                        active: false
                    },
                    {
                        name: '斜体',
                        icon: 'italic',
                        command: 'italic',
                        active: false
                    },
                    {
                        name: '下划线',
                        icon: 'underline',
                        command: 'underline',
                        active: false
                    },
                    {
                        name: '删除线',
                        icon: 'strikethrough',
                        command: 'strikethrough',
                        active: false
                    }
                ],
                fontName: [
                    {
                        name: '微软雅黑',
                        value: 'Microsoft YaHei',
                        command: 'fontName',
                        active: false
                    },
                    {
                        name: '黑体',
                        value: '黑体',
                        command: 'fontName',
                        active: false
                    },
                    {
                        name: '宋体',
                        value: '宋体',
                        command: 'fontName',
                        active: false
                    },
                    {
                        name: '幼圆',
                        value: '幼圆',
                        command: 'fontName',
                        active: false
                    }
                ],

            }
        }
    },
    computed: {
        textBarStyle: function(){
            return {
                zoom: this.$store.state.panelInfo.isPreviewing ? 'normal' : 100 / this.scale
            }
        },
        textStyle: function(){

            return {
                zoom: this.scale / 100
            }
        }
    },
    watch: {
        value ( val ) {
            this.val = val;
        },
        editable ( val ) {
            this.$nextTick( () => {
                this.$refs.editor.focus();
            } )

        }
    }
}
</script>

<style lang="scss">

.g-text-editor {
    width: 100%;
    height: 100%;
    overflow: auto;

    &:hover .g-text-editor-toolbar{
        display: block;
    }

    .g-text-editor-editable {
        width: 100%;
        height: 100%;
        word-break: break-all;
        overflow: hidden;
    }
}

</style>
