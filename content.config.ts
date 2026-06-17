import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    countries: defineCollection({
      type: 'page',
      source: 'countries/*.md',
      schema: z.object({
        domain: z.string().optional(),
        continent: z.string().optional(),
        hemisphere: z.string().optional(),
        languages: z.string().optional(),
        alphabet: z.string().optional(),
        direction: z.string().optional(),
        zoom: z.number().optional()
      })
    })
  }
})
