<template>
  <div class="space-y-6">
    <NuxtImg src="/avatar.jpg" alt="Iván Manzaba"
      class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-12 w-12 sm:h-16 sm:w-16"
      sizes="48px sm:64px" placeholder format="webp" />
    <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
      ¡Hola!
    </h1>
    <p class="text-gray-900 dark:text-gray-400">
      Mi nombre es Iván Manzaba y soy un desarrollador de software apasionado por el área del back-end, donde he trabajado con diferentes tecnologías y lenguajes de programación. Me gusta enfrentar nuevos retos y aprender constantemente de las mejores prácticas y tendencias del sector. Mi objetivo es crear soluciones eficientes, escalables y seguras que aporten valor a los usuarios y clientes.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Iván Manzaba",
  description:
    "Mi nombre es Iván Manzaba y soy un desarrollador de software apasionado por el área del back-end, donde he trabajado con diferentes tecnologías y lenguajes de programación. Me gusta enfrentar nuevos retos y aprender constantemente de las mejores prácticas y tendencias del sector. Mi objetivo es crear soluciones eficientes, escalables y seguras que aporten valor a los usuarios y clientes.",
});
</script>
