import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

export function ArticleBody({ value }: { value: unknown }) {
  return (
    <div className="prose">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  );
}
