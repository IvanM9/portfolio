<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Proyectos" :description="description" />
    <div class="space-y-4">
      <AppProjectCard
        v-for="(project, id) in projects"
        :key="id"
        :project="project"
      />
    </div>
  </main>
</template>

<script setup>
const description =
  "He trabajado en varios de pequeños proyectos a lo largo de los años, pero estos son de los que estoy más orgulloso. Muchos de ellos son de código abierto, por lo que si ve algo que despierta su interés, consulte el código y contribuya si tiene ideas sobre cómo mejorarlo.";
useSeoMeta({
  title: "Proyectos | Iván Manzaba",
  description,
});

const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find()
);
</script>
