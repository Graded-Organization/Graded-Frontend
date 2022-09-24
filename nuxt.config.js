import { resolve } from 'path';

export default {
	// Target: https://go.nuxtjs.dev/config-target
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	// Loading
	loading: false,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Graded!',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		script: [
			{ src: '/scripts/font-awesome/all.js' },
			{ type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js' },
			{ type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js' },
			{ type: 'text/javascript', src: 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			//{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' },
			//{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css' },
			{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'@/assets/styles/chimplate/chimplate.less',
		'~assets/styles/project.less'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/globals.js' },
		{ src: '~/plugins/directives.js' },
		{ src: '~/plugins/utilities.js' },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/tailwindcss
		//'@nuxtjs/tailwindcss',
		//'nuxt-webpack-optimisations',
		'@nuxtjs/google-fonts',
		'@nuxtjs/svg',
		//'@nuxtjs/composition-api/module',
		'@nuxtjs/style-resources',
		//'nuxt-purgecss',
	],

	styleResources: {
		less: [
			'~assets/styles/chimplate/chimplate-resources.less',
		]
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		'@nuxtjs/i18n',
	],

	i18n: {
		locales: [
			{ code: 'en', iso: 'en-US', file: 'en.js' },
			{ code: 'es', iso: 'es-MX', file: 'es.js' },
		],
		langDir: '~/locale/',
		defaultLocale: 'en',
		vueI18n: { fallbackLocale: 'en' }
	},

	googleFonts: {
		families: {
			Inter: [300, 400, 500, 700, 900]
		},
	},

	publicRuntimeConfig: {
		apiUrl: process.env.API_URL || 'http://graded.test/back'
	},

	axios: {
		baseURL: process.env.API_URL || 'http://graded.test/back'
	},

	auth: {
		strategies: {
			local: {
				token: {
					property: 'jwt',
					required: true,
					type: 'Bearer'
				},
				user: {
					property: 'data'
				},
				endpoints: {
					login: { url: 'users/login', method: 'post', propertyName: 'jwt' },
					user: { url: 'users/me?fetch_metas=1', method: 'get', propertyName: 'data' },
					logout: false
				}
			},
			google: {
				clientId: '300354635680-nob5v9vuvk0lae0n5gvr7mir523elcm3.apps.googleusercontent.com',
				codeChallengeMethod: '',
				responseType: 'code',
				endpoints: {
					token: (process.env.API_URL || 'http://graded.test/back') + '/users/google',
					userInfo: (process.env.API_URL || 'http://graded.test/back') + '/users/me'
				},
				user: {
					property: 'data'
				},
				token: {
					property: 'jwt',
					required: true,
					type: 'Bearer'
				},
			},
		},
		redirect: {
			login: '/login',
			logout: '/',
			callback: '/login',
			home: '/dashboard'
		}
	},

	alias: {
		'@chimplate': resolve(__dirname, './assets/styles/chimplate'),
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		loaders: {
			less: {
				lessOptions: {
					math: 'always'
				}
			}
		},
	},
}
