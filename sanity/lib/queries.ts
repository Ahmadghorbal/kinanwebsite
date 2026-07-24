import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, role, tagline, bio, socials, contactEmail,
  "photo": photo.asset->url
}`;

export const articlesQuery = groq`*[_type == "article"] | order(publishedAt desc){
  "slug": slug.current, title, dek, publishedAt, source,
  "coverImage": coverImage.asset->url
}`;

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current, title, dek, publishedAt, source, summary,
  "coverImage": coverImage.asset->url
}`;

export const articleSlugsQuery = groq`*[_type == "article" && defined(slug.current)].slug.current`;

export const surveyQuery = groq`*[_type == "survey" && isActive == true] | order(_createdAt desc)[0]{
  "id": coalesce(surveyId, _id), question, options
}`;

export const interviewsQuery = groq`*[_type == "interview"] | order(publishedAt desc){
  title, youtubeId, publishedAt
}`;
