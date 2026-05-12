import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title:               z.string(),
  slug:                z.string(),
  description:         z.string(),
  publishDate:         z.coerce.date(),
  updatedDate:         z.coerce.date().optional(),
  author:              z.string(),
  readTime:            z.number(),
  heroImage:           z.string().optional(),
  category:            z.string(),
  tags:                z.array(z.string()),
  featured:            z.boolean().default(false),
  affiliateDisclosure: z.boolean().default(true),
  relatedProducts:     z.array(z.string()).optional(),
  schema:              z.enum(['Article', 'HowTo', 'Review', 'FAQPage']),
  draft:               z.boolean().default(false),
});

const guide = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guide' }),
  schema: articleSchema,
});

const make = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/make' }),
  schema: articleSchema,
});

const gear = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gear' }),
  schema: articleSchema,
});

const milk = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/milk' }),
  schema: articleSchema,
});

const beans = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/beans' }),
  schema: articleSchema,
});

// Scaffolded for future city guides — no content required yet
const places = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/places' }),
  schema: articleSchema.extend({
    city:    z.string().optional(),
    country: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    author:      z.string().default('Sara Vitale'),
    tags:        z.array(z.string()).optional(),
    heroImage:   z.string().optional(),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { guide, make, gear, milk, beans, places, blog };
