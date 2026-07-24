/**
 * Verified, sourced content for the site. Acts as the single source of truth for
 * the static fallback (used when no Sanity project is connected) and as the basis
 * for the Sanity seed data. Bio facts are from public reporting; article summaries
 * are original paraphrases of the author's own published pieces (see DEPLOY.md for
 * provenance) — full text lives at the linked source, which every article credits
 * prominently as the place of first publication.
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
  surveys: Survey[];
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
  surveys: [
    {
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
        {
          id: "judiciary",
          label: { ar: "إصلاح القضاء", en: "Judicial reform" },
        },
        {
          id: "economy",
          label: {
            ar: "الاقتصاد وإعادة الإعمار",
            en: "Economy & reconstruction",
          },
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
    {
      id: "lebanon-2026",
      question: {
        ar: "هل تؤيد انخراط سوريا في ملف لبنان اليوم؟",
        en: "Do you support Syria's involvement in the Lebanon file today?",
      },
      options: [
        {
          id: "support",
          label: { ar: "نعم، بشروط واضحة", en: "Yes, with clear conditions" },
        },
        {
          id: "oppose",
          label: { ar: "لا، الأولوية للداخل", en: "No, focus on the home front" },
        },
        {
          id: "unsure",
          label: { ar: "غير متأكد", en: "Not sure" },
        },
      ],
    },
  ],
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
      summary: [
        {
          ar: "يستعرض النحاس رؤيته لأولويات العمل النيابي في أول مجلس شعب سوري بعد سقوط الأسد، مقسّماً العمل إلى ثلاثة مسارات رئيسية. المسار الأول تأسيسي بحت: إقرار النظام الداخلي للمجلس واعتماد موازنته الخاصة، وصولاً إلى دراسة الموازنة العامة للدولة لعام 2026. المسار الثاني يتعلق بالدستور الدائم، الذي يرى أن صياغته يجب أن تستغرق عامين على الأقل لضمان أوسع توافق وطني ممكن، عبر لجنة تُشكَّل من عُشر أعضاء المجلس لتمثّل مختلف شرائح المجتمع. أما المسار الثالث فيغطي الأولويات التشريعية العاجلة للأشهر الستة المقبلة: العدالة الانتقالية (تثبيت العزل السياسي وإعادة هيكلة الأجهزة الأمنية)، الإصلاح القضائي (استبدال القضاة الفاسدين وتفعيل الرقابة القضائية)، قانون أحزاب عصري، ملفات اقتصادية تخصّ إعادة الإعمار وحقوق العمال، تحديث التعليم، ورقابة برلمانية على مؤسسات الدولة كالصندوق السيادي وهيئة الاستثمار.",
          en: "Nahhas lays out his view of the new People's Assembly's priorities across three tracks. The first is purely institutional: adopting the Assembly's rules of procedure and its own budget, then scrutinising the state's 2026 general budget. The second concerns the permanent constitution, which he argues should take at least two years to draft so as to secure the broadest possible national consensus, through a committee drawn from one-tenth of the Assembly's members to represent society's different segments. The third covers urgent legislative priorities for the next six months: transitional justice (political exclusion and restructuring the security services), judicial reform (replacing corrupt judges and activating judicial oversight), a modern political-parties law, economic files tied to reconstruction and labour rights, modernising education, and parliamentary oversight of state bodies such as the Sovereign Fund and the Investment Authority.",
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
      summary: [
        {
          ar: "يكتب النحاس من موقع من قاتل صفوف حزب الله خلال حصار حمص أواخر عام 2013، حين حاصرت قوات النظام والحزب معاً أحياء المدينة بعد سيطرتها على القصير وريف حمص الجنوبي الغربي. يستعيد قسوة تلك المعارك ووطأة مجازر تلك الحقبة، ليخلص إلى أن إغراء الانتقام من حزب الله داخل الأراضي اللبنانية اليوم، رغم مشروعيته العاطفية، يحمل مخاطر جسيمة على سوريا في مرحلتها الانتقالية الهشة: فقد ينزلق البلد إلى صراع إقليمي أوسع من طاقته على تحمّله في هذه المرحلة الحرجة. لذلك يدعو إلى ضبط النفس والتريّث، معتبراً أن أولوية سوريا اليوم هي التعافي الداخلي لا فتح جبهات جديدة.",
          en: "Writing as someone who fought in the ranks against Hezbollah during the siege of Homs in late 2013 — when regime and Hezbollah forces together besieged the city's neighbourhoods after seizing al-Qusayr and the south-western Homs countryside — Nahhas revisits the brutality of those battles and the era's massacres. He concludes that the temptation to take revenge on Hezbollah inside Lebanon today, however emotionally understandable, carries grave risks for Syria's fragile transition: the country could be pulled into a wider regional conflict it cannot currently afford. He calls instead for restraint, arguing that Syria's priority now is internal recovery, not opening new fronts.",
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
      summary: [
        {
          ar: "يناقش النحاس المقارنات الجاهزة التي تُطرح بكثرة في النقاش السوري الدائر حول العدالة الانتقالية، وعلى رأسها استحضار محاكمات نورمبرغ الألمانية كنموذج جاهز يمكن استنساخه. يجادل بأن هذه المقارنة تختزل تجربة ألمانيا إلى رمز مبسّط، بينما كان الواقع الألماني بعد الحرب أكثر تعقيداً وعنفاً بكثير مما تُظهره الصورة الشائعة، إذ استغرقت المساءلة الحقيقية عقوداً وشملت مسارات متعددة ومتضاربة أحياناً. وخلاصته أن سوريا لا تحتاج إلى استعارة نموذج جاهز من تجربة مختلفة تماماً في سياقها التاريخي، بل إلى صياغة مسارها الخاص للعدالة الانتقالية، بحيث يرتكز على سيادة القانون والمساءلة الحقيقية وحقوق الضحايا، بدل الانشغال بمقارنات تاريخية مختزلة قد تُستخدم لتبرير حلول عاجلة وغير كافية.",
          en: "Nahhas takes aim at the ready-made comparisons that keep surfacing in Syria's transitional-justice debate, chief among them the invocation of Germany's Nuremberg trials as an off-the-shelf model to replicate. He argues the comparison reduces Germany's experience to an oversimplified symbol, when the post-war German reality was in fact far more complex and violent than the popular image suggests — genuine accountability took decades and followed multiple, sometimes conflicting, tracks. His conclusion is that Syria does not need to borrow a ready-made model from an experience wholly different in its historical context, but must chart its own path to transitional justice — one grounded in the rule of law, genuine accountability, and victims' rights, rather than reduced historical comparisons that risk being used to justify quick, inadequate fixes.",
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
