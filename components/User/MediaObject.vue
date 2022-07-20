<template>
	<div class="media-object media-object-block">
		<user-avatar class="media" :user="user" width="30px" />
		<div class="media-body">
			<p class="user-nicename">
				{{ user.nicename || 'User' }}
				<a href="#" @click.prevent="previewCallback" class="button button-primary button-xsmall button-preview">Preview</a>
			</p>
			<p>
				<small><a @click.prevent="emailCallback">{{ user.login }}</a></small>
			</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions  } from 'vuex';

	export default {
		name: 'UserMediaObject',
		props: {
			user: {
				type: Object,
				required: true,
			}
		},
		data: () => ({
		}),
		methods: {
			...mapActions({
				openDrawer: 'admin/openDrawer',
				setDrawerTitle: 'admin/setDrawerTitle',
				setDrawerComponents: 'admin/setDrawerComponents'
			}),
			emailCallback() {

				this.$emit('email-clicked', this.user);
			},
			previewCallback() {

				this.openDrawer();
				this.setDrawerTitle(this.user.nicename);

				this.setDrawerComponents([
					{
						type: 'UserDetails',
						props: {
							user: this.user
						}
					}
				]);

				this.$emit('preview', this.user);
			}
		}
	}
</script>

<style lang="less">

	.media-object {

		.media-body {

			p {

				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.user-nicename {

				line-height: 2;
				margin-bottom: -3px;
			}
		}

		.button-preview {

			display: none;
		}

		&:hover {

			.button-preview {

				display: inline-block;
			}
		}
	}


</style>