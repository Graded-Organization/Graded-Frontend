<template>
	<div>
		<div class="user-details m-default">
			<div class="text-center">
				<user-avatar :user="user" class="user-avatar" />
				<p>{{ user.nicename || 'User' }}</p>
				<p><small><a @click.prevent="emailCallback()">{{ user.login }}</a></small></p>
			</div>
		</div>

		<div class="details-block">
			<div class="title">
				<a
					href="#"
					@click.prevent="orders = !orders"
				>
					<i
						class="la la-fw"
						:class="{ 'la-angle-right' : !orders, 'la-angle-down': orders }"
					/>
				</a>
				<h2>Orders</h2>
			</div>
			<transition-slide>
				<div class="body" v-show="orders">
					<p>No Orders</p>
				</div>
			</transition-slide>
		</div>

		<div class="details-block">
			<div class="title">
				<a
					href="#"
					@click.prevent="groups = !groups"
				>
					<i
						class="la la-fw"
						:class="{ 'la-angle-right' : !groups, 'la-angle-down': groups }"
					/>
				</a>
				<h2>Groups</h2>
			</div>
			<transition-slide>
				<div class="body" v-show="groups">
					<p>No Groups</p>
				</div>
			</transition-slide>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserDetails',
		props: {
			user: {
				type: Object,
				required: true,
			}
		},
		data: () => ({
			orders: true,
			groups: true
		}),
		methods: {
		}
	}
</script>

<style lang="less" scoped>

	.user-avatar {

		display: block;
		margin: 0 auto;
		margin-bottom: @margin-default;
	}

	.details-block {

		margin-bottom: -1px;

		.title {

			padding: @margin-default;
			display: flex;
			border-top: 1px solid @border-1;
			border-bottom: 1px solid @border-1;

			h2 {

				margin-right: auto;
			}

			a {

				color: inherit;
			}
		}

		.body {

			padding: @margin-default;
			border-bottom: 1px solid @border-1;
		}
	}

</style>