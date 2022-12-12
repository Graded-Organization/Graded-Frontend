<template>
	<div class="anim-wrapper">
		<div class="anim" id="sheet">
			<div id="sheet-layer" class="sheet">

				<div class="field field-name enter">
					<p>&nbsp;</p>
					<div class="field"></div>
				</div>


				<div class="field field-question enter">
					<p>&nbsp;</p>
					<div class="option option1"><div class="radio"></div> <span>&nbsp;</span></div>
					<div class="option option2"><div class="radio"></div> <span>&nbsp;</span></div>
					<div class="option option3"><div class="radio"></div> <span>&nbsp;</span></div>
				</div>

				<div class="field field-photo enter"></div>

				<div class="field field-open enter">
					<p>&nbsp;</p>
					<div class="field"></div>
				</div>

				<div class="field field-button enter">
					<a href="" class="button button-primary button-small button-pill">Submit</a>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Velocity from "velocity-animate";
	import 'velocity-animate/velocity.ui';

	export default {
		mounted() {

			/*let constrain = 50;
			let mouseOverContainer = document.getElementById("sheet");
			let sheetLayer = document.getElementById("sheet-layer");

			function transforms(x, y, el) {
				let box = el.getBoundingClientRect();
				let calcX = -(y - box.y - (box.height / 2)) / constrain;
				let calcY = (x - box.x - (box.width / 2)) / constrain;

				return "perspective(100px) "
				+ " rotateX("+ calcX +"deg) "
				+ " rotateY("+ calcY +"deg) ";
			};

			function transformElement(el, xyEl) {
				el.style.transform  = transforms.apply(null, xyEl);
			}

			mouseOverContainer.onmousemove = function(e) {
				let xy = [e.clientX, e.clientY];
				let position = xy.concat([sheetLayer]);

				window.requestAnimationFrame(function(){
					transformElement(sheetLayer, position);
				});
			};*/


			const name = document.querySelector('.field-name');
			const question = document.querySelector('.field-question');
			const photo = document.querySelector('.field-photo');
			const open = document.querySelector('.field-open');
			const button = document.querySelector('.field-button');

			// Text Input

			Velocity(name, 'transition.slideUpIn', { duration: 1000, complete: function() {
				this.typeWriter(document.querySelector('.field-name p'), 'Write your name', 0, function() {

					setTimeout(function() { name.classList.remove('enter');

						// Question

						Velocity(question, 'transition.slideUpIn', { delay: 1000, duration: 1000, complete: function() {

							this.typeWriter(document.querySelector('.field-question p'), 'What color is the sky?', 0, function() {

								this.typeWriter(document.querySelector('.field-question .option1 span'), 'Blue', 0);
								setTimeout(function() { this.typeWriter(document.querySelector('.field-question .option2 span'), 'Red', 0); }.bind(this), 500);
								setTimeout(function() { this.typeWriter(document.querySelector('.field-question .option3 span'), 'Who knows?', 0); }.bind(this), 1000);
								setTimeout(function() {

									question.classList.remove('enter');

									// Photo

									Velocity(photo, 'transition.slideUpIn', { delay: 1000, duration: 1000, complete: function() {

										setTimeout(function() {

											photo.classList.remove('enter');

											// Open-ended question

											Velocity(open, 'transition.slideUpIn', { delay: 1000, duration: 1000, complete: function() {
												this.typeWriter(document.querySelector('.field-open p'), 'Write an essay about the book "Crime and Punishment":', 0, function() {

													setTimeout(function() {

														open.classList.remove('enter');

														Velocity(button, 'transition.slideUpIn', { delay: 1000, duration: 1000, complete: function() {
															button.classList.remove('enter');
														} });

													}.bind(this), 500);
												}.bind(this));
											}.bind(this) });
										}.bind(this), 500);
									}.bind(this) });
								}.bind(this), 1500);
							}.bind(this));
						}.bind(this) });
					}.bind(this), 500);
				}.bind(this));
			}.bind(this) });

		},
		methods: {
			typeWriter(el, text, i, callback = null) {
				console.log('TYPEWRITER', text.length);

				if (i < text.length) {
					el.innerHTML += text.charAt(i);
					i++;
					setTimeout(function() { this.typeWriter(el, text, i, callback); }.bind(this), 50);

				} else {
					if(typeof callback == 'function') callback();
				}
			}
		}
	}

</script>

<style lang="less" scoped>

	.anim {

		width: 100%;
		font-size: 0.8rem;

		.sheet {

			width: 400px;
			max-width: 90vw;
			height: 500px;
			float: right;
			box-shadow: @shadow-3;

			& > .field {

				opacity: 0;
				transition: all 500ms;
			}
		}

		.field-name {

			background: white;
			position: absolute;
			width: 100%;
			padding: @margin-double @margin-default;
			top: 0;
			left: 0;

			.field {

				height: 30px;
				background: @background-2;
				border-radius: @radius-round;
				width: 100%;
			}

			&.enter {

				left: -100px;
				top: -30px;
				box-shadow: @shadow-3;
			}
		}

		.field-question {

			position: absolute;
			background: white;
			top: 102px;
			padding: @margin-default;
			left: 0;
			width: 50%;
			display: flex;
			justify-content: center;
			flex-direction: column;

			.option {

				display: flex;
				align-items: center;
				margin-bottom: 8px;

				.radio {

					width: 17px;
					height: 17px;
					margin-right: @margin-half;
					border-radius: @radius-round;
					background: @background-2;
				}
			}

			&.enter {

				left: -100px;
				top: 102px;
				box-shadow: @shadow-3;
			}
		}

		.field-photo {

			position: absolute;
			background: white;
			height: 150px;
			width: 50%;
			top: 102px;
			right: 0;
			background: url('@/assets/images/template/sky.jpg') center bottom no-repeat;
			background-size: cover;

			&.enter {

				right: -100px;
				top: 102px;
				box-shadow: @shadow-3;
			}
		}

		.field-open {

			position: absolute;
			background: white;
			width: 100%;
			padding: @margin-double @margin-default;
			top: 102px + 150px;
			left: 0;

			.field {

				height: 150px;
				background: @background-2;
				border-radius: @radius-2;
				width: 100%;
			}

			&.enter {

				left: -100px;
				top: 102px + 150px;
				box-shadow: @shadow-3;
			}
		}

		.field-button {

			position: absolute;
			background: white;
			width: 100%;
			text-align: right;
			padding: @margin-default;
			bottom: 0;
			left: 0;

			&.enter {

				left: 50px;
				bottom: -15px;
				box-shadow: @shadow-3;
			}
		}
	}

</style>