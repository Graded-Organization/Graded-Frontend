import Vue from 'vue';

export const state = () => ({
	avatarCacheKey: 0,
});

export const mutations = {
	updateAvatarCacheKey(state, components) { state.avatarCacheKey++; },
}

export const actions = {
	updateAvatarCacheKey({ commit }, payload) { commit('updateAvatarCacheKey', payload); },
}

export const getters = {
	avatarCacheKey: state => { return state.avatarCacheKey; }
}