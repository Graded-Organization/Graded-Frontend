<template>
	<div class="platform-layout">
		<header class="site-header">
			<nuxt-link to="/dashboard" class="site-logo">
				<logo />
			</nuxt-link>

			<div class="user-area">
				<img class="avatar" width="40" :src="`${ this.$config.apiUrl }/users/${ $auth.user.id }/avatar`">

				<nav class="user-menu">
					<h2 class="menu-hello">
						Hello <strong>{{ $auth.user.nicename }}</strong>
					</h2>

					<ul class="menu-nav">
						<li class="menu-item"><a @click.prevent="logout" href="#">My Worksheets</a></li>
						<li class="menu-item"><a @click.prevent="logout" href="#">Logout</a></li>
					</ul>
				</nav>
			</div>

		</header>
		<section>
			<nuxt />
		</section>
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

			display: flex;
			align-items: center;
			border-bottom: 1px solid @border-1;

			.site-logo {

				margin: @margin-default;
				margin-right: auto;

				svg {

					width: 70px;

					rect,
					polygon,
					path {

						fill: @-green-6;
					}
				}
			}

			.user-area {

				height: 100%;
				display: flex;
				padding: 0 @margin-default;
				align-items: center;

				.avatar {

					border: 1px solid @border-1;
				}

				.user-menu {

					background: @body-background;
					border-top: 1px solid @border-1;
					display: none;
					position: absolute;
					top: 100%;
					right: 0;
					width: 100vw;
					box-shadow: @shadow-2;
					z-index: 100;

					@media @sm-n-above {

						width: 350px;
					}

					.menu-hello {

						padding: @margin-default;
						padding-top: @margin-double;
						line-height: 1;
						background: @green-5 url('~/assets/images/template/topology.png') center center no-repeat;
						background-size: cover;
						border-bottom: 1px solid @border-1;

						strong {

							color: white;
							display: block;
							font-size: @font-size-4;
						}
					}

					.menu-nav {

						.menu-item {

							display: block;

							&:not(:last-child) {

								border-bottom: 1px solid @border-1;
							}

							a {

								text-decoration: none;
								color: @body-color;
								display: block;
								padding: @margin-default;

								&:hover {

									background: @background-1;
								}
							}
						}
					}
				}

				&:hover {

					.user-menu {

						display: block;
					}
				}
			}
		}

		& > section {

			flex: 1;
		}

		.site-footer {

			background: @background-2;

			p {

				font-size: 0.8rem;
			}

			.fa-heart {

				color: @red-5;
			}
		}
	}
</style>