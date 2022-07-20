<template>
	<div
		class="form-group"
		:class="{ 'has-error': hasError }"
	>
		<label
			:for="id"
			v-if="label"
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
		<transition-slide>
			<div
				v-if="hasError"
				:class="['help-block', classes.label]"
			>
				<slot name="help-block"></slot>
			</div>
		</transition-slide>
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
			hasError: Boolean,
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