<template>
	<div class="m-default">
		<p><nuxt-link to="dashboard">Access your account here</nuxt-link></p>

	</div>
</template>

<script>
	export default {
		name: 'IndexPage',
		methods: {
			async logout() {
				await this.$auth.logout();
			}
		}
	}
</script>