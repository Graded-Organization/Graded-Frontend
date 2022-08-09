import { mapGetters, mapActions } from 'vuex';

export default {
	watch: {
		block: {
			handler(n, o) {
				this.blockUpdateKey = Math.floor(Date.now() / 1000);
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

			console.log('WAX');

			this.setLoading(true);
			await this.$axios.$put(`worksheet-blocks/${ this.block.id }`, this.block);
			this.setLoading(false);
		}
	},
}