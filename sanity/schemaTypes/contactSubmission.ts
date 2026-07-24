import { defineType, defineField } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact submission",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Communication", value: "communication" },
          { title: "Complaint", value: "complaint" },
        ],
      },
    }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "createdAt", title: "Created at", type: "datetime" }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "createdDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "type" },
  },
});
