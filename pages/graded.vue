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

			<div class="block block-splash">
				<div class="inner">

					<div class="splash-wrapper">
						<div class="col col-6">
							<div class="copy">
								<h1>Worksheets<br>that work.</h1>
								<h2>Make them your own and engage tons of users.</h2>

								<p>
									<a href="#" class="button button-primary">Register</a>
									<a href="#" class="button button-ghost-primary">Learn more</a>
								</p>
							</div>
						</div>
						<div class="col col-6 col-anim">
							<graded-splash-anim />
						</div>
					</div>
				</div>
			</div>

			<div class="block block-ai">
				<div class="inner">
					<div class="m-default">
						<h2>Unlock the Power of AI with Worksheet Management — Made Easy!</h2>

						<div class="row flexcol">
							<div class="col col-12 col-sm-6">
								<div class="the-content">
									<p>With our unique grading system, you will be able to create open-ended questions that the computer will be able to grade.</p>
									<p>Our system will allow you to create questions that can be answered in multiple ways, and the computer will be able to accurately grade them based on the criteria you specify. You will also be able to customize the feedback for each answer to ensure the best understanding of the material.</p>
								</div>

							</div>
							<div class="col col-12 col-sm-6">
								<div class="animation">
									<img src="@/assets/images/template/graded-bot.png" alt="Graded Bot" class="graded-bot">
									<img src="@/assets/images/template/machine.gif" alt="Graded Bot" class="machine">

									<div class="exams-wrapper">
										<div class="exams"></div>
									</div>
									<div class="exams-graded-wrapper">
										<div class="exams"></div>
									</div>

									<div class="belt"></div>

									<div class="gradient-left"></div>
									<div class="gradient-right"></div>
								</div>
							</div>
						</div>
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
	import Logo from "~/assets/images/template/logo-mono.svg?inline";

	export default {
		name: 'IndexPage',
		components: { Logo },
		mounted() {
		},
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
			padding-top: 57px;
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
		background: white;
		z-index: 100;

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

					font-size: 5rem;
				}
			}

			h2 {

				font-size: 1.5rem;
				margin-bottom: @margin-double;
				color: #AAA;
				padding: 0 @margin-double;
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

	.block-ai {

		background: @background-1;
		padding: @margin-quad*2 0;

		h2 {

			text-align: center;
			font-weight: 900;
			font-size: 2rem;
			line-height: 1;
			margin-bottom: @margin-double;
		}

		.the-content {

			p {

				line-height: 1.5;
				font-size: 1.2rem;
			}
		}

		.animation {

			height: 200px;
			width: 100%;

			img { image-rendering: pixelated; }

			.graded-bot {

				width: 66*2px;
				animation: float 6s ease-in-out infinite;
				position: absolute;
				right: 20px;
				bottom: 0;
				z-index: 10;
			}

			.machine {

				width: 43*2px;
				position: absolute;
				left: 45%;
				bottom: -4px;
				z-index: 2;
			}

			.belt {

				image-rendering: pixelated;
				background: url('@/assets/images/template/belt.png') center center repeat-x;
				background-size: auto 100%;
				width: 100%;
				height: 50px;
				position: absolute;
				bottom: 0;
				z-index: 1;
			}

			.exams-wrapper {

				height: 17px*2;
				position: absolute;
				bottom: 70px;
				width: 50%;
				z-index: 1;
				overflow: hidden;

				.exams {

					image-rendering: pixelated;
					background: url('@/assets/images/template/exam.png') center center repeat-x;
					background-size: auto 100%;
					width: 2600px;
					margin-left: -2600/2px;
					height: 17px*2;
					animation: exams 6s linear infinite;
				}
			}

			.exams-graded-wrapper {

				height: 17px*2;
				position: absolute;
				bottom: 70px;
				right: 0;
				width: 50%;
				z-index: 1;
				overflow: hidden;

				.exams {

					image-rendering: pixelated;
					background: url('@/assets/images/template/exam-graded.png') center center repeat-x;
					background-size: auto 100%;
					width: 2600px;
					margin-left: -2600/2px;
					height: 17px*2;
					animation: exams 6s linear infinite;
				}
			}

			.gradient-left {

				width: 100px;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				background: rgb(241,243,245);
				background: linear-gradient(90deg, rgba(241,243,245,1) 0%, rgba(241,243,245,0.48783263305322133) 35%, rgba(241,243,245,0) 100%);
				z-index: 10;
			}

			.gradient-right {

				width: 100px;
				height: 100%;
				position: absolute;
				right: 0;
				top: 0;
				background: rgb(241,243,245);
				background: linear-gradient(270deg, rgba(241,243,245,1) 0%, rgba(241,243,245,0.48783263305322133) 35%, rgba(241,243,245,0) 100%);
				z-index: 2;
			}
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