import Vue from 'vue';

/* Components */
/* ---------------------------------------------------------------------------------------------- */

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import {ColorPicker, ColorPanel} from 'one-colorpicker';

Vue.use(ColorPanel);
Vue.use(ColorPicker);

import { vfmPlugin } from 'vue-final-modal/lib';
Vue.use(vfmPlugin);

import Notifications from 'vue-notification';
Vue.use(Notifications);

Vue.use(require('vue-moment'));

/* Other Stuff */
/* ---------------------------------------------------------------------------------------------- */

//import ResponsiveContainer from '~/assets/scripts/ResponsiveContainer.js';
//Vue.component('rcontainer', ResponsiveContainer);

//import VTooltip from 'v-tooltip';
//Vue.use(VTooltip);

import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';
import '@/assets/styles/plugins/vue-good-table.css';
Vue.use(VueGoodTable);

import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true });

import PortalVue from 'portal-vue';
Vue.use(PortalVue);

import Fragment from 'vue-fragment';
Vue.use(Fragment.Plugin);

import contenteditable from 'vue-contenteditable';
Vue.use(contenteditable);

import {
	// Directives
	VTooltip,
	VClosePopper,
	// Components
	Dropdown,
	Tooltip,
	hideAllPoppers,
	Menu
} from 'floating-vue';

Vue.directive('tooltip', VTooltip);
Vue.directive('close-popper', VClosePopper);

Vue.component('v-dropdown', Dropdown);
Vue.component('VTooltip', Tooltip);
Vue.component('VMenu', Menu);

import 'floating-vue/dist/style.css';