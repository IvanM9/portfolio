export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: [
		"@nuxt/ui",
		"@nuxtjs/google-fonts",
		"@nuxtjs/fontaine",
		"@nuxt/image",
		"@nuxt/content",
		"@vueuse/nuxt",
		"@nuxt/icon",
		"@vercel/analytics/nuxt",
	],

	srcDir: ".",

	css: ["~/assets/css/main.css"],

	icon: {
		serverBundle: {
			collections: ["solar", "lucide"],
		},
	},

	app: {
		pageTransition: { name: "page", mode: "out-in" },
		head: {
			htmlAttrs: {
				lang: "es",
				class: "h-full",
			},
			bodyAttrs: {
				class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
			},
			link: [{ rel: "icon", type: "image/x-icon", href: "/avatar.jpg" }],
		},
	},

	content: {
		build: {
			markdown: {
				highlight: {
					theme: "github-dark",
				},
			},
		},
	},

	googleFonts: {
		display: "swap",
		families: {
			Inter: [400, 500, 600, 700, 800, 900],
		},
	},

	compatibilityDate: "2025-01-11",
});
