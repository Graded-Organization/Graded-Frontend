<template>
	<div class="site-wrapper">
		<header class="site-header">
			<nuxt-link to="/dashboard" class="site-logo">
				<logo />
			</nuxt-link>

			<div class="header-actions">
				<nuxt-link class="button button-primary" to="dashboard">Access your account here</nuxt-link>
			</div>
		</header>

		<main class="site-main">
		</main>

		<footer class="site-footer">

			<div class="m-default">
				<p>Made with <i class="fa fa-fw fa-heart" /> in Ukraine, Portugal and Mexico.</p>
			</div>

		</footer>
	</div>
</template>

<script>
	import Logo from "~/assets/images/template/logo-mono.svg?inline";

	export default {
		name: 'IndexPage',
		components: { Logo },
		methods: {
			async logout() {
				await this.$auth.logout();
			}
		}
	}
</script>

<style lang="less" scoped>

	.site-wrapper {

		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.site-main {

			flex: 1;
		}
	}

	.site-header {

		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 57px;
		border-bottom: 1px solid @border-1;
		display: flex;
		align-items: stretch;

		.site-logo {

			display: flex;
			align-items: center;
			margin: @margin-default;

			svg {

				width: 70px;

				rect,
				polygon,
				path {

					fill: @-green-6;
				}
			}
		}

		.header-actions {

			display: flex;
			margin-left: auto;
			align-items: center;
			padding-right: @margin-default;
		}

	}

	.site-footer {

		background: @background-2;
		position: fixed;
		z-index: 100;
		width: 100%;
		bottom: 0;
		left: 0;

		p {

			font-size: 0.8rem;
		}

		.fa-heart {

			color: @red-5;
		}
	}
</style>