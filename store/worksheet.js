import Vue from 'vue';

export const state = () => ({
	worksheet: null,
	loading: false,
	currentBlock: null,
	currentBlockArea: '',
	toolAreas: {},
});

export const mutations = {
	setWorksheet(state, worksheet) { Vue.set(state, 'worksheet', worksheet); },
	updateName(state, name) { Vue.set(state.worksheet, 'name', name); },
	updateDescription(state, description) { Vue.set(state.worksheet, 'description', description); },
	updateContent(state, content) { Vue.set(state.worksheet, 'content', content); },
	setLoading(state, loading) { state.loading = loading; },
	addBlock(state, block) { state.blocks.push(block); },

	setWorksheetProp(state, prop) { Vue.set(state.worksheet.content, prop.name, prop.value); },

	setRows(state, rows) { Vue.set(state.worksheet.content, 'rows', rows); },
	setColumns(state, columns) { Vue.set(state.worksheet.content, 'columns', columns); },

	// Areas
	setAssignedAreas(state, assignedAreas) { Vue.set(state.worksheet.content, 'assignedAreas', assignedAreas); },
	deleteArea(state, area) { if(state.worksheet?.content?.assignedAreas) Vue.delete(state.worksheet.content.assignedAreas, area); },
	setAssignedArea(state, area) { if(state.worksheet?.content?.assignedAreas) Vue.set(state.worksheet.content.assignedAreas, area.name, area.value); },

	// Blocks
	setCurrentBlock(state, block) { Vue.set(state, 'currentBlock', block); },
	setCurrentBlockArea(state, area) { Vue.set(state, 'currentBlockArea', area); },
	setToolArea(state, area) { Vue.set(state.worksheet.content.toolAreas, area.name, area.value); },
	setToolAreas(state, areas) { Vue.set(state.worksheet.content, 'toolAreas', $nuxt.$shallow(areas)); },
	setToolAreaStyle(state, area) { Vue.set(state.worksheet.content.toolAreas[area.name], 'styles', area.value); },

	updateBlock(state, block) {

		let blockIndex = state.worksheet.blocks.findIndex(b => b.id == block.id);
		Vue.set(state.worksheet.blocks, blockIndex, block);
	}
}

export const actions = {
	setWorksheet({ commit }, payload) { commit('setWorksheet', payload); },
	setWorksheetProp({ commit }, payload) { commit('setWorksheetProp', payload); },
	updateContent({ commit }, payload) { commit('updateContent', payload); },
	setLoading({ commit }, payload) { commit('setLoading', payload); },
	addBlock({ commit }, payload) { commit('addBlock', payload); },

	setRows({ commit }, payload) { commit('setRows', payload); },
	setColumns({ commit }, payload) { commit('setColumns', payload); },

	// Areas
	setAssignedAreas({ commit }, payload) { commit('setAssignedAreas', payload); },
	deleteArea({ commit }, payload) { commit('deleteArea', payload); },
	setAssignedArea({ commit }, payload) { commit('setAssignedArea', payload); },

	// Blocks
	setCurrentBlock({ commit }, payload) { commit('setCurrentBlock', payload); },
	setCurrentBlockArea({ commit }, payload) { commit('setCurrentBlockArea', payload); },
	setToolAreas({ commit }, payload) { commit('setToolAreas', payload); },
	setToolArea({ commit }, payload) { commit('setToolArea', payload); },
	setToolAreaStyle({ commit }, payload) { commit('setToolAreaStyle', payload); },

	async fetchWorksheet({ commit }, payload) {
		const worksheet = await this.$axios.$get(`/worksheets/${ payload }?pdo[blocks]=getBlocks`);
		commit('setWorksheet', worksheet.data);
	},
	updateBlock({ commit }, payload) { commit('updateBlock', payload); }
}

export const getters = {
	worksheet: state => state.worksheet,
	loading: state => state.loading,

	assignedAreas: state => state.worksheet?.content?.assignedAreas || {},
	rows: state => state.worksheet.content.rows,
	columns: state => state.worksheet.content.columns,

	areas(state, getters) {

		let cells = [];

		for(var i = 0; i < getters.rows; i++) {

			cells[i] = [];

			for(var j = 0; j < getters.columns; j++) {

				let areaName = `area${ j }-${ i }`;

				if(state.worksheet) {
					if(typeof state.worksheet.content.assignedAreas[areaName] !== 'undefined') {

						Vue.set(cells[i], j, state.worksheet.content.assignedAreas[areaName]);
					} else {

						Vue.set(cells[i], j, areaName);
					}
				}

			}
		}
		return cells;
	},

	areasList: state => {

		if(state.worksheet?.content?.assignedAreas) return Object.values(state.worksheet.content.assignedAreas).filter((v, i, a) => a.indexOf(v) === i);
		return [];
	},

	toolAreas: state => state.worksheet.content.toolAreas,

	// Blocks
	currentBlock: (state, getters) => getters.blocks.find(b => b.area == state.currentBlockArea),
	currentBlockArea: state => state.currentBlockArea,


	blocks: (state, getters) => {

		let styledTools = $nuxt.$shallow(state.worksheet.blocks);

		for(const a in styledTools) {

			if(typeof getters.toolAreas[styledTools[a].area] !== 'undefined') {
				Vue.set(styledTools[a], 'styles', getters.toolAreas[styledTools[a].area].styles);
			}
		}

		return styledTools;
	},
}