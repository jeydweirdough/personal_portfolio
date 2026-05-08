import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'bpdj4w3n',
  dataset: 'production',
  useCdn: false, // Bypass edge cache for live updates
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, // Required for writes
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
