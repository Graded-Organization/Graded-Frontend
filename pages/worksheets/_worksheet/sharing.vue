<template>
	<div class="section-dashboard-sharing" v-if="sharing">
		<div class="inner boxfix-vert">
			<div class="m-double">

				<toggle-switch
					v-model="sharing.public"
					label="Disable shared worksheet link"
					off-label="Enable shared worksheet link"
				/>

				<div class="card" v-if="sharing.public">
					<form-group>

						<div class="input-block form-control">
							<a @click.prevent="copy(`${ $config.baseUrl }/worksheet/${ worksheet.uid }`)" v-tooltip.right="'Click to copy link'">{{ $config.baseUrl }}/worksheet/{{ worksheet.uid }}</a>
						</div>
					</form-group>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';
	import WorksheetMixin from '../worksheet.mixin.js';

	const defaultSharing = {
		public: true
	};

	export default {
		name: 'WorkSheetPageSharing',
		middleware: 'auth',
		mixins: [ WorksheetMixin ],
		data: () => ({
			sharing: null,
		}),
		mounted() {

			if(!this.worksheet?.content?.sharing) {
				this.setWorksheetProp({name: 'sharing', value: defaultSharing});
			}

			this.setWorksheetProp({name: 'sharing', value: {...this.worksheet?.content?.sharing , ...defaultSharing}});

			Vue.set(this, 'sharing', this.$shallow(this.worksheet.content.sharing));
		},
		methods: {
			...mapActions({
				setWorksheetProp: 'worksheet/setWorksheetProp',
			}),
			async copy(text) {
				try {
					await this.$copyText(text);
				} catch (e) {
					console.error(e);
				}
			},
		}
	}
</script>

<style scoped lang="less">
</style>