<template>
	<div class="platform-layout">
		<header class="site-header">
			<nuxt-link to="/dashboard" class="site-logo">
				<logo />
			</nuxt-link>

			<a href="#" @click.prevent="logout">Logout</a>

		</header>
		<section>
			<nuxt />
		</section>
		<footer class="site-footer">
			<div class="m-default">
				<p>Made with love.</p>
			</div>
		</footer>
	</div>
</template>

<script>
	import Logo from "~/assets/images/template/logo-mono.svg?inline";

	export default {
		name: 'PlatformLayout',
		components: { Logo },
		data: () => ({}),
		mounted() {},
		methods: {
			async logout() {
				await this.$auth.logout();
			}
		}
	};
</script>

<style lang="less">
	.platform-layout {

		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.site-header {

			padding: @margin-default;
			display: flex;
			align-items: center;

			.site-logo {

				margin-right: auto;

				svg {

					width: 100px;

					rect,
					polygon,
					path {

						fill: @-green-6;
					}
				}
			}
		}

		& > section {

			flex: 1;
		}

		.site-footer {

			padding: @margin-default;
			background: @background-2;
		}
	}
</style>