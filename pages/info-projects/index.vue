<template>
  <main class="min-h-screen">
    <AppHeader class="mb-16" title="Información de los proyectos" :description="description" />
    <ul class="space-y-16">
      <li v-for="(article, id) in articles" :key="id">
        <AppArticleCard :article="article" />
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Esta es una lista de los proyectos que he realizado en los últimos años.";
useSeoMeta({
  title: "Articles | Fayaz Ahmed",
  description,
});

const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/info-projects").sort({ published: -1 }).find()
);
</script>
