<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtImg
        src="/avatar.jpg"
        alt="Iván Manzaba"
        class="ring-2 border ring-gray-200 border-gray-300 dark:ring-white/10 dark:border-gray-800 hover:ring-4 transition-all duration-300 bg-gray-200 dark:bg-gray-900 rounded-full h-20 w-20 sm:h-24 sm:w-24"
        sizes="80px sm:96px"
        placeholder
        format="webp"
      />
      <UBadge
        color="success"
        variant="subtle"
        size="sm"
        class="gap-1.5"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Disponible para proyectos
      </UBadge>
    </div>

    <div class="space-y-2">
      <p class="uppercase text-xs font-semibold text-primary-600 dark:text-primary-400 tracking-wider">
        Sobre mí
      </p>
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
        ¡Hola! Soy Iván <span class="inline-block origin-[70%_70%] motion-safe:animate-wave">👋</span>
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400">
        Desarrollador de software — back-end &amp; web.
      </p>
    </div>

    <p class="text-gray-700 dark:text-gray-400 leading-relaxed">
      Construyo soluciones eficientes, escalables y seguras. Me apasiona aprender de forma continua y aplicar las mejores prácticas para aportar valor real a usuarios y equipos.
    </p>

    <div class="flex flex-wrap gap-3 pt-2">
      <UButton
        to="mailto:mauricio.9.inm@gmail.com"
        color="primary"
        icon="solar:letter-outline"
        size="md"
      >
        Contáctame
      </UButton>
      <UButton
        to="/cv.pdf"
        external
        target="_blank"
        color="neutral"
        variant="outline"
        icon="solar:download-minimalistic-outline"
        size="md"
      >
        Descargar CV
      </UButton>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
	title: "Iván Manzaba — Desarrollador de software",
	description:
		"Desarrollador de software especializado en back-end y desarrollo web. Construyo soluciones eficientes, escalables y seguras.",
	ogImage: "/avatar.jpg",
	ogType: "website",
	twitterCard: "summary",
});
</script>
