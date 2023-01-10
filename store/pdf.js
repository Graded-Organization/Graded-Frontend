import Vue from 'vue';

export const state = () => ({
	answers: [],
	application: null
});

export const mutations = {
	setAnswers(state, answers) { Vue.set(state, 'answers', answers); },
	setApplication(state, application) { state.application = application; },
}

export const actions = {
	setAnswers({ commit }, payload) { commit('setAnswers', payload); },
	setApplication({ commit }, payload) { commit('setApplication', payload); },
}

export const getters = {
	answers: state => state.answers,
	application: state => state.application
}