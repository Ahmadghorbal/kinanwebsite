import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText, localeBlock } from "./localized";
import { siteSettings } from "./siteSettings";
import { article } from "./article";
import { survey, surveyResults } from "./survey";
import { contactSubmission } from "./contactSubmission";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  localeBlock,
  // documents
  siteSettings,
  article,
  survey,
  surveyResults,
  contactSubmission,
];
