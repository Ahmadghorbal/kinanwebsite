/**
 * Verified, sourced content for the site. Acts as the single source of truth for
 * the static fallback (used when no Sanity project is connected) and as the basis
 * for the Sanity seed data. Bio facts are from public reporting; article summaries
 * are original paraphrases of the author's own published pieces (see DEPLOY.md for
 * provenance) — full text lives at the linked source, which every article credits.
 */

export type Locale = "ar" | "en";
export type Localized = Record<Locale, string>;

export interface ArticleSource {
  name: Localized;
  url: string;
}

export interface Article {
  slug: string;
  title: Localized;
  dek: Localized;
  publishedAt: string; // ISO date
  source: ArticleSource;
  coverImage?: string;
  /** Short original summary paragraphs (not a reproduction of the source text). */
  summary: Localized[];
}

export interface SurveyOption {
  id: string;
  label: Localized;
}

export interface Survey {
  id: string;
  question: Localized;
  options: SurveyOption[];
}

export interface Interview {
  id: string;
  title: Localized;
  youtubeId: string;
  publishedAt: string;
}

export interface SiteContent {
  name: Localized;
  role: Localized;
  tagline: Localized;
  bio: Localized[];
  photo?: string;
  socials: { facebook: string; x: string };
  contactEmail: string;
  survey: Survey;
  articles: Article[];
  interviews: Interview[];
}

export const siteContent: SiteContent = {
  name: { ar: "كنان النحاس", en: "Kinan al-Nahhas" },
  role: {
    ar: "عضو مجلس الشعب السوري عن مدينة حمص",
    en: "Member of Syria's People's Assembly for the city of Homs",
  },
  tagline: {
    ar: "صوتٌ من حمص في أول مجلس شعب بعد سقوط الأسد، يعمل من أجل عدالة انتقالية حقيقية، ودستور دائم يعبّر عن كل السوريين، ومؤسسات تخدم المواطن.",
    en: "A voice from Homs in the first People's Assembly after the fall of Assad — working for genuine transitional justice, a permanent constitution that represents all Syrians, and institutions that serve the citizen.",
  },
  bio: [
    {
      ar: "كنان محمد لبيب النحاس، ابن مدينة حمص، شارك في التظاهرات السلمية ضد نظام الأسد منذ الأشهر الأولى للثورة السورية عام 2011، واعتُقل في تموز من العام نفسه إثر تفريق إحدى المظاهرات في حي الملعب البلدي بحمص، قبل أن يُطلق سراحه.",
      en: "Kinan Mohammad Labib al-Nahhas, a son of the city of Homs, took part in the peaceful protests against the Assad regime from the earliest months of the Syrian revolution in 2011. He was arrested that July after security forces dispersed a demonstration in the Malaab district of Homs, and was later released.",
    },
    {
      ar: "بعد سنوات الحرب واللجوء، انخرط في العمل المدني والحقوقي المعني بالدفاع عن حقوق اللاجئين السوريين وكرامتهم، ضمن أوساط تعمل على أن تبقى قضية اللاجئين حاضرة في أي حل سياسي قادم لسوريا.",
      en: "After the years of war and displacement, he became active in civil and rights work dedicated to defending the rights and dignity of Syrian refugees, among circles working to keep the refugee cause present in any future political settlement for Syria.",
    },
    {
      ar: "في تشرين الأول 2025، فاز بعضوية مجلس الشعب السوري كمرشح مستقل عن دائرة مركز مدينة حمص، ليكون من أعضاء أول مجلس شعب يُنتخب بعد سقوط نظام الأسد. ومنذ انطلاق عمل المجلس، يركّز على ملفات العدالة الانتقالية، وصياغة الدستور الدائم، وإصلاح القضاء، إلى جانب الأولويات الاقتصادية والتعليمية والرقابية التي تمسّ حياة السوريين اليوم.",
      en: "In October 2025 he won a seat in Syria's People's Assembly as an independent candidate for the central Homs district, becoming one of the members of the first People's Assembly elected after the fall of the Assad regime. Since the Assembly began its work, he has focused on transitional justice, drafting the permanent constitution, and judicial reform, alongside the economic, educational, and oversight priorities that touch Syrians' lives today.",
    },
  ],
  photo: "/images/articles/kinan-portrait.jpg",
  socials: {
    facebook: "https://www.facebook.com/kinan.nahhas",
    x: "https://x.com/kinan_nahhas",
  },
  contactEmail: "",
  survey: {
    id: "priorities-2026",
    question: {
      ar: "ما الملف الذي تراه الأولوية القادمة لمجلس الشعب؟",
      en: "Which priority should the People's Assembly take up next?",
    },
    options: [
      {
        id: "transitional-justice",
        label: { ar: "العدالة الانتقالية", en: "Transitional justice" },
      },
      {
        id: "constitution",
        label: { ar: "الدستور الدائم", en: "Permanent constitution" },
      },
      { id: "judiciary", label: { ar: "إصلاح القضاء", en: "Judicial reform" } },
      {
        id: "economy",
        label: { ar: "الاقتصاد وإعادة الإعمار", en: "Economy & reconstruction" },
      },
      {
        id: "education",
        label: { ar: "التعليم والثقافة", en: "Education & culture" },
      },
      {
        id: "oversight",
        label: { ar: "الرقابة على المؤسسات", en: "Institutional oversight" },
      },
    ],
  },
  articles: [
    {
      slug: "our-priorities-in-syrias-peoples-assembly",
      title: {
        ar: "أولوياتنا في مجلس الشعب",
        en: "Our priorities in Syria's People's Assembly",
      },
      dek: {
        ar: "كيف يمكننا بناء برلمان فاعل وإرساء أسس سوريا عادلة ومزدهرة بعد الأسد.",
        en: "How we can build an effective Parliament and lay the foundations for a just and prosperous Syria after Assad.",
      },
      publishedAt: "2026-07-18",
      source: {
        name: { ar: "سوريا المتجدّدة", en: "Syria in Transition" },
        url: "https://www.syriaintransition.com/ar/home/opinion/our-priorities-in-syria-s-people-s-assembly",
      },
      coverImage: "/images/articles/kinan-portrait.jpg",
      summary: [
        {
          ar: "يستعرض النحاس رؤيته لأولويات العمل النيابي في أول مجلس شعب سوري بعد سقوط الأسد، مقسّماً العمل إلى ثلاثة مسارات: إتمام الأسس التأسيسية للمجلس (النظام الداخلي والموازنة)، الشروع بصياغة دستور دائم يحظى بأوسع توافق وطني ممكن، ثم مجموعة أولويات تشريعية عاجلة تشمل العدالة الانتقالية، الإصلاح القضائي، الشأن الاقتصادي، التعليم، والرقابة على مؤسسات الدولة.",
          en: "Nahhas lays out his view of the new People's Assembly's priorities across three tracks: completing the Assembly's founding groundwork (rules of procedure and budget), beginning work on a permanent constitution built on the broadest possible national consensus, and a set of urgent legislative priorities spanning transitional justice, judicial reform, the economy, education, and oversight of state institutions.",
        },
      ],
    },
    {
      slug: "i-fought-hezbollah-in-homs-seeking-revenge-in-lebanon-is-wrong",
      title: {
        ar: "بين لعنة حمص ولعنة الأقصى: قدر نافذ وحذر واجب",
        en: "I fought Hezbollah in Homs. Seeking revenge in Lebanon is wrong",
      },
      dek: {
        ar: "جراح حمص لم تندمل بعد، ومع ذلك يبرز إغراء تصفية الحسابات في لبنان؛ غير أن الانخراط في هذا المسار قد يفتح على سوريا أبواب صراع إقليمي أوسع، في لحظة تحتاج فيها إلى التعافي لا المغامرة.",
        en: "Scarred by the siege of Homs and mindful of the regional war, Syria faces a dangerous temptation: to settle old scores in Lebanon. But intervention now risks entangling a fragile state in a wider regional conflict.",
      },
      publishedAt: "2026-03-19",
      source: {
        name: { ar: "سوريا المتجدّدة", en: "Syria in Transition" },
        url: "https://www.syriaintransition.com/ar/home/opinion/i-fought-hezbollah-in-homs-seeking-revenge-in-lebanon-is-wrong",
      },
      coverImage: "/images/articles/kinan-portrait.jpg",
      summary: [
        {
          ar: "يكتب النحاس من موقع من قاتل قوات حزب الله خلال حصار حمص عام 2013، مستعيداً وطأة تلك المعارك، ليجادل بأن إغراء الانتقام من الحزب داخل لبنان اليوم يحمل مخاطر جدّية على سوريا في مرحلتها الانتقالية الهشة، داعياً إلى الحذر وضبط النفس بدلاً من الانجرار إلى صراع إقليمي أوسع.",
          en: "Writing as someone who fought Hezbollah during the siege of Homs in 2013, Nahhas revisits the toll of those battles and argues that the temptation to settle scores with Hezbollah inside Lebanon today carries serious risks for Syria's fragile transition, calling for restraint over engagement in a wider regional conflict.",
        },
      ],
    },
    {
      slug: "germanys-nuremberg-trials-are-no-blueprint-for-syria",
      title: {
        ar: "بحثاً عن العدالة الانتقالية وتشويه التاريخ",
        en: "Germany's Nuremberg trials are no blueprint for Syria",
      },
      dek: {
        ar: "هل يمكن حقاً لتجربة ألمانيا بعد الحرب أن تشكّل نموذجاً يحتذى به في العدالة الانتقالية في سوريا؟ نظرة أدق تكشف واقعاً أكثر تعقيداً وعنفاً من الصورة المختزلة في محاكمات نورمبرغ.",
        en: "Can Germany's post-war experience really serve as a blueprint for Syria's transitional justice? A closer look reveals a far more complex — and violent — reality than the oft-cited Nuremberg Trials.",
      },
      publishedAt: "2026-02-25",
      source: {
        name: { ar: "سوريا المتجدّدة", en: "Syria in Transition" },
        url: "https://www.syriaintransition.com/ar/home/opinion/germany-s-nuremberg-trials-are-no-blueprint-for-syria",
      },
      coverImage: "/images/articles/kinan-portrait.jpg",
      summary: [
        {
          ar: "يناقش النحاس المقارنات الجاهزة التي تُطرح بين تجربة ألمانيا في محاكمات نورمبرغ وملف العدالة الانتقالية في سوريا، مبيّناً أن الواقع الألماني بعد الحرب كان أكثر تعقيداً وعنفاً مما تختزله هذه المقارنات، وداعياً إلى صياغة مسار سوري خاص للعدالة يقوم على سيادة القانون والمساءلة وحقوق الضحايا بدل استعارة نماذج جاهزة.",
          en: "Nahhas challenges the ready-made comparisons drawn between Germany's Nuremberg trials and Syria's transitional-justice debate, arguing that Germany's post-war reality was far more complex and violent than these comparisons suggest, and calling for Syria to chart its own path to justice grounded in the rule of law, accountability, and victims' rights.",
        },
      ],
    },
  ],
  interviews: [
    {
      id: "KUVlErEjT9U",
      title: {
        ar: "اللقاء الكامل مع كنان النحاس (أبو عزام) — عضو مجلس الشعب عن محافظة حمص",
        en: "Full interview with Kinan al-Nahhas (Abu Azzam) — Member of the People's Assembly, Homs Governorate",
      },
      youtubeId: "KUVlErEjT9U",
      publishedAt: "2026-01-01",
    },
  ],
};
