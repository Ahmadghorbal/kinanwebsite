import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString" }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "tagline", title: "Tagline", type: "localeText" }),
    defineField({
      name: "bio",
      title: "Biography (paragraphs)",
      type: "array",
      of: [{ type: "localeText" }],
    }),
    defineField({
      name: "facts",
      title: "Key facts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "localeString" },
            { name: "value", title: "Value", type: "localeString" },
          ],
        },
      ],
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "x", title: "X (Twitter)", type: "url" },
      ],
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name.en" },
    prepare: ({ title }) => ({ title: title || "Site settings" }),
  },
});
