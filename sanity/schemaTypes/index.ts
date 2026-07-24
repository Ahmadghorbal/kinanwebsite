import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText } from "./localized";
import { siteSettings } from "./siteSettings";
import { article } from "./article";
import { survey, surveyResults } from "./survey";
import { contactSubmission } from "./contactSubmission";
import { interview } from "./interview";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  // documents
  siteSettings,
  article,
  survey,
  surveyResults,
  contactSubmission,
  interview,
];
