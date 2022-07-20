<template>
	<div>
		<pre>{{ $auth.user }}</pre>
		<a href="#" @click.prevent="logout">Logout</a>
	</div>
</template>

<script>
	export default {
		name: 'IndexPage',
		middleware: 'auth',
		methods: {
			async logout() {
				await this.$auth.logout();
			}
		}
	}
</script>