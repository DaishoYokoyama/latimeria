import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const imagePositionValues = [
  "top",
  "center",
  "bottom",
  "left",
  "right",
  "left-top",
  "left-bottom",
  "right-top",
  "right-bottom",
] as const;

const works = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      order: z.number(),
      imagePosition: z.enum(imagePositionValues).default("bottom"),
    }),
});

export const collections = { works };
