import type { RegionId, VisaChannel } from '../data/types';
import type { VisaTypeId } from './checklistLibrary';

export type Locale = 'en' | 'ur';
export type TextDirection = 'ltr' | 'rtl';

export const LOCALE_STORAGE_KEY = 'visahouse_locale';

export interface LocaleMetadata {
  locale: Locale;
  dir: TextDirection;
  htmlLang: string;
  shortCode: string;
  nativeLabel: string;
  englishLabel: string;
  switchToAriaLabel: string;
}

export const LOCALE_METADATA: Record<Locale, LocaleMetadata> = {
  en: {
    locale: 'en',
    dir: 'ltr',
    htmlLang: 'en',
    shortCode: 'EN',
    nativeLabel: 'English',
    englishLabel: 'English',
    switchToAriaLabel: 'Switch language to English',
  },
  ur: {
    locale: 'ur',
    dir: 'rtl',
    htmlLang: 'ur',
    shortCode: 'اردو',
    nativeLabel: 'اردو',
    englishLabel: 'Urdu',
    switchToAriaLabel: 'زبان اردو میں تبدیل کریں (Switch language to Urdu)',
  },
};

export function normalizeLocale(raw: string | null | undefined): Locale {
  if (!raw) return 'en';
  const cleaned = raw.trim().toLowerCase();
  if (cleaned === 'ur' || cleaned.startsWith('ur-') || cleaned === 'urdu') {
    return 'ur';
  }
  return 'en';
}

export function getLocaleMetadata(locale: Locale): LocaleMetadata {
  return LOCALE_METADATA[locale];
}

export function formatLocalizedCopy(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  );
}

/** Authentic Urdu names for all 42 Visahouse destinations + Schengen. */
export const COUNTRY_NAMES_UR: Record<string, string> = {
  'United Kingdom': 'برطانیہ',
  Canada: 'کینیڈا',
  'United States': 'امریکہ',
  USA: 'امریکہ',
  Australia: 'آسٹریلیا',
  'New Zealand': 'نیوزی لینڈ',
  Germany: 'جرمنی',
  France: 'فرانس',
  Italy: 'اٹلی',
  Spain: 'اسپین',
  Netherlands: 'نیدرلینڈز',
  Switzerland: 'سوئٹزرلینڈ',
  Austria: 'آسٹریا',
  Belgium: 'بیلجیئم',
  Portugal: 'پرتگال',
  Greece: 'یونان',
  Norway: 'ناروے',
  Sweden: 'سویڈن',
  Denmark: 'ڈنمارک',
  Hungary: 'ہنگری',
  Poland: 'پولینڈ',
  Luxembourg: 'لکسمبرگ',
  Finland: 'فن لینڈ',
  'Schengen States': 'شینگن ممالک',
  'Schengen Area': 'شینگن زون',
  'Schengen Area (Type-C)': 'شینگن زون (ٹائپ-سی)',
  Turkey: 'ترکیہ',
  'Saudi Arabia': 'سعودی عرب',
  'United Arab Emirates': 'متحدہ عرب امارات',
  Qatar: 'قطر',
  Oman: 'عمان',
  Bahrain: 'بحرین',
  Uzbekistan: 'ازبکستان',
  Egypt: 'مصر',
  Morocco: 'مراکش',
  'South Africa': 'جنوبی افریقہ',
  Kenya: 'کینیا',
  Zimbabwe: 'زمبابوے',
  Azerbaijan: 'آذربائیجان',
  China: 'چین',
  Japan: 'جاپان',
  'South Korea': 'جنوبی کوریا',
  Thailand: 'تھائی لینڈ',
  Malaysia: 'ملائیشیا',
  Singapore: 'سنگاپور',
  Indonesia: 'انڈونیشیا',
  Vietnam: 'ویتنام',
  'Sri Lanka': 'سری لنکا',
  Nepal: 'نیپال',
  Philippines: 'فلپائن',
  Cambodia: 'کمبوڈیا',
  Brazil: 'برازیل',
  Mexico: 'میکسیکو',
};

export const REGION_LABELS_UR: Record<RegionId | 'All', string> = {
  All: 'تمام خطے',
  'Southeast Asia': 'جنوب مشرقی ایشیا',
  'South Asia': 'جنوبی ایشیا',
  'East Asia': 'مشرقی ایشیا',
  'Central Asia & Gulf': 'وسطی ایشیا اور خلیج',
  'North America': 'شمالی امریکہ',
  'Europe & UK': 'یورپ اور برطانیہ',
  Oceania: 'اوشیانا',
  Africa: 'افریقہ',
};

export const CHANNEL_LABELS_UR: Record<VisaChannel | 'All', string> = {
  All: 'تمام ذرائع',
  'e-Visa': 'ای ویزا',
  'Sticker / Embassy': 'اسٹیکر / سفارتخانہ',
  'Hybrid / Centre': 'ویزا سینٹر / ہائبرڈ',
  'Interview / Consulate': 'انٹرویو / قونصل خانہ',
};

const EXTRA_CHANNEL_LABELS_UR: Record<string, string> = {
  'Authorised Visa Centre (VFS / BLS)': 'مجاز ویزا سینٹر (VFS / BLS)',
};

export const VISA_TYPE_LABELS_UR: Record<VisaTypeId, string> = {
  tourist: 'سیاحتی / تفریحی دورہ',
  business: 'کاروباری / تجارتی دورہ',
  family_visit: 'خاندانی / نجی ملاقات',
  student: 'تعلیمی / اسٹوڈنٹ ویزا',
  transit: 'ٹرانزٹ / ایئرپورٹ اسٹاپ اوور',
};

export function translateCountryName(country: string, locale: Locale): string {
  if (locale === 'en') return country;
  return COUNTRY_NAMES_UR[country] ?? country;
}

export function translateRegion(region: RegionId | 'All', locale: Locale): string {
  if (locale === 'en') return region;
  return REGION_LABELS_UR[region] ?? region;
}

export function translateChannel(channel: VisaChannel | 'All' | string, locale: Locale): string {
  if (locale === 'en') return channel;
  return (
    CHANNEL_LABELS_UR[channel as VisaChannel | 'All'] ??
    EXTRA_CHANNEL_LABELS_UR[channel] ??
    channel
  );
}

export function translateVisaTypeLabel(
  visaTypeId: VisaTypeId,
  fallbackEn: string,
  locale: Locale,
): string {
  if (locale === 'en') return fallbackEn;
  return VISA_TYPE_LABELS_UR[visaTypeId] ?? fallbackEn;
}

export interface TranslationBundle {
  common: {
    brandName: string;
    tagline: string;
    pakistan: string;
    pakistani: string;
    disclaimer: string;
    confirmWithTeam: string;
    skipToContent: string;
    languageSwitcherLabel: string;
    all: string;
    reset: string;
    resetFilters: string;
    copy: string;
    copied: string;
    print: string;
    printSheet: string;
    printBrief: string;
    whatsapp: string;
    whatsappDesk: string;
    applyNow: string;
    consultancyNotice: string;
    policyNotice: string;
    home: string;
    visas: string;
    schengen: string;
    insurance: string;
    about: string;
    contact: string;
    officeHours: string;
    responseExpectation: string;
  };
  header: {
    primaryNavLabel: string;
    mobileNavLabel: string;
    openMenu: string;
    closeMenu: string;
    megaEyebrow: string;
    viewAllCountries: string;
    schengenAppointments: string;
    travelInsurance: string;
    dynamicChecklistLibrary: string;
    visaFeeEstimator: string;
    onlineFirstPakistan: string;
    allDestinations: string;
    aboutVisahouse: string;
    contactDesk: string;
    quickCountryLinks: string;
  };
  footer: {
    blurb: string;
    countryVisaGuides: string;
    servicesAndDesk: string;
    allDestinationsDirectory: string;
    schengenAppointments: string;
    travelInsurance: string;
    visaCostCalculator: string;
    visaNewsAlerts: string;
    timelinesDocFaqs: string;
    visaSuccessStories: string;
    consultancyAndLegal: string;
    aboutVisahouse: string;
    contactIntakeDesk: string;
    privacyPolicy: string;
    termsOfService: string;
    whatsappLabel: string;
    emailLabel: string;
  };
  hero: {
    kickerDesk: string;
    kickerGuides: string;
    kickerSchengen: string;
    headlinePrefix: string;
    headlineHighlight: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    valuePoints: ReadonlyArray<{ index: string; label: string; detail: string }>;
    standardsNonGov: string;
    standardsNoGuarantee: string;
    standardsLiveFees: string;
    specimenTitle: string;
    stampLabel: string;
    stampSublabel: string;
  };
  visaSlip: {
    specimenHeader: string;
    consularSlipHeader: string;
    fromPak: string;
    visaType: string;
    entry: string;
    permittedStay: string;
    validityWindow: string;
    processingTime: string;
    govtFee: string;
    ourFee: string;
    lastVerified: string;
    decorativeMrz: string;
    nonOfficialRef: string;
  };
  home: {
    no01Eyebrow: string;
    no01Heading: string;
    routeAtlasBtn: string;
    filterByRegionBtn: string;
    schengenDeskTitle: string;
    schengenDeskSub: string;
    schengenDeskChannel: string;
    insuranceTitle: string;
    insuranceSub: string;
    insuranceChannel: string;
    no02ChecklistEyebrow: string;
    no02PhotoEyebrow: string;
    no02PhotoHeading: string;
    no03CalcEyebrow: string;
    no04TrackerEyebrow: string;
    no05Eyebrow: string;
    no05Heading: string;
    no05Body: string;
    no05Caption: string;
    howItWorksSteps: ReadonlyArray<{ number: string; title: string; body: string }>;
    no06Eyebrow: string;
    no06Heading: string;
    no06StampLabel: string;
    no06StampSublabel: string;
    processPromises: ReadonlyArray<{ index: string; title: string; body: string }>;
    no07Eyebrow: string;
    no07Heading: string;
    schengenCardEyebrow: string;
    schengenCardTitle: string;
    schengenCardBody: string;
    schengenCardCities: string;
    schengenCardCta: string;
    insuranceCardEyebrow: string;
    insuranceCardTitle: string;
    insuranceCardBody: string;
    insuranceMinimumLabel: string;
    insuranceMinimumVal: string;
    insuranceZonesLabel: string;
    insuranceZonesVal: string;
    insurancePremiumLabel: string;
    insuranceCardCta: string;
    no08TestimonialsEyebrow: string;
    no09FaqEyebrow: string;
    no09FaqHeading: string;
    no09FaqDesc: string;
    no10AlertsEyebrow: string;
    no11Eyebrow: string;
    no11Heading: string;
    no11Body: string;
    no11DirectPrompt: string;
    no11TrackLink: string;
  };
  checklist: {
    partOneLabel: string;
    auditLabel: string;
    headingSuffix: string;
    readyCount: string;
    coreTag: string;
    libraryHeading: string;
    librarySubcopy: string;
    badgeCount: string;
    step1Country: string;
    step2Purpose: string;
    step3Passport: string;
    buildListBtn: string;
    individualGuidesGroup: string;
    europeZoneGroup: string;
    customNationalityLabel: string;
    customNationalityPlaceholder: string;
    downloadPdfBtn: string;
    verifyWhatsappBtn: string;
    fullGuideBtn: string;
    eligibilityNoteLabel: string;
    passportMetaPrefix: string;
    coreItemsMeta: string;
    preparedMeta: string;
    disclaimerSuffix: string;
  };
  photoGuide: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    copyStudioSpec: string;
    studioSpecCopied: string;
    standardLabel: string;
    viewLabel: string;
    filterAll: string;
    filterCorrect: string;
    filterIncorrect: string;
    printDigitalSize: string;
    headHeightRatio: string;
    headHeightHint: string;
    backgroundPaper: string;
    eyeglassesPolicy: string;
    approvedVerdict: string;
    rejectedVerdict: string;
    pakistanStudioTip: string;
  };
  calculator: {
    heading: string;
    subcopy: string;
    displayCurrency: string;
    popularRoutes: string;
    step1Destination: string;
    step2VisaType: string;
    step3Applicants: string;
    savingsActive: string;
    savingsPrompt: string;
    passportSingular: string;
    passportPlural: string;
    step4Addons: string;
    viewGuide: string;
    typicalProcessing: string;
    estimatedTotal: string;
    waivedDirect: string;
    groupSavingsApplied: string;
    estimatedGrandTotal: string;
    applicantSingular: string;
    applicantPlural: string;
    confirmWhatsapp: string;
    copyEstimate: string;
    startDossier: string;
    emailQuoteBtn: string;
    emailQuoteOpenTitle: string;
    emailQuoteSubtitle: string;
    emailRecipientLabel: string;
    emailRecipientPlaceholder: string;
    emailNameLabel: string;
    emailNamePlaceholder: string;
    emailSummaryPreviewLabel: string;
    emailSendBtn: string;
    emailSendingBtn: string;
    emailCancelBtn: string;
    emailReceiptSentBadge: string;
    emailReceiptLoggedBadge: string;
    emailOpenInAppBtn: string;
    emailShowCopyBtn: string;
    emailHideCopyBtn: string;
    emailSendAnotherBtn: string;
    emailUpdatedNotice: string;
    emailSendUpdatedBtn: string;
    emailPrivacyNote: string;
    emailRequiredError: string;
    emailInvalidError: string;
    disclaimerSuffix: string;
  };
  tracker: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    formatLabel: string;
    applicationIdLabel: string;
    placeholder: string;
    hint: string;
    trackBtn: string;
    checkingBtn: string;
    sampleDossiers: string;
    yourInquiry: string;
    streamLive: string;
    streamConnecting: string;
    streamReconnecting: string;
    streamOffline: string;
    streamIdle: string;
    syncLiveStatus: string;
    syncingDesk: string;
    channelLabel: string;
    passportMonthLabel: string;
    lastSyncedLabel: string;
    processingStages: string;
    completedActive: string;
    liveActivityLog: string;
    nextStepGuidance: string;
    askDeskAbout: string;
    notFoundTitle: string;
    confirmWhatsapp: string;
    disclaimerSuffix: string;
  };
  schengenSlots: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    feedLive: string;
    feedPaused: string;
    lastSync: string;
    updates: string;
    pauseFeed: string;
    resumeFeed: string;
    pollNow: string;
    openLabel: string;
    limitedLabel: string;
    waitlistLabel: string;
    estSlotsSummary: string;
    cityFilterLabel: string;
    statusFilterLabel: string;
    emptyTitle: string;
    emptyBody: string;
    resetAllFilters: string;
    earliestLabel: string;
    channelLabel: string;
    prepareDossier: string;
    recentChanges: string;
    simulatedNotice: string;
    allCities: string;
    allStatuses: string;
  };
  insuranceAdvisor: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    resetSelections: string;
    step1Dest: string;
    step1Hint: string;
    step2Purpose: string;
    step3Duration: string;
    step4Travellers: string;
    singlePassportNote: string;
    multiPassportNote: string;
    step5Age: string;
    step6Riders: string;
    riderZeroTitle: string;
    riderZeroDesc: string;
    riderCancelTitle: string;
    riderCancelDesc: string;
    riderAdventureTitle: string;
    riderAdventureDesc: string;
    benchmarksTitle: string;
    recommendedTierLabel: string;
    medicalCeiling: string;
    territoryWording: string;
    policyWindow: string;
    premiumLabel: string;
    certificateChecklist: string;
    underwritingNotes: string;
    requestWhatsapp: string;
    openQuoteForm: string;
    copyCoverageBrief: string;
    briefCopied: string;
  };
  readiness: {
    eyebrowSingle: string;
    eyebrowDirectory: string;
    headingDirectory: string;
    subcopySingle: string;
    subcopyDirectory: string;
    destinationsShown: string;
    searchPlaceholder: string;
    regionLabel: string;
    noMatchesTitle: string;
    noMatchesBody: string;
    showAllBtn: string;
    showCompactBtn: string;
    moreTips: string;
    hideDetails: string;
    copyFieldCard: string;
    fieldCardCopied: string;
    visaGuideLink: string;
    rowEtiquette: string;
    rowEtiquetteHead: string;
    rowPower: string;
    rowSim: string;
    rowSimHead: string;
    rowCurrency: string;
    rowCurrencyHead: string;
    rowEmergency: string;
    rowEmergencyHead: string;
    showingSummary: string;
  };
  testimonials: {
    title: string;
    subcopy: string;
    stampLabel: string;
    stampSublabel: string;
    fileFocus: string;
    honestyNote: string;
    regionAll: string;
    regionSchengenWest: string;
    regionEastAsia: string;
    regionSoutheastAsia: string;
  };
  faq: {
    baselineTitle: string;
    passportValidity: string;
    passportValidityVal: string;
    financialProof: string;
    financialProofVal: string;
    recommendedLeadTime: string;
    recommendedLeadTimeVal: string;
    buildChecklistLink: string;
    estimateFeesLink: string;
    expandAll: string;
    collapseAll: string;
    keyStandard: string;
    catAll: string;
    catTimelines: string;
    catDocuments: string;
  };
  alerts: {
    heading: string;
    subcopy: string;
    step1Topics: string;
    step2Email: string;
    subscribeBtn: string;
    subscribingBtn: string;
    privacyNote: string;
    policyWatchTitle: string;
    verifiedBriefs: string;
    updateFeedsBtn: string;
    activeFeedsLabel: string;
  };
  leadForm: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    fullName: string;
    fullNamePlaceholder: string;
    whatsappNumber: string;
    whatsappHint: string;
    destinationService: string;
    passportNationality: string;
    plannedTravelMonth: string;
    tripNotes: string;
    tripNotesPlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    privacyFoot: string;
    loggedEyebrow: string;
    referencePrefix: string;
    stampLabel: string;
    applicantLabel: string;
    passportLabel: string;
    targetMonthLabel: string;
    continueWhatsapp: string;
    submitAnother: string;
  };
  pages: {
    visasEyebrow: string;
    visasHeadingPrefix: string;
    visasSubcopy: string;
    visasSearchPlaceholder: string;
    visasChannelLabel: string;
    visasRegionLabel: string;
    visasShownCount: string;
    visasLedgerEyebrow: string;
    visasLedgerHeading: string;
    tableCountry: string;
    tableIso: string;
    tableRegion: string;
    tableChannel: string;
    tableFees: string;
    countryVisaSuffix: string;
    countryFromPrefix: string;
    countryApplyBtn: string;
    countryFeesNote: string;
    countryNo03Eyebrow: string;
    countryNo03Heading: string;
    countryEligibilityNote: string;
    countryNo04Eyebrow: string;
    countryNo04Heading: string;
    countryWhatYouDo: string;
    countryWhatWeDo: string;
    countryNo05Eyebrow: string;
    countryNo05Heading: string;
    countryPrevention: string;
    countryNo06Eyebrow: string;
    countryNo06Heading: string;
    countryBestSeason: string;
    countryCities: string;
    countryEntryTips: string;
    countryNo07Eyebrow: string;
    countryNo07Heading: string;
    countryNo08Eyebrow: string;
    countryNo08Heading: string;
    countryNo09Eyebrow: string;
    countryNo09Heading: string;
    browseAllCountries: string;
    schengenHeroTitlePrefix: string;
    schengenHeroHighlight: string;
    schengenRequestBtn: string;
    insuranceHeroTitlePrefix: string;
    insuranceHeroHighlight: string;
    insuranceRequestBtn: string;
    aboutEyebrow: string;
    aboutHighlight: string;
    aboutPrinciplesEyebrow: string;
    aboutPrinciplesHeading: string;
    contactEyebrow: string;
    contactHeadingPrefix: string;
    contactEmailDesk: string;
    contactDeskHours: string;
    contactQuickLinks: string;
  };
  globe: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    dragHint: string;
    autoSpinOn: string;
    autoSpinOff: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    legendHighlighted: string;
    legendSelected: string;
    legendOrigin: string;
    clickCountryHint: string;
    syncedBadge: string;
    visaTypeLabel: string;
    entryTypeLabel: string;
    channelLabel: string;
    processingLabel: string;
    coreDocsHeading: string;
    docsSummary: string;
    openChecklistBtn: string;
    fullGuideBtn: string;
    quickJumpLabel: string;
    originLabel: string;
    hoverPrompt: string;
    tooltipVisaType: string;
    tooltipProcessing: string;
    tooltipSpeedFast: string;
    tooltipSpeedStandard: string;
    tooltipSpeedExtended: string;
    tooltipCoreDocs: string;
  };
  worldVisaHub: {
    eyebrow: string;
    heading: string;
    subcopy: string;
    kpiShortestRegion: string;
    kpiFastTrack: string;
    kpiGlobalAvg: string;
    kpiFastestVisa: string;
    daysUnit: string;
    avgDaysFormat: string;
    guidesCountFormat: string;
    eVisaCountFormat: string;
    leaderboardEyebrow: string;
    leaderboardHeading: string;
    leaderboardHint: string;
    rankFastestLabel: string;
    rankShortLabel: string;
    fastestInRegionPrefix: string;
    alternativesEyebrow: string;
    alternativesHeading: string;
    compareTargetLabel: string;
    currentWaitLabel: string;
    daysSavedFormat: string;
    eVisaShortcutLabel: string;
    noFasterTitle: string;
    noFasterBody: string;
    loadChecklistBtn: string;
    viewGuideBtn: string;
    ledgerHeading: string;
    filterFastTrack: string;
    filterUnderThreeWeeks: string;
    filterAllCountries: string;
    filterEVisaOnly: string;
    clearRegionBtn: string;
    showingCount: string;
    colCountry: string;
    colRegion: string;
    colChannel: string;
    colProcessing: string;
    colTurnaround: string;
    colAction: string;
    tierExpress: string;
    tierModerate: string;
    tierExtended: string;
    emptyTitle: string;
    emptyBody: string;
    disclaimerSuffix: string;
    jumpLinkLabel: string;
  };
}

export const EN_TRANSLATION: TranslationBundle = {
    common: {
      brandName: 'Visahouse',
      tagline: 'Every Visa Under One Roof.',
      pakistan: 'Pakistan',
      pakistani: 'Pakistani',
      disclaimer:
        'Visahouse is a private consultancy, not a government body or embassy. Final decisions rest with the authorities.',
      confirmWithTeam: 'Confirm with our team',
      skipToContent: 'Skip to main content',
      languageSwitcherLabel: 'Choose interface language',
      all: 'All',
      reset: 'Reset',
      resetFilters: 'Reset Filters',
      copy: 'Copy',
      copied: 'Copied',
      print: 'Print',
      printSheet: 'Print Sheet',
      printBrief: 'Print Brief',
      whatsapp: 'WhatsApp',
      whatsappDesk: 'WhatsApp Desk',
      applyNow: 'Apply Now',
      consultancyNotice: 'Consultancy Notice:',
      policyNotice: 'Policy Notice:',
      home: 'Home',
      visas: 'Visas',
      schengen: 'Schengen',
      insurance: 'Insurance',
      about: 'About',
      contact: 'Contact',
      officeHours: 'Mon–Sat · 10:00 AM – 7:00 PM PKT (Online Desk)',
      responseExpectation: 'Typical response within 2–4 business hours on WhatsApp & email',
    },
    header: {
      primaryNavLabel: 'Primary navigation',
      mobileNavLabel: 'Mobile navigation',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      megaEyebrow: 'Destinations · Pakistani Passport Desk',
      viewAllCountries: 'View All {count} Countries',
      schengenAppointments: 'Schengen Appointments (SCH)',
      travelInsurance: 'Travel Insurance (INS)',
      dynamicChecklistLibrary: 'Dynamic Checklist Library',
      visaFeeEstimator: 'Visa Fee Estimator',
      onlineFirstPakistan: 'Online-first across Pakistan',
      allDestinations: 'All Destinations ({count})',
      aboutVisahouse: 'About Visahouse',
      contactDesk: 'Contact Desk',
      quickCountryLinks: 'Quick Country Links',
    },
    footer: {
      blurb:
        'Online visa file preparation, bank-statement check, Schengen appointment help, and travel insurance for Pakistani passport holders.',
      countryVisaGuides: 'Country Visa Guides ({count} · Pakistan)',
      servicesAndDesk: 'Services & Tools',
      allDestinationsDirectory: 'All Countries List',
      schengenAppointments: 'Schengen Appointments',
      travelInsurance: 'Travel Insurance',
      visaCostCalculator: 'Visa Cost Calculator',
      visaNewsAlerts: 'Visa News & Alerts',
      timelinesDocFaqs: 'Timelines & Document FAQs',
      visaSuccessStories: 'Visa Success Stories',
      consultancyAndLegal: 'About & Legal',
      aboutVisahouse: 'About Visahouse',
      contactIntakeDesk: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      whatsappLabel: 'WhatsApp',
      emailLabel: 'Email',
    },
    hero: {
      kickerDesk: 'Pakistan Visa Desk',
      kickerGuides: '{count} Country Guides',
      kickerSchengen: 'Schengen & Travel Insurance',
      headlinePrefix: 'Every visa under one roof —',
      headlineHighlight: 'prepared cleanly from Pakistan.',
      subheadline:
        'Online visa guidance and file preparation for Pakistani passport holders. We check your bank statements, match embassy checklists, help book official Schengen and US appointments, and arrange accepted travel insurance—before you apply.',
      ctaPrimary: 'Start a Visa Consultation',
      ctaSecondary: 'Browse All Visas',
      valuePoints: [
        {
          index: '01',
          label: 'Complete Document Check',
          detail: 'Six-month bank statements, FBR tax returns, and travel plans checked before you apply.',
        },
        {
          index: '02',
          label: 'Official Channels & PKR Fees',
          detail: 'Direct e-Visa portals, VFS/BLS appointment dates, and embassy fees checked live.',
        },
        {
          index: '03',
          label: 'Online Service Across Pakistan',
          detail: 'One WhatsApp & email chat from first inquiry to pre-flight arrival cards.',
        },
      ],
      standardsNonGov: 'Private Consultancy (Non-Gov)',
      standardsNoGuarantee: 'No False Visa Guarantees',
      standardsLiveFees: 'Live Fees in PKR',
      specimenTitle: 'Sample Visa File',
      stampLabel: 'CHECKED & FILED',
      stampSublabel: 'VISAHOUSE · PAK',
    },
    visaSlip: {
      specimenHeader: 'Sample · For Reference Only',
      consularSlipHeader: 'Visa Summary · Pakistan Desk',
      fromPak: 'FROM PAK',
      visaType: 'Visa Type',
      entry: 'Entry',
      permittedStay: 'Allowed Stay',
      validityWindow: 'Visa Validity',
      processingTime: 'Processing Time',
      govtFee: 'Govt Fee (PKR)',
      ourFee: 'Visahouse Fee (PKR)',
      lastVerified: 'Last Checked',
      decorativeMrz: 'Sample Code Only',
      nonOfficialRef: 'Sample Reference',
    },
    home: {
      no01Eyebrow: 'No. 01 · Visa Countries',
      no01Heading: 'Pick a country to check its visa documents & steps',
      routeAtlasBtn: 'Interactive World Map',
      filterByRegionBtn: 'Filter by Region & Type',
      schengenDeskTitle: 'Schengen Desk',
      schengenDeskSub: 'Europe · VFS & BLS',
      schengenDeskChannel: 'Appointments',
      insuranceTitle: 'Travel Insurance',
      insuranceSub: 'Medical Cover',
      insuranceChannel: 'Insurance Desk',
      no02ChecklistEyebrow: 'No. 02 · Interactive Document Checklist (PDF)',
      no02PhotoEyebrow: 'Visa Photo Guide · Correct vs Wrong',
      no02PhotoHeading: 'Visa Photo Requirements Visual Guide',
      no03CalcEyebrow: 'No. 03 · Visa Cost Calculator',
      no04TrackerEyebrow: 'No. 04 · Visa Status Tracker',
      no05Eyebrow: 'No. 05 · How It Works',
      no05Heading: 'Easy visa paperwork in four simple steps',
      no05Body:
        'No hidden agent fees, no rushed forms. You review every document before applying and stay on one WhatsApp chat from start to boarding.',
      no05Caption: 'Fig. 01 — Document check & visa file preparation',
      howItWorksSteps: [
        {
          number: '01',
          title: 'Send your country & travel month',
          body: 'Message us on WhatsApp or fill out the inquiry form. We check the official way to apply—e-Visa portal, visa centre, or embassy—and confirm exact current fees before you start.',
        },
        {
          number: '02',
          title: 'We check every document and bank statement',
          body: 'Share your passport, bank statement, job or NTN papers, and travel plan online. We catch date mistakes, unexplained deposits, and spelling errors before the embassy sees your file.',
        },
        {
          number: '03',
          title: 'Clean forms & guided submission',
          body: 'Our team fills out official forms, writes your cover letter and realistic day-by-day travel plan, and guides your online upload, file arrangement, or official visa-centre appointment.',
        },
        {
          number: '04',
          title: 'Tracking & airport arrival prep',
          body: 'We track your application status until the decision and send you a simple arrival guide covering required digital arrival cards (MDAC, SGAC, Visit Japan Web, eTravel) for smooth check-in.',
        },
      ],
      no06Eyebrow: 'No. 06 · Our Promise',
      no06Heading: 'Clear process instead of fake approval claims',
      no06StampLabel: 'NO FALSE CLAIMS',
      no06StampSublabel: 'HONEST CONSULTANCY',
      processPromises: [
        {
          index: 'Promise 01',
          title: 'Live-checked rules, never old fee tables',
          body: 'Embassy rules and PKR fees change often. Before you pay a single rupee, we confirm the latest official fee with you.',
        },
        {
          index: 'Promise 02',
          title: 'Careful check of every form before applying',
          body: 'Most avoidable visa refusals happen because of form mistakes, mismatched hotel dates, or weak employer letters—not the traveller’s profile.',
        },
        {
          index: 'Promise 03',
          title: 'Official channels only — no shortcuts or false promises',
          body: 'We never promise guaranteed visas, never make fake hotel or bank papers, and never use unauthorised agents for Schengen or US embassy appointments.',
        },
        {
          index: 'Promise 04',
          title: 'Online service across every city in Pakistan',
          body: 'Whether you are applying from Karachi, Lahore, Islamabad, Multan, Faisalabad, or Peshawar, your full document check and WhatsApp support happen online with no wasted office trips.',
        },
      ],
      no07Eyebrow: 'No. 07 · Europe & Travel Insurance',
      no07Heading: 'Schengen visa centres & embassy-accepted travel insurance',
      schengenCardEyebrow: 'Europe · Official Channels Only',
      schengenCardTitle: 'Schengen Appointments & Visa Filing from Pakistan',
      schengenCardBody:
        'Applying for France, Italy, Spain, Germany, Switzerland, or the Netherlands starts with picking the right embassy under the Main-Destination Rule, preparing a clean bank and document file, and booking directly through official portals (VFS Global, BLS International, or embassy websites).',
      schengenCardCities: 'ISLAMABAD · LAHORE · KARACHI CENTRES',
      schengenCardCta: 'View Schengen Guide',
      insuranceCardEyebrow: 'Medical & Emergency Return',
      insuranceCardTitle: 'Schengen-Accepted & Worldwide Travel Insurance',
      insuranceCardBody:
        'Clean digital insurance certificates made for VFS / BLS Schengen applications (minimum €30,000 emergency medical and emergency return home cover across all member states) as well as Asia, Gulf, Japan, and USA trips.',
      insuranceMinimumLabel: 'Schengen Minimum',
      insuranceMinimumVal: '€30,000 Medical',
      insuranceZonesLabel: 'Coverage Areas',
      insuranceZonesVal: 'Asia · Schengen · Worldwide',
      insurancePremiumLabel: 'Starting Quote',
      insuranceCardCta: 'Compare Plans & Get Quote',
      no08TestimonialsEyebrow: 'No. 08 · Client Stories',
      no09FaqEyebrow: 'No. 09 · Timelines & Document FAQs',
      no09FaqHeading: 'Common questions on processing times and documents',
      no09FaqDesc:
        'Simple answers for Pakistani passport holders on when to apply, passport holding time, stamped bank statements, FBR tax returns, and NADRA papers.',
      no10AlertsEyebrow: 'No. 10 · Visa News & Alerts',
      no11Eyebrow: 'No. 11 · Start Your File',
      no11Heading: 'Ready to prepare your visa file?',
      no11Body:
        'Tell us where you want to go and which month you plan to travel. We will send you the exact document checklist for your job or business profile plus current embassy and service fees in PKR.',
      no11DirectPrompt: 'Prefer WhatsApp Chat or Tracking?',
      no11TrackLink: 'Already have a reference? Track your visa status',
    },
    checklist: {
      partOneLabel: 'Part I · Document Checklist',
      auditLabel: 'Interactive Document Checklist',
      headingSuffix: 'Document Checklist',
      readyCount: '{checked} / {total} READY',
      coreTag: '· Required',
      libraryHeading: 'Select your country and travel purpose to build your PDF checklist',
      librarySubcopy:
        'Ready for all 42 countries across Tourist, Business, Family Visit, Student, and Transit visas. Tick the documents you already have and download a clean A4 PDF checklist.',
      badgeCount: '{countries} Countries × {purposes} Purposes · PDF',
      step1Country: '1. Destination Country',
      step2Purpose: '2. Travel Purpose',
      step3Passport: '3. Passport Nationality',
      buildListBtn: 'Build List',
      individualGuidesGroup: 'Individual Country Guides ({count})',
      europeZoneGroup: 'Multi-Country European Zone',
      customNationalityLabel: 'Enter Your Passport Nationality',
      customNationalityPlaceholder: 'e.g. Bangladeshi, Sri Lankan, UK, Canadian',
      downloadPdfBtn: 'Download PDF Checklist',
      verifyWhatsappBtn: 'Check on WhatsApp',
      fullGuideBtn: 'Full Guide',
      eligibilityNoteLabel: 'Eligibility note:',
      passportMetaPrefix: 'PASSPORT',
      coreItemsMeta: 'REQUIRED / {total} ITEMS',
      preparedMeta: '{checked} READY',
      disclaimerSuffix:
        'Fees and processing times are always confirmed live when you ask—never rely on old copies.',
    },
    photoGuide: {
      eyebrow: 'Visa Photo Guide · Embassy Rules',
      heading: 'Visa Photo Requirements: Correct vs Wrong Examples',
      subcopy:
        'Compare accepted visa photos against the four common studio mistakes that delay Pakistani visa files at VFS Global, BLS International, and US DS-160 portals.',
      copyStudioSpec: 'Copy Studio Instructions',
      studioSpecCopied: 'Instructions Copied',
      standardLabel: 'Standard:',
      viewLabel: 'Show:',
      filterAll: 'All Examples (6)',
      filterCorrect: 'Correct Only (2)',
      filterIncorrect: 'Common Mistakes (4)',
      printDigitalSize: 'Print & Digital Size',
      headHeightRatio: 'Face Size Ratio',
      headHeightHint: 'Measured from chin to top of hair',
      backgroundPaper: 'Background & Paper',
      eyeglassesPolicy: 'Glasses Policy',
      approvedVerdict: 'Accepted',
      rejectedVerdict: 'Rejected',
      pakistanStudioTip: 'Pakistan Studio Tip:',
    },
    calculator: {
      heading: 'Calculate estimated embassy fees and our service charges',
      subcopy:
        'Select your country, visa type, and number of travellers to see a clear PKR or USD budget covering embassy fees, visa-centre biometrics, and Visahouse filing charges.',
      displayCurrency: 'Currency',
      popularRoutes: 'Popular Countries',
      step1Destination: '1. Destination Country ({count} Guides)',
      step2VisaType: '2. Visa Type / Travel Purpose',
      step3Applicants: '3. Number of Applicants',
      savingsActive: '15% family/group service discount applied',
      savingsPrompt: '2+ applicants save 15% on service fee',
      passportSingular: 'Pakistani Passport',
      passportPlural: 'Pakistani Passports',
      step4Addons: '4. Optional Add-Ons',
      viewGuide: 'View {country} Guide',
      typicalProcessing: 'Usual Processing:',
      estimatedTotal: 'Estimated Total',
      waivedDirect: 'Not Charged / Direct',
      groupSavingsApplied: 'Family / Group Discount Applied (15% off extra applicants)',
      estimatedGrandTotal: 'Estimated Total ({count} {unit})',
      applicantSingular: 'Applicant',
      applicantPlural: 'Applicants',
      confirmWhatsapp: 'Confirm on WhatsApp',
      copyEstimate: 'Copy Estimate',
      startDossier: 'Start Your File',
      emailQuoteBtn: 'Email Me This Quote',
      emailQuoteOpenTitle: 'Send Cost Summary to Your Email',
      emailQuoteSubtitle:
        'Get a clean, detailed copy of this estimate with reference ID, exchange-rate notes, and embassy remarks.',
      emailRecipientLabel: 'Your Email Address',
      emailRecipientPlaceholder: 'you@example.com',
      emailNameLabel: 'Your Name (Optional)',
      emailNamePlaceholder: 'e.g. Amina Tariq',
      emailSummaryPreviewLabel: 'Quote Included:',
      emailSendBtn: 'Send Quote Summary',
      emailSendingBtn: 'Preparing Quote…',
      emailCancelBtn: 'Cancel',
      emailReceiptSentBadge: 'Quote Emailed',
      emailReceiptLoggedBadge: 'Quote Ready',
      emailOpenInAppBtn: 'Open in Email App',
      emailShowCopyBtn: 'Preview Email Text',
      emailHideCopyBtn: 'Hide Email Text',
      emailSendAnotherBtn: 'Send to Another Email',
      emailUpdatedNotice: 'Your selections changed since this quote was made.',
      emailSendUpdatedBtn: 'Email Updated Quote',
      emailPrivacyNote:
        'Used only to send this visa cost summary—no spam or marketing emails.',
      emailRequiredError: 'Please enter your email address to get this cost quote.',
      emailInvalidError: 'Please enter a valid email address (for example, name@domain.com).',
      disclaimerSuffix:
        'These amounts are rough estimates for planning—official embassy fees and daily PKR exchange rates are confirmed live before you pay.',
    },
    tracker: {
      eyebrow: 'Visa File Tracking · Case Desk',
      heading: 'Track your visa application status',
      subcopy:
        'Enter your Visahouse application ID below—or open a sample file—to see your 5-step progress and latest updates.',
      formatLabel: 'Application ID Format',
      applicationIdLabel: 'Application ID',
      placeholder: 'e.g. VH-THA-1042',
      hint: 'Enter the application ID from your inquiry receipt or WhatsApp confirmation.',
      trackBtn: 'Track Application',
      checkingBtn: 'Checking File…',
      sampleDossiers: 'Sample Files:',
      yourInquiry: 'Your Inquiry',
      streamLive: 'Live updates active',
      streamConnecting: 'Checking status…',
      streamReconnecting: 'Reconnecting…',
      streamOffline: 'Local file preview',
      streamIdle: 'Ready to check',
      syncLiveStatus: 'Refresh Status',
      syncingDesk: 'Refreshing…',
      channelLabel: 'How You Apply',
      passportMonthLabel: 'Passport & Travel Month',
      lastSyncedLabel: 'Last Checked',
      processingStages: 'Application Steps',
      completedActive: '{done} Done · 1 Current',
      liveActivityLog: 'Recent Activity',
      nextStepGuidance: 'Next Step & Advice',
      askDeskAbout: 'Ask About {ref}',
      notFoundTitle: 'No Record Found · {ref}',
      confirmWhatsapp: 'Confirm on WhatsApp',
      disclaimerSuffix:
        'Final visa decisions and official embassy statuses are controlled only by the embassy or visa centre.',
    },
    schengenSlots: {
      eyebrow: 'Official VFS, BLS & Embassy Centres',
      heading: 'Schengen Appointment Slot Availability',
      subcopy:
        'Check sample biometric appointment openings for top Schengen embassies in Islamabad, Lahore, and Karachi before booking on the official portal.',
      feedLive: 'Sample Feed Active',
      feedPaused: 'Feed Paused',
      lastSync: 'Last check:',
      updates: 'Updates:',
      pauseFeed: 'Pause Feed',
      resumeFeed: 'Resume Feed',
      pollNow: 'Check Now',
      openLabel: 'Open',
      limitedLabel: 'Limited',
      waitlistLabel: 'Waitlist',
      estSlotsSummary: 'estimated open biometric slots across 8 embassies',
      cityFilterLabel: 'City:',
      statusFilterLabel: 'Status:',
      emptyTitle: 'No Schengen embassies match that city and status right now.',
      emptyBody: 'Clear your filters or refresh to view all 8 embassies.',
      resetAllFilters: 'Reset All Filters',
      earliestLabel: 'Earliest',
      channelLabel: 'Centre',
      prepareDossier: 'Prepare file',
      recentChanges: 'Recent Sample Slot Changes',
      simulatedNotice: 'Sample Data Notice:',
      allCities: 'All Cities',
      allStatuses: 'All Statuses',
    },
    insuranceAdvisor: {
      eyebrow: 'Embassy Rules · Insurance Planner',
      heading: 'Travel Insurance Advisor',
      subcopy:
        'Match your country, trip length, and visa rules to the right medical cover, area wording, and policy dates before requesting a PKR quote.',
      resetSelections: 'Reset Selections',
      step1Dest: '01 · Country or Visa Zone',
      step1Hint: 'Embassy area rule applied automatically.',
      step2Purpose: '02 · Visa Type & Travel Purpose',
      step3Duration: '03 · Trip Length (Days)',
      step4Travellers: '04 · Travellers',
      singlePassportNote: 'Single passport insurance certificate.',
      multiPassportNote: '{count} passports — separate certificates checked for embassy submission.',
      step5Age: '05 · Eldest Traveller Age Group',
      step6Riders: '06 · Extra Options & Policy Checks',
      riderZeroTitle: 'Zero-deductible certificate',
      riderZeroDesc: 'preferred by strict VFS / BLS Schengen counters.',
      riderCancelTitle: 'Trip cancellation & date-change check',
      riderCancelDesc: 'confirm refund or date-shift terms in writing if your visa is delayed.',
      riderAdventureTitle: 'High-altitude trekking (>3,000m) or winter sports',
      riderAdventureDesc: 'add adventure & rescue cover check.',
      benchmarksTitle: 'Common Embassy Insurance Rules',
      recommendedTierLabel: 'Recommended Plan',
      medicalCeiling: 'Medical Cover Limit',
      territoryWording: 'Area Wording',
      policyWindow: 'Policy Dates',
      premiumLabel: 'Estimated Cost (PKR)',
      certificateChecklist: 'Certificate Wording Checklist',
      underwritingNotes: 'Policy Rules & Visa Notes',
      requestWhatsapp: 'Request This Plan on WhatsApp',
      openQuoteForm: 'Open Quote Form',
      copyCoverageBrief: 'Copy Plan Summary',
      briefCopied: 'Summary Copied',
    },
    readiness: {
      eyebrowSingle: 'Part II · Travel Prep · {iso} · {region}',
      eyebrowDirectory: 'Before You Fly · All {count} Countries',
      headingDirectory: 'Travel Readiness Guide',
      subcopySingle:
        'Helpful pre-flight tips for Pakistani travellers visiting {country}—covering local culture, power plugs, airport SIM cards, and arrival prep.',
      subcopyDirectory:
        'Helpful pre-flight tips for every country in our list—local culture, power plugs for Pakistani chargers, and tested airport SIM or eSIM options.',
      destinationsShown: '{shown} of {total} countries',
      searchPlaceholder: 'Search country, code (JPN, GBR, EGY), plug (Type G), or SIM network...',
      regionLabel: 'Region:',
      noMatchesTitle: 'No countries match your search.',
      noMatchesBody:
        'Try searching by country name, code, plug type (e.g. Type G), or clear your region filter.',
      showAllBtn: 'Show All {total} Countries ({more} more)',
      showCompactBtn: 'Show Short List ({count})',
      moreTips: 'More Tips',
      hideDetails: 'Hide Details',
      copyFieldCard: 'Copy Travel Tips',
      fieldCardCopied: 'Tips Copied',
      visaGuideLink: 'Visa Guide',
      rowEtiquette: 'Local Etiquette',
      rowEtiquetteHead: 'Culture, dress & tipping',
      rowPower: 'Power Plugs & Voltage',
      rowSim: 'SIM & Internet',
      rowSimHead: 'Recommended local SIM & eSIM networks',
      rowCurrency: 'Money & Airport Transport',
      rowCurrencyHead: 'Cards, cash & airport rides',
      rowEmergency: 'Emergency & Arrival',
      rowEmergencyHead: 'Local helplines & border tips',
      showingSummary: 'Showing {shown} of {total} countries in our travel guide.',
    },
    testimonials: {
      title: 'Stories from Pakistani travellers who got their visas',
      subcopy:
        'Short stories from Pakistani applicants for Schengen, USA, East Asia, and Southeast Asia—built on clean paperwork and honest advice.',
      stampLabel: 'VISA ISSUED',
      stampSublabel: 'CLIENT STORIES · PAK',
      fileFocus: 'Main Focus:',
      honestyNote:
        'Sample client stories showing past document preparation cases.',
      regionAll: 'All Stories',
      regionSchengenWest: 'Schengen & West',
      regionEastAsia: 'East Asia',
      regionSoutheastAsia: 'Southeast Asia',
    },
    faq: {
      baselineTitle: 'Pakistan Visa Basics',
      passportValidity: 'Passport Validity',
      passportValidityVal: 'Usually 6 months valid (3 months after exit for Schengen) & 2 blank pages',
      financialProof: 'Bank & Tax Papers',
      financialProofVal: '6-month stamped bank statement, AMC & FBR NTN / tax returns',
      recommendedLeadTime: 'When to Apply',
      recommendedLeadTimeVal: '3–4 wks e-Visa · 6–8 wks embassy · 10–14+ wks Schengen',
      buildChecklistLink: 'Build Your Document Checklist',
      estimateFeesLink: 'Estimate Fees & Processing Time',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      keyStandard: 'Key Rule',
      catAll: 'All Questions',
      catTimelines: 'Timelines',
      catDocuments: 'Document Requirements',
    },
    alerts: {
      heading: 'Get alerts when Schengen slots or visa rules change',
      subcopy:
        'Embassy checklists, digital arrival cards, and visa-centre slots can change without warning. Enter your email to get short, clear updates whenever new visa rules affect Pakistani travellers.',
      step1Topics: '1. Choose Visa Alert Topics',
      step2Email: '2. Your Email Address *',
      subscribeBtn: 'Subscribe to Alerts',
      subscribingBtn: 'Subscribing',
      privacyNote:
        'Only verified embassy and visa updates—no spam or data sharing. Unsubscribe anytime in one click.',
      policyWatchTitle: 'Visa Watch · Pakistan Desk',
      verifiedBriefs: 'Verified Updates',
      updateFeedsBtn: 'Change Email or Topics',
      activeFeedsLabel: 'Active alerts:',
    },
    leadForm: {
      eyebrow: 'Visa Inquiry · Pakistan Desk',
      heading: 'Start your visa file',
      subcopy:
        'Share your travel month and passport details. Our team will send you the latest document checklist, embassy fees, and our service charges on WhatsApp.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Bilal Ahmed Khan',
      whatsappNumber: 'WhatsApp Number',
      whatsappHint: 'Digits only with country code (10–15 digits).',
      destinationService: 'Country / Service',
      passportNationality: 'Passport Nationality',
      plannedTravelMonth: 'Planned Travel Month',
      tripNotes: 'Trip Notes (Optional)',
      tripNotesPlaceholder:
        'Number of travellers, job or business profile, city (Karachi / Lahore / Islamabad), or previous visas...',
      submitLabel: 'Send Visa Inquiry',
      submittingLabel: 'Saving Inquiry…',
      privacyFoot:
        'We never sell your data or make false visa promises.',
      loggedEyebrow: 'Visa Inquiry Saved',
      referencePrefix: 'Reference',
      stampLabel: 'FILE LOGGED',
      applicantLabel: 'Applicant',
      passportLabel: 'Passport',
      targetMonthLabel: 'Travel Month',
      continueWhatsapp: 'Continue on WhatsApp with Reference',
      submitAnother: 'Submit Another Inquiry',
    },
    pages: {
      visasEyebrow: 'Complete List · {count} Countries + Europe & Insurance',
      visasHeadingPrefix: 'Visa countries from',
      visasSubcopy:
        'Filter by region, visa type, or city name. Every guide includes a tickable document checklist, common refusal mistakes, travel tips, and clear packages.',
      visasSearchPlaceholder:
        'Search country, code (DEU, CAN, EGY), or city (London, Paris, Cairo)...',
      visasChannelLabel: 'Channel:',
      visasRegionLabel: 'Region:',
      visasShownCount: '{shown} of {total} shown',
      visasLedgerEyebrow: 'Quick Reference Table',
      visasLedgerHeading: 'How to apply for each country (Pakistan)',
      tableCountry: 'Country',
      tableIso: 'Code',
      tableRegion: 'Region',
      tableChannel: 'How to Apply',
      tableFees: 'Fees & Processing',
      countryVisaSuffix: 'Visa',
      countryFromPrefix: 'from Pakistan',
      countryApplyBtn: 'Apply for {country} Visa',
      countryFeesNote:
        'Embassy fees, rules, and processing times can change anytime. Any item marked “Confirm with our team” is checked live before you pay.',
      countryNo03Eyebrow: 'No. 03 · Who Can Apply & Papers',
      countryNo03Heading: 'Who can apply for a visa from Pakistan?',
      countryEligibilityNote: 'Embassy Area & Applying Channel',
      countryNo04Eyebrow: 'No. 04 · Your Role & Our Role',
      countryNo04Heading: 'How do you apply for a {country} visa from Pakistan step by step?',
      countryWhatYouDo: 'What You Do',
      countryWhatWeDo: 'What Visahouse Does',
      countryNo05Eyebrow: 'No. 05 · Common Mistakes',
      countryNo05Heading: 'Why do {country} visas get refused from Pakistan — and how do we prevent it?',
      countryPrevention: 'How Visahouse Helps',
      countryNo06Eyebrow: 'No. 06 · Travel Tips',
      countryNo06Heading: 'Planning {country} from Pakistan',
      countryBestSeason: 'Best Time to Visit',
      countryCities: 'Top Cities & Route Tips',
      countryEntryTips: 'Airport & Entry Tips',
      countryNo07Eyebrow: 'No. 07 · Service Packages',
      countryNo07Heading: 'Choose your {country} service package',
      countryNo08Eyebrow: 'No. 08 · Frequently Asked',
      countryNo08Heading: '{country} visa questions from Pakistan',
      countryNo09Eyebrow: 'No. 09 · Similar Countries',
      countryNo09Heading: 'Other visas Pakistani travellers compare with {country}',
      browseAllCountries: 'Browse All {count} Countries',
      schengenHeroTitlePrefix: 'Schengen Appointments',
      schengenHeroHighlight: 'through official channels',
      schengenRequestBtn: 'Get Appointment Help',
      insuranceHeroTitlePrefix: 'Travel Insurance built for',
      insuranceHeroHighlight: 'embassy rules & real emergencies',
      insuranceRequestBtn: 'Get Insurance Quote',
      aboutEyebrow: 'About Visahouse',
      aboutHighlight: 'Honest advice, clean paperwork.',
      aboutPrinciplesEyebrow: 'No. 01 · How We Work',
      aboutPrinciplesHeading: 'How our team handles every application',
      contactEyebrow: 'Online Desk · Pakistan',
      contactHeadingPrefix: 'Contact',
      contactEmailDesk: 'Email Us',
      contactDeskHours: 'Office Hours',
      contactQuickLinks: 'Quick Links',
    },
    globe: {
      eyebrow: 'Interactive 3D World Visa Map',
      heading: 'Spin the 3D globe and click any highlighted country for its visa checklist',
      subcopy:
        'Drag to spin the globe across all 42 countries for Pakistani passport holders. Click any shaded country to see how to apply, key visa rules, and load its full PDF checklist below.',
      dragHint: 'Hover a country for quick info · Click for checklist',
      autoSpinOn: 'Pause Spin',
      autoSpinOff: 'Auto-Spin',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetView: 'Reset to Pakistan',
      legendHighlighted: 'Visa Guide Available (42)',
      legendSelected: 'Selected Country',
      legendOrigin: 'Pakistan (PAK)',
      clickCountryHint: 'Hover any green country for visa type & wait time · Click to open checklist',
      syncedBadge: 'Linked with Document Checklist below',
      visaTypeLabel: 'Visa Type',
      entryTypeLabel: 'Entry Type',
      channelLabel: 'How to Apply',
      processingLabel: 'Usual Processing',
      coreDocsHeading: 'Main Required Documents',
      docsSummary: '{core} required of {total} total items',
      openChecklistBtn: 'Open Full Checklist & Download PDF',
      fullGuideBtn: 'Full Country Guide',
      quickJumpLabel: 'Quick-Pick Popular Countries:',
      originLabel: 'From · Pakistan',
      hoverPrompt: 'Click for checklist',
      tooltipVisaType: 'Main Visa Type',
      tooltipProcessing: 'Est. Processing Time',
      tooltipSpeedFast: 'Fast Track',
      tooltipSpeedStandard: 'Standard',
      tooltipSpeedExtended: 'Apply Early',
      tooltipCoreDocs: '{count} main docs',
    },
    worldVisaHub: {
      eyebrow: 'World Visa Hub · Visa Processing Times',
      heading: 'Visa processing wait times & faster travel options',
      subcopy:
        'Compare estimated processing times across all 8 regions and 42 countries from Pakistan. Faster regions are shown first so you can pick easier options when embassy queues are long.',
      kpiShortestRegion: 'Fastest Region',
      kpiFastTrack: 'Fast-Track Countries',
      kpiGlobalAvg: 'Average Wait Time',
      kpiFastestVisa: 'Fastest Visa',
      daysUnit: 'days',
      avgDaysFormat: '~{days} days avg',
      guidesCountFormat: '{count} guides',
      eVisaCountFormat: '{count} e-Visa',
      leaderboardEyebrow: 'Region Ranking · Fastest to Slowest',
      leaderboardHeading: 'Regions with the shortest visa wait times',
      leaderboardHint: 'Click any region to filter the country table below.',
      rankFastestLabel: 'Fastest Region',
      rankShortLabel: 'Short Wait',
      fastestInRegionPrefix: 'Fastest:',
      alternativesEyebrow: 'Faster Travel Options',
      alternativesHeading: 'Compare a slow visa with faster countries',
      compareTargetLabel: 'Comparing wait time for',
      currentWaitLabel: 'Usual Wait',
      daysSavedFormat: 'Saves ~{days} days',
      eVisaShortcutLabel: 'Easy online e-Visa',
      noFasterTitle: 'You picked one of the fastest countries.',
      noFasterBody:
        'This country is already among the fastest to process. Pick a slower country above (such as Canada, USA, or Germany) to see faster alternatives.',
      loadChecklistBtn: 'Open Checklist',
      viewGuideBtn: 'Guide',
      ledgerHeading: 'Country Visa Wait-Time Table',
      filterFastTrack: 'Fast (≤11d)',
      filterUnderThreeWeeks: 'Under 3 Weeks',
      filterAllCountries: 'All 42 Countries',
      filterEVisaOnly: 'e-Visa Only',
      clearRegionBtn: 'All Regions',
      showingCount: '{shown} of {total} countries',
      colCountry: 'Country',
      colRegion: 'Region',
      colChannel: 'How to Apply',
      colProcessing: 'Estimated Processing Time',
      colTurnaround: 'Speed',
      colAction: 'Next Step',
      tierExpress: 'Fast',
      tierModerate: 'Normal',
      tierExtended: 'Long Wait',
      emptyTitle: 'No countries match that speed and visa type.',
      emptyBody: 'Reset filters or widen the time range to see all countries.',
      disclaimerSuffix:
        'Average days are rough planning estimates based on current embassy timelines—actual processing time depends on the season and your file.',
      jumpLinkLabel: 'World Visa Hub',
    },
  };

let cachedUrTranslation: TranslationBundle | null = null;

/**
 * Dynamically loads the Urdu translation dictionary on demand so English visitors
 * never download Urdu strings in the initial bundle.
 */
export async function loadUrduTranslation(): Promise<TranslationBundle> {
  if (cachedUrTranslation) {
    return cachedUrTranslation;
  }
  const mod = await import('./i18nUr');
  cachedUrTranslation = mod.UR_TRANSLATION;
  return cachedUrTranslation;
}

export function getTranslation(locale: Locale): TranslationBundle {
  return locale === 'ur' && cachedUrTranslation ? cachedUrTranslation : EN_TRANSLATION;
}
