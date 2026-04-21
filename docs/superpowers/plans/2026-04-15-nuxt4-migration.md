# Nuxt 4 Migration Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar el portfolio de Nuxt 3.15.1 a Nuxt 4.4.2 junto con todos los modulos criticos (@nuxt/ui v2 a v4, @nuxt/content v2 a v3, Tailwind CSS v3 a v4).

**Architecture:** Migracion incremental: primero el core de Nuxt 4, luego la capa UI (Tailwind v4 + Nuxt UI v4), despues la capa de contenido (@nuxt/content v3), y finalmente modulos perifericos. Se mantiene `srcDir: '.'` para evitar reestructurar el proyecto a `app/`.

**Tech Stack:** Nuxt 4.4.2, Vue 3, Tailwind CSS 4, @nuxt/ui 4.6.1, @nuxt/content 3.13.0, TypeScript

---

## Dependency Migration Map

| Package | Current | Target | Breaking? |
|---------|---------|--------|-----------|
| `nuxt` | 3.15.1 | 4.4.2 | SI |
| `@nuxt/ui` | 2.20.0 | 4.6.1 | SI (reescritura completa) |
| `@nuxt/content` | 2.13.4 | 3.13.0 | SI |
| `@nuxt/image` | 1.9.0 | 2.0.0 | Menor |
| `@nuxt/icon` | 1.10.3 | 2.2.1 | Menor |
| `@nuxt/devtools` | 1.7.0 | 3.2.4 | Menor |
| `@nuxtjs/fontaine` | 0.4.4 | 0.5.0 | Menor |
| `@nuxtjs/google-fonts` | 3.2.0 | Mantener | No |
| `@nuxthq/studio` | 2.2.1 | ELIMINAR | Integrado en content v3 |
| `@vercel/analytics` | 1.4.1 | 2.0.1 | Menor |
| `@vueuse/nuxt` | No en package.json | Agregar | Nuevo |
| `tailwindcss` | Via @nuxt/ui | 4.x (dependencia directa) | Nuevo |
| `@biomejs/biome` | 1.9.4 | 2.4.12 | Menor |
| `prettier` | 3.4.2 | 3.8.3 | No |
| `@tailwindcss/typography` | Transitive | 0.5.x (directa) | Nuevo |
| `prettier-plugin-tailwindcss` | 0.6.9 | 0.7.2 | Menor |

## File Impact Map

### Archivos a modificar:
- `package.json` - Todas las dependencias
- `nuxt.config.ts` - Modulos, configuracion v4
- `app.config.ts` - Reescritura completa para Nuxt UI v4
- `app.vue` - UContainer, @vercel/analytics v2
- `tsconfig.json` - Posible actualizacion para TypeScript v4
- `pages/projects.vue` - queryContent -> queryCollection
- `pages/info-projects/index.vue` - queryContent -> queryCollection
- `pages/info-projects/[slug].vue` - Eliminar ContentDoc
- `pages/lab.vue` - Eliminar ContentList/ContentQuery
- `components/Home/FeaturedProjects.vue` - queryContent -> queryCollection
- `components/Home/FeaturedArticles.vue` - queryContent -> queryCollection
- `components/Home/Newsletter.vue` - Props de UInput/UButton
- `components/App/Navbar.vue` - Props de UTooltip/ULink
- `components/App/ThemeToggle.vue` - Props de UTooltip
- `components/App/ArticleCard.vue` - `_path` -> `path` (Content v3)
- `components/App/ProjectCard.vue` - Props de UAvatar
- `components/content/LabCard.vue` - Props de UButton
- `components/content/AnimatedCounter.vue` - Props de UButton
- `pages/bookmarks.vue` - Props de UAvatar

### Archivos a crear:
- `content.config.ts` - Definicion de colecciones Content v3
- `assets/css/main.css` - Configuracion CSS de Tailwind v4 (custom theme)

### Archivos a eliminar:
- `tailwind.config.ts` - Reemplazado por config CSS en Tailwind v4

---

## Chunk 1: Core Nuxt 4 + Dependencias

### Task 1: Preparacion y branch de migracion

**Files:**
- N/A (operaciones git)

- [ ] **Step 1: Crear branch de migracion**

```bash
git checkout -b feat/nuxt4-migration
```

- [ ] **Step 2: Verificar que el build actual funciona (baseline)**

```bash
yarn build
```

Expected: Build exitoso sin errores.

- [ ] **Step 3: Commit baseline**

```bash
git add -A
git commit -m "chore: baseline before nuxt 4 migration"
```

---

### Task 2: Actualizar package.json con nuevas dependencias

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Actualizar package.json con las nuevas versiones**

```json
{
  "name": "nuxt-app",
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "devDependencies": {
    "@biomejs/biome": "^2.4.12",
    "@iconify-json/lucide": "^1.2.102",
    "@iconify-json/solar": "^1.2.5",
    "@nuxt/content": "^3.13.0",
    "@nuxt/devtools": "^3.2.4",
    "@nuxtjs/fontaine": "^0.5.0",
    "@nuxtjs/google-fonts": "^3.2.0",
    "nuxt": "^4.4.2",
    "prettier": "^3.8.3",
    "prettier-plugin-tailwindcss": "^0.7.2"
  },
  "dependencies": {
    "@nuxt/icon": "^2.2.1",
    "@nuxt/image": "^2.0.0",
    "@nuxt/ui": "^4.6.1",
    "@tailwindcss/typography": "^0.5.0",
    "@vercel/analytics": "^2.0.1",
    "@vueuse/nuxt": "^12.0.0",
    "tailwindcss": "^4.0.0",
    "vue-use-fixed-header": "^2.0.3"
  }
}
```

**Cambios clave:**
- `nuxt`: 3.15.1 -> 4.4.2
- `@nuxt/ui`: 2.20.0 -> 4.6.1
- `@nuxt/content`: 2.13.4 -> 3.13.0
- `@nuxt/image`: 1.9.0 -> 2.0.0
- `@nuxt/icon`: 1.10.3 -> 2.2.1
- `@nuxt/devtools`: 1.7.0 -> 3.2.4
- `@vercel/analytics`: 1.4.1 -> 2.0.1
- `tailwindcss`: NUEVO (requerido por @nuxt/ui v4)
- `@vueuse/nuxt`: NUEVO (estaba en modules pero no en package.json)
- `@nuxthq/studio`: ELIMINADO (integrado en @nuxt/content v3)
- `yarn-upgrade-all`: ELIMINADO (no necesario)

- [ ] **Step 2: Eliminar node_modules y lockfile, reinstalar**

```bash
rm -rf node_modules yarn.lock
yarn install
```

Expected: Instalacion exitosa (puede haber warnings de peer deps, son normales).

- [ ] **Step 3: Ejecutar nuxt prepare**

```bash
npx nuxt prepare
```

Expected: Generacion de tipos exitosa (puede fallar si nuxt.config.ts aun no esta actualizado - eso es esperado, se arregla en Task 3).

---

### Task 3: Actualizar nuxt.config.ts para Nuxt 4

**Files:**
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Reescribir nuxt.config.ts**

Reemplazar el contenido completo de `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@vercel/analytics/nuxt",
  ],

  // Mantener estructura actual (no mover a app/)
  srcDir: ".",

  icon: {
    serverBundle: {
      collections: ["solar", "lucide"],
    },
    // NOTA: Los iconos "mdi:" (GitHub, LinkedIn, Telegram en SocialLinks.vue)
    // se cargan via red en runtime (igual que en v3). Si se desea bundlear,
    // agregar "mdi" a collections y "@iconify-json/mdi" a dependencies.
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "es",
        class: "h-full",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/avatar.jpg" }],
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
        },
      },
    },
  },

  googleFonts: {
    display: "swap",
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },

  compatibilityDate: "2025-01-11",
});
```

**Cambios respecto al original:**
1. ELIMINADO: `@nuxthq/studio` del array de modules
2. AGREGADO: `srcDir: "."` para mantener estructura actual
3. AGREGADO: `@vercel/analytics/nuxt` como modulo (reemplaza import manual en app.vue)
4. ACTUALIZADO: `content.highlight` -> `content.build.markdown.highlight` (formato v3)
5. NOTA: `@vueuse/nuxt` ya estaba en modules, se mantiene
6. NOTA: Iconos `mdi:` se cargan via red (sin cambios). Para bundlear, agregar `"mdi"` a `icon.serverBundle.collections`

- [ ] **Step 2: Verificar que nuxt prepare funciona**

```bash
npx nuxt prepare
```

Expected: Generacion de tipos exitosa.

---

### Task 4: Actualizar configuracion de TypeScript

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Verificar tsconfig.json actual**

El `tsconfig.json` actual ya extiende `.nuxt/tsconfig.json`, lo cual es compatible con Nuxt 4. No deberia necesitar cambios. Verificar que funciona:

```bash
npx nuxt typecheck 2>&1 || echo "Typecheck skipped - may need vue-tsc"
```

Si hay errores de tipo por `noUncheckedIndexedAccess` (habilitado por defecto en v4), se puede desactivar temporalmente en `nuxt.config.ts`:

```typescript
// Agregar a nuxt.config.ts SOLO si hay errores de tipo
typescript: {
  tsConfig: {
    compilerOptions: {
      noUncheckedIndexedAccess: false,
    },
  },
},
```

- [ ] **Step 2: Commit de core migration**

```bash
git add package.json nuxt.config.ts tsconfig.json
git commit -m "feat: upgrade nuxt core to v4.4.2

- Update all dependencies to latest versions
- Remove @nuxthq/studio (integrated in content v3)
- Add tailwindcss and @vueuse/nuxt as direct dependencies
- Update nuxt.config.ts for v4 compatibility"
```

---

## Chunk 2: Tailwind CSS v4 + Nuxt UI v4

### Task 5: Migrar Tailwind CSS a v4

**Files:**
- Delete: `tailwind.config.ts`
- Create: `assets/css/main.css`
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Crear archivo CSS de Tailwind v4**

Crear `assets/css/main.css` con la configuracion custom:

```css
@import "tailwindcss";
@import "@nuxt/ui";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Inter", "Avenir Next", "Roboto", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Ubuntu, "Helvetica Neue", Arial,
    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: "Cascadia Code", ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, "Liberation Mono", "Courier New", monospace;
  --shadow-zoop: rgba(102, 109, 128, 0.08) 0px 1.2672px 1.2672px 0px,
    rgba(102, 109, 128, 0.08) 0px 5.06879px 10.1376px 0px;
  --shadow-zoopdark: rgba(10, 10, 10, 0.2) 0px 1.2672px 1.2672px 0px,
    rgba(10, 10, 10, 0.2) 0px 5.06879px 10.1376px 0px;
}
```

**NOTA:** Verificar que `@nuxt/ui` v4 no configure automaticamente el import de Tailwind. Si el modulo ya lo hace, solo incluir los `@theme` y `@plugin` adicionales.

- [ ] **Step 2: Registrar CSS en nuxt.config.ts**

Agregar en `nuxt.config.ts`:

```typescript
css: ["~/assets/css/main.css"],
```

- [ ] **Step 3: Eliminar tailwind.config.ts**

```bash
rm tailwind.config.ts
```

- [ ] **Step 4: Verificar que el build compila sin errores de Tailwind**

```bash
npx nuxt build 2>&1 | head -50
```

Expected: Build sin errores de configuracion de Tailwind. Si hay errores, revisar los docs de Nuxt UI v4 para la configuracion correcta del CSS.

- [ ] **Step 5: Commit**

```bash
git add assets/css/main.css nuxt.config.ts
git rm tailwind.config.ts
git commit -m "feat: migrate Tailwind CSS to v4

- Replace tailwind.config.ts with CSS-based config
- Move custom fonts and shadows to @theme block
- Add @tailwindcss/typography as CSS plugin import"
```

---

### Task 6: Migrar app.config.ts para Nuxt UI v4

**Files:**
- Modify: `app.config.ts`

- [ ] **Step 1: Reescribir app.config.ts para Nuxt UI v4**

Nuxt UI v4 usa un sistema de temas completamente diferente. El formato `primary`/`gray` de v2 cambia a `colors` con `primary`/`neutral`:

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: "teal",
      neutral: "neutral",
    },
  },
});
```

**Cambios respecto al original:**
1. `ui.primary: "teal"` -> `ui.colors.primary: "teal"`
2. `ui.gray: "neutral"` -> `ui.colors.neutral: "neutral"`
3. ELIMINADO: `ui.formGroup` (no se usa UFormGroup en el proyecto)
4. ELIMINADO: `ui.button.rounded` custom (la personalizacion en v4 usa un formato de slots diferente - aplicar via CSS si es necesario)
5. ELIMINADO: `ui.modal` custom (no se usa UModal en el proyecto)
6. ELIMINADO: `ui.container.constrained` (configurar en CSS o props directamente)

**NOTA:** Si el efecto `active:scale` del button es importante, se puede agregar via CSS global:

```css
/* En assets/css/main.css */
[data-ui="button"] {
  @apply transition-transform active:scale-x-[0.98] active:scale-y-[0.99];
}
```

- [ ] **Step 2: Verificar que el build compila**

```bash
npx nuxt build 2>&1 | head -50
```

- [ ] **Step 3: Commit**

```bash
git add app.config.ts
git commit -m "feat: migrate app.config.ts to Nuxt UI v4 theme format"
```

---

### Task 7: Migrar componentes de Nuxt UI

**Files:**
- Modify: `app.vue`
- Modify: `components/App/Navbar.vue`
- Modify: `components/App/ThemeToggle.vue`
- Modify: `components/App/ProjectCard.vue`
- Modify: `components/Home/FeaturedProjects.vue`
- Modify: `components/Home/FeaturedArticles.vue`
- Modify: `components/Home/Newsletter.vue`
- Modify: `components/content/LabCard.vue`
- Modify: `components/content/AnimatedCounter.vue`
- Modify: `pages/bookmarks.vue`

- [ ] **Step 1: Migrar app.vue - UContainer y Analytics**

`UContainer` existe en Nuxt UI v4 (usa CSS variable `--ui-container` para max-width). Se mantiene sin cambios.

Para `@vercel/analytics` v2, la integracion con Nuxt se hace registrandolo como modulo en `nuxt.config.ts`. Agregar `"@vercel/analytics/nuxt"` al array de modules en nuxt.config.ts (ya actualizado en Task 3). Luego simplificar `app.vue`:

```vue
<template>
  <NuxtLoadingIndicator color="#14b8a6" />
  <AppNavbar />
  <div class="h-32"></div>
  <UContainer>
    <NuxtPage />
  </UContainer>
  <div class="h-32"></div>
  <AppFooter />
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
```

**Cambios:**
1. Eliminado `<Analytics />` component y su import. En v2, @vercel/analytics se registra como modulo de Nuxt (`@vercel/analytics/nuxt` en modules de nuxt.config.ts) y se inyecta automaticamente.
2. `UContainer` se mantiene sin cambios (existe en Nuxt UI v4 con soporte para CSS variable `--ui-container`).

- [ ] **Step 2: Migrar Navbar.vue - UTooltip y ULink**

`ULink` existe en Nuxt UI v4 como wrapper de `<NuxtLink>` con props adicionales (`activeClass`, `inactiveClass`, `exact`, `exactQuery`, `exactHash`). Se mantiene `ULink`.

`UTooltip` existe en v4 con prop `text`. El formato `ui` de v2 (`popper.strategy`) ya no aplica; en v4 usa `content` prop para posicionamiento.

```vue
<template>
  <div ref="headerRef" :style="styles" class="fixed top-0 w-full z-50">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
      <ul
        class="flex items-center my-4 px-3 text-sm font-medium text-gray-800 rounded-full shadow-lg bg-white/90 shadow-gray-800/5 ring-1 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/20 ring-gray-900/5"
      >
        <li v-for="item in items" :key="item.path">
          <UTooltip :text="item.name">
            <ULink
              :to="item.path"
              class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
              active-class="text-primary-600 dark:text-primary-400"
            >
              <Icon aria-hidden="true" :name="item.icon" class="w-5 h-5 z-10" />
              <span
                v-if="$route.path === item.path"
                class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0"
              ></span>
              <span
                v-if="$route.path === item.path"
                class="absolute h-8 w-8 z-0 rounded-full bg-gray-100 dark:bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></span>
              <span class="sr-only">{{ item.name }}</span>
            </ULink>
          </UTooltip>
        </li>
        <li class="flex-1"></li>
        <li>
          <AppThemeToggle />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useFixedHeader } from "vue-use-fixed-header";
const headerRef = ref(null);
const { styles } = useFixedHeader(headerRef);

const items = [
  { name: "Inicio", path: "/", icon: "solar:home-smile-outline" },
  {
    name: "Proyectos",
    path: "/projects",
    icon: "solar:folder-with-files-outline",
  },
];
</script>
```

**Cambios:**
1. `UTooltip` - eliminado `:ui="{ popper: { strategy: 'absolute' } }"` (formato v2). En v4, solo usar `:text="item.name"`.
2. `ULink` se mantiene (existe en v4). Soporta `active-class` como prop.

- [ ] **Step 3: Migrar ThemeToggle.vue - UTooltip**

```vue
<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UTooltip text="Alternar tema">
    <button
      class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
      @click="isDark = !isDark"
    >
      <Icon
        aria-hidden="true"
        :name="isDark ? 'solar:sun-2-outline' : 'solar:moon-outline'"
        class="w-5 h-5"
      />
      <span class="sr-only">Toggle theme</span>
    </button>
  </UTooltip>
</template>
```

**Cambios:**
1. UTooltip - eliminado `:ui="{ popper: { strategy: 'absolute' } }"` (formato v2)
2. `useColorMode()` deberia seguir funcionando ya que viene de @nuxt/ui

- [ ] **Step 4: Migrar UButton en todos los archivos**

Los UButton se usan en 4 archivos. En Nuxt UI v4, los cambios principales son:

**FeaturedProjects.vue** (linea 14):
```vue
<!-- ANTES -->
<UButton label="Todos los proyectos &rarr;" to="/projects" variant="link" color="gray" />

<!-- DESPUES -->
<UButton label="Todos los proyectos &rarr;" to="/projects" variant="link" color="neutral" />
```

**FeaturedArticles.vue** (linea 12):
```vue
<!-- ANTES -->
<UButton label="All Articles &rarr;" to="/articles" variant="link" color="gray" />

<!-- DESPUES -->
<UButton label="All Articles &rarr;" to="/articles" variant="link" color="neutral" />
```

**Newsletter.vue** (linea 23):
```vue
<!-- ANTES -->
<UButton label="Join &rarr;" size="lg" color="black" />

<!-- DESPUES - "black" no existe en v4. Usar "neutral" con variant="solid" para fondo oscuro -->
<UButton label="Join &rarr;" size="lg" color="neutral" variant="solid" />
```

**LabCard.vue** (lineas 12-49) - Aplicar a los 4 UButton del archivo:
```vue
<!-- ANTES -->
<UButton @click="tab = 'preview'" label="Preview" variant="soft" color="white" size="xs" ... />

<!-- DESPUES - "white" no existe en v4. Usar "neutral" con variant="ghost" para apariencia clara -->
<UButton @click="tab = 'preview'" label="Preview" variant="ghost" color="neutral" size="xs" ... />
```

**AnimatedCounter.vue** (linea 10):
```vue
<!-- ANTES -->
<UButton color="white" @click="startCounter" class="mt-4" size="xs">Start Counter</UButton>

<!-- DESPUES -->
<UButton color="neutral" variant="ghost" @click="startCounter" class="mt-4" size="xs">Start Counter</UButton>
```

**Resumen de cambios en UButton (colores disponibles en v4: primary, secondary, success, info, warning, error, neutral):**
- `color="gray"` -> `color="neutral"`
- `color="white"` -> `color="neutral" variant="ghost"` (apariencia clara/transparente)
- `color="black"` -> `color="neutral" variant="solid"` (apariencia oscura/solida)
- `variant="link"` -> Se mantiene (existe en v4)
- `variant="soft"` -> Se mantiene (existe en v4)

- [ ] **Step 5: Migrar UAvatar**

**ProjectCard.vue** (linea 15):
```vue
<!-- ANTES -->
<UAvatar :src="project.thumbnail" :ui="{ rounded: 'rounded z-10 relative' }" size="md" :alt="project.name" />

<!-- DESPUES - v4 usa :ui con slots (root, image, fallback, icon) -->
<UAvatar :src="project.thumbnail" size="md" :alt="project.name" :ui="{ root: 'rounded z-10 relative' }" />
```

**bookmarks.vue** (linea 11):
```vue
<!-- ANTES -->
<UAvatar :src="getThumbnail(bookmark.url)" :alt="bookmark.label" :ui="{ rounded: 'rounded-md' }" />

<!-- DESPUES -->
<UAvatar :src="getThumbnail(bookmark.url)" :alt="bookmark.label" :ui="{ root: 'rounded-md' }" />
```

**Cambio:** El prop `:ui` de v2 (`{ rounded: '...' }`) se reemplaza con el sistema de slots de v4 (`{ root: '...', image: '...', fallback: '...', icon: '...' }`).

- [ ] **Step 6: Migrar UInput y ArticleCard**

**Newsletter.vue** (linea 17-18):
```vue
<!-- ANTES -->
<UInput placeholder="Email Address" icon="i-heroicons-envelope" class="flex-1" size="lg" />

<!-- DESPUES - el prop "icon" sigue existiendo en v4. Tambien soporta leadingIcon/trailingIcon -->
<UInput placeholder="Email Address" icon="i-heroicons-envelope" class="flex-1" size="lg" />
```

El prop `icon` existe en Nuxt UI v4 y muestra un icono dentro del input. Sin cambios necesarios.

**ArticleCard.vue** (linea 2) - Migrar `_path` a `path` para Content v3:
```vue
<!-- ANTES -->
<NuxtLink :to="article._path" class="group">

<!-- DESPUES -->
<NuxtLink :to="article.path" class="group">
```

- [ ] **Step 7: Ejecutar dev server para verificar visualmente**

```bash
npx nuxt dev
```

Navegar a cada pagina y verificar que los componentes UI se renderizan correctamente. Ajustar props segun sea necesario.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: migrate all Nuxt UI components to v4

- Update UTooltip props (remove v2 popper config)
- Update UButton color props (gray->neutral, white->ghost, black->solid)
- Update UAvatar :ui prop to v4 slots format (root/image/fallback)
- Update UInput (icon prop compatible)
- Update ArticleCard _path -> path for content v3
- Register @vercel/analytics as Nuxt module"
```

---

## Chunk 3: @nuxt/content v3 Migration

### Task 8: Crear content.config.ts y configurar colecciones

**Files:**
- Create: `content.config.ts`

- [ ] **Step 1: Crear content.config.ts con las definiciones de colecciones**

```typescript
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // Proyectos destacados (datos JSON)
    projects: defineCollection({
      type: "data",
      source: "projects/**/*.json",
      schema: z.object({
        name: z.string(),
        url: z.string().optional(),
        description: z.string(),
        thumbnail: z.string(),
        status: z.string().optional(),
        opensource: z.boolean().optional(),
      }),
    }),

    // Informacion detallada de proyectos (paginas Markdown)
    infoProjects: defineCollection({
      type: "page",
      source: "info-projects/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        published: z.string(),
        slug: z.string(),
      }),
    }),

    // Experimentos del laboratorio (paginas Markdown)
    lab: defineCollection({
      type: "page",
      source: "lab/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
});
```

**NOTAS:**
- No se define coleccion `articles` porque no existe el directorio `/content/articles/` en el proyecto actual. `FeaturedArticles.vue` referencia `/articles` pero no hay contenido. Si se necesita en el futuro, agregar la coleccion.
- El `type: "data"` es para JSON (no genera rutas). `type: "page"` es para Markdown (genera rutas).

- [ ] **Step 2: Verificar que nuxt prepare reconoce las colecciones**

```bash
npx nuxt prepare
```

Expected: Sin errores. Las colecciones deben ser detectadas.

- [ ] **Step 3: Commit**

```bash
git add content.config.ts
git commit -m "feat: add content.config.ts with collection definitions for content v3"
```

---

### Task 9: Migrar queries de contenido (queryContent -> queryCollection)

**Files:**
- Modify: `pages/projects.vue:22-24`
- Modify: `pages/info-projects/index.vue:20-22`
- Modify: `components/Home/FeaturedProjects.vue:25-27`
- Modify: `components/Home/FeaturedArticles.vue:23-29`

- [ ] **Step 1: Migrar pages/projects.vue**

```vue
<!-- ANTES -->
<script setup>
const { data: projects } = await useAsyncData("projects-all", () =>
  queryContent("/projects").find(),
);
</script>

<!-- DESPUES -->
<script setup>
const { data: projects } = await useAsyncData("projects-all", () =>
  queryCollection("projects").order("stem", "ASC").all(),
);
</script>
```

**NOTA:** En content v2, los archivos con prefijo numerico (1.teraflex.json, 2.lectokids.json) se ordenaban automaticamente por nombre. En content v3 (SQL-based), el orden no esta garantizado. Se agrega `.order("stem", "ASC")` para mantener el orden por nombre de archivo.

- [ ] **Step 2: Migrar pages/info-projects/index.vue**

```vue
<!-- ANTES -->
<script setup>
const { data: articles } = await useAsyncData("all-articles", () =>
  queryContent("/info-projects").sort({ published: -1 }).find(),
);
</script>

<!-- DESPUES -->
<script setup>
const { data: articles } = await useAsyncData("all-articles", () =>
  queryCollection("infoProjects").order("published", "DESC").all(),
);
</script>
```

- [ ] **Step 3: Migrar components/Home/FeaturedProjects.vue**

```vue
<!-- ANTES -->
<script lang="ts" setup>
const { data: projects } = await useAsyncData("projects-home", () =>
  queryContent("/projects").limit(3).find(),
);
</script>

<!-- DESPUES -->
<script lang="ts" setup>
const { data: projects } = await useAsyncData("projects-home", () =>
  queryCollection("projects").order("stem", "ASC").limit(3).all(),
);
</script>
```

- [ ] **Step 4: Migrar components/Home/FeaturedArticles.vue**

Este componente referencia `/articles` que no existe. Hay dos opciones:

**Opcion A** - Eliminar o comentar el componente si no se usa:
```vue
<script lang="ts" setup>
// Coleccion "articles" no existe - componente deshabilitado
const articles = ref([]);
</script>
```

**Opcion B** - Apuntarlo a `infoProjects` si es la intencion real:
```vue
<script lang="ts" setup>
const { data: articles } = await useAsyncData("articles-home", () =>
  queryCollection("infoProjects")
    .order("published", "DESC")
    .limit(3)
    .select("title", "description", "published", "slug", "path")
    .all(),
);
</script>
```

**NOTAS:**
- `_path` cambia a `path` en content v3 (sin underscore).
- `.only([...])` de v2 se reemplaza con `.select(...)` en v3.
- El codigo original usaba `.only(["title", "description", "published", "slug", "_path"])` - en v3 esto se traduce a `.select("title", "description", "published", "slug", "path")`.

- [ ] **Step 5: Commit**

```bash
git add pages/projects.vue pages/info-projects/index.vue components/Home/FeaturedProjects.vue components/Home/FeaturedArticles.vue
git commit -m "feat: migrate queryContent to queryCollection for content v3

- Replace queryContent().find() with queryCollection().all()
- Update sort() to order() syntax
- Update field references (_path -> path)"
```

---

### Task 10: Migrar componentes de contenido (ContentDoc, ContentList, ContentQuery)

**Files:**
- Modify: `pages/info-projects/[slug].vue`
- Modify: `pages/lab.vue`

- [ ] **Step 1: Migrar pages/info-projects/[slug].vue**

Reemplazar `<ContentDoc>` con query explicita + `<ContentRenderer>`:

```vue
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
  title: `${doc.value?.title || slug} | Ivan Manzaba`,
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
```

**Cambios:**
1. `<ContentDoc v-slot="{ doc }">` eliminado - ahora se usa `useAsyncData` + `queryCollection`
2. Se agrega `v-if="doc"` para manejar el caso de carga
3. `<ContentRenderer :value="doc" />` se mantiene (sigue existiendo en v3)
4. SEO meta usa `doc.value?.title` con optional chaining

- [ ] **Step 2: Migrar pages/lab.vue**

Reemplazar `<ContentList>`, `<ContentQuery>` y `<ContentRendererMarkdown>`:

```vue
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
  title: "Lab | Ivan Manzaba",
  description,
});

const { data: labItems } = await useAsyncData("lab-items", () =>
  queryCollection("lab").all(),
);
</script>
```

**Cambios:**
1. `<ContentList>` eliminado
2. `<ContentQuery>` eliminado
3. `<ContentRendererMarkdown>` eliminado (usar `<ContentRenderer>` directamente)
4. Se usa `useAsyncData` + `queryCollection` para obtener los datos
5. `item._path` -> `item.path` (sin underscore en v3)

- [ ] **Step 3: Verificar que el contenido se renderiza**

```bash
npx nuxt dev
```

Navegar a:
- `/projects` - Verificar lista de proyectos
- `/info-projects` - Verificar lista de articulos
- `/info-projects/lectokids` - Verificar pagina individual
- `/lab` - Verificar experimentos

- [ ] **Step 4: Commit**

```bash
git add pages/info-projects/\[slug\].vue pages/lab.vue
git commit -m "feat: migrate content components to content v3

- Replace ContentDoc with explicit queryCollection + ContentRenderer
- Replace ContentList/ContentQuery with useAsyncData loop
- Remove ContentRendererMarkdown (use ContentRenderer directly)
- Update _path references to path"
```

---

## Chunk 4: Modulos Perifericos + Verificacion

### Task 11: Actualizar modulos restantes

**Files:**
- Modify: `nuxt.config.ts` (si es necesario)

- [ ] **Step 1: Verificar @nuxt/image v2**

@nuxt/image v2 es compatible con Nuxt 4. Los cambios son menores:
- Breakpoints `xs` y `xxl` eliminados (usar `sm` y `2xl`)
- No se usan breakpoints custom en el proyecto, asi que no deberia haber impacto

Verificar que `<NuxtImg>` y `<NuxtPicture>` funcionan si se usan en el proyecto.

- [ ] **Step 2: Verificar @nuxt/icon v2**

@nuxt/icon v2 deberia ser compatible sin cambios. La configuracion `serverBundle.collections` se mantiene igual.

Verificar que los iconos Solar y Lucide se renderizan correctamente.

- [ ] **Step 3: Verificar @vueuse/nuxt**

Verificar que `useElementVisibility` y `watchOnce` en `AnimatedCounter.vue` funcionan correctamente. Estos composables de VueUse son estables y no deberian tener breaking changes.

- [ ] **Step 4: Verificar @vercel/analytics v2**

Ya registrado como modulo `@vercel/analytics/nuxt` en nuxt.config.ts (Task 3). Verificar que las analytics se inyectan automaticamente revisando las network requests en DevTools (debe haber requests a `vitals.vercel-insights.com` o similar).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: verify and update peripheral modules

- @nuxt/image v2 compatible
- @nuxt/icon v2 compatible
- @vueuse/nuxt verified
- @vercel/analytics v2 integration updated"
```

---

### Task 12: Actualizar herramientas de desarrollo

**Files:**
- Modify: `biome.json` (si @biomejs/biome v2 requiere cambios)
- Modify: `.prettierrc` (si es necesario)

- [ ] **Step 1: Verificar @biomejs/biome v2**

Biome v2 puede tener cambios en el formato de configuracion. Ejecutar:

```bash
npx @biomejs/biome migrate
```

Si hay migracion necesaria, aplicar los cambios sugeridos. Si no, el config actual deberia ser compatible.

- [ ] **Step 2: Verificar prettier-plugin-tailwindcss v0.7**

Este plugin necesita Tailwind CSS v4 para funcionar correctamente. Ya deberia funcionar con las actualizaciones previas.

```bash
npx prettier --check "**/*.vue" 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: update dev tooling (biome v2, prettier plugins)"
```

---

### Task 13: Verificacion final y cleanup

**Files:**
- Todos los archivos del proyecto

- [ ] **Step 1: Limpiar cache y reinstalar**

```bash
rm -rf .nuxt .output node_modules
yarn install
npx nuxt prepare
```

- [ ] **Step 2: Ejecutar build de produccion**

```bash
yarn build
```

Expected: Build exitoso sin errores ni warnings criticos.

- [ ] **Step 3: Ejecutar preview de produccion**

```bash
yarn preview
```

Navegar a todas las paginas y verificar:
- [ ] Homepage - Intro, FeaturedProjects, SocialLinks
- [ ] /projects - Lista de proyectos con ProjectCard
- [ ] /info-projects - Lista de articulos
- [ ] /info-projects/[slug] - Pagina individual con ContentRenderer
- [ ] /lab - Experimentos con componentes custom
- [ ] Dark mode toggle funciona
- [ ] Navbar fixed header funciona
- [ ] Iconos se renderizan
- [ ] Transiciones de pagina funcionan
- [ ] SEO meta tags presentes

- [ ] **Step 4: Corregir SEO titles pendientes**

`pages/bookmarks.vue` linea 33 tiene `title: "Bookmarks | Fayaz Ahmed"`. Cambiar a:
```typescript
useSeoMeta({
  title: "Bookmarks | Ivan Manzaba",
  description,
});
```

- [ ] **Step 5: Verificar que no hay errores en consola**

Abrir DevTools del navegador y verificar que no hay:
- Errores de JavaScript
- Warnings de Vue/Nuxt
- Errores de carga de recursos (imagenes, fonts, iconos)

- [ ] **Step 6: Eliminar archivos innecesarios**

```bash
# Eliminar .npmrc si ya no es necesario (shamefully-hoist era para pnpm)
# Verificar si yarn necesita estas opciones
cat .npmrc
```

Si se usa yarn y no pnpm, `.npmrc` con `shamefully-hoist` no es necesario. Evaluar si eliminarlo.

- [ ] **Step 7: Commit final**

```bash
git add -A
git commit -m "feat: complete Nuxt 4 migration

- Nuxt 3.15.1 -> 4.4.2
- @nuxt/ui 2.20.0 -> 4.6.1
- @nuxt/content 2.13.4 -> 3.13.0
- Tailwind CSS v3 -> v4
- All pages and components verified"
```

---

## Notas Importantes

### Breaking Changes con Mayor Impacto

1. **`data` y `error` de useAsyncData** ahora son `undefined` en vez de `null` inicialmente. Si hay checks `=== null`, cambiarlos a `=== undefined` o usar optional chaining.

2. **`data` de useFetch/useAsyncData es `shallowRef`** por defecto. Si se mutan propiedades internas del objeto, no se disparara reactividad. Usar `{ deep: true }` si es necesario.

3. **Componentes auto-importados** ahora usan nombres completos incluyendo el directorio. Ej: `AppNavbar` en vez de `Navbar`. Verificar que `<KeepAlive>` (si se usa) referencia los nombres correctos.

4. **Tailwind CSS v4** usa variables CSS para colores. Las clases como `bg-gray-50`, `text-primary-500` siguen funcionando, pero el sistema subyacente es diferente.

### Rollback Strategy

Si la migracion falla en algun punto:
```bash
git stash  # O git reset --hard si se quiere descartar todo
git checkout codespace-improved-guide-q694rpjr56jfpg5
```

### Recursos

- [Nuxt 4 Upgrade Guide](https://nuxt.com/docs/getting-started/upgrade)
- [Nuxt UI v4 Migration](https://ui.nuxt.com/docs/getting-started/migration/v4)
- [Nuxt Content v3 Migration](https://content.nuxt.com/docs/getting-started/migration)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Announcing Nuxt 4](https://nuxt.com/blog/v4)
