<template>
	<div>
		<h2 class="drawer-title">Edit Woksheet Fields</h2>

		<worksheet-editor-drawer-block title="Tool Info">

			<form-group label="Name">
				<input type="text" v-model="field.name" class="input-block form-control">
			</form-group>

		</worksheet-editor-drawer-block>

		<portal-target name="tool-area-editor"></portal-target>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'PdfFieldEditor',
		props: {
			block: {
				type: Object,
				required: true
			}
		},
		watch: {
			field: {
				handler(n, o) {

					if(!o) return;

					this.blockUpdateKey = Math.floor(Date.now() / 1000);
					this.save();
					this.$emit('update', this.blockUpdateKey);
				},
				deep: true
			}
		},
		data: () => ({
			field: '',
			blockUpdateKey: ''
		}),
		computed: {
		},
		created() {
			this.field = this.$shallow(this.block);
		},
		methods: {
			...mapActions({
				setLoading: 'worksheet/setLoading',
				updateField: 'worksheet/updateField'
			}),
			async save() {

				if(!!this.source) this.source.cancel('User saved again');
				this.source = this.$axios.CancelToken.source();

				this.setLoading(true);
				await this.$axios.$put(`worksheet-blocks/${ this.field.id }`, this.field, {
					cancelToken: this.source.token
				});
				this.updateField(this.$shallow(this.field));

				this.setLoading(false);
			}
		}
	}
</script>

<style lang="less" scoped>

	.drawer-title {

		position: sticky;
		top: 0;
		padding: @margin-default;
		z-index: 100;
		background: @gray-1 url('~/assets/images/template/topology.png') center center no-repeat;
	}

</style>