import { mapGetters, mapActions } from 'vuex';

export default {
	watch: {
		block: {
			handler(n, o) {
				this.blockUpdateKey++;

				this.save();
			},
			deep: true
		}
	},
	props: {
		value: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		block: null,
		blockUpdateKey: 0
	}),
	mounted() { this.block = this.$shallow(this.value); },
	computed: {
		...mapGetters({ worksheet: 'worksheet/worksheet', loading: 'worksheet/loading' })
	},
	methods: {
		...mapActions({
			setLoading: 'worksheet/setLoading',
		}),
		async save() {

			this.setLoading(true);
			await this.$axios.$put(`worksheet-blocks/${ this.block.id }`, this.block);
			this.setLoading(false);
		}
	},
}