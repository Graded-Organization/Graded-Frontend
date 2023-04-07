<template>
	<img
		class="avatar"
		:src="`${ $config.apiUrl }/users/${ uID }/avatar`"
		:alt="nicename"
	>
</template>
<script>

	export default {
		name: 'UserDetails',
		props: {
			user: {
				type: Object,
				default: () => {}
			},
			userId: {
				type: [Number, String],
				default: 0,
			},
			userNicename: {
				type: String,
				default: ''
			}
		},
		computed: {
			uID() { return this.user?.id ?? this.userId; },
			nicename() { return this.user?.nicename || this.userNicename; }
		}
	};
</script>