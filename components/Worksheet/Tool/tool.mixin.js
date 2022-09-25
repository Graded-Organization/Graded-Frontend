import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';

export default {
	props: {
		value: {
			type: Object,
			required: true,
		},
		respondedAnswer: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		source: null,
		block: null,
		blockUpdateKey: 0,
		answer: null
	}),
	watch: {
		respondedAnswer: {
			handler(n, o) {
				console.log('Getting responded answers', n, o);
				if(this.respondedAnswer?.answer) Vue.set(this, 'answer', this.respondedAnswer.answer);
			},
			deep: true
		},
		answer(n, o) {

			console.log('UPDATING value', n, o);

			if(JSON.stringify(n) != JSON.stringify(o)) {

				this.$emit('response', {

					id: this.block.id,
					answer: n
				});
			}
		}
	},
	mounted() {
		this.block = this.$shallow(this.value);
	},
	computed: {
		...mapGetters({
			worksheet: 'worksheet/worksheet',
			loading: 'worksheet/loading',
			currentBlock: 'worksheet/currentBlock',
			currentBlockArea: 'worksheet/currentBlockArea',
		}),
		contrastColor() {
			if(this.value.styles?.backgroundColor) {
				return this.$contrastColor(this.value.styles?.backgroundColor);
			}

			return '';
		},
		isCurrentBlock() {

			return this.block?.id == this.currentBlock?.id;
		}
	},
	methods: {
		...mapActions({
			setLoading: 'worksheet/setLoading',
			updateBlock: 'worksheet/updateBlock'
		}),
	},
}