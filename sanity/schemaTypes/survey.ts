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
      description:
        "Written directly by the /api/survey route. Keys are option IDs " +
        "(dynamic, so they won't all appear as named fields here) mapped " +
        "to vote counts.",
      type: "object",
      fields: [{ name: "placeholder", title: "—", type: "number", hidden: true }],
      options: { collapsed: true },
    }),
  ],
  preview: {
    select: { title: "surveyId" },
    prepare: ({ title }) => ({ title: `Results: ${title || "survey"}` }),
  },
});
