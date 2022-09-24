<template>
	<div>
		<h2>Tools Library</h2>

		<div class="tool-cards">
			<div class="row row-collapse flexcol">
				<div v-for="card in cards" class="col col-6">
					<div class="tool-card" @click="selectTool(card.slug)">
						<div class="card-icon">
							<i :class="card.icon.join(' ')" />
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

	.tool-cards {

		width: 100%;

		.tool-card {

			margin: @margin-half;
			box-shadow: @shadow-2;
			padding: @margin-half;
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			flex: 1;

			.card-icon {

				font-size: 3rem;
			}

			.card-title {

				text-align: center;
				font-size: 0.8rem;
			}

			&:hover {

				background: @background-1;
			}
		}
	}

</style>