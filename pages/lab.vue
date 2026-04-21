<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Lab" :description="description" />
    <div class="space-y-24">
      <div v-for="item in labItems" :key="item.path">
        <ContentRenderer :value="item" />
      </div>
    </div>
  </main>
</template>

<script setup>
const description = "Some random experiments with UI I do in my free time.";
useSeoMeta({
	title: "Lab | Iván Manzaba",
	description,
});

const { data: labItems } = await useAsyncData("lab-items", () =>
	queryCollection("lab").all(),
);
</script>
