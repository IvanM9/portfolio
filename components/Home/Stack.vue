<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      Con lo que trabajo
    </h2>
    <ul class="grid grid-cols-4 sm:grid-cols-6 gap-4">
      <li
        v-for="tech in stack"
        :key="tech.name"
        class="flex flex-col items-center gap-2 p-3 rounded-lg border border-dashed border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-colors group"
      >
        <Icon
          :name="tech.icon"
          class="w-7 h-7 grayscale group-hover:grayscale-0 transition duration-300"
          :aria-label="tech.name"
        />
        <span class="text-[11px] text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
          {{ tech.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const stack = [
	{ name: "TypeScript", icon: "logos:typescript-icon" },
	{ name: "Nuxt", icon: "logos:nuxt-icon" },
	{ name: "Vue", icon: "logos:vue" },
	{ name: "NestJS", icon: "logos:nestjs" },
	{ name: "Node.js", icon: "logos:nodejs-icon" },
	{ name: "PostgreSQL", icon: "logos:postgresql" },
	{ name: "Tailwind", icon: "logos:tailwindcss-icon" },
	{ name: "Docker", icon: "logos:docker-icon" },
	{ name: "Git", icon: "logos:git-icon" },
	{ name: "Linux", icon: "logos:linux-tux" },
	{ name: "Python", icon: "logos:python" },
	{ name: "MongoDB", icon: "logos:mongodb-icon" },
];
</script>
