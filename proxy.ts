import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on all pages except API routes, the Sanity Studio, Next internals,
  // and any path containing a dot (static files, sitemap.xml, robots.txt, …).
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
