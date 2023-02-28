<template>
	<div
		@click.prevent="enableEditable"
		v-click-outside="disableEditable"
	>
		<contenteditable
			:tag="tag"
			:id="id"
			:contenteditable="isEditable"
			v-model="content"
			:noNL="noNL"
			:noHTML="noHTML"
			:placeholder="defaultText"
			@returned="disableEditable"
			:class="['contenteditable', classes.contenteditable, content == defaultText ? 'no-content' : '']"
		/>
		<slot :is-editable="isEditable"></slot>
	</div>
</template>

<script>
	export default {
		name: 'GradedContentEditable',
		props: {
			value: {
				type: String,
				required: true,
			},
			tag: {
				type: String,
				default: 'div',
			},
			defaultText: {
				type: String,
				default: 'No value',
			},
			noNL: {
				type: Boolean,
				default: true,
			},
			noHTML: {
				type: Boolean,
				default: true,
			},
			classes: {
				type: Object,
				default: () => ({}),
			},
		},
		data: () => ({
			content: '',
			id: null,
			isEditable: false,
		}),
		mounted() {
			this.id = 'content_editable_' + this._uid;
			this.content = this.value;

			if(this.defaultText && !this.content) this.content = this.defaultText;
		},
		methods: {
			enterPressed() { },
			placeCaretAtEnd(el) {
				el.focus();
				if(typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {

					var range = document.createRange();
					range.selectNodeContents(el);
					range.collapse(false);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);

				} else if(typeof document.body.createTextRange != 'undefined') {

					var textRange = document.body.createTextRange();
					textRange.moveToElementText(el);
					textRange.collapse(false);
					textRange.select();
				}
			},
			enableEditable() {

				if(this.defaultText && !this.content || this.content == this.defaultText) this.content = '';

				if(!this.isEditable) {
					setTimeout(function() { this.placeCaretAtEnd(document.getElementById(this.id)); }.bind(this), 0);
				}

				this.isEditable = true;
			},
			disableEditable() {

				if(this.defaultText && !this.content) this.content = this.defaultText;

				this.isEditable = false;
				this.$emit('input', this.content);
			},
		},
	};
</script>

<style lang="less" scoped>

	.no-content {

		color: @body-color-muted;
	}

	[placeholder]:empty:before {

		content: attr(placeholder);
		color: @body-color-muted;
	}

</style>