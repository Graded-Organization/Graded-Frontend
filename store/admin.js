import Vue from 'vue';

export const state = () => ({
	drawerState: 'closed',
	drawerTitle: '',
	drawerComponents: [],
});

export const mutations = {
	setDrawerComponents(state, components) { Vue.set(state, 'drawerComponents', components); },
	setDrawerState(state, ds) { state.drawerState = ds; },
	setDrawerTitle(state, title) { state.drawerTitle = title; },
	openDrawer(state) { state.drawerState = 'open'; }
}

export const actions = {
	setDrawerComponents({ commit }, payload) { commit('setDrawerComponents', payload); },
	setDrawerState({ commit }, payload) { commit('setDrawerState', payload); },
	setDrawerTitle({ commit }, payload) { commit('setDrawerTitle', payload); },
	openDrawer({ commit }) { commit('openDrawer'); }
}

export const getters = {
	drawerComponents: state => { return state.drawerComponents; },
	drawerState: state => { return state.drawerState },
	drawerTitle: state => { return state.drawerTitle }
}