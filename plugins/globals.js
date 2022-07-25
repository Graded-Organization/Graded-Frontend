import Vue from 'vue';

/* Components */
/* ---------------------------------------------------------------------------------------------- */

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);


/* Other Stuff */
/* ---------------------------------------------------------------------------------------------- */

//import ResponsiveContainer from '~/assets/scripts/ResponsiveContainer.js';
//Vue.component('rcontainer', ResponsiveContainer);

//import VTooltip from 'v-tooltip';
//Vue.use(VTooltip);

import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true });

import PortalVue from 'portal-vue';
Vue.use(PortalVue);

import Fragment from 'vue-fragment';
Vue.use(Fragment.Plugin);