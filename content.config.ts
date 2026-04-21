import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
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
				tags: z.array(z.string()).optional(),
			}),
		}),

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
