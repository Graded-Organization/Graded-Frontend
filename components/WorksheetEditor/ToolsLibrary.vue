<template>
	<div>
		<h2 class="drawer-title">Tools Library</h2>

		<div class="tool-cards">
			<div class="row row-collapse flexcol">
				<div v-for="card in cards" class="col col-6">
					<div class="tool-card" @click="selectTool(card.slug)">
						<div class="card-icon">
							<img :src="require(`~/assets/images/template/icons/${card.slug}-small.png`)" alt="">
							<!--<i :class="card.icon.join(' ')" />-->
						</div>
						<h2 class="card-title">{{ card.title }}</h2>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		data() {
			return {
				cards: [
					{
						title: 'Multiple Choice Question',
						slug: 'multiple-choice-question',
						icon: ['fal', 'fa-ballot-check']
					},
					{
						title: 'Plain Text',
						slug: 'plain-text',
						icon: ['fal', 'fa-align-justify']
					},
					{
						title: 'Short Text Input',
						slug: 'short-text-input',
						icon: ['fal', 'fa-pencil']
					},
					{
						title: 'Image',
						slug: 'image',
						icon: ['fal', 'fa-image']
					}
				]
			}
		},
		methods: {
			selectTool(tool) {
				this.$emit('selected-tool', tool);
			}
		}
	}
</script>

<style lang="less" scoped>

	.drawer-title {

		position: sticky;
		top: 0;
		padding: @margin-default;
		z-index: 100;
		background: @gray-1 url('~/assets/images/template/topology.png') center center no-repeat;
	}

	.tool-cards {

		width: 100%;

		.tool-card {

			margin: @margin-half;
			box-shadow: @shadow-2;
			padding: @margin-half;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			flex: 1;
			aspect-ratio: 1;

			.card-icon {

				font-size: 3rem;
				margin-bottom: @margin-default;

				img {

					image-rendering: pixelated;
					width: 48px;
					height: 48px;
				}
			}

			.card-title {

				text-align: center;
				height: 40px;
				font-size: 0.8rem;
			}

			&:hover {

				background: @background-1;
			}
		}
	}

</style>