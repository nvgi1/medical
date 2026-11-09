export type Lang = "ar" | "en";
export type Local = { ar: string; en: string };
export const l = (ar: string, en: string): Local => ({ ar, en });
export const graduationProjectDownloadUrl =
  import.meta.env.VITE_GRADUATION_PROJECT_URL ||
  "https://docs.google.com/presentation/d/1umU1VLBsWR34SOmSRhgUo-wb8gX5s7Yj/edit?usp=sharing&ouid=115274914610507629798&rtpof=true&sd=true";
// Replace bracketed values only with verified personal information.
// Empty URLs are intentionally not rendered as links.
export const profile = {
  name: l("ناجي النور خليفة", "Nagi Alnoor Khalifa"),
  title: l("مهندس معدات طبية", "Medical Equipment Engineer"),
  specialization: l("هندسة المعدات الطبية", "Biomedical Equipment Engineering"),
  qualification: l("درجة البكالوريوس", "Bachelor's Degree"),
  university: l("جامعة جاردن سيتي", "Garden City University"),
  graduation: l("2024", "2024"),
  period: l("5 سنوات", "5 years"),
  location: l("الرياض، المملكة العربية السعودية", "Riyadh, Saudi Arabia"),
  introduction: l(
    "أنا ناجي النور خليفة، مهندس معدات طبية حاصل على درجة البكالوريوس في هندسة المعدات الطبية من جامعة جاردن سيتي في السودان، وتخرجت عام 2024. منحتني خلفيتي الأكاديمية أساسًا في الهندسة الطبية والتقنيات الصحية، مع اهتمام خاص بالمعدات الطبية، وتقنيات الرعاية الصحية، وصيانة الأجهزة، والحلول الهندسية التي تدعم أنظمة الرعاية الصحية الحديثة. أؤمن بالتعلم المستمر واستكشاف التطورات التقنية وتطوير قدراتي الفنية والمهنية.",
    "I am Nagi Alnoor Khalifa, a Biomedical Equipment Engineer holding a Bachelor's degree in Biomedical Equipment Engineering from Garden City University, Sudan, graduating in 2024. My academic background has provided me with a foundation in biomedical engineering and medical technologies. I am particularly interested in medical equipment, healthcare technology, equipment maintenance, and engineering solutions that support modern healthcare systems. I am passionate about continuous learning, exploring technological advancements, and developing my technical and professional capabilities.",
  ),
  objective: l(
    "أسعى إلى بناء مسار مهني في هندسة المعدات الطبية، وتطبيق معرفتي الأكاديمية ومهاراتي الهندسية في تركيب المعدات الطبية وصيانتها واختبارها وتقديم الدعم الفني لها. أهدف إلى المساهمة في مؤسسات الرعاية الصحية والشركات الهندسية من خلال دعم موثوقية الأجهزة وكفاءة تشغيلها وسلامة المرضى، مع الاستمرار في تطوير خبرتي المهنية.",
    "To pursue a professional career in Biomedical Equipment Engineering, applying my academic knowledge and engineering skills in medical equipment installation, maintenance, testing, and technical support. I aim to contribute to healthcare organizations and engineering companies by supporting equipment reliability, operational efficiency, and patient safety while continuously developing my professional expertise.",
  ),
  interests: l(
    "المعدات الطبية، تقنيات الرعاية الصحية، صيانة الأجهزة، التطورات التقنية، والحلول الهندسية للرعاية الصحية.",
    "Medical equipment, healthcare technology, equipment maintenance, technological advancements, and engineering solutions for healthcare.",
  ),
  languages: l("العربية: ممتازة · الإنجليزية: جيدة", "Arabic: Excellent · English: Good"),
  portrait: "/media/nagi-portrait-cutout.png",
  email: "nagi@nagialnoor.cyou",
  linkedin: "https://sa.linkedin.com/in/nagi6",
  whatsapp: "+966545810197",
};
export const routes = [
  {
    path: "/profile",
    label: l("الملف الشخصي", "Profile"),
    title: l("المهندس وراء التقنية", "The engineer behind the technology"),
    desc: l(
      "شغف بالهندسة. اهتمام بالإنسان. ومسار يتشكل عند التقائهما.",
      "An engineering mindset. A human purpose. A journey at their intersection.",
    ),
  },
  {
    path: "/projects",
    label: l("المشاريع", "Projects"),
    title: l("هندسة الأفكار إلى واقع", "Engineering projects & innovation"),
    desc: l(
      "مشروع تخرج موثق يشرح محاكاة جهاز تنفس يدوي باستخدام النمذجة الميكانيكية والتحكمية.",
      "A documented graduation project presenting a manual ventilator simulation through integrated mechanical and control modeling.",
    ),
  },
  {
    path: "/certifications",
    label: l("الشهادات", "Certifications"),
    title: l("التعلّم لا يتوقف", "Certifications & development"),
    desc: l(
      "أرشيف للشهادات والبرامج التعليمية المضافة إلى الملف المهني.",
      "An archive of certificates and educational programs added to the professional profile.",
    ),
  },
  {
    path: "/medical-equipment",
    label: l("المختبر الافتراضي", "Medical equipment"),
    title: l("داخل عالم التقنية الطبية", "Inside medical technology"),
    desc: l(
      "عشرة أجهزة. مبادئ هندسية مختلفة. هدف واحد: فهم التقنية التي تدعم الرعاية الصحية.",
      "Ten devices. Distinct engineering principles. One purpose: understanding the technology behind healthcare.",
    ),
  },
  {
    path: "/education",
    label: l("التعليم", "Education"),
    title: l("حيث تبدأ المعرفة", "Academic background"),
    desc: l(
      "الأساس العلمي للتفكير الهندسي. أضف بيانات دراستك ومشاريعك الأكاديمية الموثقة.",
      "The scientific foundation of engineering thought. Add your verified education and academic projects.",
    ),
  },
  {
    path: "/resume",
    label: l("السيرة الذاتية", "Resume"),
    title: l("المسار في صفحة", "Professional resume"),
    desc: l(
      "عرض واضح للمسار المهني، ونسخة PDF نصية قابلة للتنزيل بالعربية والإنجليزية.",
      "A clear view of the professional journey, with selectable-text PDF downloads in Arabic and English.",
    ),
  },
  {
    path: "/contact",
    label: l("تواصل معي", "Contact"),
    title: l("لنصنع شيئاً ذا معنى", "Let’s build something meaningful"),
    desc: l(
      "للفرص المهنية، والتعاون الهندسي، والحديث عن مستقبل التقنيات الطبية.",
      "For professional opportunities, engineering collaborations, and conversations about the future of medical technology.",
    ),
  },
];
export const projectCategories = [
  l("الكل", "All"),
  l("الهندسة الطبية", "Biomedical engineering"),
  l("المعدات الطبية", "Medical equipment"),
  l("الإلكترونيات الطبية", "Medical electronics"),
  l("مشروع التخرج", "Graduation project"),
  l("البحث والتطوير", "Research & development"),
  l("الحلول التقنية", "Technical solutions"),
  l("التقنية الطبية", "Medical technology"),
];
export const projects = [
  {
    id: "biomedical-study",
    title: l("[عنوان مشروع هندسة طبية]", "[Biomedical project title]"),
    category: 1,
    visual: "signal",
    summary: l(
      "قالب لتوثيق مشروع في الإشارات والأجهزة الطبية.",
      "A template for documenting a biomedical signals or instrumentation project.",
    ),
  },
  {
    id: "equipment-study",
    title: l("[عنوان مشروع معدات طبية]", "[Medical equipment project title]"),
    category: 2,
    visual: "scanner",
    summary: l(
      "قالب لعرض منهجية دراسة جهاز طبي وتوثيق مخرجاتها.",
      "A template for presenting a medical equipment study and its documentation.",
    ),
  },
  {
    id: "graduation-study",
    title: l(
      "محاكي جهاز التنفس اليدوي",
      "Manual Ventilator Simulator",
    ),
    category: 4,
    visual: "circuit",
    summary: l(
      "محاكاة ثلاثية الأبعاد لجهاز تنفس يدوي باستخدام النمذجة الميكانيكية والتحكمية، لأغراض التدريب والبحث الأكاديمي.",
      "A 3D manual ventilator simulation using integrated mechanical and control modeling for academic training and research.",
    ),
  },
];
export const projectFields = [
  l("نظرة عامة", "Overview"),
  l("المشكلة الهندسية", "Problem statement"),
  l("الأهداف الهندسية", "Engineering objectives"),
  l("المنهجية", "Methodology"),
  l("المعدات المستخدمة", "Equipment used"),
  l("التقنيات المستخدمة", "Technologies used"),
  l("مساهمتي", "My contribution"),
  l("النتائج", "Results"),
];
export type MediaItem = {
  type: "image" | "diagram" | "video" | "document";
  url: string;
  caption: Local;
};
export const projectDetails: Record<
  string,
  { fields: Local[]; media: MediaItem[] }
> = Object.fromEntries(
  projects.map((p) => [
    p.id,
    {
      fields:
        p.id === "graduation-study"
          ? [
              l(
                "مشروع تخرج يحاكي أتمتة ضغط كيس AMBU في حالات الطوارئ، بهدف توفير منصة افتراضية منخفضة التكلفة للتدريب والبحث.",
                "A graduation project simulating automated AMBU bag compression for emergency scenarios, providing a low-cost virtual platform for training and research.",
              ),
              l(
                "تفاوت التهوية اليدوية وإرهاق المشغل وصعوبة الحفاظ على حجم المد والجزر ومعدل التنفس بصورة منتظمة.",
                "Operator fatigue and variability in manual ventilation, with difficulty maintaining consistent tidal volume and respiratory rate.",
              ),
              l(
                "تصميم محاكي تهوية ميكانيكي، ودمج النظام الميكانيكي مع نظام التحكم، ومحاكاة أنماط تهوية قريبة من المعايير الفسيولوجية.",
                "Design a mechanical ventilator simulator, integrate the mechanical and control systems, and simulate ventilation patterns close to physiological benchmarks.",
              ),
              l(
                "تصميم نموذج ثلاثي الأبعاد في SolidWorks، واستخدام آلية كامة ومحرك كهربائي لضغط الأنبوب، مع تنظيم الدوران عبر وحدة تحكم للمحرك.",
                "A 3D model was designed in SolidWorks using a cam mechanism and electric motor for tube compression, regulated by a motor control unit.",
              ),
              l(
                "أنبوب إخراج، صمامات أمامية وخلفية، قاعدة تثبيت، هياكل دعم، كامة ميكانيكية، محرك كهربائي، وSolidWorks وSimulink.",
                "Outlet tube, front and rear valves, stabilization base, support structures, mechanical cam, electric motor, SolidWorks, and Simulink.",
              ),
              l(
                "نمذجة ميكانيكية ثلاثية الأبعاد وتحكم في معدل التنفس ودورة الشهيق والزفير.",
                "3D mechanical modeling with control of respiratory rate and the inspiratory-to-expiratory cycle.",
              ),
              l(
                "تصميم ونمذجة النظام وتحليل النتائج وتوثيق المشروع.",
                "System design and modeling, results analysis, and project documentation.",
              ),
              l(
                "معدل تنفس 15 نفسًا في الدقيقة، ونسبة شهيق إلى زفير 1:1.35، وحجم محاكى يقارب 1799.07 mL ضمن نطاق البالغين 1650–2000 mL. المشروع محاكاة أكاديمية وليس جهازًا للاستخدام السريري.",
                "A respiratory rate of 15 breaths per minute, an I:E ratio of 1:1.35, and a simulated volume of approximately 1799.07 mL within the adult range of 1650–2000 mL. This is an academic simulation, not a clinical device.",
              ),
            ]
          : projectFields.map((f) =>
              l(
                `[أضف ${f.ar} الموثقة هنا]`,
                `[Add verified ${f.en.toLowerCase()} here]`,
              ),
            ),
      media:
        p.id === "graduation-study" && graduationProjectDownloadUrl
          ? [
              {
                type: "document" as const,
                url: graduationProjectDownloadUrl,
                caption: l(
                  "عرض وتحميل مشروع التخرج عبر Google Slides",
                  "Open and download the graduation project via Google Slides",
                ),
              },
            ]
          : [],
    },
  ]),
);
// Add verified levels keyed by the English skill name. An absent level is never
// turned into an invented percentage or a claim of proficiency.
export const skillLevels: Record<string, Local> = {};
export const certificates = [
  {
    id: "certification",
    title: l("شهادة مهنية", "Professional certification"),
    issuer: l("ملف شهادة مرفق", "Uploaded certificate document"),
    date: l("ملف PDF", "PDF document"),
    description: l(
      "شهادة مهنية مرفقة بصيغة PDF. يمكن فتح الملف أو تنزيله من بطاقة الشهادة.",
      "A professional certificate attached as a PDF. Open or download the document from the certificate card.",
    ),
    category: 0,
    file: "/media/certifications/Certification.pdf",
    image: "",
    verification: "",
  },
  {
    id: "biomedical-engineering-course",
    title: l("كورس الهندسة الطبية", "Biomedical Engineering Course"),
    issuer: l("شهادة دورة مرفقة", "Uploaded course certificate"),
    date: l("ملف PDF", "PDF document"),
    description: l(
      "شهادة إتمام كورس في الهندسة الطبية مرفقة بصيغة PDF.",
      "A certificate of completion for a biomedical engineering course, attached as a PDF.",
    ),
    category: 0,
    file: "/media/certifications/Biomedical-Engineering-Course.pdf",
    image: "",
    verification: "",
  },
];
export const experience = [
  {
    type: l("تدريب بالمستشفى", "Hospital training"),
    organization: l("[اسم المستشفى]", "[Hospital name]"),
    role: l("[الدور التدريبي]", "[Training role]"),
    duration: l("[الفترة]", "[Duration]"),
    responsibilities: l(
      "[أضف المسؤوليات والتعرّض التقني والإنجازات الموثقة]",
      "[Add verified responsibilities, technical exposure, and achievements]",
    ),
    assets: [] as string[],
  },
  {
    type: l("تدريب هندسي", "Engineering internship"),
    organization: l("[اسم المؤسسة]", "[Organization name]"),
    role: l("[المسمى]", "[Position]"),
    duration: l("[الفترة]", "[Duration]"),
    responsibilities: l(
      "[أضف وصفاً موثقاً للتدريب العملي]",
      "[Add a verified description of practical training]",
    ),
    assets: [] as string[],
  },
  {
    type: l("ورش وأنشطة تقنية", "Workshops & technical activities"),
    organization: l("[الجهة المنظمة]", "[Organizer]"),
    role: l("[عنوان النشاط]", "[Activity title]"),
    duration: l("[التاريخ]", "[Date]"),
    responsibilities: l(
      "[أضف تفاصيل النشاط والمخرجات]",
      "[Add activity details and outcomes]",
    ),
    assets: [] as string[],
  },
];
export const skills = [
  {
    title: l("الهندسة الطبية الحيوية", "Biomedical engineering"),
    code: "BIO",
    items: [
      l("الأجهزة والقياسات الطبية", "Biomedical instrumentation"),
      l("الإلكترونيات الطبية", "Medical electronics"),
      l("الإشارات الحيوية", "Biomedical signals"),
      l("مبادئ الأجهزة الطبية", "Medical device principles"),
      l("الأنظمة الطبية الحيوية", "Biomedical systems"),
    ],
  },
  {
    title: l("المعدات الطبية", "Medical equipment"),
    code: "MED",
    items: [
      l("أنظمة مراقبة المرضى", "Patient monitoring systems"),
      l("أنظمة تخطيط القلب", "ECG systems"),
      l("معدات التصوير الطبي", "Medical imaging equipment"),
      l("الموجات فوق الصوتية", "Ultrasound systems"),
      l("المعدات المخبرية", "Laboratory equipment"),
      l("أجهزة التنفس الاصطناعي", "Ventilators"),
      l("مضخات التسريب", "Infusion pumps"),
      l("مبادئ صيانة الأجهزة الطبية", "Medical device maintenance principles"),
    ],
  },
  {
    title: l("الهندسة والتطبيق", "Engineering & application"),
    code: "ENG",
    items: [
      l("الدوائر الكهربائية", "Electrical circuits"),
      l("الإلكترونيات", "Electronics"),
      l("استكشاف الأعطال", "Troubleshooting"),
      l("التوثيق التقني", "Technical documentation"),
      l("اختبار المعدات", "Equipment testing"),
      l("مفاهيم الصيانة الوقائية", "Preventive maintenance concepts"),
    ],
  },
  {
    title: l("الأدوات الرقمية والبرمجيات", "Digital & software"),
    code: "DIG",
    items: [
      l("برمجيات التصميم الهندسي", "CAD software"),
      l("البرمجة", "Programming"),
      l("تحليل البيانات", "Data analysis"),
      l("التطبيقات الهندسية", "Engineering applications"),
    ],
  },
];
export const resumeSections = [
  l("الملخص المهني", "Professional summary"),
  l("التعليم", "Education"),
  l("المشاريع", "Projects"),
  l("الشهادات", "Certifications"),
  l("اللغات", "Languages"),
  l("معلومات التواصل", "Contact information"),
];
export const resumeContent: Local[] = [
  profile.introduction,
  l(
    `${profile.qualification.ar} · ${profile.university.ar} · ${profile.period.ar} · ${profile.graduation.ar}`,
    `${profile.qualification.en} · ${profile.university.en} · ${profile.period.en} · ${profile.graduation.en}`,
  ),
  l(
    "[أضف المشاريع الحقيقية والمنهجية والمساهمة والنتائج.]",
    "[Add real projects, methodology, contribution, and outcomes.]",
  ),
  l(
    "[أضف الشهادة والجهة المانحة وتاريخ الإصدار.]",
    "[Add certificate title, issuer, and issue date.]",
  ),
  profile.languages,
  l(
    [profile.email, profile.linkedin, profile.whatsapp]
      .filter(Boolean)
      .join(" | ") || "[أضف البريد الإلكتروني ورقم الهاتف وروابط التواصل.]",
    [profile.email, profile.linkedin, profile.whatsapp]
      .filter(Boolean)
      .join(" | ") ||
      "[Add email address, phone number, and professional links.]",
  ),
];
