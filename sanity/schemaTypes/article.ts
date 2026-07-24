import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "dek", title: "Standfirst / dek", type: "localeText" }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Original source",
      type: "object",
      fields: [
        { name: "name", title: "Publication name", type: "localeString" },
        { name: "url", title: "URL", type: "url" },
      ],
    }),
    defineField({ name: "body", title: "Body", type: "localeBlock" }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Published (newest)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.en", subtitle: "publishedAt" },
  },
});
