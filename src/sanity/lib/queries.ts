import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage,
  techStack,
  githubUrl,
  liveUrl
}`)

export const LINKEDIN_POSTS_QUERY = defineQuery(`*[_type == "linkedinPost" && hidden != true] | order(publishedAt desc) {
  _id,
  linkedinId,
  text,
  publishedAt,
  url
}`)
