import { mapGetters, mapActions } from 'vuex';

export default {

	computed: {
		...mapGetters({ worksheet: 'worksheet/worksheet', loading: 'worksheet/loading' })
	},
	methods: {
		...mapActions({
			setWorksheet: 'worksheet/setWorksheet',
			updateContent: 'worksheet/updateContent',
			setLoading: 'worksheet/setLoading',
		}),
		async save() {

			this.setLoading(true);
			await this.$axios.$put(`worksheets/${ this.$route.params.worksheet }`, this.worksheet);
			this.setLoading(false);
		}
	},
}