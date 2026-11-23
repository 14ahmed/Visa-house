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

export const TRANSLATIONS: Record<Locale, TranslationBundle> = {
  en: {
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
  },
  ur: {
    common: {
      brandName: 'ویزاہاؤس',
      tagline: 'ہر ویزا ایک ہی چھت تلے۔',
      pakistan: 'پاکستان',
      pakistani: 'پاکستانی',
      disclaimer:
        'ویزاہاؤس ایک نجی کنسلٹنسی ہے، کوئی سرکاری ادارہ یا سفارتخانہ نہیں۔ ویزا کا حتمی فیصلہ متعلقہ حکام کے اختیار میں ہوتا ہے۔',
      confirmWithTeam: 'ہماری ٹیم سے تصدیق کریں',
      skipToContent: 'اصل مواد پر جائیں',
      languageSwitcherLabel: 'زبان منتخب کریں',
      all: 'تمام',
      reset: 'ری سیٹ',
      resetFilters: 'فلٹرز صاف کریں',
      copy: 'کاپی کریں',
      copied: 'کاپی ہو گیا',
      print: 'پرنٹ',
      printSheet: 'پرنٹ شیٹ',
      printBrief: 'بریف پرنٹ کریں',
      whatsapp: 'واٹس ایپ',
      whatsappDesk: 'واٹس ایپ ڈیسک',
      applyNow: 'ابھی درخواست دیں',
      consultancyNotice: 'کنسلٹنسی نوٹس:',
      policyNotice: 'پالیسی نوٹس:',
      home: 'ہوم',
      visas: 'ویزے',
      schengen: 'شینگن',
      insurance: 'انشورنس',
      about: 'تعارف',
      contact: 'رابطہ',
      officeHours: 'پیر تا ہفتہ · صبح 10:00 تا شام 7:00 بجے (آن لائن ڈیسک)',
      responseExpectation: 'عموماً واٹس ایپ اور ای میل پر 2 سے 4 دفتری گھنٹوں میں جواب',
    },
    header: {
      primaryNavLabel: 'بنیادی نیویگیشن',
      mobileNavLabel: 'موبائل نیویگیشن',
      openMenu: 'مینو کھولیں',
      closeMenu: 'مینو بند کریں',
      megaEyebrow: 'ممالک · پاکستانی پاسپورٹ ڈیسک',
      viewAllCountries: 'تمام {count} ممالک دیکھیں',
      schengenAppointments: 'شینگن اپائنٹمنٹس (SCH)',
      travelInsurance: 'ٹریول انشورنس (INS)',
      dynamicChecklistLibrary: 'دستاویزات کی چیک لسٹ لائبریری',
      visaFeeEstimator: 'ویزا فیس کا تخمینہ کار',
      onlineFirstPakistan: 'پاکستان بھر میں مکمل آن لائن سروس',
      allDestinations: 'تمام ممالک ({count})',
      aboutVisahouse: 'ویزاہاؤس کا تعارف',
      contactDesk: 'رابطہ ڈیسک',
      quickCountryLinks: 'فوری ملکی رہنمائی',
    },
    footer: {
      blurb:
        'پاکستانی پاسپورٹ ہولڈرز کے لیے آن لائن ویزا تیاری، بینک اسٹیٹمنٹ آڈٹ، شینگن اپائنٹمنٹ رہنمائی اور سفارتخانے کے معیار کے مطابق ٹریول انشورنس۔',
      countryVisaGuides: 'ممالک کے ویزا گائیڈز ({count} · پاکستان)',
      servicesAndDesk: 'خدمات اور ڈیسک',
      allDestinationsDirectory: 'تمام ممالک کی فہرست',
      schengenAppointments: 'شینگن اپائنٹمنٹس',
      travelInsurance: 'ٹریول انشورنس',
      visaCostCalculator: 'ویزا لاگت کیلکولیٹر',
      visaNewsAlerts: 'ویزا خبریں اور پالیسی الرٹس',
      timelinesDocFaqs: 'مدت اور دستاویزات کے سوالات',
      visaSuccessStories: 'کامیاب ویزا کہانیاں',
      consultancyAndLegal: 'کنسلٹنسی اور قانونی امور',
      aboutVisahouse: 'ویزاہاؤس کے بارے میں',
      contactIntakeDesk: 'رابطہ اور فائل ڈیسک',
      privacyPolicy: 'پرائیویسی پالیسی',
      termsOfService: 'شرائطِ خدمت',
      whatsappLabel: 'واٹس ایپ',
      emailLabel: 'ای میل',
    },
    hero: {
      kickerDesk: 'پاکستان پاسپورٹ ڈیسک',
      kickerGuides: '{count} ممالک کے گائیڈز',
      kickerSchengen: 'شینگن اور ٹریول انشورنس',
      headlinePrefix: 'ہر ویزا ایک ہی چھت تلے —',
      headlineHighlight: 'پاکستان سے صاف اور مکمل تیاری۔',
      subheadline:
        'پاکستانی پاسپورٹ ہولڈرز کے لیے آن لائن ویزا مشاورت اور مکمل فائل تیاری۔ ہم آپ کے بینک اسٹیٹمنٹ کا جائزہ لیتے ہیں، سفارتخانے کی چیک لسٹ ترتیب دیتے ہیں، آفیشل شینگن اور امریکی اپائنٹمنٹس میں رہنمائی کرتے ہیں اور مستند ٹریول انشورنس فراہم کرتے ہیں۔',
      ctaPrimary: 'ویزا مشاورت شروع کریں',
      ctaSecondary: 'تمام ویزے دیکھیں',
      valuePoints: [
        {
          index: '01',
          label: 'دستاویزات کا تفصیلی آڈٹ',
          detail: 'فائل جمع کرانے سے پہلے چھ ماہ کی بینک اسٹیٹمنٹ، ایف بی آر ریٹرنز اور سفری پروگرام کی جانچ۔',
        },
        {
          index: '02',
          label: 'آفیشل ذرائع اور تازہ ریٹس',
          detail: 'براہِ راست ای-ویزا پورٹلز، VFS/BLS کیلنڈرز اور سفارتخانے کی فیسوں کی لائیو تصدیق۔',
        },
        {
          index: '03',
          label: 'پاکستان بھر میں آن لائن ڈیسک',
          detail: 'ابتدائی مشاورت سے ایئرپورٹ ارائیول کارڈز تک ایک ہی واٹس ایپ اور ای میل رابطہ۔',
        },
      ],
      standardsNonGov: 'نجی کنسلٹنسی (غیر سرکاری)',
      standardsNoGuarantee: 'ویزا کی گارنٹی کا کوئی جھوٹا دعویٰ نہیں',
      standardsLiveFees: 'تازہ فیس پاکستانی روپے میں',
      specimenTitle: 'نمونہ سفری ویزا ڈوزئیر',
      stampLabel: 'جانچ پڑتال مکمل',
      stampSublabel: 'ویزاہاؤس · پاکستان',
    },
    visaSlip: {
      specimenHeader: 'نمونہ · صرف وضاحتی مثال',
      consularSlipHeader: 'قونصلر سلپ · پاکستان ڈیسک',
      fromPak: 'از پاکستان',
      visaType: 'ویزا کی قسم',
      entry: 'داخلے کی نوعیت',
      permittedStay: 'قیام کی مدت',
      validityWindow: 'میعاد',
      processingTime: 'پروسیسنگ کا وقت',
      govtFee: 'سرکاری فیس (PKR)',
      ourFee: 'ویزاہاؤس فیس (PKR)',
      lastVerified: 'آخری تصدیق',
      decorativeMrz: 'آرائشی نمونہ ایم آر زیڈ',
      nonOfficialRef: 'غیر سرکاری حوالہ',
    },
    home: {
      no01Eyebrow: 'نمبر 01 · ممالک کی ڈاک ٹکٹ شیٹ',
      no01Heading: 'چیک لسٹ اور طریقہ کار دیکھنے کے لیے کسی ملک کا انتخاب کریں',
      routeAtlasBtn: 'انٹرایکٹو روٹ نقشہ',
      filterByRegionBtn: 'خطے اور طریقے سے فلٹر کریں',
      schengenDeskTitle: 'شینگن ڈیسک',
      schengenDeskSub: 'یورپ · VFS اور BLS',
      schengenDeskChannel: 'اپائنٹمنٹس',
      insuranceTitle: 'ٹریول انشورنس',
      insuranceSub: 'طبی تحفظ',
      insuranceChannel: 'پالیسی ڈیسک',
      no02ChecklistEyebrow: 'نمبر 02 · دستاویزات کی انٹرایکٹو چیک لسٹ (PDF)',
      no02PhotoEyebrow: 'بایومیٹرک تصویر ڈیسک · درست بمقابلہ غلط',
      no02PhotoHeading: 'ویزا تصویر کے قواعد کا بصری گائیڈ',
      no03CalcEyebrow: 'نمبر 03 · انٹرایکٹو ویزا لاگت کیلکولیٹر',
      no04TrackerEyebrow: 'نمبر 04 · لائیو ویزا اسٹیٹس ٹریکر',
      no05Eyebrow: 'نمبر 05 · طریقہ کار',
      no05Heading: 'چار واضح مراحل میں بے فکر کاغذی کارروائی',
      no05Body:
        'نہ مبہم ایجنٹ فیسیں، نہ جلد بازی میں بھرے گئے فارم۔ جمع کرانے سے پہلے آپ ہر دستاویز خود دیکھتے ہیں اور ایک ہی واٹس ایپ تھریڈ پر رہنمائی پاتے ہیں۔',
      no05Caption: 'شکل 01 — دستاویزات کی جانچ اور فائل تیاری ڈیسک',
      howItWorksSteps: [
        {
          number: '01',
          title: 'اپنا مطلوبہ ملک اور سفر کا مہینہ بھیجیں',
          body: 'واٹس ایپ پر پیغام بھیجیں یا فارم پُر کریں۔ ہم لائیو طریقہ کار (ای-ویزا، ویزا سینٹر یا سفارتخانہ) اور موجودہ فیسوں کی پہلے تصدیق کرتے ہیں۔',
        },
        {
          number: '02',
          title: 'ہم ہر اسکین اور بینک اسٹیٹمنٹ کا آڈٹ کرتے ہیں',
          body: 'پاسپورٹ، بینک اسٹیٹمنٹ، ملازمت یا NTN ریکارڈ اور سفری پلان آن لائن بھیجیں۔ ہم تاریخوں کے فرق، غیر واضح ڈپازٹس اور ہجوں کی غلطیوں کی پہلے نشاندہی کرتے ہیں۔',
        },
        {
          number: '03',
          title: 'مستند ڈرافٹنگ اور رہنمائی شدہ فائلنگ',
          body: 'ہمارے ماہرین آفیشل فارم پُر کرتے ہیں، کور لیٹر اور عملی سفری پروگرام تیار کرتے ہیں اور پورٹل اپ لوڈ یا ویزا سینٹر شیڈولنگ میں مدد کرتے ہیں۔',
        },
        {
          number: '04',
          title: 'ٹریکنگ اور ایئرپورٹ آمد کی تیاری',
          body: 'فیصلے تک فائل کی پیروی کی جاتی ہے اور روانگی سے پہلے لازمی ڈیجیٹل ارائیول کارڈز (MDAC، SGAC، Visit Japan Web، eTravel) کی تفصیل فراہم کی جاتی ہے۔',
        },
      ],
      no06Eyebrow: 'نمبر 06 · ہمارا پیشہ ورانہ معیار',
      no06Heading: 'مبالغہ آمیز دعوؤں کے بجائے شفاف عملی وعدے',
      no06StampLabel: 'کوئی جھوٹا دعویٰ نہیں',
      no06StampSublabel: 'دیانتدار کنسلٹنسی',
      processPromises: [
        {
          index: 'وعدہ 01',
          title: 'لائیو تصدیق شدہ قواعد، پرانی فیس فہرستیں نہیں',
          body: 'سفارتخانوں کے سرکلرز اور روپے میں فیسیں بدلتی رہتی ہیں۔ ادائیگی سے پہلے ہر سرکاری رقم کی براہِ راست تصدیق کی جاتی ہے۔',
        },
        {
          index: 'وعدہ 02',
          title: 'جمع کرانے سے پہلے سطر بہ سطر کلریکل معائنہ',
          body: 'زیادہ تر قابلِ تدارک انکار بے احتیاط فارم، متضاد ہوٹل تاریخوں یا کمزور ملازمتی خطوط کی وجہ سے ہوتے ہیں—مسافر کے پروفائل کی وجہ سے نہیں۔',
        },
        {
          index: 'وعدہ 03',
          title: 'صرف آفیشل ذرائع — کوئی شارٹ کٹ یا جعلی کاغذ نہیں',
          body: 'ہم کبھی گارنٹی شدہ ویزا کا دعویٰ نہیں کرتے، نہ جعلی ہوٹل یا بینک کاغذات بناتے ہیں، اور نہ غیر مجاز بروکرز استعمال کرتے ہیں۔',
        },
        {
          index: 'وعدہ 04',
          title: 'پاکستان کے ہر شہر کے لیے مکمل آن لائن سروس',
          body: 'کراچی، لاہور، اسلام آباد، ملتان، فیصل آباد یا پشاور—پورا آڈٹ، ڈرافٹنگ اور واٹس ایپ کیس ڈیسک بغیر دفتری چکروں کے چلتا ہے۔',
        },
      ],
      no07Eyebrow: 'نمبر 07 · یورپی اور تحفظاتی ڈیسک',
      no07Heading: 'شینگن ویزا سینٹرز اور معیاری ٹریول انشورنس',
      schengenCardEyebrow: 'یورپ · صرف آفیشل چینلز',
      schengenCardTitle: 'پاکستان سے شینگن اپائنٹمنٹس اور فائل تیاری',
      schengenCardBody:
        'فرانس، اٹلی، اسپین، جرمنی، سوئٹزرلینڈ یا نیدرلینڈز کے لیے درخواست کا آغاز مین ڈیسٹینیشن رول کے مطابق درست سفارتخانے کے انتخاب، شفاف مالی فائل اور VFS Global یا BLS International پر قانونی بکنگ سے ہوتا ہے۔',
      schengenCardCities: 'اسلام آباد · لاہور · کراچی سینٹرز',
      schengenCardCta: 'شینگن رہنمائی دیکھیں',
      insuranceCardEyebrow: 'طبی تحفظ اور وطن واپسی',
      insuranceCardTitle: 'شینگن کے مطابق اور عالمی ٹریول انشورنس',
      insuranceCardBody:
        'VFS اور BLS شینگن فائلنگ کے لیے کم از کم €30,000 ایمرجنسی میڈیکل کوریج کے ساتھ ڈیجیٹل سرٹیفکیٹس، نیز ایشیا، خلیج، جاپان اور امریکہ کے سفر کے لیے موزوں پلانز۔',
      insuranceMinimumLabel: 'شینگن کم از کم حد',
      insuranceMinimumVal: '€30,000 میڈیکل',
      insuranceZonesLabel: 'زونز',
      insuranceZonesVal: 'ایشیا · شینگن · عالمی',
      insurancePremiumLabel: 'پریمیم کوٹ',
      insuranceCardCta: 'پلانز کا موازنہ اور کوٹ لیں',
      no08TestimonialsEyebrow: 'نمبر 08 · کلائنٹس کے تجربات',
      no09FaqEyebrow: 'نمبر 09 · مدت اور دستاویزات کے سوالات',
      no09FaqHeading: 'ویزا پروسیسنگ وقت اور دستاویزات سے متعلق عام سوالات',
      no09FaqDesc:
        'پاکستانی پاسپورٹ ہولڈرز کے لیے درخواست کے موزوں وقت، پاسپورٹ جمع ہونے، تصدیق شدہ بینک اسٹیٹمنٹ، ایف بی آر ریٹرنز اور نادرا ریکارڈ کے واضح جوابات۔',
      no10AlertsEyebrow: 'نمبر 10 · ویزا خبریں اور پالیسی الرٹس',
      no11Eyebrow: 'نمبر 11 · نئی فائل کھولیں',
      no11Heading: 'کیا آپ اپنی ویزا فائل تیار کرنے کے لیے تیار ہیں؟',
      no11Body:
        'ہمیں بتائیں کہ آپ کس ملک اور کس مہینے سفر کا ارادہ رکھتے ہیں۔ آپ کو آپ کے پروفائل کے مطابق مکمل چیک لسٹ اور تازہ سرکاری و کنسلٹنسی فیسیں پاکستانی روپے میں فراہم کی جائیں گی۔',
      no11DirectPrompt: 'براہِ راست چیٹ یا فائل ٹریکنگ؟',
      no11TrackLink: 'کیا آپ کے پاس ریفرنس نمبر ہے؟ درخواست کا اسٹیٹس چیک کریں',
    },
    checklist: {
      partOneLabel: 'حصہ اول · دستاویزات کی چیک لسٹ',
      auditLabel: 'انٹرایکٹو کاغذی آڈٹ',
      headingSuffix: 'دستاویزات کی چیک لسٹ',
      readyCount: '{checked} / {total} تیار',
      coreTag: '· لازمی',
      libraryHeading: 'مطلوبہ ملک اور سفر کا مقصد منتخب کر کے PDF چیک لسٹ تیار کریں',
      librarySubcopy:
        'تمام 42 ممالک کے لیے سیاحت، کاروبار، خاندانی ملاقات، تعلیم اور ٹرانزٹ کے مطابق ترتیب دی گئی۔ موجود دستاویزات پر نشان لگائیں اور A4 پی ڈی ایف ڈاؤن لوڈ کریں۔',
      badgeCount: '{countries} ممالک × {purposes} مقاصد · PDF',
      step1Country: '1. مطلوبہ ملک',
      step2Purpose: '2. سفر کا مقصد',
      step3Passport: '3. پاسپورٹ کی حیثیت',
      buildListBtn: 'فہرست بنائیں',
      individualGuidesGroup: 'انفرادی ملکی گائیڈز ({count})',
      europeZoneGroup: 'ملٹی کنٹری یورپی زون',
      customNationalityLabel: 'اپنے پاسپورٹ کی شہریت لکھیں',
      customNationalityPlaceholder: 'مثلاً بنگلہ دیشی، برطانوی، کینیڈین',
      downloadPdfBtn: 'PDF چیک لسٹ ڈاؤن لوڈ کریں',
      verifyWhatsappBtn: 'واٹس ایپ پر تصدیق کریں',
      fullGuideBtn: 'مکمل گائیڈ',
      eligibilityNoteLabel: 'اہلیت کا نوٹ:',
      passportMetaPrefix: 'پاسپورٹ',
      coreItemsMeta: 'لازمی / {total} دستاویزات',
      preparedMeta: '{checked} تیار',
      disclaimerSuffix:
        'فیسوں اور پروسیسنگ وقت کی تصدیق ہمیشہ تازہ ترین صورتحال کے مطابق کی جاتی ہے۔',
    },
    photoGuide: {
      eyebrow: 'بایومیٹرک فوٹو ڈیسک · سفارتی معیار',
      heading: 'ویزا تصویر کے قواعد: درست بمقابلہ غلط مثالیں',
      subcopy:
        'منظور شدہ بایومیٹرک فریم کا موازنہ ان چار عام اسٹوڈیو غلطیوں سے کریں جو VFS Global، BLS International اور DS-160 پر پاکستانی فائلوں میں رکاوٹ بنتی ہیں۔',
      copyStudioSpec: 'اسٹوڈیو تفصیل کاپی کریں',
      studioSpecCopied: 'تفصیل کاپی ہو گئی',
      standardLabel: 'معیار:',
      viewLabel: 'منظر:',
      filterAll: 'تمام مثالیں (6)',
      filterCorrect: 'صرف درست (2)',
      filterIncorrect: 'عام مسترد مثالیں (4)',
      printDigitalSize: 'پرنٹ اور ڈیجیٹل سائز',
      headHeightRatio: 'چہرے کی اونچائی کا تناسب',
      headHeightHint: 'ٹھوڑی سے سر کے بالوں تک پیمائش',
      backgroundPaper: 'پس منظر اور کاغذ',
      eyeglassesPolicy: 'عینک کی پالیسی',
      approvedVerdict: 'منظور شدہ',
      rejectedVerdict: 'مسترد',
      pakistanStudioTip: 'پاکستانی اسٹوڈیو ہدایت:',
    },
    calculator: {
      heading: 'متوقع سفارتخانہ فیس اور ہماری سروس چارجز کا حساب لگائیں',
      subcopy:
        'مطلوبہ ملک، ویزا کی قسم اور مسافروں کی تعداد منتخب کریں تاکہ سرکاری فیس، ویزا سینٹر بایومیٹرکس اور ویزاہاؤس کی خدمات کا تفصیلی بجٹ PKR یا USD میں دیکھ سکیں۔',
      displayCurrency: 'کرنسی کا انتخاب',
      popularRoutes: 'مقبول ممالک',
      step1Destination: '1. مطلوبہ ملک ({count} گائیڈز)',
      step2VisaType: '2. ویزا کی قسم / سفر کا مقصد',
      step3Applicants: '3. درخواست گزاروں کی تعداد',
      savingsActive: 'ساتھی مسافروں پر 15% سروس رعایت فعال ہے',
      savingsPrompt: '2 یا زائد مسافروں پر سروس چارج میں 15% بچت',
      passportSingular: 'پاکستانی پاسپورٹ',
      passportPlural: 'پاکستانی پاسپورٹس',
      step4Addons: '4. اختیاری اضافی سہولیات',
      viewGuide: '{country} کا گائیڈ دیکھیں',
      typicalProcessing: 'عمومی پروسیسنگ وقت:',
      estimatedTotal: 'متوقع کل لاگت',
      waivedDirect: 'معاف / براہِ راست',
      groupSavingsApplied: 'فیملی / گروپ سروس رعایت لاگو (اضافی مسافروں پر 15%)',
      estimatedGrandTotal: 'متوقع مجموعی لاگت ({count} {unit})',
      applicantSingular: 'مسافر',
      applicantPlural: 'مسافر',
      confirmWhatsapp: 'واٹس ایپ پر تصدیق کریں',
      copyEstimate: 'تخمینہ کاپی کریں',
      startDossier: 'فائل شروع کریں',
      emailQuoteBtn: 'مجھے یہ تخمینہ ای میل کریں',
      emailQuoteOpenTitle: 'لاگت کا تفصیلی خلاصہ اپنے ای میل پر حاصل کریں',
      emailQuoteSubtitle:
        'ریفرنس آئی ڈی، ایکسچینج ریٹ نوٹ اور قونصلر تفصیلات کے ساتھ اس تخمینے کی صاف نقل اپنے ان باکس میں محفوظ کریں۔',
      emailRecipientLabel: 'آپ کا ای میل ایڈریس',
      emailRecipientPlaceholder: 'you@example.com',
      emailNameLabel: 'آپ کا نام (اختیاری)',
      emailNamePlaceholder: 'مثلاً آمنہ طارق',
      emailSummaryPreviewLabel: 'منسلک تخمینہ:',
      emailSendBtn: 'تخمینہ ای میل کریں',
      emailSendingBtn: 'تخمینہ تیار ہو رہا ہے…',
      emailCancelBtn: 'بند کریں',
      emailReceiptSentBadge: 'تخمینہ ای میل ہو گیا',
      emailReceiptLoggedBadge: 'تخمینہ ڈسپیچ تیار ہے',
      emailOpenInAppBtn: 'ای میل ایپ میں کھولیں',
      emailShowCopyBtn: 'ای میل کا متن دیکھیں',
      emailHideCopyBtn: 'ای میل کا متن چھپائیں',
      emailSendAnotherBtn: 'دوسرے ای میل پر بھیجیں',
      emailUpdatedNotice: 'اس تخمینے کے بعد کیلکولیٹر میں تبدیلیاں کی گئی ہیں۔',
      emailSendUpdatedBtn: 'نیا تخمینہ ای میل کریں',
      emailPrivacyNote:
        'آپ کا ای میل صرف اس ویزا لاگت کے خلاصے کے لیے استعمال ہوگا—کوئی غیر ضروری تشہیر نہیں کی جائے گی۔',
      emailRequiredError: 'براہِ کرم تخمینہ حاصل کرنے کے لیے اپنا ای میل ایڈریس درج کریں۔',
      emailInvalidError: 'براہِ کرم درست ای میل ایڈریس درج کریں (مثلاً name@domain.com)۔',
      disclaimerSuffix:
        'یہ اعداد محض تخمینی بجٹ ہیں—ادائیگی سے پہلے سرکاری سفارتخانہ فیس اور یومیہ ایکسچینج ریٹ کی لائیو تصدیق کی جاتی ہے۔',
    },
    tracker: {
      eyebrow: 'لائیو فائل ٹریکنگ · کیس ڈیسک',
      heading: 'اپنی ویزا درخواست کا اسٹیٹس براہِ راست چیک کریں',
      subcopy:
        'نیچے اپنا ویزاہاؤس ایپلیکیشن آئی ڈی درج کریں—یا نمونہ فائلیں کھول کر 5 مرحلوں کی پیش رفت اور لائیو اپ ڈیٹس دیکھیں۔',
      formatLabel: 'ایپلیکیشن آئی ڈی فارمیٹ',
      applicationIdLabel: 'ایپلیکیشن آئی ڈی',
      placeholder: 'مثلاً VH-THA-1042',
      hint: 'اپنی رسید یا واٹس ایپ تصدیقی پیغام میں دیا گیا ایپلیکیشن آئی ڈی درج کریں۔',
      trackBtn: 'درخواست ٹریک کریں',
      checkingBtn: 'فائل چیک ہو رہی ہے…',
      sampleDossiers: 'نمونہ فائلیں:',
      yourInquiry: 'آپ کی انکوائری',
      streamLive: 'لائیو اسٹریم منسلک ہے',
      streamConnecting: 'لائیو ڈیسک سے رابطہ ہو رہا ہے…',
      streamReconnecting: 'دوبارہ رابطہ قائم کیا جا رہا ہے…',
      streamOffline: 'اسنیپ شاٹ موڈ (اسٹریم آف لائن)',
      streamIdle: 'چیک کرنے کے لیے تیار',
      syncLiveStatus: 'لائیو اسٹیٹس ریفریش کریں',
      syncingDesk: 'اپ ڈیٹ ہو رہا ہے…',
      channelLabel: 'جمع کرانے کا ذریعہ',
      passportMonthLabel: 'پاسپورٹ اور سفر کا مہینہ',
      lastSyncedLabel: 'آخری اپ ڈیٹ',
      processingStages: 'پروسیسنگ مراحل',
      completedActive: '{done} مکمل · 1 جاری',
      liveActivityLog: 'لائیو سرگرمی لاگ',
      nextStepGuidance: 'اگلا قدم اور ڈیسک رہنمائی',
      askDeskAbout: '{ref} کے بارے میں ڈیسک سے پوچھیں',
      notFoundTitle: 'آن لائن ریکارڈ نہیں ملا · {ref}',
      confirmWhatsapp: 'واٹس ایپ پر تصدیق کریں',
      disclaimerSuffix:
        'قونصلر فیصلے اور سرکاری پورٹل اسٹیٹس مکمل طور پر متعلقہ سفارتخانے یا ویزا سینٹر کے اختیار میں ہوتے ہیں۔',
    },
    schengenSlots: {
      eyebrow: 'آفیشل VFS، BLS اور قونصلر سینٹرز',
      heading: 'شینگن اپائنٹمنٹ سلاٹس کی دستیابی',
      subcopy:
        'اسلام آباد، لاہور اور کراچی سے نمایاں شینگن مشنز کے لیے بایومیٹرک اپائنٹمنٹ سلاٹس کی تخمینی لائیو صورتحال دیکھیں۔',
      feedLive: 'لائیو فیڈ جاری',
      feedPaused: 'فیڈ رکی ہوئی ہے',
      lastSync: 'آخری اپ ڈیٹ:',
      updates: 'اپ ڈیٹس:',
      pauseFeed: 'فیڈ روکیں',
      resumeFeed: 'فیڈ چلائیں',
      pollNow: 'ابھی ریفریش کریں',
      openLabel: 'دستیاب',
      limitedLabel: 'محدود',
      waitlistLabel: 'ویٹ لسٹ',
      estSlotsSummary: '8 مشنز میں تخمینی دستیاب بایومیٹرک سلاٹس',
      cityFilterLabel: 'شہر:',
      statusFilterLabel: 'حالت:',
      emptyTitle: 'اس شہر اور حالت کے فلٹر پر کوئی شینگن مشن موجود نہیں۔',
      emptyBody: 'تمام 8 مشنز دیکھنے کے لیے فلٹرز صاف کریں یا فیڈ ریفریش کریں۔',
      resetAllFilters: 'تمام فلٹرز صاف کریں',
      earliestLabel: 'قریب ترین وقت',
      channelLabel: 'ذریعہ',
      prepareDossier: 'فائل تیار کریں',
      recentChanges: 'تازہ ترین فیڈ تبدیلیاں',
      simulatedNotice: 'تخمینی فیڈ نوٹس:',
      allCities: 'تمام شہر',
      allStatuses: 'تمام حالات',
    },
    insuranceAdvisor: {
      eyebrow: 'سفارتی معیار · کوریج پلانر',
      heading: 'ٹریول انشورنس ایڈوائزر',
      subcopy:
        'اپنے ملک، سفر کی مدت اور ویزا شرائط کے مطابق درست طبی حد، علاقائی کوریج اور پالیسی کی مدت منتخب کریں۔',
      resetSelections: 'انتخاب ری سیٹ کریں',
      step1Dest: '01 · مطلوبہ ملک یا ویزا زون',
      step1Hint: 'بنیادی زون اصول خودکار طور پر لاگو ہو گیا ہے۔',
      step2Purpose: '02 · ویزا شرط اور سفر کی نوعیت',
      step3Duration: '03 · سفر کی مدت (دن)',
      step4Travellers: '04 · مسافر',
      singlePassportNote: 'ایک پاسپورٹ کے لیے پالیسی سرٹیفکیٹ۔',
      multiPassportNote: '{count} پاسپورٹس — ہر فرد کا سرٹیفکیٹ سفارتخانے کے مطابق چیک کیا جاتا ہے۔',
      step5Age: '05 · سب سے بڑے مسافر کی عمر',
      step6Riders: '06 · اختیاری تحفظ اور شرائط',
      riderZeroTitle: 'زیرو ڈیڈکٹبل سرٹیفکیٹ',
      riderZeroDesc: 'سخت VFS / BLS شینگن کاؤنٹرز کے لیے موزوں۔',
      riderCancelTitle: 'سفر منسوخی اور تاریخ تبدیلی کی سہولت',
      riderCancelDesc: 'ویزا تاریخ بدلنے پر تحریری ریفنڈ یا تبدیلی کی شرائط۔',
      riderAdventureTitle: 'بلند پہاڑی ٹریکنگ یا ونٹر اسپورٹس',
      riderAdventureDesc: 'ایڈونچر اور ریسکیو کوریج کی تصدیق شامل کریں۔',
      benchmarksTitle: 'سفارتخانوں کے عام انشورنس معیارات',
      recommendedTierLabel: 'تجویز کردہ کوریج پلان',
      medicalCeiling: 'طبی حد',
      territoryWording: 'علاقائی دائرہ کار',
      policyWindow: 'پالیسی کی مدت',
      premiumLabel: 'پریمیم (PKR)',
      certificateChecklist: 'سرٹیفکیٹ عبارت چیک لسٹ',
      underwritingNotes: 'پالیسی اور ویزا نوٹس',
      requestWhatsapp: 'یہ پلان واٹس ایپ پر طلب کریں',
      openQuoteForm: 'کوٹ فارم کھولیں',
      copyCoverageBrief: 'تفصیل کاپی کریں',
      briefCopied: 'تفصیل کاپی ہو گئی',
    },
    readiness: {
      eyebrowSingle: 'حصہ دوم · سفری تیاری · {iso} · {region}',
      eyebrowDirectory: 'روانگی سے قبل فیلڈ ڈیسک · تمام {count} ممالک',
      headingDirectory: 'سفری تیاری گائیڈ',
      subcopySingle:
        '{country} جانے والے پاکستانی مسافروں کے لیے اہم ہدایات—مقامی آداب، پاور پلگ مطابقت، ایئرپورٹ سم کارڈ اور آمد کی تیاری۔',
      subcopyDirectory:
        'فہرست میں شامل ہر ملک کے لیے اہم سفری نکات—مقامی آداب، پاکستانی چارجرز کے لیے پاور پلگ مطابقت اور مصدقہ ایئرپورٹ سم یا ای-سم سفارشات۔',
      destinationsShown: '{total} میں سے {shown} ممالک',
      searchPlaceholder: 'ملک، آئی ایس او کوڈ (JPN, GBR)، پلگ (Type G) یا سم نیٹ ورک تلاش کریں...',
      regionLabel: 'خطہ:',
      noMatchesTitle: 'آپ کی تلاش کے مطابق کوئی ملک نہیں ملا۔',
      noMatchesBody: 'ملک کے نام، آئی ایس او کوڈ یا پلگ کی قسم سے تلاش کریں یا فلٹر صاف کریں۔',
      showAllBtn: 'تمام {total} ممالک دکھائیں (مزید {more})',
      showCompactBtn: 'مختصر فہرست دکھائیں ({count})',
      moreTips: 'مزید نکات',
      hideDetails: 'تفصیل چھپائیں',
      copyFieldCard: 'فیلڈ کارڈ کاپی کریں',
      fieldCardCopied: 'فیلڈ کارڈ کاپی ہو گیا',
      visaGuideLink: 'ویزا گائیڈ',
      rowEtiquette: 'مقامی آداب و ثقافت',
      rowEtiquetteHead: 'ثقافتی اصول، لباس اور ٹپنگ',
      rowPower: 'پاور پلگ اور وولٹیج',
      rowSim: 'سم کارڈ اور انٹرنیٹ',
      rowSimHead: 'تجویز کردہ مقامی سم اور ای-سم نیٹ ورکس',
      rowCurrency: 'کرنسی اور ٹرانزٹ',
      rowCurrencyHead: 'ادائیگیاں، نقدی اور ایئرپورٹ ٹرانسفر',
      rowEmergency: 'ایمرجنسی اور آمد',
      rowEmergencyHead: 'مقامی ہیلپ لائنز اور بارڈر تیاری',
      showingSummary: 'آرکائیو سفری فہرست میں {total} میں سے {shown} ممالک دکھائے جا رہے ہیں۔',
    },
    testimonials: {
      title: 'ویزا حاصل کرنے والے مسافروں کے تجربات',
      subcopy:
        'شینگن، امریکہ، مشرقی ایشیا اور جنوب مشرقی ایشیا کے لیے پاکستانی درخواست گزاروں کی کامیاب فائلیں—شفاف آڈٹ اور درست تیاری کی بنیاد پر۔',
      stampLabel: 'ویزا جاری',
      stampSublabel: 'کامیاب کیسز · پاکستان',
      fileFocus: 'فائل کا خاص پہلو:',
      honestyNote: 'گذشتہ کلریکل تیاری کے تجربات پر مبنی وضاحتی کیس نوٹس۔',
      regionAll: 'تمام تجربات',
      regionSchengenWest: 'شینگن اور مغرب',
      regionEastAsia: 'مشرقی ایشیا',
      regionSoutheastAsia: 'جنوب مشرقی ایشیا',
    },
    faq: {
      baselineTitle: 'پاکستان ڈیسک کا بنیادی معیار',
      passportValidity: 'پاسپورٹ کی میعاد',
      passportValidityVal: 'عموماً 6 ماہ (شینگن واپسی کے بعد 3 ماہ) اور 2 خالی صفحات',
      financialProof: 'مالی شواہد',
      financialProofVal: '6 ماہ کی مہر شدہ بینک اسٹیٹمنٹ، AMC اور FBR ٹیکس ریٹرنز',
      recommendedLeadTime: 'تجویز کردہ پیشگی وقت',
      recommendedLeadTimeVal: 'ای-ویزا 3–4 ہفتے · سفارتخانہ 6–8 ہفتے · شینگن 10–14+ ہفتے',
      buildChecklistLink: 'اپنی دستاویزات کی چیک لسٹ بنائیں',
      estimateFeesLink: 'فیس اور پروسیسنگ وقت کا تخمینہ لگائیں',
      expandAll: 'سب کھولیں',
      collapseAll: 'سب بند کریں',
      keyStandard: 'بنیادی معیار',
      catAll: 'تمام سوالات',
      catTimelines: 'مدت اور اوقات',
      catDocuments: 'دستاویزات کی شرائط',
    },
    alerts: {
      heading: 'شینگن سلاٹس یا سفری قوانین بدلنے پر فوری پالیسی سرکلرز',
      subcopy:
        'سفارتخانوں کی چیک لسٹس، ڈیجیٹل ارائیول کارڈز اور ویزا سینٹر کیلنڈر بغیر اطلاع بدل جاتے ہیں۔ مصدقہ پالیسی اپ ڈیٹس کے لیے اپنا ای میل درج کریں۔',
      step1Topics: '1. پالیسی الرٹ فیڈز منتخب کریں',
      step2Email: '2. پالیسی سرکلرز کے لیے ای میل ایڈریس *',
      subscribeBtn: 'الرٹس سبسکرائب کریں',
      subscribingBtn: 'سبسکرائب ہو رہا ہے',
      privacyNote:
        'صرف مصدقہ قونصلر اپ ڈیٹس—کوئی اشتہاری اسپام یا ڈیٹا شیئرنگ نہیں۔ کسی بھی وقت ایک کلک میں ان سبسکرائب کریں۔',
      policyWatchTitle: 'پالیسی واچ · پاکستان ڈیسک',
      verifiedBriefs: 'مصدقہ اطلاعات',
      updateFeedsBtn: 'ای میل یا فیڈز تبدیل کریں',
      activeFeedsLabel: 'فعال فیڈز:',
    },
    leadForm: {
      eyebrow: 'ویزا انکوائری · پاکستان ڈیسک',
      heading: 'اپنی ویزا فائل شروع کریں',
      subcopy:
        'اپنے سفر کا متوقع مہینہ اور پاسپورٹ تفصیلات بھیجیں۔ ہمارا ڈیسک واٹس ایپ پر تازہ چیک لسٹ، سرکاری فیس اور کنسلٹنسی چارجز کی تصدیق کرے گا۔',
      fullName: 'پورا نام',
      fullNamePlaceholder: 'مثلاً بلال احمد خان',
      whatsappNumber: 'واٹس ایپ نمبر',
      whatsappHint: 'ملکی کوڈ کے ساتھ صرف ہندسے (10 تا 15 ہندسے)۔',
      destinationService: 'مطلوبہ ملک / سروس',
      passportNationality: 'پاسپورٹ شہریت',
      plannedTravelMonth: 'سفر کا متوقع مہینہ',
      tripNotes: 'سفر سے متعلق اضافی تفصیل (اختیاری)',
      tripNotesPlaceholder:
        'مسافروں کی تعداد، ملازمت یا کاروبار کی تفصیل، شہر (کراچی / لاہور / اسلام آباد) یا پچھلے ویزے...',
      submitLabel: 'ویزا انکوائری بھیجیں',
      submittingLabel: 'انکوائری درج ہو رہی ہے…',
      privacyFoot:
        'ہم ذاتی ڈیٹا فروخت نہیں کرتے اور نہ ہی ویزا کی گارنٹی کا دعویٰ کرتے ہیں۔',
      loggedEyebrow: 'انکوائری درج ہو گئی',
      referencePrefix: 'ریفرنس نمبر',
      stampLabel: 'فائل درج',
      applicantLabel: 'درخواست گزار',
      passportLabel: 'پاسپورٹ',
      targetMonthLabel: 'متوقع مہینہ',
      continueWhatsapp: 'ریفرنس نمبر کے ساتھ واٹس ایپ پر جاری رکھیں',
      submitAnother: 'ایک اور انکوائری بھیجیں',
    },
    pages: {
      visasEyebrow: 'مکمل فہرست · {count} ممالک + یورپ اور انشورنس',
      visasHeadingPrefix: 'ویزا ممالک برائے',
      visasSubcopy:
        'خطے، جمع کرانے کے ذریعے یا شہر کے نام سے فلٹر کریں۔ ہر گائیڈ میں چیک لسٹ، انکار کی وجوہات، سفری نکات اور شفاف پیکیجز شامل ہیں۔',
      visasSearchPlaceholder: 'ملک، کوڈ (DEU, CAN, EGY) یا شہر (لندن، پیرس، قاہرہ) تلاش کریں...',
      visasChannelLabel: 'ذریعہ:',
      visasRegionLabel: 'خطہ:',
      visasShownCount: '{total} میں سے {shown} ممالک',
      visasLedgerEyebrow: 'فوری حوالہ جدول',
      visasLedgerHeading: 'ویزا جمع کرانے کے ذرائع کا خلاصہ (پاکستان)',
      tableCountry: 'ملک',
      tableIso: 'کوڈ',
      tableRegion: 'خطہ',
      tableChannel: 'بنیادی ذریعہ',
      tableFees: 'فیس اور وقت',
      countryVisaSuffix: 'ویزا',
      countryFromPrefix: 'پاکستان سے',
      countryApplyBtn: '{country} ویزا کے لیے درخواست دیں',
      countryFeesNote:
        'فیسیں، سفارتی سرکلرز اور پروسیسنگ کا وقت بغیر پیشگی اطلاع بدل سکتا ہے۔ ادائیگی سے پہلے ہر فیس کی لائیو تصدیق کی جاتی ہے۔',
      countryNo03Eyebrow: 'نمبر 03 · اہلیت اور دستاویزات',
      countryNo03Heading: 'پاکستان سے کون درخواست دے سکتا ہے',
      countryEligibilityNote: 'دائرہ اختیار اور طریقہ کار نوٹ',
      countryNo04Eyebrow: 'نمبر 04 · کام کی تقسیم',
      countryNo04Heading: 'ہم آپ کا {country} ویزا مرحلہ وار کیسے فائل کرتے ہیں',
      countryWhatYouDo: 'آپ کی ذمہ داری',
      countryWhatWeDo: 'ویزاہاؤس کی ذمہ داری',
      countryNo05Eyebrow: 'نمبر 05 · رسک آڈٹ',
      countryNo05Heading: '{country} ویزا انکار کی عام وجوہات — اور ہمارا تدارک',
      countryPrevention: 'ویزاہاؤس کی احتیاطی تدبیر',
      countryNo06Eyebrow: 'نمبر 06 · فیلڈ نوٹس',
      countryNo06Heading: 'پاکستان سے {country} کے سفر کی منصوبہ بندی',
      countryBestSeason: 'بہترین موسم',
      countryCities: 'شہر اور عملی روٹنگ',
      countryEntryTips: 'بارڈر اور آمد کے نکات',
      countryNo07Eyebrow: 'نمبر 07 · سروس پیکیجز',
      countryNo07Heading: 'اپنا {country} فائلنگ فولڈر منتخب کریں',
      countryNo08Eyebrow: 'نمبر 08 · عام سوالات',
      countryNo08Heading: 'پاکستان سے {country} ویزا کے سوالات',
      countryNo09Eyebrow: 'نمبر 09 · متعلقہ ممالک',
      countryNo09Heading: 'پاکستانی مسافر {country} کے ساتھ یہ ممالک بھی دیکھتے ہیں',
      browseAllCountries: 'تمام {count} ممالک دیکھیں',
      schengenHeroTitlePrefix: 'شینگن اپائنٹمنٹس',
      schengenHeroHighlight: 'صرف آفیشل چینلز کے ذریعے',
      schengenRequestBtn: 'اپائنٹمنٹ رہنمائی طلب کریں',
      insuranceHeroTitlePrefix: 'ٹریول انشورنس برائے',
      insuranceHeroHighlight: 'سفارتی ڈیسک اور حقیقی ہنگامی حالات',
      insuranceRequestBtn: 'انشورنس کوٹ طلب کریں',
      aboutEyebrow: 'کنسلٹنسی کا تعارف',
      aboutHighlight: 'کوئی دکھاوا نہیں، صرف صاف کاغذی کارروائی۔',
      aboutPrinciplesEyebrow: 'نمبر 01 · بنیادی اصول',
      aboutPrinciplesHeading: 'ہمارا ڈیسک ہر درخواست کو کیسے سنبھالتا ہے',
      contactEyebrow: 'آن لائن ڈیسک · پاکستان',
      contactHeadingPrefix: 'رابطہ کریں',
      contactEmailDesk: 'ای میل ڈیسک',
      contactDeskHours: 'دفتری اوقات',
      contactQuickLinks: 'فوری لنکس',
    },
    globe: {
      eyebrow: 'انٹرایکٹو تھری ڈی گلوب · D3.js آرکائیول نقشہ',
      heading: 'تھری ڈی گلوب گھمائیں اور ویزا چیک لسٹ کے لیے کسی بھی نمایاں ملک پر کلک کریں',
      subcopy:
        'پاکستانی پاسپورٹ کے تمام 42 ممالک دیکھنے کے لیے گلوب کو ڈریگ کریں۔ کسی بھی سبز رنگ کے ملک پر کلک کرتے ہی اس کا ویزا طریقہ کار اور مکمل ڈاؤن لوڈ کے قابل دستاویزی چیک لسٹ نیچے کھل جائے گی۔',
      dragHint: 'فوری خلاصے کے لیے کرسر رکھیں · چیک لسٹ کے لیے کلک کریں',
      autoSpinOn: 'گردش روکیں',
      autoSpinOff: 'خودکار گردش',
      zoomIn: 'زوم ان',
      zoomOut: 'زوم آؤٹ',
      resetView: 'پاکستان پر واپس جائیں',
      legendHighlighted: 'ویزا گائیڈ دستیاب (42)',
      legendSelected: 'منتخب ملک',
      legendOrigin: 'پاکستان ڈیسک (PAK)',
      clickCountryHint: 'ویزا قسم اور وقت دیکھنے کے لیے کسی بھی سبز ملک پر کرسر لے جائیں',
      syncedBadge: 'نیچے موجود دستاویزی چیک لسٹ سے منسلک',
      visaTypeLabel: 'ویزا کی قسم',
      entryTypeLabel: 'داخلے کی نوعیت',
      channelLabel: 'جمع کرانے کا ذریعہ',
      processingLabel: 'عمومی پروسیسنگ وقت',
      coreDocsHeading: 'لازمی دستاویزات کا فوری خلاصہ',
      docsSummary: 'کل {total} میں سے {core} لازمی دستاویزات',
      openChecklistBtn: 'مکمل چیک لسٹ کھولیں اور پی ڈی ایف ڈاؤن لوڈ کریں',
      fullGuideBtn: 'ملک کا مکمل گائیڈ',
      quickJumpLabel: 'فوری انتخاب (نمایاں ممالک):',
      originLabel: 'آغاز · پاکستان',
      hoverPrompt: 'چیک لسٹ کے لیے کلک کریں',
      tooltipVisaType: 'بنیادی ویزا کی قسم',
      tooltipProcessing: 'متوقع پروسیسنگ وقت',
      tooltipSpeedFast: 'تیز پروسیسنگ',
      tooltipSpeedStandard: 'معمولی دورانیہ',
      tooltipSpeedExtended: 'قبل از وقت تیاری',
      tooltipCoreDocs: '{count} لازمی دستاویزات',
    },
    worldVisaHub: {
      eyebrow: 'ورلڈ ویزا ہب · عالمی پروسیسنگ ٹرن اراؤنڈ انڈیکس',
      heading: 'عالمی ویزا پروسیسنگ اوقات اور تیز تر سفری متبادل',
      subcopy:
        'پاکستان سے تمام 8 خطوں اور 42 ممالک کے متوقع ویزا پروسیسنگ اوقات کا موازنہ کریں۔ کم ترین وقت والے خطوں کو نمایاں کیا گیا ہے تاکہ طویل قطاروں کی صورت میں آپ ڈیٹا پر مبنی تیز تر سفری متبادل منتخب کر سکیں۔',
      kpiShortestRegion: 'کم ترین پروسیسنگ والا خطہ',
      kpiFastTrack: 'تیز رفتار ممالک',
      kpiGlobalAvg: 'عالمی اوسط انتظار',
      kpiFastestVisa: 'تیز ترین ویزا',
      daysUnit: 'دن',
      avgDaysFormat: 'اوسطاً ~{days} دن',
      guidesCountFormat: '{count} ممالک',
      eVisaCountFormat: '{count} ای ویزا',
      leaderboardEyebrow: 'علاقائی درجہ بندی · کم ترین سے طویل ترین وقت',
      leaderboardHeading: 'کم ترین ویزا پروسیسنگ وقت والے خطے',
      leaderboardHint: 'نیچے دی گئی فہرست فلٹر کرنے کے لیے کسی بھی خطے پر کلک کریں۔',
      rankFastestLabel: 'تیز ترین خطہ',
      rankShortLabel: 'کم پروسیسنگ وقت',
      fastestInRegionPrefix: 'تیز ترین:',
      alternativesEyebrow: 'ڈیٹا پر مبنی سفری متبادل',
      alternativesHeading: 'طویل انتظار والے ملک کا تیز تر متبادل سے موازنہ کریں',
      compareTargetLabel: 'موازنہ برائے',
      currentWaitLabel: 'عمومی وقت',
      daysSavedFormat: 'تقریباً {days} دن کی بچت',
      eVisaShortcutLabel: 'براہ راست ای ویزا سہولت',
      noFasterTitle: 'آپ نے پہلے ہی تیز ترین ممالک میں سے ایک منتخب کیا ہے۔',
      noFasterBody:
        'یہ ملک عالمی درجہ بندی میں پہلے ہی تیز ترین فہرست میں شامل ہے۔ تیز تر متبادل دیکھنے کے لیے کینیڈا، امریکہ یا جرمنی جیسے طویل وقت والے ملک کا انتخاب کریں۔',
      loadChecklistBtn: 'چیک لسٹ کھولیں',
      viewGuideBtn: 'گائیڈ',
      ledgerHeading: 'عالمی ویزا پروسیسنگ جدول',
      filterFastTrack: 'تیز رفتار (≤11 دن)',
      filterUnderThreeWeeks: '3 ہفتوں سے کم',
      filterAllCountries: 'تمام 42 ممالک',
      filterEVisaOnly: 'صرف ای ویزا',
      clearRegionBtn: 'تمام خطے',
      showingCount: '{total} میں سے {shown} ممالک',
      colCountry: 'ملک',
      colRegion: 'خطہ',
      colChannel: 'ذریعہ',
      colProcessing: 'متوقع پروسیسنگ دورانیہ',
      colTurnaround: 'رفتار',
      colAction: 'اگلا قدم',
      tierExpress: 'تیز رفتار',
      tierModerate: 'درمیانہ',
      tierExtended: 'طویل انتظار',
      emptyTitle: 'اس فلٹر کے مطابق کوئی ملک دستیاب نہیں۔',
      emptyBody: 'تمام دستیاب ممالک دیکھنے کے لیے فلٹرز ری سیٹ کریں یا دورانیہ بڑھائیں۔',
      disclaimerSuffix:
        'کیلنڈر دنوں کے اوسط اعداد و شمار موجودہ سفارتی شیڈول پر مبنی تخمینی رہنمائی ہیں—اصل پروسیسنگ وقت موسم اور فائل کی جانچ کے مطابق بدل سکتا ہے۔',
      jumpLinkLabel: 'ورلڈ ویزا ہب',
    },
  },
};

export function getTranslation(locale: Locale): TranslationBundle {
  return TRANSLATIONS[locale];
}
