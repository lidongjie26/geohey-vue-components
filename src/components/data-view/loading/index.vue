<template>
    <transition name="fade">
        <div class="content-loading" 
            :style="backgroundStyle"
            v-show="isShow">
            <div class="conent-loading-animate">
                <div :style="pointStyle"/><div :style="pointStyle"/><div :style="pointStyle"/>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
    @function delay($interval, $count, $index) {
        @return ($index * $interval) - ($interval * $count);
    }

    @mixin ball-pulse-sync($n: 3, $start: 1) {
        @for $i from $start through $n {
            > div:nth-child(#{$i}) {
                animation: ball-pulse-sync 0.6s delay(0.07s, $n, $i) infinite ease-in-out;
            }
        }
    }

    $amount: 10px;

    @keyframes ball-pulse-sync {
        33% {
            transform: translateY($amount);
        }
        66% {
            transform: translateY(-$amount);
        }
        100% {
            transform: translateY(0);
        }
    }

    .content-loading {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999;
        width: 100%;
        height: 100%;
        opacity: 1;

        .conent-loading-animate {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -120px;
            margin-left: -100px;
            text-align: center;
            line-height: 200px;
            @include ball-pulse-sync();

            > div {
                width: 15px;
                height: 15px;
                background-color: #2d8cf0;
                border-radius: 100%;
                margin: 5px;
                display: inline-block;
            }
        }

        &.fade-leave-active {
            opacity: 0;
            transition: opacity .3s
        }

    }
</style>

<script>
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            backgroundColor: {
                type: String,
                default: 'rgba(256,256,256,0)'
            },
            pointColor: {
                type: String,
                default: '#2d8cf0'
            }
        },
        computed: {
            backgroundStyle: function(){
                return {
                    background: this.backgroundColor,
                }
            },
            pointStyle: function(){
                return {
                    background: this.pointColor
                }
            }

            
        }
    }
</script>
