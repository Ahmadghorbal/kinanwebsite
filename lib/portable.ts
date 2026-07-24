import type { Locale, Block } from "./content";

export interface PtSpan {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}

export interface PtBlock {
  _type: "block";
  _key: string;
  style: string;
  markDefs: never[];
  children: PtSpan[];
}

/**
 * Convert the human-authored fallback Block[] into Portable Text for a given
 * locale, so a single renderer (@portabletext/react) handles both the fallback
 * content and live Sanity content. Keys are index-derived for hydration stability.
 */
export function blocksToPortableText(blocks: Block[], locale: Locale): PtBlock[] {
  return blocks.map((b, i) => {
    if (b.kind === "h3") {
      return {
        _type: "block",
        _key: `b${i}`,
        style: "h3",
        markDefs: [],
        children: [
          { _type: "span", _key: `b${i}s0`, text: b.text[locale], marks: [] },
        ],
      };
    }

    const children: PtSpan[] = [];
    if (b.lead) {
      children.push({
        _type: "span",
        _key: `b${i}s0`,
        text: `${b.lead[locale]} `,
        marks: ["strong"],
      });
    }
    children.push({
      _type: "span",
      _key: `b${i}s${children.length}`,
      text: b.text[locale],
      marks: [],
    });

    return { _type: "block", _key: `b${i}`, style: "normal", markDefs: [], children };
  });
}
