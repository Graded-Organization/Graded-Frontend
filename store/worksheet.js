import Vue from 'vue';

export const state = () => ({
	worksheet: null,
	loading: false
});

export const mutations = {
	setWorksheet(state, worksheet) { Vue.set(state, 'worksheet', worksheet); },
	updateName(state, name) { Vue.set(state.worksheet, 'name', name); },
	updateDescription(state, description) { Vue.set(state.worksheet, 'description', description); },
	updateContent(state, content) { Vue.set(state.worksheet, 'content', content); },
	setLoading(state, loading) { state.loading = loading; },
	addBlock(state, block) { state.blocks.push(block); }
}

export const actions = {
	setWorksheet({ commit }, payload) { commit('setWorksheet', payload); },
	updateContent({ commit }, payload) { commit('updateContent', payload); },
	setLoading({ commit }, payload) { commit('setLoading', payload); },
	addBlock({ commit }, payload) { commit('addBlock', payload); },
}

export const getters = {
	worksheet: state => { return state.worksheet; },
	loading: state => { return state.loading; },
}