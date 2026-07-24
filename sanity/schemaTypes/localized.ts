import { defineType, defineField } from "sanity";

const blockStyles = [
  { title: "Normal", value: "normal" },
  { title: "Heading", value: "h3" },
];

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "ar", title: "العربية", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "ar", title: "العربية", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
  ],
});

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "ar",
      title: "العربية",
      type: "array",
      of: [{ type: "block", styles: blockStyles }],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block", styles: blockStyles }],
    }),
  ],
});
