<template>
	<div class="platform-layout">
		<header class="site-header">

			<div class="header-area area-left">
				<nuxt-link to="/dashboard" class="site-logo">
					<logo />
				</nuxt-link>
				<portal-target name="logo-portal" class="logo-portal">
				</portal-target>
			</div>

			<div class="header-area area-center">
				<portal-target name="menu-portal" class="menu-portal">
				</portal-target>
			</div>

			<div class="header-area area-right">
				<portal-target name="user-portal" class="user-portal">
				</portal-target>

				<div class="user-area">
					<img class="avatar" width="40" :src="`${ this.$config.apiUrl }/users/${ $auth.user.id }/avatar?size=35&cache=${ $store.state.avatarCacheKey }`">

					<nav class="user-menu">
						<h2 class="menu-hello">
							Hello <strong>{{ $auth.user.nicename }}</strong>
						</h2>

						<ul class="menu-nav">
							<li class="menu-item"><nuxt-link to="/dashboard">My Worksheets</nuxt-link></li>
							<li class="menu-item"><nuxt-link to="/profile">My Profile</nuxt-link></li>
							<li class="menu-item"><a @click.prevent="logout" href="#">Logout</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>

		<section class="platform-section">
			<nuxt />
		</section>

		<footer class="site-footer">
			<div class="m-default">
				<p>Made with <i class="fa fa-fw fa-heart" /> in Ukraine, Portugal and Mexico.</p>
			</div>
		</footer>

		<v-dialog />
		<notifications group="graded" position="bottom right" classes="graded-notification" />
	</div>
</template>

<script>
	import Logo from '~/assets/images/template/logo-transform.svg?inline';

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

	body {

		padding: 0 !important;
	}

	.platform-section {

		display: flex;
		width: 100%;
		justify-content: center;
	}

	.platform-layout {

		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 63px;
		padding-bottom: 43px;

		.site-header {

			display: flex;
			align-items: stretch;
			border-bottom: 1px solid @border-1;
			position: fixed;
			top: 0;
			left: 0;
			background: white;
			width: 100%;
			z-index: 1000;

			.header-area {

				display: flex;
				flex: 1;
				flex-basis: 100%/3;
			}

			.site-logo {

				margin: @margin-default;
				margin-right: @margin-default;

				svg {

					height: 38px;

					rect,
					polygon,
					path {

						fill: @-green-6;
					}
				}
			}

			.logo-portal {

				display: flex;
				margin-right: auto;
			}

			.menu-portal {

				width: 100%;
				display: flex;
				height: 100%;
				justify-content: center;
			}

			.user-portal {

				width: 100%;
				display: flex;
				height: 100%;
				justify-content: center;
				padding-right: @margin-default;
			}

			.user-area {

				height: 100%;
				display: flex;
				padding: 0 @margin-default;
				align-items: center;
				margin-left: auto;

				.avatar {

					border: 1px solid @border-1;
					cursor: pointer;
				}

				.user-menu {

					background: @body-background;
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

						color: white;
						padding: @margin-default;
						padding-top: @margin-double;
						line-height: 1;
						image-rendering: pixelated;
						background: @green-5 url('~/assets/images/template/texture.png') top left fixed;
						background-size: 120px;
						border-bottom: 1px solid @border-1;

						strong {

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

					image-rendering: pixelated;
					background: @green-5 url('~/assets/images/template/texture.png') top left fixed;
					background-size: 120px;

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

			background: @background-2 url('~/assets/images/template/rb-texture.png') right bottom no-repeat;;
			position: fixed;
			z-index: 100;
			width: 100%;
			bottom: 0;
			left: 0;
			image-rendering: pixelated;
			background-size: 120px*3;

			p {

				font-size: 0.8rem;
			}

			.fa-heart {

				color: @red-5;
			}
		}
	}
</style>