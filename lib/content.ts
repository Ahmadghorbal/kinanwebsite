/**
 * Verified, sourced content for the site. Acts as the single source of truth for
 * the static fallback (used when no Sanity project is connected) and as the basis
 * for the Sanity seed data. All факты here were confirmed from public reporting and
 * the author's own published article; see DEPLOY.md for provenance notes.
 */

export type Locale = "ar" | "en";
export type Localized = Record<Locale, string>;

export type Block =
  | { kind: "p"; lead?: Localized; text: Localized }
  | { kind: "h3"; text: Localized };

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
  body: Block[];
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

export interface Fact {
  label: Localized;
  value: Localized;
}

export interface SiteContent {
  name: Localized;
  role: Localized;
  tagline: Localized;
  bio: Localized[];
  facts: Fact[];
  socials: { facebook: string; x: string };
  contactEmail: string;
  survey: Survey;
  articles: Article[];
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
  facts: [
    {
      label: { ar: "الدائرة الانتخابية", en: "Electoral district" },
      value: { ar: "مركز مدينة حمص", en: "Central Homs" },
    },
    {
      label: { ar: "الصفة", en: "Role" },
      value: {
        ar: "عضو مستقل في مجلس الشعب",
        en: "Independent member of the People's Assembly",
      },
    },
    {
      label: { ar: "أبرز الملفات", en: "Key priorities" },
      value: {
        ar: "العدالة الانتقالية، الدستور الدائم، إصلاح القضاء",
        en: "Transitional justice, permanent constitution, judicial reform",
      },
    },
  ],
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
      body: [
        {
          kind: "p",
          text: {
            ar: "انطلق بعد تأخير طويل مجلس الشعب الأول بعد سقوط نظام الأسد. ورغم ظروف نشأته غير المثالية، فإن واجبنا كنوّاب فيه أن نحقق النجاح بما يصبّ في صالح شعبنا المتعطش لإزالة آثار النظام البائد وبناء سوريا الجديدة.",
            en: "After a long delay, Syria's first People's Assembly since the fall of the Assad regime has convened. The circumstances of its formation may have been imperfect, but our duty as MPs is clear: to make it succeed for a people eager to remove the remnants of the former regime and build a new Syria.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "لا شك أن هناك شروطاً موضوعية تضمن نجاح المجلس كمؤسسة، وعلى رأسها استقلاليته من ناحية، وتعاونه الجاد مع السلطة التنفيذية من ناحية أخرى، إضافة لكفاءة القوانين الصادرة عنه مع ضرورة ترتيب الأولويات النيابية بدقة وفاعلية.",
            en: "Success will depend on the Assembly's independence, serious co-operation with the executive and its ability to produce effective legislation. Its priorities must also be ordered with precision and purpose.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وسنحصر الحديث عن أولويات العمل البرلماني، إذ يُعتَبر مجلسنا استثنائياً في ضرورة ترتيبه الأولويات نظراً لتراكم ستة عقود من التقنين الفاسد، وتقدُّم السلطة التنفيذية على التشريعية لأكثر من عام ونصف من العمل، وخلالها اضطرت لممارسة مهام تشريعية تمثَّلت بإصدار رئيس الجمهورية العشرات من المراسيم التي سيقع على عاتق المجلس مراجعتها خلال الفترة القادمة.",
            en: "We face the legacy of six decades of corrupt law-making, while the executive has had a head start of more than 18 months. During that period, necessity compelled the President to issue dozens of decrees which Parliament must now review.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "لذا يمكن اعتبار العمل البرلماني القادم قائماً على ثلاثة مسارات؛ الأولويات التأسيسية، الدستور الدائم، والأولويات القانونية.",
            en: "Our work falls into three areas: establishing the Assembly's foundations, drafting a permanent constitution and addressing urgent legislative priorities.",
          },
        },
        {
          kind: "h3",
          text: { ar: "الأولويات التأسيسية", en: "Establishing the Assembly" },
        },
        {
          kind: "p",
          text: {
            ar: "لا بد من إتمام المهام التأسيسية ليتمكن المجلس من مباشرة أعماله بشكل مهني وصحيح. وقد بدأ هذا بتشكيل مكتب المجلس في الجلسة الأولى بانتخاب رئيس للمجلس ونائبين وأمين سر (المادة 28 من الإعلان الدستوري)، لينتقل المجلس بعدها إلى «النظام الداخلي»، الذي ينبغي كتابته واعتماده قبل مباشرة المجلس لمهامه.",
            en: "The Assembly must first complete the institutional groundwork required to operate professionally. At its inaugural sitting, it elected a Speaker, two deputies and a secretary under Article 28 of the Constitutional Declaration. It must now adopt its rules of procedure.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وقد قام عدد من النواب بكتابة مسودة متكاملة للنظام الداخلي عبر ورشات عمل متتالية، لتكون «المسودة الأولى» التي يمكن الانطلاق منها إلى النظام الداخلي الرسمي للمجلس، وقد شارك فيها نحو 30 نائباً إضافة لتعليقات ومساهمات أكثر من 10 قانونيين ودستوريين سوريين. ويمكننا إتمام هذه المسودة ثم عرض النظام الداخلي للمناقشة والتصديق خلال أسبوعين على الأكثر من انطلاق العمل الرسمي، بدلاً من مهلة الشهر التي يتيحها الإعلان الدستوري (المادة 29).",
            en: "Around 30 MPs have already prepared a comprehensive draft through successive workshops, with comments and contributions from more than 10 Syrian legal and constitutional experts. The final text should be debated and approved within two weeks, rather than using the full month allowed under Article 29.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وبالتزامن مع النظام الداخلي، إعداد «موازنة مجلس الشعب» كي يتمكن المجلس من مباشرة أعماله بشكل صحيح وتأمين الموارد المطلوبة لعمل كامل اللجان، وهذا الأمر مُناط بالدرجة الأولى على عاتق مكتب المجلس المُنتخب مؤخراً.",
            en: "The Assembly must also prepare its own budget so that its committees can work effectively and have the resources they require. Responsibility for this rests primarily with the recently elected Assembly Bureau.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وتتمثّل آخر نقطة في مسار الأولويات التأسيسية في دراسة الموازنة العامة للدولة لعام 2026 واعتمادها، فهي المرجع لفهم عمل الحكومة والقدرة على تقييم أدائها. وبدونها سيكون إشكال قانوني من ناحية، وضياع لبوصلة التقييم من ناحية أخرى.",
            en: "It must then scrutinise and approve the state budget for 2026. Without it, there will be both a legal problem and no clear benchmark against which to understand the Government's work or judge its performance.",
          },
        },
        {
          kind: "h3",
          text: { ar: "الدستور الدائم", en: "A permanent constitution" },
        },
        {
          kind: "p",
          text: {
            ar: "يُعتَبر مسار الدستور الدائم استراتيجياً للدولة السورية الوليدة، ويُتوقَّع إنجازه لفترة لا تقل عن عامين من العمل قبل عرضه للاستفتاء الشعبي، لأن العبء الأكبر هو تحقيق حوار مجتمعي وصولاً لأكبر قدر من التوافق السوري الداخلي على الدستور القادم.",
            en: "Drafting a permanent constitution is likely to take at least two years before the text can be put to a referendum. The greatest task will be conducting a genuine national dialogue and securing the broadest possible agreement among Syrians.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "ونظراً لأن الشرعية الثورية ليست كافية لتشكيل لجنة كتابة دستور دائم، واستحالة انتخاب هيئة لها شرعية انتخابية ويُناط بها كتابته، فالواضح أن مجلس الشعب هو المؤسسة الوحيدة التي تجمع بين الشرعية الثورية والانتخابية، وإن شاركت السلطة التنفيذية -نظراً للوضع الاستثنائي- في إنشائها بشكل مباشر وغير مباشر.",
            en: "Revolutionary legitimacy alone is insufficient to appoint a constitutional committee, while present conditions make it impossible to elect a separate body with the necessary mandate. The People's Assembly is therefore the only institution combining revolutionary and electoral legitimacy, despite the executive's direct and indirect role in its creation.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وعليه، فإن على اللجنة أن تكون مكوّنة من عُشر أعضاء المجلس لكي تتمكن من تمثيل شرائح المجتمع بشكل جلي.",
            en: "A constitutional committee comprising one tenth of the Assembly would be sufficiently broad to represent the different sections of Syrian society.",
          },
        },
        {
          kind: "h3",
          text: { ar: "مسار الأولويات القانونية", en: "Legislative priorities" },
        },
        {
          kind: "p",
          text: {
            ar: "مسار الأولويات القانونية هو الأضخم، ولا يمكن إنجاز المطلوب فيه خلال دورة اعتيادية واحدة، مما يضطرنا للمفاضلة لتقديم الأولى منها، ولذلك يمكننا تقسيم الأولويات النيابية على محاور، ونكتفي بسرد الأَهم بالإصدار في الأشهر الستة القادمة:",
            en: "The legislative programme cannot be completed in one parliamentary term. Over the next six months, we must concentrate on several urgent priorities:",
          },
        },
        {
          kind: "p",
          lead: { ar: "محور العدالة الانتقالية:", en: "Transitional justice." },
          text: {
            ar: "نجاحنا في هذا المحور يضمن انتقالَنا لمرحلة «السلم الأهلي» ويضمن توحيد سوريا مجتمعياً بعد توحيدها سياسياً. وينبغي لقانون العدالة الانتقالية أن يتوسّع ليشمل تثبيت العزل السياسي، وضمان إعادة هيكلة مؤسسات الدولة وخاصة الأمنية والعسكرية، بحيث تعجز عن ممارسة الظلم والاستبداد مجدداً، كما ينبغي أن يتضمن تعويض الفئات المهمّشة والمتضررة ومعاملتها بتمييز إيجابي يمحي آثار الاستبداد السابق.",
            en: "A comprehensive law must establish political exclusion measures and restructure state institutions, especially the security services and armed forces, so that they can never again become instruments of oppression. It must also compensate marginalised and injured groups, using positive measures to remedy the lasting effects of tyranny. Success would help Syria advance towards civil peace and achieve social unity alongside political unity.",
          },
        },
        {
          kind: "p",
          lead: {
            ar: "المحور الحقوقي السياسي:",
            en: "Political and civil rights.",
          },
          text: {
            ar: "وهنا ينبغي التركيز على حقوق الإنسان وحمايته وتطوير معارفه وإدراكه لحقوقه، وبالتالي الإسراع بإنهاء كافة القوانين الاستثنائية والقوانين الداعمة لتغوّل المؤسسات الأمنية، وطرح قوانين تضمن حماية الفرد والمجتمع، لتعيد بناء العلاقة الصحيحة بين الدولة والمواطن، لتصبح الدولة خادمة للمواطن وناهضة بالمجتمع.",
            en: "Exceptional laws that enabled the security services to overreach must be repealed. Citizens must also be helped to understand their rights. The relationship between citizen and state must be rebuilt so that the state serves its people and advances society.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وهنا تبرز أهمية صياغة قانون عصري للأحزاب ليحقق مزيداً من الوعي السياسي والثقافي بعد عقود من التصحّر السياسي، ونرى الإسراع في إصداره لمنح فرصة كافية للمجتمع والأحزاب الناشئة لتأهيل أنفسها وعرض برامجها. كما أنه من الضروري إصدار قانونين عصريين للجمعيات الأهلية والأوقاف.",
            en: "A modern political parties law is especially urgent after decades of political desolation. Emerging parties need time to organise and present their programmes. Modern laws governing civil-society organisations and religious endowments are also required.",
          },
        },
        {
          kind: "p",
          lead: { ar: "المحور القضائي:", en: "Judicial reform." },
          text: {
            ar: "هذا المحور جزء من المحور السابق، ولكنني ميّزته لخصوصيّته، ويقوم على مبدأ إصلاح المؤسسة القضائية وتفعيل الإشراف القضائي على المؤسسات الأمنية. أما الإصلاح القضائي العام فيتضمن استبدال القضاة الفاسدين، ونسبتهم بحسب التقديرات عالية، بل إنّ معظم المؤسسة القضائية الموروثة تعاني من الفساد والترهل وعدم تلبية متطلبات واقعنا المعاصر. وهذا الاستبدال مُناط بوزارة العدل بشكل أساسي، والتي قامت بخطوات إيجابية حتى الآن، ونتوقّع أن تستبدل معظم الطبقة الفاسدة مع نهاية المرحلة الانتقالية، مع ضرورة زيادة عدد القضاة. وينبغي أن يترافق هذا مع تعديلات جوهرية لاختصار الإجراءات القانونية، مما قد يحتاج لمراجعة جديّة لأصول المحاكمات الجزائية.",
            en: "Corrupt judges must be replaced, the judiciary expanded and legal procedures shortened, potentially through a substantial revision of the Code of Criminal Procedure. Much of the inherited judicial system suffers from corruption, institutional decay and an inability to meet contemporary needs. The Ministry of Justice has taken encouraging steps, but much remains to be done.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "أمّا الإشراف القضائي على الأجهزة الأمنية، فيحتاج إلى تغيير أو تعديل كل المواد التي تسمح بانتهاك حقوق المواطنين، أو اعتقالهم أو مداهمة أملاكهم دون إذن قضائي.",
            en: "The security services must also be subjected to judicial oversight. Any provision allowing citizens to be detained, or their property searched, without judicial authorisation must be repealed or amended.",
          },
        },
        {
          kind: "p",
          lead: { ar: "المحور الاقتصادي:", en: "The economy." },
          text: {
            ar: "هذا المحور يحتاج من النواب استيعاباً جيداً للسياسة الحكومية -غير الواضحة حتى الآن- وكيفية التطوير وجلب الاستثمارات وصولاً للبدء بإعادة الإعمار. وسيجعل هذا الاستيعاب تجاوب المجلس مع مشاريع الحكومة الاقتصادية سريعاً وإيجابياً، وأن يترافق ذلك مع الضمان القانوني لحقوق العمالة السورية، وحماية الإنتاج الوطني، ودمج الشرائح الثورية في الاقتصاد، وتقديم تسهيلات لضحايا الثورة لدمجهم في سوق العمل. كما من الضروري الحفاظ على القطاع العام، ونقله من التهالك إلى الإنتاج الفاعل.",
            en: "MPs need a clear understanding of the Government's still uncertain policy on growth, investment and reconstruction. Parliament should support sound economic proposals while legally protecting Syrian workers and domestic production. Victims of the revolution must be helped into the labour market, while those who took part in it should be integrated into the economy. The public sector should be preserved and transformed from decay into effective production.",
          },
        },
        {
          kind: "p",
          lead: { ar: "المحور التعليمي الثقافي:", en: "Education and culture." },
          text: {
            ar: "وهذا الجانب يحتاج تحديثاً ثورياً في أهداف العملية التربوية والتعليمية أولاً، وفي قانون التعليم الخاص والجامعي ثانياً، وربط التعليم بالخطط التنموية للدولة السورية بما يحافظ على القيم والهوية.",
            en: "Education requires radical modernisation, beginning with its fundamental aims. Laws governing private and university education must be updated, and teaching linked to Syria's development plans while preserving the country's values and identity.",
          },
        },
        {
          kind: "p",
          lead: { ar: "محور جودة القوانين:", en: "The quality of legislation." },
          text: {
            ar: "سيستغرق هذا المحور كامل المرحلة الانتقالية، وسيحتاج لدورات نيابية إضافية لإتمام مهامه، لذلك ينبغي تخصيص لجنة تعمل بالتوازي مع لجان المجلس الأخرى، وينحصر عملها في تطوير البنية القانونية السورية من جهتين: الأولى رفع الكفاءة وإزالة التعارض بين القوانين، مع تطويرها لتواكب التحول الرقمي. والثانية تعديل كل ما يخالف الشريعة الإسلامية كلياً أو جزئياً في القوانين، وتبلغ نسبتها وفق بعض الدراسات 27,4٪ في القانون المدني، و51,6٪ قانون العقوبات.",
            en: "A dedicated parliamentary committee should review Syrian legislation throughout the transition, removing contradictions, improving efficiency and preparing the law for the digital age. It should also amend provisions deemed wholly or partly incompatible with Islamic law. Some studies put their proportion at 27.4 per cent of the Civil Code and 51.6 per cent of the Penal Code.",
          },
        },
        {
          kind: "p",
          lead: { ar: "المحور الرقابي:", en: "Parliamentary scrutiny." },
          text: {
            ar: "وهذا المحور جوهري في ضمان البناء الصحيح للدولة، وهو لا يعيق عمليات الاستثمار والتطوير والبناء، ولكنه يضمن عدم انحراف المؤسسات أو ضياع الحقوق أو سرقة وهدر المال العام. ويشمل هذا المحور الرقابة على كامل مؤسسات الدولة ومنها «الصندوق السيادي» و«هيئة الاستثمار» و«صندوق التنمية» و«الهيئة العامة للمنافذ البرية والبحرية» وغيرها من المؤسسات والشركات التي يُعوّل عليها كثيراً في نهضة سوريا القادمة.",
            en: "Scrutiny must extend across the state, including the Sovereign Fund, Investment Authority, Development Fund and the authority overseeing land and sea ports, as well as other bodies expected to drive Syria's recovery. Oversight need not hinder investment, development or reconstruction. Properly exercised, it will prevent institutions from straying from their mandates, protect citizens' rights and ensure that public money is neither stolen nor wasted.",
          },
        },
        {
          kind: "p",
          text: {
            ar: "وبهذا يستطيع المجلس أن يسهم في إرساء أسس سوريا عادلة وموحّدة ومزدهرة.",
            en: "That is how Parliament can help lay the foundations of a just, united and prosperous Syria.",
          },
        },
      ],
    },
  ],
};
