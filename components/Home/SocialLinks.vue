<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-4">Sígueme en</h2>
    <div class="space-y-5">
      <NuxtLink
        v-for="link in links"
        :key="link.icon"
        :to="link.url"
        target="_blank"
        external
        rel="noopener"
        :aria-label="`Abrir ${link.name} en una pestaña nueva`"
        class="flex items-end gap-4 dark:hover:text-gray-300 group"
      >
        <span class="text-sm">
          {{ link.name }}
        </span>
        <div
          class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700 transition-colors"
        ></div>
        <Icon :name="link.icon" class="w-6 h-6" aria-hidden="true"></Icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = [
	{
		name: "GitHub",
		url: "https://github.com/IvanM9",
		icon: "mdi:github",
	},
	{
		name: "Linkedin",
		url: "https://www.linkedin.com/in/iv%C3%A1n-manzaba",
		icon: "mdi:linkedin",
	},
	{
		name: "Telegram",
		url: "https://t.me/mauriciom27",
		icon: "mdi:telegram",
	},
];
</script>
