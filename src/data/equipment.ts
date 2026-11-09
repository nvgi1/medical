import { l, type Local } from "./content";
export type Equipment = {
  id: string;
  name: Local;
  tag: Local;
  purpose: Local;
  principle: Local;
  components: Local;
  concepts: Local;
  source: string;
  sourceName: string;
};
export const equipment: Equipment[] = [
  {
    id: "mri",
    name: l("التصوير بالرنين المغناطيسي", "MRI scanner"),
    tag: l("التصوير الطبي", "Medical imaging"),
    purpose: l(
      "إنشاء صور تفصيلية للأنسجة الداخلية لدعم التشخيص والمتابعة.",
      "Produces detailed images of internal tissues to support diagnosis and monitoring.",
    ),
    principle: l(
      "يؤثر مجال مغناطيسي قوي ونبضات تردد راديوي في بروتونات الأنسجة؛ تُلتقط الإشارات أثناء عودتها نحو الاتزان لتكوين الصور.",
      "A strong magnetic field and radiofrequency pulses affect tissue protons; signals detected as they return toward equilibrium are used to form images.",
    ),
    components: l(
      "مغناطيس، نظام تردد راديوي، ومستشعرات استقبال الإشارة.",
      "Magnet, radiofrequency system, and signal-detection sensors.",
    ),
    concepts: l(
      "الرنين المغناطيسي، الترددات الراديوية، واكتساب الإشارة.",
      "Magnetic resonance, radiofrequency excitation, and signal acquisition.",
    ),
    source:
      "https://www.nibib.nih.gov/science-education/science-topics/magnetic-resonance-imaging-mri",
    sourceName: "NIH · NIBIB",
  },
  {
    id: "ct",
    name: l("التصوير المقطعي المحوسب", "CT scanner"),
    tag: l("التصوير الطبي", "Medical imaging"),
    purpose: l(
      "إنشاء مقاطع داخلية يمكن تجميعها في عرض ثلاثي الأبعاد.",
      "Creates internal cross-sectional images that can be combined into a three-dimensional view.",
    ),
    principle: l(
      "يدور مصدر أشعة سينية حول المريض؛ تجمع الكواشف الإشارات العابرة ويعيد الحاسوب بناء المقاطع.",
      "An x-ray source rotates around the patient; detectors collect transmitted signals and a computer reconstructs image slices.",
    ),
    components: l(
      "حلقة التصوير، مصدر أشعة سينية، كواشف رقمية، سرير، وحاسوب.",
      "Gantry, x-ray source, digital detectors, patient bed, and computer.",
    ),
    concepts: l(
      "اكتساب الأشعة السينية وإعادة بناء الصور.",
      "X-ray acquisition and image reconstruction.",
    ),
    source:
      "https://www.nibib.nih.gov/science-education/science-topics/computed-tomography-ct",
    sourceName: "NIH · NIBIB",
  },
  {
    id: "xray",
    name: l("جهاز الأشعة السينية", "X-ray machine"),
    tag: l("التصوير الطبي", "Medical imaging"),
    purpose: l(
      "تصوير البنى الداخلية باستخدام الأشعة السينية العابرة للجسم.",
      "Images internal structures using x-rays transmitted through the body.",
    ),
    principle: l(
      "تُلتقط الأشعة العابرة للجسم بكاشف ثم تعالج الإشارات لإنشاء الصورة.",
      "A detector captures x-rays transmitted through the body and the signals are processed into an image.",
    ),
    components: l(
      "مصدر أشعة سينية، كاشف، ونظام قراءة ومعالجة.",
      "X-ray source, detector, and readout/processing system.",
    ),
    concepts: l(
      "كشف الإشعاع ومعالجة بيانات التصوير.",
      "Radiation detection and imaging data processing.",
    ),
    source: "https://www.nibib.nih.gov/programs/x-ray-ct",
    sourceName: "NIH · NIBIB",
  },
  {
    id: "ultrasound",
    name: l("نظام الموجات فوق الصوتية", "Ultrasound system"),
    tag: l("التصوير الطبي", "Medical imaging"),
    purpose: l(
      "تصوير البنى الداخلية باستخدام الموجات الصوتية وأصدائها.",
      "Images internal structures using sound waves and their echoes.",
    ),
    principle: l(
      "يبث المسبار موجات صوتية ويستقبل الأصداء؛ يستنتج النظام المسافات من زمن عودة الصدى لتكوين الصورة.",
      "A transducer transmits sound waves and receives echoes; return times are used to determine distances and build an image.",
    ),
    components: l(
      "مسبار، عناصر كهرضغطية، ونظام معالجة وعرض.",
      "Transducer, piezoelectric elements, and scanner.",
    ),
    concepts: l(
      "الكهرضغطية، زمن الرحلة، وانعكاس الموجات.",
      "Piezoelectricity, time of flight, and wave reflection.",
    ),
    source:
      "https://www.nibib.nih.gov/science-education/science-topics/ultrasound",
    sourceName: "NIH · NIBIB",
  },
  {
    id: "ecg",
    name: l("جهاز تخطيط القلب", "ECG machine"),
    tag: l("الإشارات الحيوية", "Biosignals"),
    purpose: l(
      "تسجيل النشاط الكهربائي للقلب لإظهار المعدل والإيقاع وتوقيت الإشارات.",
      "Records the heart’s electrical activity to show rate, rhythm, and signal timing.",
    ),
    principle: l(
      "ترصد أقطاب الجلد إشارات القلب وتنقلها الأسلاك إلى جهاز التسجيل. لا يرسل التخطيط كهرباء إلى الجسم.",
      "Skin electrodes detect heart signals and wires carry them to the recording machine. An ECG does not send electricity into the body.",
    ),
    components: l(
      "أقطاب جلدية، أسلاك توصيل، وجهاز تسجيل أو حاسوب.",
      "Skin electrodes, connecting wires, and recording machine or computer.",
    ),
    concepts: l(
      "اكتساب الإشارات الحيوية، التوقيت، وشكل الموجة.",
      "Biosignal acquisition, timing, and waveform representation.",
    ),
    source: "https://medlineplus.gov/lab-tests/electrocardiogram/",
    sourceName: "NIH · MedlinePlus",
  },
  {
    id: "monitor",
    name: l("جهاز مراقبة المريض", "Patient monitor"),
    tag: l("المراقبة السريرية", "Patient monitoring"),
    purpose: l(
      "التقاط العلامات الحيوية وعرضها لدعم تقييم المريض وملاحظة التغيرات.",
      "Captures and displays vital signs to support patient assessment and recognition of changes.",
    ),
    principle: l(
      "تجمع أنظمة المراقبة قياسات المريض وتعرضها محلياً أو في محطة مركزية، مع أدوات تنبيه حسب النظام.",
      "Monitoring systems collect patient measurements and display them locally or at a central station, with alerts depending on the system.",
    ),
    components: l(
      "جهاز مراقبة، واجهة عرض، وبرمجيات أو محطة مركزية حسب التكوين.",
      "Monitor, display interface, and software or central station depending on configuration.",
    ),
    concepts: l(
      "اكتساب البيانات، عرض الاتجاهات، وتصميم التنبيهات.",
      "Data capture, trend display, and alert design.",
    ),
    source:
      "https://www.usa.philips.com/healthcare/patient-monitoring/patient-monitors/vital-signs-monitors",
    sourceName: "Philips · Vital signs monitors",
  },
  {
    id: "ventilator",
    name: l("جهاز التنفس الاصطناعي", "Mechanical ventilator"),
    tag: l("دعم الحياة", "Life support"),
    purpose: l(
      "دعم التنفس عندما يصبح التنفس أو الحصول على أكسجين كافٍ صعباً جداً.",
      "Supports breathing when breathing or obtaining enough oxygen is very difficult.",
    ),
    principle: l(
      "يدفع الجهاز الهواء إلى الرئتين ويسمح بخروجه. يحدد الفريق السريري الإعدادات الملائمة.",
      "The device pushes air into the lungs and allows it to move out. The clinical team determines appropriate settings.",
    ),
    components: l(
      "جهاز التنفس، أنبوب تنفس أو قناع محكم حسب الاستخدام.",
      "Ventilator and a breathing tube or tightly fitting mask, depending on use.",
    ),
    concepts: l(
      "دعم تدفق الهواء وتوصيله تحت تحكم سريري.",
      "Controlled airflow support and delivery under clinical supervision.",
    ),
    source: "https://www.nhlbi.nih.gov/health/ventilator",
    sourceName: "NIH · NHLBI",
  },
  {
    id: "pump",
    name: l("مضخة التسريب", "Infusion pump"),
    tag: l("توصيل السوائل", "Fluid delivery"),
    purpose: l(
      "إيصال سوائل مثل الأدوية والمغذيات بكميات مضبوطة.",
      "Delivers fluids such as medications and nutrients in controlled amounts.",
    ),
    principle: l(
      "يضبط المستخدم المدرّب معدل الإيصال ومدته عبر واجهة برمجية. قد تتضمن المضخة تنبيهات للهواء أو الانسداد.",
      "A trained user programs delivery rate and duration through a software interface. Pumps may include air or blockage alerts.",
    ),
    components: l(
      "واجهة برمجية، أنبوب توصيل السوائل، وتنبيهات بحسب الطراز.",
      "Software interface, fluid-delivery tubing, and alerts depending on the model.",
    ),
    concepts: l(
      "التحكم في الإيصال، الواجهات البرمجية، وتنبيهات السلامة.",
      "Delivery control, software interfaces, and safety alerts.",
    ),
    source:
      "https://www.fda.gov/medical-devices/general-hospital-devices-and-supplies/infusion-pumps",
    sourceName: "FDA · Infusion pumps",
  },
  {
    id: "analyzer",
    name: l("محلل المختبر", "Laboratory analyzer"),
    tag: l("التشخيص المخبري", "Laboratory diagnostics"),
    purpose: l(
      "أتمتة اختبارات الكيمياء السريرية للعينات. المثال المرجعي محلل كيمياء سريرية؛ تختلف أنواع المحللات الأخرى.",
      "Automates clinical chemistry testing of samples. The cited example is a chemistry analyzer; other analyzer types differ.",
    ),
    principle: l(
      "يستخدم المثال المرجعي القياس الطيفي والقياس الجهدي، مع طرق تختلف حسب الاختبار.",
      "The referenced example uses spectrophotometry and potentiometry, with methods depending on the assay.",
    ),
    components: l(
      "مغذي عينات، مجسات عينات وكواشف، خلاطات، محاقن، وأوعية تفاعل في المثال المرجعي.",
      "Sample feeder, sample/reagent probes, mixers, syringes, and reaction cuvettes in the referenced example.",
    ),
    concepts: l(
      "القياس الضوئي، القياس الجهدي، وأتمتة العينات.",
      "Photometry, potentiometry, and sample automation.",
    ),
    source: "https://www.beckmancoulter.com/en/products/chemistry/au680",
    sourceName: "Beckman Coulter · AU680",
  },
  {
    id: "defibrillator",
    name: l("مزيل الرجفان", "Defibrillator"),
    tag: l("تقنية الطوارئ", "Emergency technology"),
    purpose: l(
      "مزيل الرجفان الخارجي الآلي مصمم للمساعدة في حالات توقف القلب المفاجئ.",
      "An automated external defibrillator is designed to help treat sudden cardiac arrest.",
    ),
    principle: l(
      "يحلل النظم القلبي ويعطي صدمة كهربائية عندما تكون مناسبة. ليست كل النظم قابلة للعلاج بالصدمة.",
      "Analyzes heart rhythm and delivers an electrical shock when appropriate. Not every rhythm is shockable.",
    ),
    components: l(
      "وحدة تحليل وتحكم، بطارية، وأقطاب لاصقة متوافقة.",
      "Analysis/control unit, battery, and compatible electrode pads.",
    ),
    concepts: l(
      "تحليل النظم القلبي والتحكم في إيصال الصدمة.",
      "Heart-rhythm analysis and controlled shock delivery.",
    ),
    source:
      "https://www.fda.gov/medical-devices/cardiovascular-devices/automated-external-defibrillators-aeds",
    sourceName: "FDA · AEDs",
  },
];
