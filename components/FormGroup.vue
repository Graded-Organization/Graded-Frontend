<template>
	<div class="form-group">
		<label :for="id" v-if="label"
			:class="['control-label', classes.label]"
		>
			<slot name="label">{{ label }}</slot>
			<span
				v-if="required"
				class="required"
			>
				*
			</span>
		</label>
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'FormGroup',
		props: {
			label: {
				type: String,
				required: false
			},
			required: Boolean,
			classes: {
				type: Object,
				default: () => ({}),
			},
		},
		created() {
			this.id = this.$attrs.gid;
		},
		data: () => ({})
	};
</script>