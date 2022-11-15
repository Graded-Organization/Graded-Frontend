<template>
	<div class="data-table">
		<vue-good-table
			:columns="columns"
			:rows="rows"
			:fixed-header="true"
			mode="remote"
			:max-height="maxHeight"
			:total-rows="count"
			:pagination-options="{ enabled: true, mode: 'pages', position: 'bottom' }"
			@on-page-change="onPageChange"
			@on-per-page-change="onPerPageChange"
			@on-sort-change="onSortChange"
		>
			<template slot="table-row" slot-scope="props">
				<template v-for="key in tableSlotsKeys">
					<slot v-if="props.column.field == key" :name="key" />
					<template v-else>{{props.formattedRow[props.column.field]}}</template>
				</template>
			</template>
		</vue-good-table>
	</div>
</template>

<script>
	export default {
		name: 'GradedDataTable',
		props: {
			url: {
				type: String,
				required: true
			},
			columns: {
				type: Array,
				default: () => ([]),
			},
			maxHeight: {
				type: String,
				default: '200px'
			}
		},
		data: () => ({
			page: 1,
			show: 10,
			by: 'id',
			sort: 'desc',
			rows: [],
			count: 0
		}),
		mounted() {

			this.getRows();
		},
		computed: {
			tableSlotsKeys() {
				return Object.keys(this.$scopedSlots);
			},
			tableSlots() {
				return Object.values(this.$scopedSlots);
			}
		},
		methods: {

			onPageChange(params) {

				console.log(params);

				this.page = params.currentPage;
				this.getRows();
			},

			onPerPageChange(params) {

				this.show = params.currentPerPage;
				this.getRows();
			},

			onSortChange(params) {

				if(params[0].type != 'none') {

					this.by = params[0].field;
					this.sort = params[0].type;

				} else {

					this.by = 'id';
					this.sort = 'desc';
				}


				this.getRows();
			},

			async refresh() {

				await this.getRows();
			},

			async getRows() {

				const params = {
					page: this.page,
					show: this.show,
					sort: this.sort,
					by: this.by
				};

				const queryString = '?' + new URLSearchParams(params).toString();

				const apps = await this.$axios.$get(`${this.url}${queryString}`);

				this.count = apps.count;
				this.rows = apps.data;
			}
		}
	}
</script>

<style lang="less" scoped>

</style>