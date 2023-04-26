<!--suppress VueMissingComponentImportInspection -->
<template>
	<div>
		<h2 class="drawer-title">Edit Tool Fields</h2>

		<worksheet-editor-drawer-block title="Formatting">
			<form-group class="form-group-color">
				<color-picker v-model="field.styles.backgroundColor" />
				<label>Background Color</label>
			</form-group>

			<form-group class="form-group-color">
				<color-picker v-model="field.styles.color" />
				<label>Text Color</label>
			</form-group>

			<form-group class="form-group-color">
				<color-picker v-model="field.styles.borderColor" />
				<label>Border Color</label>
			</form-group>

			<form-group label="Border Width">
				<form-group class="controls-group">
					<input v-model="borderWidth" type="number" class="input-block form-control">
					<span class="group-label">px</span>
				</form-group>
			</form-group>
		</worksheet-editor-drawer-block>

		<worksheet-editor-drawer-block title="Tool Info">

			<form-group label="Name">
				<input type="text" v-model="field.name" class="input-block form-control">
			</form-group>

			<form-group label="Placeholder" v-if="field.type !== 'multiple-choice-question'">
				<input
					type="text"
					v-model="field.content.placeholder"
					class="input-block form-control"
					placeholder="Enter a placeholder for the field"
				>
			</form-group>

			<form-group label="Field Type">
				<select v-model="field.type" class="input-block form-control">
					<option value="">Select a field type</option>
					<option value="short-text-input">Single line text</option>
					<option value="long-text-input">Multi-lined text</option>
					<option value="date-input">Date</option>
					<option value="number-input">Number</option>
					<option value="currency-input">Currency</option>
					<option value="multiple-choice-question">List of options</option>
				</select>
			</form-group>

			<form-group v-if="field.type === 'currency-input'" label="Predefined Currency">
				<currency-input v-model="field.content.predefined_currency" />
			</form-group>

		</worksheet-editor-drawer-block>

		<div class="p-default">
			<a
				href="#"
				class="button button-danger button-block"
				@click.prevent="removeField"
			>Remove Field</a>
		</div>

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
				required: true,
			},
		},
		watch: {
			field: {
				handler(n, o) {

					if(!o) return;

					this.blockUpdateKey = Math.floor(Date.now() / 1000);
					this.save();
					this.$emit('update', this.blockUpdateKey);
				},
				deep: true,
			},
		},
		data: () => ({
			field: '',
			blockUpdateKey: '',
		}),
		mounted() {

			console.log('this.field.styles', this.field);
			// check if field has styles
			if(!this.field.styles || !Object.keys(this.field.styles).length) {
				Vue.set(this.field, 'styles', {
					backgroundColor: 'rgba(237, 237, 237, 0.5)',
					color: '#333333',
					borderColor: 'transparent',
					borderWidth: 0,
				});
			}

		},
		computed: {
			borderWidth: {
				get() {
					return parseInt(this.field.styles.borderWidth);
				},
				set(value) {
					this.field.styles.borderWidth = `${ value }px`;
				},
			},
		},
		created() {
			this.field = this.$shallow(this.block);
		},
		methods: {
			...mapActions({
				setLoading: 'worksheet/setLoading',
				updateField: 'worksheet/updateField',
			}),
			async save() {

				if(!!this.source) this.source.cancel('User saved again');
				this.source = this.$axios.CancelToken.source();

				this.setLoading(true);
				await this.$axios.$put(`worksheet-blocks/${ this.field.id }`, this.field, {
					cancelToken: this.source.token,
				});
				this.updateField(this.$shallow(this.field));

				this.setLoading(false);
			},
			removeField() {
				// Send modal confirmation
				this.$modal.show('dialog', {
					title: 'Remove Field',
					text: 'Are you sure you want to remove this field?',
					buttons: [
						{
							title: 'Cancel',
							handler: () => {
								this.$modal.hide('dialog');
							},
						},
						{
							title: 'Remove',
							handler: () => {

								// Remove field with API
								this.$axios.$delete(`worksheet-blocks/${ this.field.id }`);

								//Clean up field from store (removeBlock)
								this.$store.commit('worksheet/removeBlock', this.field);

								this.$parent.close();

								this.$modal.hide('dialog');
							},
						},
					],
				});
			},
		},
	};
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