<template>
	<div class="inner boxfix-vert">
		<div class="m-default">
			<pre v-if="$auth.user">{{ $auth.user }}</pre>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DashboardPage',
		middleware: 'auth',
		layout: 'platform',
		methods: {}
	}
</script>