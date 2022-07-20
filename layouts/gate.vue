<template>
	<section class="section gate-layout">
		<div class="controls-area">
			<nuxt-child />
		</div>
		<div class="pretty-area">
			<fade-image
				class="pretty-image"
				src="http://chapi.test/unsplash/LvLek4U8-_U"
			/>
			<div class="color-overlay" />
		</div>
	</section>
</template>

<script>
	import { required, email } from 'vuelidate/lib/validators';

	export default {
		name: 'GateLayout',
		data: () => ({}),
		mounted() {},
		methods: {}
	};
</script>

<style lang="less">

	.gate-layout {

		overflow: hidden;
		display: flex;
		align-items: stretch;
		justify-content: flex-start;
		flex-direction: row;
		max-width: 100%;
		min-height: 600px;
		flex: 1;

		.controls-area {

			display: flex;
			flex-direction: column;
			flex: 1 1 auto;
			align-items: center;
			justify-content: center;
			width: 100%;

			@media @lg-n-above {

				z-index: 2;
				box-shadow: 7px 0 2.4px rgba(0, 0, 0, 0.014),
							16.8px 0 5.9px rgba(0, 0, 0, 0.02),
							31.7px 0 11px rgba(0, 0, 0, 0.025),
							56.5px 0 19.7px rgba(0, 0, 0, 0.03),
							105.7px 0 36.8px rgba(0, 0, 0, 0.036),
							253px 0 88px rgba(0, 0, 0, 0.05);

				min-width: 600px;
				max-width: 40%;
			}

			.logo-wrapper {

				text-align: center;
				background: var(--body-background);
				padding: @margin-double;
				border-radius: 2px 2px 0 0;
				box-sizing: border-box;
				width: 100%;
				margin: 0 auto;

				@media @lg-n-above {

					width: 40%;
					text-align: left;
					margin: 0;
					margin-bottom: @margin-default;
					background: none;
					padding: 0;
				}

				img { width: 100%; }

				svg {

					polygon,
					rect,
					path {

						fill: var(--green-5);
					}
				}
			}

			form {

				position: relative;
				width: 580px;
				max-width: 80%;
				box-sizing: border-box;
				background: var(--background-2);
				padding: @margin-double;
				padding-top: 0;
				border-radius: 0 0 2px 2px;

				@media @lg-n-above {

					padding: 0;
					background: none;
				}

				.form-copy {

					margin-bottom: @margin-default;
				}

				.form-fields {

					background: @body-background;
					border-radius: 2px;
					padding: @margin-half 0;
					margin-bottom: @margin-default;
				}

				&.form-login {

					box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
								0 6.7px 5.3px rgba(0, 0, 0, 0.028),
								0 12.5px 10px rgba(0, 0, 0, 0.035),
								0 22.3px 17.9px rgba(0, 0, 0, 0.042),
								0 41.8px 33.4px rgba(0, 0, 0, 0.05),
								0 100px 80px rgba(0, 0, 0, 0.07);
					background: var(--body-background);

					@media @lg-n-above { box-shadow: none; }
				}

				&.form-forgot {

					box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
								0 6.7px 5.3px rgba(0, 0, 0, 0.028),
								0 12.5px 10px rgba(0, 0, 0, 0.035),
								0 22.3px 17.9px rgba(0, 0, 0, 0.042),
								0 41.8px 33.4px rgba(0, 0, 0, 0.05),
								0 100px 80px rgba(0, 0, 0, 0.07);

					@media @lg-n-above { box-shadow: none; }
				}

				.form-actions {

					.action {

						text-align: center;
						margin-bottom: @margin-default;

						.button {

							padding-right: 0;
							padding-left: 0;
						}

						@media @lg-n-above {

							text-align: right;
						}

						&.action-remember {

							text-align: center;
							margin-bottom: @margin-third;
							font-size: 1rem;
							line-height: 38.56px;

							input {

								vertical-align: baseline;
							}

							@media @lg-n-above {

								margin-bottom: @margin-default;
								text-align: left;
							}
						}

						&.action-forgot {

							text-align: center;

							@media @lg-n-above {

								text-align: right;
							}
						}
					}

					.action-return-login {

						text-align: left;

						.button {

							height: 40px;
							width: 100%;
							padding-left: 0;
							text-align: left;

							@media @lg-n-above {

								width: auto;
							}
						}
					}

					.action-submit {

						text-align: right;

						.button {

							min-width: 150px;
							height: 40px;
							width: 100%;

							@media @lg-n-above {

								width: auto;
							}
						}
					}
				}
			}
		}

		.pretty-area {

			background: var(--dark);
			.overlay-element;
			z-index: -1;
			overflow: hidden;

			.pretty-image {

				object-fit: cover;
				.overlay-element();
				z-index: 0;
				filter: grayscale(1);
			}

			.color-overlay {

				.overlay-element();
				background-color: var(--green-5);
				mix-blend-mode: multiply;
			}

			@media @lg-n-above {

				.remove-overlay-element;
				z-index: 1;
				flex: 1 1 auto;
				position: relative;
				box-shadow: inset 5px 0 25px fade(black, 12.5%);
			}

			.pretty-quote {

				position: absolute;
				background: fade(black, 75%);
				right: @margin-default;
				box-sizing: border-box;
				max-width: 70%;
				bottom: @margin-default;
				text-align: right;
				padding: @margin-default;
				color: white;
				display: none;
				font-size: 1rem;
				line-height: 1.5;
				font-weight: 300;

				.pretty-quote-title {

					font-size: 0.8rem;
					text-transform: uppercase;
					letter-spacing: 2px;
					color: var(--primary);
					font-weight: bold;
				}

				@media @lg-n-above {

					display: block;
				}
			}
		}
	}

	.slide-big-enter-active,
	.slide-big-leave-active {

		transition: all 0.5s;
	}

	.slide-big-enter,
	.slide-big-leave-active {

		margin-top: -10vh;
		opacity: 0;
	}
</style>