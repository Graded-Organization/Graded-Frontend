<template>
	<img
		class="avatar"
		:src="`${ $config.apiUrl }/users/${ uID }/avatar`"
		:alt="nicename"
	>
</template>
<script>
	import Vue from 'vue';

	export default {
		name: 'UserDetails',
		props: {
			user: {
				type: Object,
				default: () => {}
			},
			userId: {
				type: [Number, String],
				defualt: 0,
			},
			userNiceName: {
				type: String,
				default: ''
			}
		},
		computed: {
			uID() { return this.user?.id ?? this.userId; },
			nicename() { return this.user?.nicename || this.userNiceName; }
		}
	};
</script>