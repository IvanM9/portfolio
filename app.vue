<template>
  <UApp>
    <NuxtLoadingIndicator color="#14b8a6" />
    <AppNavbar />
    <div class="h-20 sm:h-28"></div>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtPage />
    </div>
    <div class="h-20 sm:h-28"></div>
    <AppFooter />
  </UApp>
</template>
<script setup lang="ts">
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
</style>
