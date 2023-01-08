<template>
	<div class="boilerplate">
		<header class="boilerplate-header">
			<p class="text-right m-half">
				<color-mode />
			</p>
		</header>
		<section>
			<Nuxt />
		</section>
		<footer class="boilerplate-footer">
			<p>Made with <i class="fa fa-fw fa-heart"></i> by Growth Institute IT Team</p>
		</footer>
	</div>
</template>

<script>
	export default {
		data: () => ({}),
	}
</script>

<style lang="less">

	html {

		min-height: 100vh;
	}

	body {

		min-height: 100vh;
		display: flex;
		flex-direction: column;

		color: var(--body-color);
		background: var(--body-background);
	}

	#__nuxt, #__layout {

		flex: 1 0 auto;
		display: flex;
		flex-direction: column;
	}

	.boilerplate {

		flex: 1 0 auto;
		display: flex;
		flex-direction: column;

		.boilerplate-header {

			background: #2B66B1;
			height: 47px;
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			z-index: 100;
		}

		section {

			padding: 30px;
			padding-top: 80px;
			padding-bottom: 80px;
			flex: 1 0 auto;
		}

		.boilerplate-footer {

			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			text-align: right;
			padding: 15px;
			z-index: 100;
			font-size: 0.8rem;
			border-top: 1px solid var(--border-1);

			color: var(--body-color);
			background: var(--body-background);

			.fa {

				color: var(--danger);
			}
		}
	}

	.example {

		border: 1px solid var(--border-1);
		padding: @margin-double;
		margin-bottom: @margin-double;
	}

</style>