<template>
  <footer class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
    <div
      class="border-t border-dashed border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-500"
    >
      <p>© {{ year }} Iván Manzaba</p>
      <ul class="flex items-center gap-4">
        <li v-for="link in links" :key="link.name">
          <NuxtLink
            :to="link.url"
            :aria-label="link.name"
            target="_blank"
            external
            rel="noopener"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Icon :name="link.icon" class="w-5 h-5" />
          </NuxtLink>
        </li>
      </ul>
      <p class="text-xs">Hecho con Nuxt &amp; Nuxt UI</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();

const links = [
	{ name: "GitHub", url: "https://github.com/IvanM9", icon: "mdi:github" },
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/iv%C3%A1n-manzaba",
		icon: "mdi:linkedin",
	},
	{ name: "Telegram", url: "https://t.me/mauriciom27", icon: "mdi:telegram" },
];
</script>
