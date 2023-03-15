<template>
	<div class="site-wrapper">
		<header class="site-header">
			<nuxt-link to="/dashboard" class="site-logo">
				<logo />
			</nuxt-link>

			<div class="header-actions">
				<nuxt-link class="button button-login button-primary button-pill" to="dashboard">Login</nuxt-link>
			</div>
		</header>

		<main class="site-main">

			<div class="block block-splash">
				<div class="inner">
					<div class="mx-default">
						<div class="splash-wrapper">
							<div class="row middle">
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h2 class="title">Create and share your branded interactive toolkit in minutes</h2>
										<p>Transform empowers coaches, consultants, and course creators to provide the best learning experience for their clients.</p>
										<p><a href="#" class="button button-primary">Talk to an expert</a></p>
									</div>
								</div>
								<div class="col col-12 col-sm-6">
									<home-splash />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-share">
				<div class="inner">
					<div class="mx-default">
						<div class="block-wrapper has-shadow">
							<div class="row">
								<div class="col col-12 col-sm-6">
									<div class="sharing-wrapper">
										<img
											class="sharing"
											src="~/assets/images/template/home/sharing.png"
											alt="Share consulting tools with clients"
										>
									</div>
								</div>
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h2 class="title">Share consulting tools with clients</h2>
										<p>Multiple users can edit in real-time. Put the whole team in sync mode.</p>
										<p><a href="#" class="button button-primary">Talk to an expert</a></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-build is-reverse">
				<div class="inner">
					<div class="mx-default">
						<div class="block-wrapper">
							<div class="row middle">
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h3 class="subtitle">Build & Share</h3>
										<h2 class="title">Build and share in less than 5 minutes</h2>
										<p>Upload your existing PDF, or build your tool from scratch!</p>
										<p>You can use ready-made templates or choose images and videos to make it more fun.</p>
										<!--<p><a href="#" class="button button-primary">Learn more</a></p>-->
									</div>
								</div>
								<div class="col col-12 col-sm-6">
									<img
										src="~/assets/images/template/home/speed.png"
										alt="Build and share in less than 5 minutes"
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-build">
				<div class="inner">
					<div class="mx-default">
						<div class="block-wrapper">
							<div class="row middle">
								<div class="col col-12 col-sm-6">
									<img
										src="~/assets/images/template/home/analytics.png"
										alt="Build and share in less than 5 minutes"
									>
								</div>
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h3 class="subtitle">Powerful Analytics</h3>
										<h2 class="title">Analyze student responses</h2>
										<p>Make data-driven decisions and gain insights into effectiveness of your tools.</p>
										<!--<p><a href="#" class="button button-primary">Learn more</a></p>-->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-build">
				<div class="inner">
					<div class="mx-default">
						<div class="block-wrapper">
							<div class="row">
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h3 class="subtitle">Lead Capture</h3>
										<h2 class="title">Collect marketing leads</h2>
										<p>Move away from downloadable e-books or PDFs, and collect all responses from your lead magnets.</p>
										<p>Not only generate a lead, but understand how qualified they are based on their use of your lead magnet.</p>
										<!--<p><a href="#" class="button button-primary">Learn more</a></p>-->
									</div>
								</div>
								<div class="col col-12 col-sm-6">
									<img
										src="~/assets/images/template/home/leads.png"
										alt="Collect marketing leads"
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-how">
				<div class="inner">
					<div class="mx-default">
						<div class="block-wrapper has-shadow">
							<div class="row bottom">
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h2 class="title">Here's how TransForm works</h2>
										<p>Get started for free! Build your interactive toolkit in minutes.</p>
										<p><a href="#" class="button button-primary">Talk to an expert</a></p>
									</div>
								</div>
								<div class="col col-12 col-sm-6">
									<div class="copy">

										<div class="step">
											<h3 class="subtitle">Step 1</h3>
											<h2 class="title">Create</h2>
											<p>You can make an interactive tool by digitizing your PDF or creating it using our builder from scratch. Add your content, and make it branded with your logo & colors.</p>
										</div>

										<div class="step">
											<h3 class="subtitle">Step 2</h3>
											<h2 class="title">Share</h2>
											<p>Share your tool with your clients and students so they can start interacting with it. You can do it via a link or embedding it into other platforms.</p>
										</div>

										<div class="step">
											<h3 class="subtitle">Step 3</h3>
											<h2 class="title">Analyze</h2>
											<p>Track activity for each tool. Analyze how your clients and students interact.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--<div class="block block-others">
				<div class="inner">
					<h2>See how others are using TransForm</h2>
				</div>
			</div>-->

			<div class="block block-started">
				<div class="inner">
					<div class="copy text-center">
						<h2 class="title">Get Started</h2>
						<p>Get started for free! Build your interactive toolkit in minutes.</p>
						<p><a href="#" class="button button-primary">Talk to an expert</a></p>
					</div>
				</div>
			</div>

		</main>

		<footer class="site-footer">
			<div class="m-default">
				<p>Made with <i class="fa fa-fw fa-heart" /> in Ukraine, Portugal and Mexico.</p>
			</div>
		</footer>
	</div>
</template>

<script>
	import Logo from '~/assets/images/template/logo-transform.svg?inline';

	export default {
		name: 'IndexPage',
		components: { Logo },
		mounted() {
		},
		methods: {
			async logout() {
				await this.$auth.logout();
			},
		},
	};
</script>

<style lang="less" scoped>

	// General Styles

	.block {

		margin-bottom: 10vh;

		.block-wrapper.has-shadow {

			background: white;
			border-radius: @radius-4;
			padding: @margin-quad;
			box-shadow: 1.2px 0px 2.2px rgba(0, 0, 0, 0.02),
			2.9px 0.1px 5.3px rgba(0, 0, 0, 0.028),
			5.4px 0.1px 10px rgba(0, 0, 0, 0.035),
			9.6px 0.2px 17.9px rgba(0, 0, 0, 0.042),
			18px 0.4px 33.4px rgba(0, 0, 0, 0.05),
			43px 1px 80px rgba(0, 0, 0, 0.07);
		}

		.title {

			font-weight: 900;
			font-size: 2rem;
			line-height: 1;
			margin-bottom: @margin-default;

			@media @sm-n-above {

				font-size: 2.5rem;
			}
		}

		.subtitle {

			text-transform: uppercase;
			letter-spacing: 0.5rem;
			color: #AAA;
		}

		p {

			font-size: 1rem;
			margin-bottom: @margin-default;
			color: #AAA;

			&:last-child {

				margin-bottom: 0;
			}

			@media @sm-n-above {

				font-size: 1.2rem;
			}
		}

		.button {

			border-radius: @radius-round;
			padding: 0.8rem 1.5rem;
			font-size: 1rem;

			@media @sm-n-above {

				padding: 1rem 2rem;
				font-size: 1.2rem;
			}
		}

		.copy {

			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: @margin-double;

			&:last-child {

				margin-bottom: 0;
			}

			@media @sm-n-above {

				margin-bottom: 0;
				text-align: left;
			}
		}
	}

	.site-wrapper {

		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.site-main {

			flex: 1;
			padding-top: 57px;
		}
	}

	.site-header {

		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 57px;
		display: flex;
		align-items: stretch;
		z-index: 100;
		background: white;
		border-bottom: 1px solid @border-1;

		.site-logo {

			display: flex;
			align-items: center;
			margin: @margin-default;

			svg {

				width: 100px;

				@media @sm-n-above {

					width: 180px;
				}

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

			.button-login {

				padding: 4px 2rem;

				@media @sm-n-above {

					padding: 8px 3rem;
				}
			}
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

	.block-splash {

		display: flex;
		align-items: center;
		padding-top: @margin-quad;

		@media @sm-n-above {

			padding-top: 0;
			min-height: 70vh;
		}

		.splash-wrapper {

			@media @sm-n-below {

				.row {

					flex-direction: column-reverse;

					.col {
						width: 100%;
					}
				}
			}
		}
	}

	.block-how {

		.step {

			border-bottom: 1px solid @border-1;
			margin-bottom: @margin-double;
			padding-bottom: @margin-double;

			&:last-child {

				border-bottom: 0;
				margin-bottom: 0;
				padding-bottom: 0;
			}

			.title {
				font-size: 2.2rem;
			}

			p {

				font-size: 1.2rem;
			}
		}
	}

	.block-started {

		.copy {

			text-align: center;
		}
	}

	.sharing-wrapper {

		@media @sm-n-below {

			border-bottom: 1px solid @border-1;
			margin-left: -3rem;
			width: calc(~'100% + 6rem');
			margin-bottom: @margin-double;
			margin-top: -7.5rem;
		}

		@media @md-n-above {

			position: absolute;
			bottom: -3rem;
			left: -2rem;
			width: 98%;
		}
	}

	.block-build {

		@media @sm-n-below {
			&.is-reverse .row {

				flex-direction: column-reverse;
			}
		}

		img {

			margin: 0 auto;
			max-width: 60%;
			margin-bottom: @margin-double;
		}
	}

</style>