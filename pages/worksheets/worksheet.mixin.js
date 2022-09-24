import { mapGetters, mapActions } from 'vuex';

export default {
	data: () => ({
		source: null
	}),
	computed: {
		...mapGetters({
			worksheet: 'worksheet/worksheet',
			loading: 'worksheet/loading',
			blocks: 'worksheet/blocks'
		})
	},
	methods: {
		...mapActions({
			fetchWorksheet: 'worksheet/fetchWorksheet',
			setWorksheet: 'worksheet/setWorksheet',
			updateContent: 'worksheet/updateContent',
			setLoading: 'worksheet/setLoading',
		}),
		async save() {

			if(!!this.source) this.source.cancel('User saved again');
			this.source = this.$axios.CancelToken.source();

			this.setLoading(true);
			await this.$axios.$put(`worksheets/${ this.$route.params.worksheet }`, this.worksheet, {
				cancelToken: this.source.token
			});
			this.setLoading(false);
		}
	},
}