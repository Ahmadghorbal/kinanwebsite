import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, role, tagline, bio, facts, socials, contactEmail,
  "photo": photo.asset->url
}`;

export const articlesQuery = groq`*[_type == "article"] | order(publishedAt desc){
  "slug": slug.current, title, dek, publishedAt, source
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current, title, dek, publishedAt, source, body
}`;

export const articleSlugsQuery = groq`*[_type == "article" && defined(slug.current)].slug.current`;

export const surveyQuery = groq`*[_type == "survey" && isActive == true] | order(_createdAt desc)[0]{
  "id": coalesce(surveyId, _id), question, options
}`;
