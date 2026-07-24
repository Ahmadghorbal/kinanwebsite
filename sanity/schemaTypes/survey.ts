import { defineType, defineField } from "sanity";

export const survey = defineType({
  name: "survey",
  title: "Survey",
  type: "document",
  fields: [
    defineField({
      name: "surveyId",
      title: "Survey ID (stable key)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "question", title: "Question", type: "localeString" }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "Option ID", type: "string" },
            { name: "label", title: "Label", type: "localeString" },
          ],
          preview: { select: { title: "label.en", subtitle: "id" } },
        },
      ],
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "question.en" },
  },
});

export const surveyResults = defineType({
  name: "surveyResults",
  title: "Survey results (auto)",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "surveyId", title: "Survey ID", type: "string" }),
    defineField({
      name: "counts",
      title: "Counts",
      type: "object",
      // Keys are option IDs written by the /api/survey route.
      fields: [{ name: "_", title: "—", type: "number" }],
      options: { collapsed: true },
    }),
  ],
  preview: {
    select: { title: "surveyId" },
    prepare: ({ title }) => ({ title: `Results: ${title || "survey"}` }),
  },
});
