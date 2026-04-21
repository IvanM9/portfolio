<template>
  <NuxtLink
    class="flex items-start gap-4 group p-3 -mx-3 rounded-lg transition-colors hover:bg-gray-100/60 dark:hover:bg-gray-900/40"
    :to="project.url"
  >
    <UAvatar
      :src="project.thumbnail"
      size="lg"
      :alt="project.name"
      :ui="{ root: 'rounded-lg z-10 relative shrink-0' }"
    />
    <div class="flex-1 min-w-0 space-y-1">
      <div class="flex items-center gap-2 flex-wrap">
        <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {{ project.name }}
        </h3>
        <Icon
          v-if="project.opensource"
          name="mdi:github"
          class="w-4 h-4 text-gray-400"
          aria-label="Proyecto open source"
        />
        <UBadge
          v-if="project.status"
          :color="statusColor"
          variant="subtle"
          size="xs"
        >
          {{ project.status }}
        </UBadge>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm leading-snug">
        {{ project.description }}
      </p>
      <div
        v-if="project.tags?.length"
        class="flex flex-wrap gap-1.5 pt-1"
      >
        <UBadge
          v-for="tag in project.tags"
          :key="tag"
          color="neutral"
          variant="soft"
          size="xs"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
});

const statusColor = computed(() => {
	const s = (props.project.status || "").toLowerCase();
	if (s === "active") return "success";
	if (s === "wip") return "warning";
	if (s === "archived" || s === "inactive") return "neutral";
	return "primary";
});
</script>
