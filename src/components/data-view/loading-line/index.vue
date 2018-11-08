<template>
	<div class="loader" :class="{'waiting':isShow}"  v-if="isShow"></div>
</template>

<script>

import { eventBus } from '@/event-bus'

export default {
	name: 'LoadingWidget',
	data(){
		return {
			isShow: false
		}
	},
	created(){
		this.subscribe()
	},
	methods:{
		subscribe: function(){
			eventBus.$on("showLoading", (isShow) => {
				this.isShow = isShow
			})
		}
	}
}
</script>

<style lang="scss">
	@import '~@/assets/styles/common';

	.loader {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: 3px;
        overflow: hidden;
        display: none;
        z-index: 20;

        &.small {
            height: 2px;
        }

        &.waiting, &.error {
            display: block;
            z-index: 99999;
            &::after {
                content: '';
                display: block;
            }
        }

        &.waiting::after {
            height: 100%;
			width: 50%;
			transform: translateX(-200%);
            background-image: linear-gradient(90deg, #1181fb 0%, #32BBFE 100%);
            -webkit-animation: g-loader-bar-progress 1s cubic-bezier(0, 0.85, 0.6, 0.6) infinite;
            animation: g-loader-bar-progress 1s cubic-bezier(0, 0.85, 0.6, 0.6) infinite;
        }

        &.error::after {
            height: 100%;
            width: 100%;
            background-color: $danger;
        }

        @include keyframes( g-loader-bar-progress ) {
            from {
                transform: translateX(-200%)
            }
            to {
                transform: translateX(200%)
            }
        }
    }
</style>