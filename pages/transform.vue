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
							<div class="row">
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h1>Create and share<br>your branded<br>interactive toolkit in<br>minutes</h1>
										<h2>Transform empowers coaches, consultants, and course creators to provide the best learning experience for their clients.</h2>

										<p>
											<a href="#" class="button button-primary">Talk to an expert</a>
										</p>
									</div>
								</div>
								<div class="col col-12 col-sm-6 col-anim">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-share">
				<div class="inner">
					<div class="mx-default">
						<div class="block-wrapper">
							<div class="row">
								<div class="col col-12 col-sm-6"></div>
								<div class="col col-12 col-sm-6">
									<div class="copy">
										<h2>Share consulting<br>tools with clients</h2>
										<p class="mb-default">Multiple users can edit in real-time. Put the whole team in sync mode.</p>

										<p>
											<a href="#" class="button button-primary">Talk to an expert</a>
										</p>
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
										<h3>Build & Share</h3>
										<h2>Build and share in<br>less than 5 minutes</h2>
										<p class="mb-default">Upload your existing PDF, or build your tool from scratch!</p>
										<p class="mb-default">You can use ready-made templates or choose images and videos to make it more fun.</p>

										<p>
											<a href="#" class="button button-primary">Learn more</a>
										</p>
									</div>
								</div>
								<div class="col col-12 col-sm-6"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-build">
				<div class="inner">
					<div class="block-wrapper">
						<div class="row">
							<div class="col col-12 col-sm-6"></div>
							<div class="col col-12 col-sm-6">
								<div class="copy">
									<h3>Powerful Analytics</h3>
									<h2>Analyze student<br>responses</h2>
									<p class="mb-default">Make data-driven decisions and gain insights into effectiveness of your tools.</p>

									<p>
										<a href="#" class="button button-primary">Learn more</a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-build">
				<div class="inner">
					<div class="block-wrapper">
						<div class="row">
							<div class="col col-12 col-sm-6">
								<div class="copy">
									<h3>Lead Capture</h3>
									<h2>Collect marketing<br>leads</h2>
									<p class="mb-default">Move away from downloadable e-books or PDFs, and collect all responses from your lead magnets.</p>
									<p class="mb-default">Not only generate a lead, but understand how qualified they are based on their use of your lead magnet.</p>

									<p>
										<a href="#" class="button button-primary">Learn more</a>
									</p>
								</div>
							</div>
							<div class="col col-12 col-sm-6"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="block block-how">
				<div class="inner">
					<div class="block-wrapper">
						<div class="row bottom">
							<div class="col col-12 col-sm-6">
								<div class="copy">
									<h2>Here's how<br>TransForm works</h2>
									<p class="mb-default">Get started for free! Build your interactive toolkit in minutes.</p>

									<p>
										<a href="#" class="button button-primary">Talk to an expert</a>
									</p>
								</div>
							</div>
							<div class="col col-12 col-sm-6">
								<div class="copy">

									<div class="step">
										<h3><small>Step 1</small> <span>Create</span></h3>
										<p>You can make an interactive tool by digitizing your PDF or creating it using our builder from scratch. Add your content, and make it branded with your logo & colors.</p>
									</div>

									<div class="step">
										<h3><small>Step 2</small> <span>Share</span></h3>
										<p>Share your tool with your clients and students so they can start interacting with it. You can do it via a link or embedding it into other platforms.</p>
									</div>

									<div class="step">
										<h3><small>Step 3</small> <span>Analyze</span></h3>
										<p>Track activity for each tool. Analyze how your clients and students interact.</p>
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
						<h2>Get Started</h2>
						<p>Get started for free! Build your interactive toolkit in minutes.</p>

						<p>
							<a href="#" class="button button-primary">Talk to an expert</a>
						</p>
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

	.block {

		margin-bottom: 10vh;
	}

	.site-wrapper {

		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.site-main {

			flex: 1;
			padding-top: 57px;
			padding-bottom: 100px;
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

		@media @sm-n-above {

			background: transparent;
			border-bottom: 0;
		}

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

				padding-left: 3rem;
				padding-right: 3rem;
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
		overflow: hidden;
		padding-top: @margin-quad;

		@media @sm-n-above {

			padding-top: 0;
			min-height: 70vh;
		}

		.splash-wrapper {

			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			min-width: 100%;

			@media @sm-n-above {

				flex-direction: row;
				margin-bottom: @margin-double;
			}
		}

		.copy {

			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: @margin-double;

			@media @sm-n-above {

				margin-bottom: 0;
				text-align: left;
			}

			h1 {

				font-weight: 900;
				font-size: 2.5rem;
				line-height: 1;
				margin-bottom: @margin-default;

				@media @sm-n-above {

					font-size: 3.2rem;
				}
			}

			h2 {

				font-size: 1.5rem;
				margin-bottom: @margin-double;
				color: #AAA;
			}

			.button {

				border-radius: @radius-round;
				padding-left: 30px;
				padding-right: 30px;
				padding-top: 10px;
				padding-bottom: 10px;
				font-size: 1rem;

				@media @sm-n-above {

					padding-left: 60px;
					padding-right: 60px;
					padding-top: 20px;
					padding-bottom: 20px;
					font-size: 1.2rem;
					margin-right: @margin-double;
				}
			}
		}

		.col-anim {

			pointer-events: none;
		}
	}

	.block-share {

		.copy {

			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: @margin-double;

			@media @sm-n-above {

				margin-bottom: 0;
				text-align: left;
			}

			h2 {

				font-weight: 900;
				font-size: 2.5rem;
				line-height: 1;
				margin-bottom: @margin-default;
				text-align: right;

				@media @sm-n-above {

					font-size: 3.2rem;
				}
			}

			p {

				font-size: 1.5rem;
				margin-bottom: @margin-double;
				color: #AAA;
				text-align: right;
			}

			.button {

				border-radius: @radius-round;
				padding: 10px 30px;
				font-size: 1rem;

				@media @sm-n-above {

					padding: 20px 60px;
					font-size: 1.2rem;
				}
			}
		}

		.block-wrapper {

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
	}

	.block-build {

		margin-bottom: 10vh;

		.copy {

			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: @margin-double;

			@media @sm-n-above {

				margin-bottom: 0;
				text-align: left;
			}

			h3 {

				text-transform: uppercase;
				letter-spacing: 0.5rem;
				color: #AAA;
			}

			h2 {

				font-weight: 900;
				font-size: 2.5rem;
				line-height: 1;
				margin-bottom: @margin-default;

				@media @sm-n-above {

					font-size: 3.2rem;
				}
			}

			p {

				font-size: 1.5rem;
				margin-bottom: @margin-double;
				color: #AAA;
			}

			.button {

				border-radius: @radius-round;
				padding: 10px 30px;
				font-size: 1rem;

				@media @sm-n-above {

					padding: 20px 60px;
					font-size: 1.2rem;
				}
			}
		}
	}

	.block-how {

		margin-bottom: 10vh;

		.copy {

			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: @margin-double;

			@media @sm-n-above {

				margin-bottom: 0;
				text-align: left;
			}

			h2 {

				font-weight: 900;
				font-size: 2.5rem;
				line-height: 1;
				margin-bottom: @margin-default;

				@media @sm-n-above {

					font-size: 3.2rem;
				}
			}

			p {

				font-size: 1.5rem;
				margin-bottom: @margin-double;
				color: #AAA;
			}

			.button {

				border-radius: @radius-round;
				padding: 10px 30px;
				font-size: 1rem;

				@media @sm-n-above {

					padding: 20px 60px;
					font-size: 1.2rem;
				}
			}

			.step {

				border-bottom: 1px solid @border-1;
				margin-bottom: @margin-double;

				h3 {

					font-weight: 900;
					font-size: 1.5rem;
					line-height: 1;
					margin-bottom: @margin-default;

					small {
						display: block;
						font-size: 0.8rem;
						letter-spacing: 0.5rem;
						font-weight: normal;
						text-transform: uppercase;
					}

					@media @sm-n-above {

						font-size: 2.5rem;
					}
				}

				p {

					font-size: 1.2rem;
				}
			}
		}

		.block-wrapper {

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
	}

	.block-others {

		h2 {

			font-weight: 900;
			font-size: 2.5rem;
			line-height: 1;
			margin-bottom: @margin-default;

			@media @sm-n-above {

				font-size: 3.2rem;
			}
		}
	}

	.block-started {

		margin-bottom: 10vh;

		.copy {

			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: @margin-double;

			@media @sm-n-above {

				margin-bottom: 0;
				text-align: center;
			}

			h2 {

				font-weight: 900;
				font-size: 2.5rem;
				line-height: 1;
				margin-bottom: @margin-default;

				@media @sm-n-above {

					font-size: 3.2rem;
				}
			}

			p {

				font-size: 1.5rem;
				margin-bottom: @margin-double;
				color: #AAA;
			}

			.button {

				border-radius: @radius-round;
				padding: 10px 30px;
				font-size: 1rem;

				@media @sm-n-above {

					padding: 20px 60px;
					font-size: 1.2rem;
				}
			}

			.step {

				border-bottom: 1px solid @border-1;
				margin-bottom: @margin-double;

				h3 {

					font-weight: 900;
					font-size: 1.5rem;
					line-height: 1;
					margin-bottom: @margin-default;

					small {
						display: block;
						font-size: 0.8rem;
						letter-spacing: 0.5rem;
						font-weight: normal;
						text-transform: uppercase;
					}

					@media @sm-n-above {

						font-size: 2.5rem;
					}
				}

				p {

					font-size: 1.2rem;
				}
			}
		}

		.block-wrapper {

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
	}

	@keyframes float {
		0% { transform: translatey(0px); }
		50% { transform: translatey(-20px); }
		100% { transform: translatey(0px); }
	}

	@keyframes exams {
		0% { transform: translate(0); }
		100% { transform: translate(260px); }
	}

</style>