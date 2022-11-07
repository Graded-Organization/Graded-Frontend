<template>
	<div class="data-table">
		<ve-table
			ref="tableRef"
			id="loading-container"
			:checkbox-option="checkboxOption"
			:columns="tableColumns"
			:table-data="elements"
			v-bind="tableOptions"
			:sort-option="sortOption"
		/>
		<div class="data-table-footer">
			<ve-pagination
				:total="totalCount"
				:page-index="pageIndex"
				:page-size="pageSize"
				:page-size-option="perPage"
				@on-page-number-change="pageNumberChange"
				@on-page-size-change="pageSizeChange"
			/>
		</div>
	</div>
</template>

<script>

import Vue from 'vue';
import "~/assets/styles/plugins/index.css";
import "~/assets/styles/plugins/ve-table.less";
import {VeTable, VePagination, VeIcon} from "vue-easytable";

export default {
	name: 'DataTable',
	components: {VeTable, VePagination, VeIcon},
	data() {
		return {
			localUrlParams: {},
			pageSize: 25,
			pageIndex: 1,
			totalCount: 0,
			elements: [],
			loadingInstance: null,
			selectedRowKeysCollection: [],
			checkboxOption: {
				selectedRowKeys: [],
				selectedRowChange: ({row, isSelected, selectedRowKeys}) => {
					this.changeSelectedRowKeys(row, isSelected);
				},
				selectedAllChange: ({isSelected, selectedRowKeys}) => {
					this.changeSelectAll(isSelected, selectedRowKeys);
				},
			},
			sortOption: {
				sortChange: (params) => {
					this.sortChange(params);
				},
			},
		}
	},
	props: {
		value: {
			type: Array,
			default: () => ([]),
		},
		url: {
			type: String,
			required: true
		},
		columns: {
			type: Array,
			default: () => ([]),
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		classes: {
			type: Object,
			default: () => ({}),
		},
		perPage: {
			type: Array,
			default: () => ([5, 10, 25, 50, 100]),
		}
	},
	created() {
		window.addEventListener('resize', this.resizeTable);
	},
	destroyed() {
		window.removeEventListener('resize', this.resizeTable);
	},
	mounted() {
		this.loadingInstance = this.$veLoading({
			target: document.querySelector("#loading-container"),
			name: "wave",
		});

		this.remoteData();
		this.$nextTick(() => {
			this.resizeTable();
		});
	},
	computed: {
		urlParams() {

			let params = {
				page: this.pageIndex,
				show: this.pageSize,
				...this.localUrlParams
			};

			return this.serialize(params);
		},
		tableData: {
			get() {
				return this.value;
			},
			set(data) {
				this.$emit('input', data);
			},
		},
		uid() {
			return this._uid;
		},
		tableColumns() {

			return [
				{
					field: '',
					key: 'checkbox',
					type: 'checkbox',
					title: '',
					width: 50,
					align: 'center',
				},
				...this.columns
			]
		},
		tableOptions() {

			return {
				fixedHeader: true,
				resizable: true,
				rowKeyFieldName: 'id',
				...this.options
			}
		}
	},
	methods: {
		resizeTable() {

			//this.maxHeight = `${ this.$el.parentElement.clientHeight - 55 }px`;
			console.log('Max Height', this.maxHeight);
		},
		serialize(obj) {

			var str = [];
			for (var p in obj)
				if (obj.hasOwnProperty(p)) {
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				}
			return str.join("&");
		},
		async remoteData() {

			this.loadingInstance.show();

			this.scrollY(0);
			const elements = await this.$axios.$get(`${this.url}?${this.urlParams}`);

			this.totalCount = elements.count;

			Vue.set(this, 'elements', elements.data);
			this.loadingInstance.close();
		},
		scrollY(val) {
			this.$refs['tableRef'].scrollTo({top: val, behavior: 'smooth'});
		},

		sortChange(params) {

			Object.entries(params).forEach(([key, value]) => {

				if (value === 'asc' || value === 'desc') {
					Vue.set(this.localUrlParams, 'by', key);
					Vue.set(this.localUrlParams, 'sort', value);

				} else {

					if (this.localUrlParams.by == key) {
						Vue.delete(this.localUrlParams, 'by');
						Vue.delete(this.localUrlParams, 'sort');
					}
				}
			});

			this.remoteData();
		},

		pageNumberChange(pageIndex) {

			this.pageIndex = pageIndex;
			this.remoteData();
		},

		pageSizeChange(pageSize) {

			this.pageIndex = 1;
			this.pageSize = pageSize;
			this.remoteData();
		},

		// selected rowKeys change
		changeSelectedRowKeys(row, isSelected) {
			const rowKey = row.id;

			if (isSelected) {
				this.checkboxOption.selectedRowKeys.push(rowKey);
				this.selectedRowKeysCollection.push(rowKey);
			} else {
				const index = this.checkboxOption.selectedRowKeys.indexOf(rowKey);
				this.checkboxOption.selectedRowKeys.splice(index, 1);
				this.selectedRowKeysCollection.splice(index, 1);
			}
		},

		// select all change
		changeSelectAll(isSelected, selectedRowKeys) {
			var obj = this;

			obj.checkboxOption.selectedRowKeys = selectedRowKeys;

			if (isSelected) {
				obj.selectedRowKeysCollection =
					obj.selectedRowKeysCollection.concat(selectedRowKeys);
			} else {
				obj.elements.forEach((item) => {
					if (obj.selectedRowKeysCollection.indexOf(item.id) > -1) {
						obj.selectedRowKeysCollection.splice(obj.selectedRowKeysCollection.indexOf(item.id), 1);
					}
				});
			}
		},

		// reset selectedRowKeys
		resetSelectedRowKeys() {
			this.checkboxOption.selectedRowKeys = [];

			const selectedRowKeysCollection = this.selectedRowKeysCollection;

			if (selectedRowKeysCollection.length) {
				this.elements.forEach((item) => {
					if (selectedRowKeysCollection.indexOf(item.id) > -1) {
						this.checkboxOption.selectedRowKeys.push(item.id);
					}
				});
			}
		},
	}
}
</script>

<style lang="less">

.data-table {

	.data-table-footer {

		padding-top: @margin-default;
		text-align: right;
	}
}

</style>
