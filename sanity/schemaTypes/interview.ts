import { defineType, defineField } from "sanity";

export const interview = defineType({
  name: "interview",
  title: "Interview",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({
      name: "youtubeId",
      title: "YouTube video ID",
      description: "The id from the video URL, e.g. KUVlErEjT9U",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
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
    select: { title: "title.en", subtitle: "youtubeId" },
  },
});
