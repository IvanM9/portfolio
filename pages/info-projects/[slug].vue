<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <article v-if="doc">
        <h1>{{ doc.title }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const { slug } = route.params;

const { data: doc } = await useAsyncData(`info-project-${slug}`, () =>
	queryCollection("infoProjects").path(`/info-projects/${slug}`).first(),
);

useSeoMeta({
	title: `${doc.value?.title || slug} | Iván Manzaba`,
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
