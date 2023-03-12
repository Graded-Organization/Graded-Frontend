<template>
	<div class="anim-wrapper js-tilt">
		<div class="sheet is-zoomed">
			<div class="area area1 is-init"></div>
			<div class="area area2 is-init"></div>
			<div class="area area3 is-init"></div>
			<div class="area area4 is-init"></div>
			<div class="area area5 is-init"></div>

			<div class="user user1"></div>
			<div class="user user2"></div>
			<div class="user user3"></div>
			<div class="user user4"></div>
		</div>
	</div>
</template>

<script>
	import VanillaTilt from 'vanilla-tilt';
	import Velocity from 'velocity-animate';
	import 'velocity-animate/velocity.ui';

	export default {
		name: 'HomeSplash',
		mounted() {

			this.presentSheet();
		},
		methods: {
			async presentSheet() {

				const sheet = document.querySelector('.sheet');
				const areas = document.querySelectorAll('.area');
				const users = document.querySelectorAll('.user');

				await Velocity(sheet, { scale: 0.25 }, { easing: 'easeInQuad', duration: 100 });

				await Velocity(sheet, { top: '20%', opacity: 1 }, { easing: 'easeInQuad', duration: 1000 });
				await Velocity(sheet, { scale: 1 }, { easing: 'easeInQuad', duration: 1000 });

				await Velocity(areas[0], { opacity: 1 }, { easing: 'easeInQuad', delay: 100, duration: 300 });
				await Velocity(areas[1], { opacity: 1 }, { easing: 'easeInQuad', delay: 100, duration: 300 });
				await Velocity(areas[2], { opacity: 1 }, { easing: 'easeInQuad', delay: 100, duration: 300 });
				await Velocity(areas[3], { opacity: 1 }, { easing: 'easeInQuad', delay: 100, duration: 300 });
				await Velocity(areas[4], { opacity: 1 }, { easing: 'easeInQuad', delay: 100, duration: 300 });

				await Velocity(areas, {
					marginLeft: 0,
					marginTop: 0,
					marginBottom: 0,
					marginRight: 0,
				}, { easing: 'easeInOutQuint', duration: 1000 });

				await Velocity(sheet, { scale: 0.5, top: 0 });

				await Velocity(users[0], { opacity: 1, top: '150%' }, {
					easing: 'easeInQuad',
					delay: 100,
					duration: 300,
				});
				await Velocity(users[1], { opacity: 1, top: '150%' }, {
					easing: 'easeInQuad',
					delay: 100,
					duration: 300,
				});
				await Velocity(users[2], { opacity: 1, top: '150%' }, {
					easing: 'easeInQuad',
					delay: 100,
					duration: 300,
				});
				await Velocity(users[3], { opacity: 1, top: '150%' }, {
					easing: 'easeInQuad',
					delay: 100,
					duration: 300,
				});

				Velocity(users[0], { top: 0, left: 0, width: '10%' }, { easing: 'easeInQuad', duration: 500 });
				Velocity(users[1], { top: 0, left: '48%', width: '10%' }, {
					easing: 'easeInQuad',
					delay: 10,
					duration: 500,
				});
				Velocity(users[2], { top: '33%', left: 0, width: '10%' }, {
					easing: 'easeInQuad',
					delay: 20,
					duration: 500,
				});
				Velocity(users[3], { top: '65%', left: 0, width: '10%' }, {
					easing: 'easeInQuad',
					delay: 30,
					duration: 500,
				});
				await Velocity(sheet, { scale: 1.1, top: '20%', duration: 1000 });

				await Velocity(sheet, { opacity: 0 }, { easing: 'easeOutQuad', duration: 500, delay: 2000 });

				Velocity(sheet, {
						top: '60%',
						scale: 1,
					},
					{ duration: 10 });

				Velocity(areas, {
						opacity: 0,
					},
					{ duration: 10 });

				Velocity(areas[0], { marginLeft: '-30%', marginTop: '-20%' }, { duration: 10 });
				Velocity(areas[1], { marginRight: '-10%', marginTop: '-12%' }, { duration: 10 });
				Velocity(areas[2], { marginLeft: '-25%' }, { duration: 10 });
				Velocity(areas[3], { marginLeft: '-26%', marginBottom: '-20%' }, { duration: 10 });
				Velocity(areas[4], { marginRight: '-15%' }, { duration: 10 });

				Velocity(users, {
						top: '180%',
						width: '30%',
						opacity: 0,
					},
					{ duration: 10 });

				Velocity(users[0], { left: '-50%' }, { duration: 10 });
				Velocity(users[1], { left: '10%' }, { duration: 10 });
				Velocity(users[2], { left: '70%' }, { duration: 10 });
				Velocity(users[3], { left: '130%' }, { duration: 10 });

				await this.presentSheet();
			},
		},
	};
</script>

<style lang="less" scoped>

	.anim-wrapper {
		aspect-ratio: 1;
	}

	.sheet {

		font-family: 'Flow Block', sans-serif;
		width: 50%;
		height: 60%;
		margin: 0 auto;
		border-radius: @radius-3;
		background: white;
		top: 60%;
		opacity: 0;

		box-shadow: 1.2px 0px 2.2px rgba(0, 0, 0, 0.02),
		2.9px 0.1px 5.3px rgba(0, 0, 0, 0.028),
		5.4px 0.1px 10px rgba(0, 0, 0, 0.035),
		9.6px 0.2px 17.9px rgba(0, 0, 0, 0.042),
		18px 0.4px 33.4px rgba(0, 0, 0, 0.05),
		43px 1px 80px rgba(0, 0, 0, 0.07);

		.area {

			position: absolute;
			padding: 1rem;
			border-radius: @radius-2;
			background: #EEE;
			box-sizing: border-box;
			opacity: 0;

			&.area1 {

				width: 45%;
				top: 3.5%;
				left: 3.5%;
				height: 29%;
				margin-left: -30%;
				margin-top: -20%;
			}

			&.area2 {

				width: 45%;
				top: 3.5%;
				right: 3.5%;
				height: 29%;
				margin-right: -20%;
				margin-top: -12%;
			}

			&.area3 {

				top: 29% + 6%;
				width: 100% - 7%;
				height: 29%;
				left: 3.5%;
				margin-left: -25%;
			}

			&.area4 {

				width: 45%;
				bottom: 3.5%;
				left: 3.5%;
				height: 29%;
				margin-left: -26%;
				margin-bottom: -20%;
			}

			&.area5 {

				width: 45%;
				bottom: 3.5%;
				right: 3.5%;
				height: 29%;
				margin-right: -15%;
			}
		}

		.user {

			position: absolute;
			aspect-ratio: 1;
			width: 30%;
			border-radius: @radius-round;
			background: #0c8599;
			top: 180%;
			opacity: 0;

			&.user1 {

				left: -60% + 10%;
			}

			&.user2 {

				background: #d9480f;
				left: 0 + 10%;
			}

			&.user3 {

				background: #f79d03;
				left: 60% + 10%;
			}

			&.user4 {

				background: hotpink;
				left: 120% + 10%;
			}
		}
	}
</style>