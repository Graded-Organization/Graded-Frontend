<template>
	<div>
		<pre v-if="$auth.user">{{ $auth.user }}</pre>
		<a href="#" @click.prevent="logout">Logout</a>
	</div>
</template>

<script>
	export default {
		name: 'DashboardPage',
		middleware: 'auth',
		methods: {
			async logout() {
				await this.$auth.logout();
			}
		}
	}
</script>