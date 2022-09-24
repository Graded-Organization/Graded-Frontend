<template>
	<div
		class="drawer-block"
		:class="{ 'is-closed': !visible, 'is-open': visible }"
	>
		<div
			@click.prevent="toggle"
			class="drawer-block-title"
		>
			<h3>{{ title }}</h3>
			<a class="toggle-icon">
				<i class="fal fa-fw fa-angle-right" />
			</a>
		</div>
		<transition-slide>
			<div class="drawer-block-body" v-show="visible">
				<slot></slot>
			</div>
		</transition-slide>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				visible: true
			}
		},
		computed: {
		},
		methods: {
			toggle() {
				this.visible = !this.visible;
			}
		}
	}
</script>

<style lang="less" scoped>

	.drawer-block {

		.drawer-block-body {

			padding: @margin-default !important;
			border-bottom: 1px solid @gray-1;
		}

		.drawer-block-title {

			padding: @margin-half !important;
			border-bottom: 1px solid @gray-1;
			cursor: pointer;

			.toggle-icon {

				position: absolute;
				color: @primary;
				padding: @margin-half;
				right: 5px;
				top: 0;
				transition: transform 500ms;
			}
		}

		&.is-open {

			.drawer-block-title .toggle-icon {

				transform: rotate(90deg);
			}
		}

		/deep/ .drawer-block-subtitle {

			margin-bottom: @margin-default;
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 2px;
			color: @primary;
		}
	}

</style>