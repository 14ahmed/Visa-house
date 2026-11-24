import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { SITE_CONFIG } from '../config/site';
import { DESTINATIONS, getDestinationBySlug, REGIONS, VISA_CHANNELS } from '../data/destinations';
import { STATIC_ROUTES } from '../data/routes';
import {
  buildWhatsAppUrl,
  countDestinationNarrativeWords,
  filterDestinations,
  formatRegulatedValue,
  validateLeadForm,
} from './formatters';
import { submitLead } from '../services/leadService';
import { buildCanonicalUrl, renderSeoTagsToHtml } from './seo';
import {
  buildChecklistFilename,
  buildVisaChecklistDocument,
  CHECKLIST_DESTINATIONS,
  formatChecklistForDownload,
} from './checklistLibrary';
import {
  buildChecklistPdfFilename,
  generateChecklistPdfBytes,
  sanitizePdfText,
} from './checklistPdf';
import {
  appendLiveSyncUpdate,
  buildServerSeedRecords,
  computeVisaTimelineState,
  createRegisteredInquiryRecord,
  lookupVisaStatus,
  normalizeReferenceInput,
  resolveVisaStatusRecord,
  SAMPLE_VISA_STATUS_RECORDS,
  TIMELINE_STAGE_META,
  validateReferenceNumber,
} from './visaStatusTracker';
import {
  buildFlightArcPath,
  getAtlasPins,
  getLandmassPaths,
  MAP_VIEWBOX_HEIGHT,
  MAP_VIEWBOX_WIDTH,
  PAKISTAN_HUB,
  projectLonLat,
} from './atlasMapData';
import {
  buildVisaFeePrompt,
  parseGeminiFeeEstimate,
  validateFeeEstimatorInput,
} from './visaFeeEstimator';
import {
  formatAlertTopicsSummary,
  validateAlertSignupInput,
} from './visaAlerts';
import { subscribeToVisaAlerts } from '../services/alertsService';
import { filterVisaFaqs, PAKISTANI_VISA_FAQS } from '../data/visaFaqs';
import {
  filterTestimonialsByRegion,
  VISA_SUCCESS_STORIES,
} from '../data/testimonials';
import {
  buildGlobeHoverSummary,
  buildGreatCircleArc,
  checklistIdToDestinationSlug,
  classifyGlobeProcessingSpeed,
  computeGlobeTooltipPosition,
  computeRotationForCoordinates,
  destinationSlugToChecklistId,
  filterGlobeDestinations,
  getGlobeDestinationByChecklistId,
  getGlobeDestinationBySlug,
  GLOBE_DESTINATIONS,
  isCountryHighlightedOnGlobe,
  isPointOnFrontHemisphere,
  normalizeNumericCountryId,
  PAKISTAN_ORIGIN,
  projectSvgPointToStage,
  REGION_CAMERA_PRESETS,
  resolveGlobeDestinationByNumericId,
} from './visaGlobeData';
import {
  buildGlobalWaitOverview,
  buildRegionalWaitSummaries,
  classifyTurnaroundTier,
  filterWorldVisaEntries,
  findFasterAlternatives,
  parseProcessingWindowToDays,
  REGIONAL_WAIT_SUMMARIES,
  WORLD_VISA_ENTRIES,
} from './worldVisaHub';
import {
  CALCULATOR_ADDONS,
  calculateVisaCost,
  clampApplicants,
  formatCostEstimateSummary,
  formatCurrencyAmount,
  hasFeeScheduleForAllDestinations,
} from './visaCostCalculator';
import {
  buildQuoteEmailContent,
  buildSafeMailtoHref,
  createQuoteReferenceId,
  escapeHtml,
  stripControlChars,
  validateQuoteEmailInput,
} from './quoteEmail';
import {
  COUNTRY_ARTWORK_META,
  getCountryArtworkMeta,
  getCountryIllustrationSrc,
  hasCountryArtworkForAllDestinations,
  hasCountryIllustrationsForAllDestinations,
} from './countryArtwork';
import {
  advanceSchengenSlotFeed,
  createInitialSchengenSlotFeed,
  filterSchengenSlots,
  formatFeedClock,
  SCHENGEN_FEED_DISCLAIMER,
  summarizeSlotAvailability,
} from './schengenSlotFeed';
import {
  ADVISOR_DESTINATIONS,
  clampTravellerCount,
  clampTripDurationDays,
  recommendTravelInsurance,
} from './travelInsuranceAdvisor';
import {
  filterPhotoExamples,
  formatPhotoStudioSpecText,
  getPhotoStandardById,
  VISA_PHOTO_EXAMPLES,
  VISA_PHOTO_STANDARDS,
} from './visaPhotoRequirements';
import {
  filterTravelReadinessEntries,
  formatTravelReadinessBrief,
  getTravelReadinessBySlug,
  hasTravelReadinessForAllDestinations,
  TRAVEL_READINESS_ENTRIES,
} from './travelReadinessGuide';
import {
  applyPrintScopeAttributes,
  buildPrintDocumentHeading,
} from './printDocument';
import {
  EN_TRANSLATION,
  formatLocalizedCopy,
  getLocaleMetadata,
  getTranslation,
  loadUrduTranslation,
  LOCALE_STORAGE_KEY,
  normalizeLocale,
  translateChannel,
  translateCountryName,
  translateRegion,
  translateVisaTypeLabel,
} from './i18n';
import { UR_TRANSLATION } from './i18nUr';

const EXPECTED_SLUGS = [
  'thailand',
  'malaysia',
  'indonesia',
  'singapore',
  'cambodia',
  'sri-lanka',
  'nepal',
  'uzbekistan',
  'bahrain',
  'turkey',
  'azerbaijan',
  'japan',
  'south-korea',
  'philippines',
  'usa',
  'canada',
  'uk',
  'australia',
  'new-zealand',
  'schengen-states',
  'germany',
  'france',
  'greece',
  'portugal',
  'hungary',
  'poland',
  'netherlands',
  'norway',
  'denmark',
  'belgium',
  'luxembourg',
  'finland',
  'sweden',
  'switzerland',
  'austria',
  'italy',
  'spain',
  'egypt',
  'morocco',
  'kenya',
  'south-africa',
  'zimbabwe',
];

test('formatRegulatedValue returns fallback for blank values and trims valid values', () => {
  assert.equal(formatRegulatedValue(''), SITE_CONFIG.confirmFallback);
  assert.equal(formatRegulatedValue('   '), SITE_CONFIG.confirmFallback);
  assert.equal(formatRegulatedValue(undefined), SITE_CONFIG.confirmFallback);
  assert.equal(formatRegulatedValue(null), SITE_CONFIG.confirmFallback);
  assert.equal(formatRegulatedValue('  Tourist Visa (TR)  '), 'Tourist Visa (TR)');
});

test('all 42 requested destination slugs exist with valid ISO codes and >= 500 narrative words', () => {
  assert.equal(DESTINATIONS.length, 42);
  for (const slug of EXPECTED_SLUGS) {
    const dest = getDestinationBySlug(slug);
    assert.ok(dest, `Missing destination slug: ${slug}`);
    assert.equal(dest.isoCode.length, 3, `ISO code for ${slug} must be 3 letters`);
    assert.ok(dest.faqs.length >= 6 && dest.faqs.length <= 8, `${slug} must have 6-8 FAQs`);

    const words = countDestinationNarrativeWords(dest);
    assert.ok(
      words >= 500,
      `Destination ${slug} has only ${words} narrative words (expected >= 500)`,
    );
  }
});

test('all destinations enforce SEO title <= 60 chars, meta description <= 155 chars, and no fabricated fees', () => {
  for (const dest of DESTINATIONS) {
    assert.ok(
      dest.seoTitle.length <= 60,
      `${dest.slug} seoTitle too long (${dest.seoTitle.length} chars): ${dest.seoTitle}`,
    );
    assert.ok(
      dest.seoDescription.length <= 155,
      `${dest.slug} seoDescription too long (${dest.seoDescription.length} chars)`,
    );
    // Regulated volatile numeric fields should remain blank so UI renders "Confirm with our team"
    assert.equal(dest.facts.govtFee, '', `${dest.slug} govtFee should not be invented`);
    assert.equal(dest.facts.ourFee, '', `${dest.slug} ourFee should not be invented`);
    assert.equal(
      dest.facts.processingTime,
      '',
      `${dest.slug} processingTime should not be invented`,
    );
  }
});

test('destination copy never contains forbidden guarantee promises or lorem ipsum', () => {
  const forbiddenPatterns = [/lorem ipsum/i, /guaranteed visa/i, /guaranteed slot/i, /100% approval/i, /99% approval/i];
  for (const dest of DESTINATIONS) {
    const serialized = JSON.stringify(dest);
    for (const pattern of forbiddenPatterns) {
      assert.equal(
        pattern.test(serialized),
        false,
        `Forbidden phrase matched ${pattern} in ${dest.slug}`,
      );
    }
  }
});

test('USA destination includes dedicated B1/B2 DS-160 and interview prep guidance', () => {
  const usa = getDestinationBySlug('usa');
  assert.ok(usa?.usaGuidance, 'USA must include usaGuidance');
  assert.ok(usa.usaGuidance.ds160Steps.length >= 3);
  assert.ok(usa.usaGuidance.interviewPrepPoints.length >= 3);
});

test('filterDestinations filters cleanly by region, channel, and text query', () => {
  const eastAsia = filterDestinations(DESTINATIONS, {
    region: 'East Asia',
    channel: 'All',
    query: '',
  });
  assert.deepEqual(
    eastAsia.map((d) => d.slug),
    ['japan', 'south-korea'],
  );

  const baliSearch = filterDestinations(DESTINATIONS, {
    region: 'All',
    channel: 'All',
    query: 'bali',
  });
  assert.deepEqual(
    baliSearch.map((d) => d.slug),
    ['indonesia'],
  );
});

test('validateLeadForm catches missing required fields, non-digit or out-of-range WhatsApp numbers, valid inputs, and honeypot bots', () => {
  const invalid = validateLeadForm({
    fullName: '',
    whatsapp: '123',
    destination: '',
    passportNationality: '',
    travelMonth: '',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.equal(invalid.isSpam, false);
  assert.ok(invalid.errors.fullName);
  assert.match(invalid.errors.whatsapp ?? '', /10 and 15 digits/i);
  assert.ok(invalid.errors.destination);
  assert.ok(invalid.errors.passportNationality);
  assert.ok(invalid.errors.travelMonth);

  const nonDigits = validateLeadForm({
    fullName: 'Amina Tariq',
    whatsapp: '+92 300 1234567',
    destination: 'Thailand Visa',
    passportNationality: 'Pakistan',
    travelMonth: 'February 2027',
    notes: '',
  });
  assert.equal(nonDigits.valid, false);
  assert.match(nonDigits.errors.whatsapp ?? '', /digits only/i);

  const tooLong = validateLeadForm({
    fullName: 'Amina Tariq',
    whatsapp: '9230012345678901',
    destination: 'Thailand Visa',
    passportNationality: 'Pakistan',
    travelMonth: 'February 2027',
    notes: '',
  });
  assert.equal(tooLong.valid, false);
  assert.match(tooLong.errors.whatsapp ?? '', /10 and 15 digits/i);

  const spam = validateLeadForm({
    fullName: 'Bot User',
    whatsapp: '923001234567',
    destination: 'Thailand Visa',
    passportNationality: 'Pakistan',
    travelMonth: 'January 2027',
    notes: '',
    website: 'https://spam.example',
  });
  assert.equal(spam.isSpam, true);
  assert.equal(spam.valid, false);

  const valid = validateLeadForm({
    fullName: 'Amina Tariq',
    whatsapp: '923001234567',
    destination: 'Thailand Visa',
    passportNationality: 'Pakistan',
    travelMonth: 'February 2027',
    notes: 'Family of 3 from Lahore',
    website: '',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.isSpam, false);
});

test('buildWhatsAppUrl and SEO serializer produce valid canonical links and JSON-LD', () => {
  const wa = buildWhatsAppUrl('Thailand visa');
  assert.ok(wa.startsWith('https://wa.me/'));
  assert.ok(wa.includes('Thailand%20visa'));

  assert.equal(buildCanonicalUrl('/visas/thailand'), `${SITE_CONFIG.siteUrl}/visas/thailand`);
  assert.equal(STATIC_ROUTES.length, 50);

  const head = renderSeoTagsToHtml({
    title: 'Thailand Visa from Pakistan | Visahouse',
    description: 'Apply for a Thailand tourist visa from Pakistan.',
    path: '/visas/thailand',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Thailand', path: '/visas/thailand' },
    ],
  });
  assert.ok(head.includes('<link rel="canonical"'));
  assert.ok(head.includes('BreadcrumbList'));
});

test('mock submitLead validates inputs and logs captured inquiry data to the console', async () => {
  await assert.rejects(
    () =>
      submitLead({
        fullName: '',
        whatsapp: '123',
        destination: '',
        passportNationality: '',
        travelMonth: '',
        notes: '',
        sourcePath: '/',
        submittedAt: '2026-11-22T00:00:00.000Z',
      }),
    /complete all required fields/i,
  );

  const loggedCalls: unknown[][] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    loggedCalls.push(args);
  };

  try {
    const result = await submitLead({
      fullName: 'Zainab Mansoor',
      whatsapp: '923215550199',
      destination: 'Japan Visa',
      passportNationality: 'Pakistan',
      travelMonth: 'March 2027',
      notes: 'Solo trip to Tokyo',
      website: '',
      sourcePath: '/visas/japan',
      submittedAt: '2026-11-22T12:00:00.000Z',
    });

    assert.equal(result.ok, true);
    assert.ok(result.referenceId.startsWith('VH-JAP-'));
    assert.equal(loggedCalls.length, 1);
    assert.equal(loggedCalls[0][0], '[Visahouse] submitLead:');
    const loggedData = loggedCalls[0][1] as Record<string, unknown>;
    assert.equal(loggedData.name, 'Zainab Mansoor');
    assert.equal(loggedData.whatsapp, '923215550199');
    assert.equal(loggedData.destination, 'Japan Visa');
    assert.equal(loggedData.passportNationality, 'Pakistan');
    assert.equal(loggedData.travelMonth, 'March 2027');
  } finally {
    console.log = originalLog;
  }
});

test('buildVisaChecklistDocument covers all 37 individual countries plus Schengen, surfaces jurisdiction advisories, and formats clean .txt downloads', () => {
  assert.equal(CHECKLIST_DESTINATIONS.length, 42);

  const japanPk = buildVisaChecklistDocument({
    nationalityId: 'pakistan',
    destinationId: 'japan',
  });
  assert.equal(japanPk.destinationName, 'Japan');
  assert.equal(japanPk.isoCode, 'JPN');
  assert.equal(japanPk.requiresVerificationAdvisory, false);
  assert.equal(japanPk.advisoryText, null);
  assert.ok(japanPk.totalItems >= 5);
  assert.ok(japanPk.coreItems >= 3);

  const schengenOther = buildVisaChecklistDocument({
    nationalityId: 'other',
    customNationality: 'Kenyan',
    destinationId: 'schengen',
  });
  assert.equal(schengenOther.isoCode, 'SCH');
  assert.equal(schengenOther.nationalityLabel, 'Kenyan Passport');
  assert.equal(schengenOther.requiresVerificationAdvisory, true);
  assert.ok(schengenOther.advisoryText && schengenOther.advisoryText.length > 30);
  assert.ok(schengenOther.groups.length >= 3);

  const residentInPk = buildVisaChecklistDocument({
    nationalityId: 'foreign-resident-pk',
    destinationId: 'thailand',
  });
  assert.ok(
    residentInPk.groups.some((g) => g.groupTitle.includes('Third-Country Applicants in Pakistan')),
  );

  const filename = buildChecklistFilename(schengenOther);
  assert.equal(filename, 'visahouse-schengen-kenyan-passport-checklist.txt');

  const downloadText = formatChecklistForDownload(schengenOther);
  assert.ok(downloadText.includes('Schengen Area (Type-C) (SCH)'));
  assert.ok(downloadText.includes('Kenyan Passport'));
  assert.ok(downloadText.includes('JURISDICTION & NATIONALITY ADVISORY:'));
  assert.ok(downloadText.includes('[CORE]'));
  assert.ok(downloadText.includes(SITE_CONFIG.disclaimer));

  const businessPk = buildVisaChecklistDocument({
    visaTypeId: 'business',
    destinationId: 'japan',
    nationalityId: 'pakistan',
  });
  assert.equal(businessPk.visaTypeId, 'business');
  assert.ok(businessPk.groups.some((g) => g.groupTitle.includes('Business & Trade')));
  assert.equal(buildChecklistFilename(businessPk), 'visahouse-japan-business-pakistani-passport-checklist.txt');

  const familyPk = buildVisaChecklistDocument({
    visaTypeId: 'family_visit',
    destinationId: 'schengen',
  });
  assert.ok(familyPk.groups.some((g) => g.groupTitle.includes('Sponsor & Relationship Proof')));

  const studentPk = buildVisaChecklistDocument({
    visaTypeId: 'student',
    destinationId: 'south-korea',
  });
  assert.ok(studentPk.visaTypeAdvisory && studentPk.visaTypeAdvisory.includes('HEC/IBCC/MOFA'));
  assert.ok(formatChecklistForDownload(studentPk).includes('CATEGORY ADVISORY:'));
});

test('validateReferenceNumber and resolveVisaStatusRecord handle sample dossiers, session leads, invalid formats, and missing records', async () => {
  assert.equal(normalizeReferenceInput(' vh-tha-1042 '), 'VH-THA-1042');

  const emptyRef = validateReferenceNumber('');
  assert.equal(emptyRef.valid, false);
  assert.ok(emptyRef.error);

  const badRef = validateReferenceNumber('12345');
  assert.equal(badRef.valid, false);
  assert.match(badRef.error ?? '', /VH-THA-1042/i);

  const validRef = validateReferenceNumber('vh-sch-2088');
  assert.equal(validRef.valid, true);
  assert.equal(validRef.normalized, 'VH-SCH-2088');

  assert.equal(SAMPLE_VISA_STATUS_RECORDS.length, 3);
  const thailandSample = await lookupVisaStatus('vh-tha-1042');
  assert.ok(thailandSample);
  assert.equal(thailandSample.isoCode, 'THA');
  assert.equal(thailandSample.isDemoRecord, true);
  assert.equal(thailandSample.milestones.length, 5);
  assert.equal(thailandSample.milestones.filter((m) => m.state === 'current').length, 1);

  const sessionRecord = resolveVisaStatusRecord('VH-JAP-9988', [
    {
      referenceId: 'VH-JAP-9988',
      destination: 'Japan Visa',
      passportNationality: 'Pakistan',
      travelMonth: 'April 2027',
      submittedAt: '2026-11-22T15:00:00.000Z',
    },
  ]);
  assert.ok(sessionRecord);
  assert.equal(sessionRecord.isDemoRecord, false);
  assert.equal(sessionRecord.currentStage, 'intake');

  const missing = await lookupVisaStatus('VH-ZZZ-9999');
  assert.equal(missing, null);
});

test('atlasMapData projects landmass polygons and Schengen/global destination pins accurately within the SVG viewBox', () => {
  const globalLand = getLandmassPaths('global');
  assert.ok(globalLand.length >= 10);
  assert.ok(globalLand.every((d) => d.startsWith('M') && d.endsWith('Z')));

  const globalPins = getAtlasPins('global');
  assert.equal(globalPins.length, 25);
  assert.ok(globalPins.some((p) => p.isoCode === 'SCH' && p.isSchengen));
  assert.ok(globalPins.some((p) => p.isoCode === 'THA' && p.to === '/visas/thailand'));
  assert.ok(globalPins.some((p) => p.isoCode === 'CAN' && p.to === '/visas/canada'));
  assert.ok(globalPins.some((p) => p.isoCode === 'EGY' && p.to === '/visas/egypt'));
  assert.ok(globalPins.some((p) => p.isoCode === 'NZL' && p.to === '/visas/new-zealand'));

  for (const pin of globalPins) {
    assert.ok(pin.x >= 0 && pin.x <= MAP_VIEWBOX_WIDTH, `${pin.isoCode} x out of bounds`);
    assert.ok(pin.y >= 0 && pin.y <= MAP_VIEWBOX_HEIGHT, `${pin.isoCode} y out of bounds`);
    assert.ok(pin.visaSummary.length > 5);
  }

  const schengenPins = getAtlasPins('schengen');
  assert.equal(schengenPins.length, 17);
  assert.ok(
    schengenPins.every(
      (p) => p.isSchengen && (p.to.startsWith('/visas/') || p.to === '/schengen-appointments'),
    ),
  );
  assert.ok(schengenPins.some((p) => p.isoCode === 'DEU' && p.to === '/visas/germany'));
  assert.ok(schengenPins.some((p) => p.isoCode === 'NOR' && p.to === '/visas/norway'));
  for (const pin of schengenPins) {
    assert.ok(pin.pctX > 5 && pin.pctX < 95, `${pin.isoCode} pctX too close to edge: ${pin.pctX}`);
    assert.ok(pin.pctY > 5 && pin.pctY < 95, `${pin.isoCode} pctY too close to edge: ${pin.pctY}`);
  }

  const hub = projectLonLat(PAKISTAN_HUB.lon, PAKISTAN_HUB.lat, 'global');
  const arc = buildFlightArcPath(hub, globalPins[0]);
  assert.ok(arc.startsWith('M') && arc.includes(' Q'));
});

test('visaFeeEstimator validates inputs, constructs Pakistani-applicant prompts, and parses Gemini JSON responses safely', () => {
  const missingDest = validateFeeEstimatorInput({ destination: '   ', visaType: 'tourist' });
  assert.equal(missingDest.valid, false);
  assert.ok(missingDest.error);

  const badChars = validateFeeEstimatorInput({ destination: '<script>', visaType: 'tourist' });
  assert.equal(badChars.valid, false);

  const valid = validateFeeEstimatorInput({
    destination: 'Japan',
    visaType: 'business',
    applicantCity: 'lahore',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.normalized?.visaTypeLabel, 'Business / Trade Visit');
  assert.equal(valid.normalized?.applicantCityLabel, 'Lahore / Punjab Desk');

  const prompt = buildVisaFeePrompt(valid.normalized!);
  assert.ok(prompt.includes('Pakistani passport holder'));
  assert.ok(prompt.includes('Japan'));
  assert.ok(prompt.includes('Business / Trade Visit'));

  const parsed = parseGeminiFeeEstimate(
    '```json\n' +
      JSON.stringify({
        approximateGovtFee: 'JPY 3,000 (Single Entry) / JPY 6,000 (Multiple Entry)',
        approximatePkrEquivalent: 'Approx. PKR 5,500 – PKR 11,500',
        serviceCentreFeeNote: 'Direct embassy / authorised drop-off handling charges apply.',
        standardProcessingWindow: '5–10 working days after submission',
        expressOrPriorityNote: 'No paid express lane; urgent cases require embassy justification.',
        validityAndStayHint: 'Up to 90 days validity; typically 15–30 days stay at mission discretion.',
        officialChannel: 'Embassy of Japan Islamabad / Consulate General Karachi',
        feeDrivers: ['Single vs multiple entry category', 'Exchange rate fluctuation'],
        advisoryNote: 'Approximate consular guidance only—confirm current circulars before applying.',
      }) +
      '\n```',
    {
      destination: 'Japan',
      visaTypeLabel: 'Business / Trade Visit',
      model: 'gemini-4-hydrogen',
      retrievedAt: '2026-11-23T00:00:00.000Z',
    },
  );

  assert.equal(parsed.destination, 'Japan');
  assert.equal(parsed.passportNationality, 'Pakistan');
  assert.ok(parsed.approximateGovtFee.includes('JPY 3,000'));
  assert.equal(parsed.feeDrivers.length, 2);

  assert.throws(() =>
    parseGeminiFeeEstimate('{"approximateGovtFee": "USD 100"}', {
      destination: 'USA',
      visaTypeLabel: 'Tourist / Leisure Visit',
      model: 'gemini-4-hydrogen',
    }),
  );
});

test('visaAlerts validation and subscribeToVisaAlerts handle malformed emails, missing topics, honeypots, and valid signups', async () => {
  const emptyEmail = validateAlertSignupInput({
    email: '   ',
    topics: ['schengen'],
  });
  assert.equal(emptyEmail.valid, false);
  assert.match(emptyEmail.emailError ?? '', /enter your email/i);

  const malformedEmail = validateAlertSignupInput({
    email: 'not-an-email',
    topics: ['schengen'],
  });
  assert.equal(malformedEmail.valid, false);
  assert.match(malformedEmail.emailError ?? '', /valid email/i);

  const missingTopics = validateAlertSignupInput({
    email: 'Applicant@Example.COM',
    topics: [],
  });
  assert.equal(missingTopics.valid, false);
  assert.match(missingTopics.topicsError ?? '', /at least one/i);

  const spamCheck = validateAlertSignupInput({
    email: 'bot@example.com',
    topics: ['schengen'],
    honeypot: 'https://bot.invalid',
  });
  assert.equal(spamCheck.isSpam, true);
  assert.equal(spamCheck.valid, false);

  const valid = validateAlertSignupInput({
    email: '  Traveller@Example.COM ',
    topics: ['schengen', 'east-asia', 'schengen'],
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.normalizedEmail, 'traveller@example.com');
  assert.deepEqual(valid.normalizedTopics, ['schengen', 'east-asia']);

  const summary = formatAlertTopicsSummary(['schengen', 'east-asia']);
  assert.ok(summary.includes('Schengen'));
  assert.ok(summary.includes('Japan'));

  await assert.rejects(
    () =>
      subscribeToVisaAlerts({
        email: 'bad-email',
        topics: ['schengen'],
        sourcePath: '/',
      }),
    /valid email/i,
  );

  const originalFetch = globalThis.fetch;
  // Simulate environment without fetch to test fallback confirmation
  // @ts-expect-error intentionally unsetting fetch for fallback test
  globalThis.fetch = undefined;
  const originalLog = console.log;
  const loggedCalls: unknown[][] = [];
  console.log = (...args: unknown[]) => {
    loggedCalls.push(args);
  };

  try {
    const res = await subscribeToVisaAlerts({
      email: 'Applicant@Example.com',
      topics: ['schengen', 'southeast-gulf'],
      sourcePath: '/schengen-appointments',
    });
    assert.equal(res.ok, true);
    assert.ok(res.subscriptionId.startsWith('ALR-'));
    assert.equal(res.email, 'applicant@example.com');
    assert.deepEqual(res.topics, ['schengen', 'southeast-gulf']);
    assert.equal(loggedCalls.length, 1);
    assert.equal(loggedCalls[0][0], '[Visahouse] subscribeToVisaAlerts:');
  } finally {
    globalThis.fetch = originalFetch;
    console.log = originalLog;
  }
});

test('PAKISTANI_VISA_FAQS covers timelines and document requirements with clean category filtering and zero forbidden guarantee claims', () => {
  assert.ok(PAKISTANI_VISA_FAQS.length >= 8);

  const allItems = filterVisaFaqs(PAKISTANI_VISA_FAQS, 'all');
  const timelineItems = filterVisaFaqs(PAKISTANI_VISA_FAQS, 'timelines');
  const documentItems = filterVisaFaqs(PAKISTANI_VISA_FAQS, 'documents');

  assert.equal(allItems.length, PAKISTANI_VISA_FAQS.length);
  assert.ok(timelineItems.length >= 3);
  assert.ok(documentItems.length >= 3);
  assert.equal(timelineItems.length + documentItems.length, allItems.length);
  assert.ok(timelineItems.every((item) => item.category === 'timelines'));
  assert.ok(documentItems.every((item) => item.category === 'documents'));

  const serialized = JSON.stringify(PAKISTANI_VISA_FAQS);
  assert.equal(/guaranteed visa|100% approval|lorem ipsum/i.test(serialized), false);
  assert.ok(serialized.includes('Pakistani'));
  assert.ok(serialized.includes('FBR') && serialized.includes('NADRA'));
});

test('VISA_SUCCESS_STORIES covers regional visa grants cleanly with zero guarantee promises', () => {
  assert.equal(VISA_SUCCESS_STORIES.length, 6);
  assert.equal(filterTestimonialsByRegion(VISA_SUCCESS_STORIES, 'all').length, 6);
  assert.equal(filterTestimonialsByRegion(VISA_SUCCESS_STORIES, 'schengen-west').length, 2);
  assert.equal(filterTestimonialsByRegion(VISA_SUCCESS_STORIES, 'east-asia').length, 2);
  assert.equal(filterTestimonialsByRegion(VISA_SUCCESS_STORIES, 'southeast-asia').length, 2);

  for (const story of VISA_SUCCESS_STORIES) {
    assert.ok(story.caseCode.startsWith('CASE · '));
    assert.equal(story.isoCode.length, 3);
    assert.ok(story.visaGranted.length > 5);
    assert.ok(story.quote.length > 40);
  }

  const serialized = JSON.stringify(VISA_SUCCESS_STORIES);
  assert.equal(/guaranteed visa|100% approval|lorem ipsum/i.test(serialized), false);
});

test('real-time visa status helpers build isolated server seeds, register new inquiries, and append live sync events cleanly', () => {
  const seeds = buildServerSeedRecords();
  assert.equal(seeds.length, 3);
  assert.ok(seeds.every((s) => s.updates.length >= 2 && Boolean(s.lastSyncedAt)));

  const registered = createRegisteredInquiryRecord({
    referenceId: 'vh-sch-5512',
    destination: 'Schengen Visa Appointment & Filing',
    passportNationality: 'Pakistan',
    travelMonth: 'May 2027',
    submittedAt: '2026-11-22T18:00:00.000Z',
  });
  assert.equal(registered.referenceId, 'VH-SCH-5512');
  assert.equal(registered.isoCode, 'SCH');
  assert.equal(registered.currentStage, 'intake');
  assert.equal(registered.updates.length, 1);

  const { updatedRecord, event } = appendLiveSyncUpdate(
    registered,
    '2026-11-22T18:05:30.000Z',
  );
  assert.equal(updatedRecord.updates.length, 2);
  assert.equal(updatedRecord.updates[0].id, event.id);
  assert.equal(updatedRecord.updates[0].isLiveBroadcast, true);
  assert.equal(updatedRecord.lastSyncedAt, '2026-11-22T18:05:30.000Z');
  // Original record remains untouched (immutable)
  assert.equal(registered.updates.length, 1);
});

test('generateChecklistPdfBytes produces a valid multi-page PDF 1.4 dossier tailored by country, travel purpose, and checked items', () => {
  const transitGermany = buildVisaChecklistDocument({
    destinationId: 'germany',
    visaTypeId: 'transit',
    nationalityId: 'pakistan',
  });
  assert.equal(transitGermany.destinationName, 'Germany');
  assert.equal(transitGermany.isoCode, 'DEU');
  assert.ok(transitGermany.groups.some((g) => g.groupTitle.includes('Onward Flight & Stopover')));
  assert.ok(transitGermany.visaTypeAdvisory?.includes('Airport Transit Visa'));

  const filename = buildChecklistPdfFilename(transitGermany);
  assert.equal(filename, 'visahouse-germany-transit-pakistani-passport-checklist.pdf');

  const firstTwoIds = new Set(
    transitGermany.groups
      .flatMap((g) => g.items)
      .slice(0, 2)
      .map((item) => item.id),
  );

  const bytes = generateChecklistPdfBytes(transitGermany, firstTwoIds);
  assert.ok(bytes instanceof Uint8Array);
  assert.ok(bytes.byteLength > 2500, 'Expected substantial multi-section PDF payload');

  const pdfText = new TextDecoder('latin1').decode(bytes);
  assert.ok(pdfText.startsWith('%PDF-1.4\n'), 'PDF must start with %PDF-1.4 header');
  assert.ok(pdfText.includes('\nxref\n'), 'PDF must include xref table');
  assert.ok(pdfText.includes('trailer\n'), 'PDF must include trailer dictionary');
  assert.ok(pdfText.includes('startxref\n'), 'PDF must include startxref offset');
  assert.ok(pdfText.trimEnd().endsWith('%%EOF'), 'PDF must terminate with %%EOF');
  assert.ok(pdfText.includes('Germany -- Transit / Airport Stopover'));
  assert.ok(pdfText.includes(`PREPARED PROGRESS: 2 of ${transitGermany.totalItems} Checked`));
  assert.ok(pdfText.includes('PAGE 1 OF'));
  assert.ok(pdfText.includes('VISAHOUSE'));
  assert.equal(sanitizePdfText('€30,000 — (Test)'), 'EUR 30,000 -- \\(Test\\)');
});

test('calculateVisaCost covers all 38 destinations, enforces exact line-item totals, applies companion savings, and formats clean summaries', () => {
  assert.equal(
    hasFeeScheduleForAllDestinations(DESTINATIONS),
    true,
    'Every destination in DESTINATIONS must have a dedicated fee schedule entry',
  );

  // Verify arithmetic invariants across all 38 destinations for Tourist single applicant
  for (const dest of DESTINATIONS) {
    const est = calculateVisaCost({
      destinationSlug: dest.slug,
      visaTypeId: 'tourist',
      applicants: 1,
    });
    assert.equal(est.destinationSlug, dest.slug);
    assert.equal(est.isoCode, dest.isoCode);
    assert.equal(
      est.grandTotalPkr,
      est.embassySubtotalPkr + est.centreSubtotalPkr + est.serviceSubtotalPkr + est.addOnsSubtotalPkr,
      `${dest.slug} grandTotalPkr must equal sum of all cost categories`,
    );
    const lineItemSum = est.lineItems.reduce((sum, item) => sum + item.subtotalPkr, 0);
    assert.equal(lineItemSum, est.grandTotalPkr, `${dest.slug} lineItems must sum to grandTotalPkr`);
    assert.ok(est.serviceSubtotalPkr >= 5500, `${dest.slug} service fee must be positive`);
    assert.equal(est.groupSavingsPkr, 0);

    // Ensure no forbidden guarantee promises
    const serialized = JSON.stringify(est);
    assert.equal(/guaranteed visa|100% approval/i.test(serialized), false);
  }

  // Verify applicant clamping
  assert.equal(clampApplicants(0), 1);
  assert.equal(clampApplicants(-5), 1);
  assert.equal(clampApplicants(25), 10);
  assert.equal(clampApplicants(Number.NaN), 1);

  // Verify USA Business 2 applicants + both add-ons
  const usaBusiness = calculateVisaCost({
    destinationSlug: 'usa',
    visaTypeId: 'business',
    applicants: 2,
    includeTravelInsurance: true,
    includeExpressAudit: true,
  });
  assert.equal(usaBusiness.isoCode, 'USA');
  assert.equal(usaBusiness.applicants, 2);
  assert.ok(usaBusiness.officialCurrencyNote.includes('USD 185'));
  assert.equal(usaBusiness.lineItems.length, 5);
  assert.ok(usaBusiness.groupSavingsPkr > 0, '2+ applicants must receive companion service discount');
  assert.equal(
    usaBusiness.addOnsSubtotalPkr,
    (CALCULATOR_ADDONS[0].pricePerApplicantPkr + CALCULATOR_ADDONS[1].pricePerApplicantPkr) * 2,
  );
  assert.equal(
    usaBusiness.grandTotalPkr,
    usaBusiness.embassySubtotalPkr +
      usaBusiness.centreSubtotalPkr +
      usaBusiness.serviceSubtotalPkr +
      usaBusiness.addOnsSubtotalPkr,
  );

  // Verify Student vs Tourist fee delta (UK Student £524 vs Visitor £127)
  const ukTourist = calculateVisaCost({ destinationSlug: 'uk', visaTypeId: 'tourist', applicants: 1 });
  const ukStudent = calculateVisaCost({ destinationSlug: 'uk', visaTypeId: 'student', applicants: 1 });
  assert.ok(ukTourist.officialCurrencyNote.includes('GBP 127'));
  assert.ok(ukStudent.officialCurrencyNote.includes('GBP 524'));
  assert.ok(ukStudent.embassyPerApplicantPkr > ukTourist.embassyPerApplicantPkr);
  assert.ok(ukStudent.serviceSubtotalPkr > ukTourist.serviceSubtotalPkr);
  assert.ok(ukTourist.notes.some((n) => /international FX conversion|4–5%/i.test(n)));

  const auTourist = calculateVisaCost({
    destinationSlug: 'australia',
    visaTypeId: 'tourist',
    applicants: 1,
  });
  assert.ok(auTourist.officialCurrencyNote.includes('AUD 200'));

  // Verify currency formatter & summary output
  assert.equal(formatCurrencyAmount(27800, 'PKR'), 'PKR 27,800');
  assert.equal(formatCurrencyAmount(27800, 'USD'), 'USD 100');

  const summary = formatCostEstimateSummary(usaBusiness, 'PKR');
  assert.ok(summary.includes('VISAHOUSE — VISA COST ESTIMATE (USA)'));
  assert.ok(summary.includes('Embassy / Government Visa Fee'));
  assert.ok(summary.includes('Visahouse Service Charge'));
  assert.ok(summary.includes(SITE_CONFIG.disclaimer));
});

test('computeVisaTimelineState maps idle preview and all 5 visa stages with accurate rail fill and stage-grouped updates', () => {
  assert.equal(TIMELINE_STAGE_META.length, 5);
  assert.deepEqual(
    TIMELINE_STAGE_META.map((s) => s.shortLabel),
    [
      'Application Received',
      'Document Audit',
      'Official Filing',
      'Embassy Processing',
      'Passport Dispatch',
    ],
  );

  // Idle preview state
  const preview = computeVisaTimelineState(null);
  assert.equal(preview.isPreview, true);
  assert.equal(preview.activeStageId, null);
  assert.equal(preview.connectorFillPercent, 0);
  assert.equal(preview.completionPercent, 0);
  assert.equal(preview.nodes.length, 5);
  assert.ok(preview.nodes.every((n) => n.state === 'preview'));

  // Stage 02 (Document Audit — VH-SCH-2088)
  const schengen = SAMPLE_VISA_STATUS_RECORDS.find((r) => r.referenceId === 'VH-SCH-2088')!;
  const schTimeline = computeVisaTimelineState(schengen);
  assert.equal(schTimeline.isPreview, false);
  assert.equal(schTimeline.activeStageId, 'audit');
  assert.equal(schTimeline.activeStageLabel, 'Document Audit');
  assert.equal(schTimeline.connectorFillPercent, 25);
  assert.equal(schTimeline.completionPercent, 40);
  assert.equal(schTimeline.nodes[0].state, 'done');
  assert.equal(schTimeline.nodes[1].state, 'current');
  assert.equal(schTimeline.nodes[2].state, 'upcoming');

  // Stage 04 (Embassy Processing — VH-THA-1042) + live sync update reflection
  const thailand = SAMPLE_VISA_STATUS_RECORDS.find((r) => r.referenceId === 'VH-THA-1042')!;
  const thaTimeline = computeVisaTimelineState(thailand);
  assert.equal(thaTimeline.activeStageId, 'embassy_review');
  assert.equal(thaTimeline.activeStageLabel, 'Embassy Processing');
  assert.equal(thaTimeline.connectorFillPercent, 75);
  assert.equal(thaTimeline.completionPercent, 80);
  const initialReviewUpdates = thaTimeline.nodes[3].stageUpdates.length;
  assert.ok(initialReviewUpdates >= 1);

  const { updatedRecord } = appendLiveSyncUpdate(thailand, '2026-11-23T09:30:00.000Z');
  const syncedTimeline = computeVisaTimelineState(updatedRecord);
  assert.equal(syncedTimeline.nodes[3].stageUpdates.length, initialReviewUpdates + 1);
  assert.equal(syncedTimeline.nodes[3].stageUpdates[0].isLiveBroadcast, true);

  // Stage 05 (Passport Dispatch — VH-JPN-3190)
  const japan = SAMPLE_VISA_STATUS_RECORDS.find((r) => r.referenceId === 'VH-JPN-3190')!;
  const jpnTimeline = computeVisaTimelineState(japan);
  assert.equal(jpnTimeline.activeStageId, 'ready');
  assert.equal(jpnTimeline.activeStageLabel, 'Passport Dispatch');
  assert.equal(jpnTimeline.connectorFillPercent, 100);
  assert.equal(jpnTimeline.completionPercent, 100);
  assert.equal(jpnTimeline.nodes.filter((n) => n.state === 'done').length, 4);
  assert.equal(jpnTimeline.nodes[4].state, 'current');
});

test('schengenSlotFeed initializes 8 top Schengen destinations, advances deterministically without mutation, filters cleanly, and avoids guarantee claims', () => {
  const initial = createInitialSchengenSlotFeed('2026-11-23T10:00:00.000Z');
  assert.equal(initial.entries.length, 8);
  assert.equal(initial.tickCount, 0);
  assert.equal(initial.events.length, 3);
  assert.ok(initial.entries.some((e) => e.id === 'france' && e.guideHref === '/visas/france'));
  assert.ok(initial.entries.some((e) => e.id === 'germany' && !e.cities.includes('lahore')));

  const initialSummary = summarizeSlotAvailability(initial.entries);
  assert.equal(initialSummary.total, 8);
  assert.equal(
    initialSummary.openCount + initialSummary.limitedCount + initialSummary.waitlistCount,
    8,
  );
  assert.ok(initialSummary.openCount >= 2);
  assert.ok(initialSummary.limitedCount >= 2);
  assert.ok(initialSummary.waitlistCount >= 1);
  assert.ok(initialSummary.totalEstimatedSlots > 0);

  // City filter: Lahore excludes Germany (Islamabad & Karachi consular jurisdiction only)
  const lahoreOnly = filterSchengenSlots(initial.entries, { city: 'lahore', status: 'all' });
  assert.equal(lahoreOnly.length, 7);
  assert.equal(lahoreOnly.some((e) => e.id === 'germany'), false);

  // Status filter: Open only
  const openOnly = filterSchengenSlots(initial.entries, { city: 'all', status: 'open' });
  assert.equal(openOnly.length, initialSummary.openCount);
  assert.ok(openOnly.every((e) => e.status === 'open' && e.estimatedSlots > 0));

  // Advance feed immutably and verify transitions + event prepending
  const snapshotItalyBefore = initial.entries.find((e) => e.id === 'italy')!.status;
  const tick1 = advanceSchengenSlotFeed(initial, '2026-11-23T10:00:05.000Z');
  assert.equal(initial.tickCount, 0, 'Original feed state must not be mutated');
  assert.equal(initial.entries.find((e) => e.id === 'italy')!.status, snapshotItalyBefore);

  assert.equal(tick1.tickCount, 1);
  assert.equal(tick1.lastPolledAt, '2026-11-23T10:00:05.000Z');
  assert.equal(tick1.entries.find((e) => e.id === 'italy')!.status, 'limited');
  assert.equal(tick1.entries.find((e) => e.id === 'italy')!.recentlyChanged, true);
  assert.equal(tick1.entries.find((e) => e.id === 'greece')!.status, 'waitlist');
  assert.equal(tick1.entries.find((e) => e.id === 'france')!.recentlyChanged, false);
  assert.equal(tick1.events[0].isoCode, 'ITA');

  // Multiple ticks cap event history at 8 and keep non-empty availability
  let state = tick1;
  for (let i = 2; i <= 10; i += 1) {
    state = advanceSchengenSlotFeed(state, `2026-11-23T10:00:${String(i * 5).padStart(2, '0')}.000Z`);
    assert.ok(state.events.length <= 8);
    const summary = summarizeSlotAvailability(state.entries);
    assert.equal(summary.total, 8);
    assert.ok(summary.openCount >= 1, 'Feed should maintain at least one open mission');
  }
  assert.equal(state.tickCount, 10);

  // Clock formatter & compliance
  assert.match(formatFeedClock('2026-11-23T10:05:09.000Z'), /^\d{2}:\d{2}:\d{2}$/);
  assert.equal(formatFeedClock('not-a-date'), '00:00:00');
  assert.equal(/guaranteed slot|guaranteed visa|100% approval/i.test(SCHENGEN_FEED_DISCLAIMER), false);
  assert.ok(/simulated/i.test(SCHENGEN_FEED_DISCLAIMER));
});

test('recommendTravelInsurance enforces Schengen €30,000 compliance, tailors worldwide/regional tiers, adds duration buffers, and surfaces underwriting notes cleanly', () => {
  assert.equal(ADVISOR_DESTINATIONS.length, 9);
  assert.equal(clampTripDurationDays(0), 1);
  assert.equal(clampTripDurationDays(500), 365);
  assert.equal(clampTripDurationDays(Number.NaN), 14);
  assert.equal(clampTravellerCount(0), 1);
  assert.equal(clampTravellerCount(99), 10);

  // 1. Default Schengen short-stay: Mandatory €30,000+ with +5d buffer
  const schengen = recommendTravelInsurance({
    destinationId: 'schengen',
    tripDays: 14,
    visaRequirementId: 'schengen-embassy',
    ageBandId: 'under-45',
    travellers: 1,
    includeZeroDeductible: true,
  });
  assert.equal(schengen.recommendedTierId, 'ins-schengen');
  assert.equal(schengen.complianceLevel, 'mandatory');
  assert.ok(schengen.minimumMedicalCeiling.includes('€30,000'));
  assert.equal(schengen.bufferDays, 5);
  assert.equal(schengen.recommendedPolicyDays, 19);
  assert.ok(schengen.certificateChecklist.some((c) => c.includes('Schengen States')));
  assert.ok(schengen.briefText.includes('VISAHOUSE — TRAVEL INSURANCE ADVISOR BRIEF (SCH)'));

  // 2. USA Student 120-day stay + Senior age band & Trip Cancellation
  const usaStudent = recommendTravelInsurance({
    destinationId: 'usa',
    tripDays: 120,
    visaRequirementId: 'student-long',
    ageBandId: '60-69',
    travellers: 2,
    includeTripCancellation: true,
    includeAdventureCover: true,
  });
  assert.equal(usaStudent.recommendedTierId, 'ins-worldwide');
  assert.ok(usaStudent.minimumMedicalCeiling.includes('USD 100,000'));
  assert.ok(usaStudent.underwritingNotes.some((n) => /90 consecutive days/i.test(n)));
  assert.ok(usaStudent.underwritingNotes.some((n) => /Student/i.test(n)));
  assert.ok(usaStudent.underwritingNotes.some((n) => /60\+/i.test(n)));
  assert.ok(usaStudent.underwritingNotes.some((n) => /3,000m/i.test(n)));
  assert.ok(usaStudent.underwritingNotes.some((n) => /2 travellers/i.test(n)));
  assert.ok(usaStudent.certificateChecklist.some((c) => /cancellation/i.test(c)));

  // 3. Regional Asia & Nepal trekking note
  const nepal = recommendTravelInsurance({
    destinationId: 'nepal-srilanka',
    tripDays: 10,
    visaRequirementId: 'tourist-short',
    ageBandId: 'under-45',
    travellers: 1,
  });
  assert.equal(nepal.recommendedTierId, 'ins-regional');
  assert.equal(nepal.complianceLevel, 'recommended');
  assert.ok(nepal.underwritingNotes.some((n) => /3,000m/i.test(n)));

  // 4. Canada long-stay family Super Visa escalates to mandatory
  const canadaSuperVisa = recommendTravelInsurance({
    destinationId: 'canada',
    tripDays: 180,
    visaRequirementId: 'family-senior',
    ageBandId: '70-plus',
    travellers: 2,
  });
  assert.equal(canadaSuperVisa.complianceLevel, 'mandatory');
  assert.equal(canadaSuperVisa.recommendedTierId, 'ins-worldwide');

  // 5. Honesty compliance: no guaranteed visa/approval claims
  assert.equal(/guaranteed visa|100% approval/i.test(schengen.briefText), false);
  assert.ok(schengen.premiumGuidance.includes(SITE_CONFIG.confirmFallback));
});

test('visaPhotoRequirements covers 4 embassy biometric standards, filters correct vs incorrect specimen plates, and formats studio specs cleanly', () => {
  assert.equal(VISA_PHOTO_STANDARDS.length, 4);
  assert.equal(VISA_PHOTO_EXAMPLES.length, 6);

  const correctOnly = filterPhotoExamples(VISA_PHOTO_EXAMPLES, 'correct');
  const incorrectOnly = filterPhotoExamples(VISA_PHOTO_EXAMPLES, 'incorrect');
  const allExamples = filterPhotoExamples(VISA_PHOTO_EXAMPLES, 'all');

  assert.equal(correctOnly.length, 2);
  assert.equal(incorrectOnly.length, 4);
  assert.equal(allExamples.length, 6);
  assert.ok(correctOnly.every((item) => item.isCorrect));
  assert.ok(incorrectOnly.every((item) => !item.isCorrect));

  const schengenStd = getPhotoStandardById('schengen-uk');
  assert.equal(schengenStd.dimensionsLabel, '35 × 45 mm');

  const usaStd = getPhotoStandardById('usa-digital');
  assert.ok(usaStd.dimensionsLabel.includes('2 × 2 in'));
  assert.ok(usaStd.digitalSpec.includes('600 × 600 px'));

  const specText = formatPhotoStudioSpecText(usaStd);
  assert.ok(specText.includes('VISAHOUSE — STUDIO PHOTO SPECIFICATION'));
  assert.ok(specText.includes('51 × 51 mm (2 × 2 in)'));
  assert.ok(specText.includes(SITE_CONFIG.disclaimer));
  assert.equal(/guaranteed visa|100% approval/i.test(specText), false);
});

test('travelReadinessGuide covers all 38 destinations with etiquette, power plugs, SIM cards, region/query filters, and clean field-card formatting', () => {
  assert.equal(TRAVEL_READINESS_ENTRIES.length, DESTINATIONS.length);
  assert.equal(
    hasTravelReadinessForAllDestinations(DESTINATIONS),
    true,
    'Every destination in DESTINATIONS must have a dedicated travel readiness entry',
  );

  for (const entry of TRAVEL_READINESS_ENTRIES) {
    assert.ok(entry.plugTypes.length >= 4, `${entry.slug} plugTypes missing`);
    assert.ok(entry.voltage.includes('V'), `${entry.slug} voltage missing`);
    assert.ok(entry.adapterNote.length > 20, `${entry.slug} adapterNote missing`);
    assert.ok(entry.simRecommendation.length > 25, `${entry.slug} simRecommendation missing`);
    assert.ok(entry.localEtiquette.length > 35, `${entry.slug} localEtiquette missing`);
    assert.ok(entry.currencyAndTransit.length > 25, `${entry.slug} currencyAndTransit missing`);
    assert.ok(entry.emergencyAndArrival.length > 20, `${entry.slug} emergencyAndArrival missing`);
    assert.equal(
      /guaranteed visa|100% approval|lorem ipsum/i.test(JSON.stringify(entry)),
      false,
      `${entry.slug} contains forbidden phrase`,
    );
  }

  // Spot-check domain accuracy across regions
  const japan = getTravelReadinessBySlug('japan');
  assert.equal(japan.isoCode, 'JPN');
  assert.ok(japan.voltage.includes('100V'));
  assert.ok(/Ubigi|SoftBank/i.test(japan.simRecommendation));

  const uk = getTravelReadinessBySlug('uk');
  assert.ok(uk.plugTypes.includes('Type G'));

  const kenya = getTravelReadinessBySlug('kenya');
  assert.ok(kenya.simRecommendation.includes('Safaricom'));

  const nz = getTravelReadinessBySlug('new-zealand');
  assert.ok(nz.plugTypes.includes('Type I'));

  // Region filter checks
  const africaEntries = filterTravelReadinessEntries(TRAVEL_READINESS_ENTRIES, {
    region: 'Africa',
  });
  assert.equal(africaEntries.length, 5);
  assert.ok(africaEntries.every((e) => e.region === 'Africa'));

  const oceaniaEntries = filterTravelReadinessEntries(TRAVEL_READINESS_ENTRIES, {
    region: 'Oceania',
  });
  assert.equal(oceaniaEntries.length, 2);

  // Search filter checks (by carrier, plug type, and ISO code)
  const safaricomMatch = filterTravelReadinessEntries(TRAVEL_READINESS_ENTRIES, {
    query: 'Safaricom',
  });
  assert.equal(safaricomMatch.length, 1);
  assert.equal(safaricomMatch[0].slug, 'kenya');

  const typeGMatches = filterTravelReadinessEntries(TRAVEL_READINESS_ENTRIES, {
    query: 'Type G',
  });
  assert.ok(typeGMatches.length >= 5);
  assert.ok(typeGMatches.some((e) => e.slug === 'uk'));
  assert.ok(typeGMatches.some((e) => e.slug === 'malaysia'));

  // Brief formatter check
  const brief = formatTravelReadinessBrief(japan);
  assert.ok(brief.includes('VISAHOUSE — TRAVEL READINESS FIELD CARD (JPN)'));
  assert.ok(brief.includes('01. LOCAL ETIQUETTE'));
  assert.ok(brief.includes('02. POWER PLUGS & VOLTAGE'));
  assert.ok(brief.includes('03. SIM CARD & CONNECTIVITY'));
  assert.ok(brief.includes('100V'));
});

test('printDocument helpers and print.css stylesheet configure clean single-page A4 printing for Document Checklist and Travel Readiness Guide', () => {
  assert.equal(buildPrintDocumentHeading('checklist', 'Japan'), 'Japan — Visa Document Checklist');
  assert.equal(
    buildPrintDocumentHeading('readiness', 'Japan'),
    'Japan — Travel Readiness Field Card',
  );
  assert.equal(
    buildPrintDocumentHeading('combined', 'Japan'),
    'Japan — Visa Document Checklist & Travel Readiness Brief',
  );
  assert.equal(buildPrintDocumentHeading('readiness'), 'Travel Readiness Guide');

  // Test attribute application and cleanup
  const attrs = new Map<string, string>();
  const mockRoot = {
    setAttribute: (name: string, value: string) => attrs.set(name, value),
    removeAttribute: (name: string) => attrs.delete(name),
  };

  const cleanupChecklist = applyPrintScopeAttributes(mockRoot, 'checklist');
  assert.equal(attrs.get('data-print-scope'), 'checklist');
  assert.equal(attrs.has('data-print-slug'), false);
  cleanupChecklist();
  assert.equal(attrs.size, 0);

  const cleanupRow = applyPrintScopeAttributes(mockRoot, 'readiness', 'japan');
  assert.equal(attrs.get('data-print-scope'), 'readiness');
  assert.equal(attrs.get('data-print-slug'), 'japan');
  cleanupRow();
  assert.equal(attrs.size, 0);

  const cleanupAll = applyPrintScopeAttributes(mockRoot, 'all');
  assert.equal(attrs.has('data-print-scope'), false);
  cleanupAll();

  // Verify print stylesheet rules & import wiring
  const indexCss = readFileSync(new URL('../index.css', import.meta.url), 'utf8');
  assert.ok(indexCss.includes('@import "./styles/print.css";'));

  const printCss = readFileSync(new URL('../styles/print.css', import.meta.url), 'utf8');
  assert.ok(printCss.includes('@page'));
  assert.ok(printCss.includes('size: A4 portrait'));
  assert.ok(printCss.includes('@media print'));
  assert.ok(printCss.includes('[data-print-document="true"]'));
  assert.ok(printCss.includes('data-print-scope="checklist"'));
  assert.ok(printCss.includes('data-print-scope="readiness"'));
  assert.ok(printCss.includes('.print-checklist-groups'));
  assert.ok(printCss.includes('.print-letterhead'));
});

test('i18n bilingual engine supports English (LTR) and Urdu (RTL) with complete 38-country coverage, key parity, and zero guarantee claims', async () => {
  assert.equal(LOCALE_STORAGE_KEY, 'visahouse_locale');
  assert.equal(normalizeLocale('en'), 'en');
  assert.equal(normalizeLocale('ur'), 'ur');
  assert.equal(normalizeLocale('UR-PK'), 'ur');
  assert.equal(normalizeLocale('urdu'), 'ur');
  assert.equal(normalizeLocale('fr'), 'en');
  assert.equal(normalizeLocale(null), 'en');
  assert.equal(normalizeLocale(undefined), 'en');

  const enMeta = getLocaleMetadata('en');
  const urMeta = getLocaleMetadata('ur');
  assert.equal(enMeta.dir, 'ltr');
  assert.equal(enMeta.htmlLang, 'en');
  assert.equal(urMeta.dir, 'rtl');
  assert.equal(urMeta.htmlLang, 'ur');
  assert.match(urMeta.nativeLabel, /[\u0600-\u06FF]/);

  // Every destination in DESTINATIONS + Schengen must have an authentic Urdu script name
  for (const dest of DESTINATIONS) {
    const urName = translateCountryName(dest.country, 'ur');
    assert.match(urName, /[\u0600-\u06FF]/, `Expected Urdu translation for ${dest.country}`);
    assert.equal(translateCountryName(dest.country, 'en'), dest.country);
  }
  assert.match(translateCountryName('Schengen Area', 'ur'), /[\u0600-\u06FF]/);

  // Regions, channels, and visa types
  for (const reg of ['All', ...REGIONS] as const) {
    assert.match(translateRegion(reg, 'ur'), /[\u0600-\u06FF]/, `Missing Urdu region: ${reg}`);
  }
  for (const ch of ['All', ...VISA_CHANNELS] as const) {
    assert.match(translateChannel(ch, 'ur'), /[\u0600-\u06FF]/, `Missing Urdu channel: ${ch}`);
  }
  for (const vt of ['tourist', 'business', 'student', 'family_visit', 'transit'] as const) {
    assert.match(translateVisaTypeLabel(vt, vt, 'ur'), /[\u0600-\u06FF]/);
  }

  // Dynamic Urdu translation bundle loader
  const loadedUr = await loadUrduTranslation();
  assert.deepEqual(loadedUr, UR_TRANSLATION);

  // Interpolation helper
  assert.equal(
    formatLocalizedCopy('View All {count} Countries', { count: 38 }),
    'View All 38 Countries',
  );
  assert.equal(
    formatLocalizedCopy(getTranslation('ur').pages.visasShownCount, { shown: 12, total: 38 }),
    '38 میں سے 12 ممالک',
  );

  // Deep key parity & non-empty strings across EN and UR bundles
  const collectKeys = (obj: unknown, prefix = ''): string[] => {
    if (Array.isArray(obj)) {
      return obj.flatMap((item, idx) => collectKeys(item, `${prefix}[${idx}]`));
    }
    if (obj && typeof obj === 'object') {
      return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
        collectKeys(v, prefix ? `${prefix}.${k}` : k),
      );
    }
    assert.equal(typeof obj, 'string', `Expected string at ${prefix}`);
    assert.ok((obj as string).trim().length > 0, `Empty translation string at ${prefix}`);
    return [prefix];
  };

  const enKeys = collectKeys(EN_TRANSLATION).sort();
  const urKeys = collectKeys(UR_TRANSLATION).sort();
  assert.deepEqual(urKeys, enKeys, 'English and Urdu translation bundles must share identical keys');

  // Honesty compliance across both locales (reject positive guarantee claims while allowing explicit "never claim guaranteed" disclaimers)
  const serializedAll = JSON.stringify({ en: EN_TRANSLATION, ur: UR_TRANSLATION });
  assert.equal(
    /we guarantee|guaranteed approval|100% approval|lorem ipsum|یقینی ویزا|سو فیصد منظوری/i.test(
      serializedAll,
    ),
    false,
  );
});

test('visaGlobeData maps all 38 destinations to valid 3D coordinates, ISO numeric IDs, spherical routes, and synced checklist IDs', () => {
  assert.equal(GLOBE_DESTINATIONS.length, DESTINATIONS.length);
  assert.equal(PAKISTAN_ORIGIN.numericId, '586');

  // Every destination in DESTINATIONS must map to a valid globe node and a real DocumentChecklistLibrary document
  for (const dest of DESTINATIONS) {
    const node = getGlobeDestinationBySlug(dest.slug);
    assert.ok(node, `Missing globe destination node for ${dest.slug}`);
    assert.ok(node.lon >= -180 && node.lon <= 180, `Invalid lon for ${dest.slug}`);
    assert.ok(node.lat >= -90 && node.lat <= 90, `Invalid lat for ${dest.slug}`);
    assert.ok(node.totalChecklistItems >= 6, `Expected full checklist items for ${dest.slug}`);
    assert.ok(node.coreChecklistItems >= 4, `Expected mandatory core items for ${dest.slug}`);

    const checklistDoc = buildVisaChecklistDocument({
      destinationId: node.checklistId,
      visaTypeId: 'tourist',
      nationalityId: 'pakistan',
    });
    assert.equal(checklistDoc.isoCode, dest.isoCode);
  }

  // Checklist ID <-> slug round-trip for Schengen and individual countries
  assert.equal(destinationSlugToChecklistId('schengen-states'), 'schengen');
  assert.equal(checklistIdToDestinationSlug('schengen'), 'schengen-states');
  assert.equal(getGlobeDestinationByChecklistId('schengen')?.slug, 'schengen-states');
  assert.equal(getGlobeDestinationByChecklistId('japan')?.isoCode, 'JPN');

  // ISO numeric resolution (both padded and unpadded, plus dedicated Italy/Spain/Turkey/Azerbaijan & secondary Schengen states)
  assert.equal(normalizeNumericCountryId(36), '036');
  assert.equal(resolveGlobeDestinationByNumericId(36)?.slug, 'australia');
  assert.equal(resolveGlobeDestinationByNumericId('392')?.slug, 'japan');
  assert.equal(resolveGlobeDestinationByNumericId('380')?.slug, 'italy');
  assert.equal(resolveGlobeDestinationByNumericId('724')?.slug, 'spain');
  assert.equal(resolveGlobeDestinationByNumericId('792')?.slug, 'turkey');
  assert.equal(resolveGlobeDestinationByNumericId('031')?.slug, 'azerbaijan');
  assert.equal(resolveGlobeDestinationByNumericId('203')?.slug, 'schengen-states');
  assert.equal(isCountryHighlightedOnGlobe('276'), true);
  assert.equal(isCountryHighlightedOnGlobe('999'), false);
  assert.equal(resolveGlobeDestinationByNumericId(undefined), null);

  // Spherical rotation & front-hemisphere visibility math
  const japanRot = computeRotationForCoordinates(138.25, 36.2);
  assert.deepEqual(japanRot, [-138.25, -36.2, 0]);
  assert.equal(isPointOnFrontHemisphere(138.25, 36.2, japanRot), true);
  assert.equal(isPointOnFrontHemisphere(-98.58, 39.83, japanRot), false);

  // Extreme polar latitude gets cleanly clamped
  assert.equal(computeRotationForCoordinates(0, 80)[1], -55);
  assert.equal(computeRotationForCoordinates(0, -80)[1], 55);

  // Great-circle arc starts at Pakistan and ends at destination
  const arc = buildGreatCircleArc([PAKISTAN_ORIGIN.lon, PAKISTAN_ORIGIN.lat], [138.25, 36.2], 20);
  assert.equal(arc.type, 'LineString');
  assert.equal(arc.coordinates.length, 21);
  assert.ok(Math.abs(arc.coordinates[0][0] - PAKISTAN_ORIGIN.lon) < 0.05);
  assert.ok(Math.abs(arc.coordinates[20][0] - 138.25) < 0.05);

  // Region camera presets cover All + every region
  assert.equal(REGION_CAMERA_PRESETS.length, REGIONS.length + 1);
  const europeNodes = filterGlobeDestinations('Europe & UK', 'All');
  assert.ok(europeNodes.length >= 16);
  const eVisaNodes = filterGlobeDestinations('All', 'e-Visa');
  assert.ok(eVisaNodes.length >= 5);

  // Hover-triggered tooltip summaries must expose primary visa type & processing time estimate for all 38 countries
  for (const node of GLOBE_DESTINATIONS) {
    const summary = buildGlobeHoverSummary(node);
    assert.ok(
      summary.primaryVisaType.length >= 6,
      `Missing primaryVisaType in hover summary for ${node.slug}`,
    );
    assert.ok(
      summary.processingEstimate.length >= 5,
      `Missing processingEstimate in hover summary for ${node.slug}`,
    );
    assert.equal(
      /guaranteed|100% approval/i.test(`${summary.primaryVisaType} ${summary.processingEstimate}`),
      false,
    );
  }

  const germanySummary = buildGlobeHoverSummary(getGlobeDestinationBySlug('germany')!);
  assert.match(germanySummary.primaryVisaType, /Schengen/i);
  assert.match(germanySummary.processingEstimate, /15–30/i);
  assert.equal(germanySummary.turnaroundSpeed, 'standard');
  assert.equal(germanySummary.region, 'Europe & UK');
  assert.ok(germanySummary.accentHex.startsWith('#'));

  const japanSummary = buildGlobeHoverSummary(getGlobeDestinationBySlug('japan')!);
  assert.match(japanSummary.primaryVisaType, /Temporary Visitor/i);
  assert.match(japanSummary.processingEstimate, /6–12 working days/i);
  assert.equal(japanSummary.turnaroundSpeed, 'standard');

  const sriLankaSummary = buildGlobeHoverSummary(getGlobeDestinationBySlug('sri-lanka')!);
  assert.equal(sriLankaSummary.turnaroundSpeed, 'fast');

  const usaSummary = buildGlobeHoverSummary(getGlobeDestinationBySlug('usa')!);
  assert.equal(usaSummary.turnaroundSpeed, 'extended');

  const canadaSummary = buildGlobeHoverSummary(getGlobeDestinationBySlug('canada')!);
  assert.equal(canadaSummary.turnaroundSpeed, 'extended');

  // Standalone turnaround speed classification checks
  assert.equal(classifyGlobeProcessingSpeed('2–4 working days'), 'fast');
  assert.equal(classifyGlobeProcessingSpeed('10–15 working days'), 'standard');
  assert.equal(classifyGlobeProcessingSpeed('4–10 weeks'), 'extended');
  assert.equal(classifyGlobeProcessingSpeed('Appointment wait varies; 5–15 days post-interview'), 'extended');

  // SVG-to-stage coordinate projection for keyboard focus tooltips
  const stagePt = projectSvgPointToStage(
    280,
    280,
    { left: 40, top: 20, width: 520, height: 520 },
    { left: 20, top: 10, width: 560, height: 540 },
    560,
  );
  assert.equal(stagePt.x, 280);
  assert.equal(stagePt.y, 270);
  assert.equal(stagePt.width, 560);

  // Tooltip edge-clamping prevents clipping on all 4 container edges
  const centerPos = computeGlobeTooltipPosition(220, 280, 560, 520, 272, 176);
  assert.equal(centerPos.placementX, 'right');
  assert.equal(centerPos.placementY, 'above');
  assert.ok(centerPos.left >= 12 && centerPos.left + 272 <= 560 - 12);
  assert.ok(centerPos.top >= 12 && centerPos.top + 176 <= 520 - 12);

  const rightEdgePos = computeGlobeTooltipPosition(520, 260, 560, 520, 272, 176);
  assert.equal(rightEdgePos.placementX, 'left');
  assert.ok(rightEdgePos.left >= 12 && rightEdgePos.left + 272 <= 560 - 12);

  const topEdgePos = computeGlobeTooltipPosition(180, 30, 560, 520, 272, 176);
  assert.equal(topEdgePos.placementY, 'below');
  assert.ok(topEdgePos.top >= 12 && topEdgePos.top + 176 <= 520 - 12);
});

test('worldVisaHub parses wait windows, ranks shortest-turnaround regions, filters entries, and recommends data-backed faster alternatives', () => {
  // Parsing working days, calendar days, weeks, and interview wait windows
  const sriLankaParsed = parseProcessingWindowToDays('2–4 working days');
  assert.equal(sriLankaParsed.appointmentDependent, false);
  assert.equal(sriLankaParsed.minCalendarDays, 3);
  assert.equal(sriLankaParsed.maxCalendarDays, 6);
  assert.equal(sriLankaParsed.medianCalendarDays, 5);

  const schengenParsed = parseProcessingWindowToDays('15–30 calendar days after biometrics');
  assert.equal(schengenParsed.minCalendarDays, 15);
  assert.equal(schengenParsed.maxCalendarDays, 30);
  assert.equal(schengenParsed.medianCalendarDays, 23);

  const canadaParsed = parseProcessingWindowToDays('4–10 weeks (IRCC processing times fluctuate)');
  assert.equal(canadaParsed.minCalendarDays, 28);
  assert.equal(canadaParsed.maxCalendarDays, 70);
  assert.equal(canadaParsed.medianCalendarDays, 49);

  const usaParsed = parseProcessingWindowToDays('Appointment wait varies; 5–15 working days post-interview');
  assert.equal(usaParsed.appointmentDependent, true);
  assert.ok(usaParsed.medianCalendarDays >= 60);

  // Tier classification boundaries
  assert.equal(classifyTurnaroundTier(6), 'express');
  assert.equal(classifyTurnaroundTier(18), 'moderate');
  assert.equal(classifyTurnaroundTier(49), 'extended');

  // Every destination is represented, sorted fastest-first, with zero guarantee claims
  assert.equal(WORLD_VISA_ENTRIES.length, DESTINATIONS.length);
  for (let i = 1; i < WORLD_VISA_ENTRIES.length; i += 1) {
    assert.ok(
      WORLD_VISA_ENTRIES[i - 1].medianCalendarDays <= WORLD_VISA_ENTRIES[i].medianCalendarDays,
      'WORLD_VISA_ENTRIES should be sorted ascending by medianCalendarDays',
    );
  }
  const serializedEntries = JSON.stringify(WORLD_VISA_ENTRIES);
  assert.equal(/guaranteed visa|100% approval|lorem ipsum/i.test(serializedEntries), false);

  // Regional ranking covers all 8 regions, ordered shortest to longest turnaround
  const summaries = buildRegionalWaitSummaries(WORLD_VISA_ENTRIES);
  assert.equal(summaries.length, REGIONS.length);
  assert.equal(summaries.length, REGIONAL_WAIT_SUMMARIES.length);
  for (let i = 1; i < summaries.length; i += 1) {
    assert.ok(
      summaries[i - 1].avgMedianDays <= summaries[i].avgMedianDays,
      'Regional summaries must be ranked shortest turnaround first',
    );
  }
  // Top 3 regions flagged as shortest turnaround; South Asia ranks ahead of Europe & UK and North America
  assert.equal(summaries.filter((r) => r.isShortestTurnaround).length, 3);
  const southAsiaRank = summaries.find((r) => r.region === 'South Asia')!.rank;
  const europeRank = summaries.find((r) => r.region === 'Europe & UK')!.rank;
  const northAmericaRank = summaries.find((r) => r.region === 'North America')!.rank;
  assert.ok(southAsiaRank < europeRank && europeRank < northAmericaRank);

  // Global overview metrics
  const overview = buildGlobalWaitOverview();
  assert.equal(overview.totalDestinations, DESTINATIONS.length);
  assert.equal(overview.totalRegions, REGIONS.length);
  assert.equal(overview.shortestRegion.rank, 1);
  assert.equal(overview.fastestDestination.slug, 'azerbaijan');
  assert.ok(overview.fastTrackCount >= 10);
  assert.ok(overview.globalAvgDays > overview.shortestRegion.avgMedianDays);

  // Faster alternatives recommender for high-wait benchmarks
  const canadaAlts = findFasterAlternatives('canada', 4);
  assert.equal(canadaAlts.target.slug, 'canada');
  assert.equal(canadaAlts.alternatives.length, 4);
  const altRegions = new Set(canadaAlts.alternatives.map((a) => a.destination.region));
  assert.ok(altRegions.size >= 3, 'Alternatives should span multiple distinct fast regions');
  for (const alt of canadaAlts.alternatives) {
    assert.notEqual(alt.destination.slug, 'canada');
    assert.ok(alt.daysSaved >= 35, `Expected large daysSaved vs Canada, got ${alt.daysSaved}`);
    assert.ok(alt.destination.medianCalendarDays < canadaAlts.target.medianCalendarDays);
  }

  const germanyAlts = findFasterAlternatives('germany', 4);
  assert.equal(germanyAlts.alternatives.length, 4);
  assert.ok(germanyAlts.alternatives.every((a) => a.daysSaved >= 10));

  // Filtering by turnaround window, region, and e-Visa channel
  const fastTrack = filterWorldVisaEntries({ turnaround: 'under_10' });
  assert.ok(fastTrack.length >= 10);
  assert.ok(fastTrack.every((e) => e.medianCalendarDays <= 11));

  const fastEVisas = filterWorldVisaEntries({ turnaround: 'under_10', eVisaOnly: true });
  assert.ok(fastEVisas.length >= 5);
  assert.ok(fastEVisas.every((e) => e.channel === 'e-Visa' && e.medianCalendarDays <= 11));

  const seaOnly = filterWorldVisaEntries({ region: 'Southeast Asia', turnaround: 'all' });
  assert.equal(seaOnly.length, 6);
  assert.ok(seaOnly.every((e) => e.region === 'Southeast Asia'));
});

test('quoteEmail validates recipient emails, strips header injection chars, escapes HTML, builds clean itemized quotes, and creates safe mailto URIs', () => {
  // Rejects empty & malformed emails
  const emptyCheck = validateQuoteEmailInput({ email: '   ' });
  assert.equal(emptyCheck.valid, false);
  assert.equal(emptyCheck.isSpam, false);
  assert.ok(emptyCheck.emailError);

  const badCheck = validateQuoteEmailInput({ email: 'not-an-email' });
  assert.equal(badCheck.valid, false);
  assert.ok(badCheck.emailError);

  // Rejects header-injection newline payloads in email
  const injectedEmail = validateQuoteEmailInput({
    email: 'traveler@example.com\r\nBcc: attacker@evil.test',
  });
  assert.equal(injectedEmail.valid, false);

  // Rejects overlong recipient name
  const longName = validateQuoteEmailInput({
    email: 'amina@example.com',
    recipientName: 'A'.repeat(85),
  });
  assert.equal(longName.valid, false);
  assert.ok(longName.nameError);

  // Flags honeypot spam submissions
  const spamCheck = validateQuoteEmailInput({
    email: 'bot@example.com',
    honeypot: 'http://spam.example',
  });
  assert.equal(spamCheck.isSpam, true);
  assert.equal(spamCheck.valid, false);

  // Normalizes valid email and strips control characters from recipient name
  const goodCheck = validateQuoteEmailInput({
    email: '  Amina.Tariq@Example.COM ',
    recipientName: 'Amina\r\nTariq',
  });
  assert.equal(goodCheck.valid, true);
  assert.equal(goodCheck.normalizedEmail, 'amina.tariq@example.com');
  assert.equal(goodCheck.normalizedName, 'Amina Tariq');
  assert.equal(stripControlChars('Line1\r\nLine2\tTab'), 'Line1 Line2 Tab');

  // Escapes HTML entities safely
  assert.equal(
    escapeHtml('<script>alert("x")</script> & \'test\''),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;test&#39;',
  );

  // Builds itemized quote email content for Japan Business (2 applicants + insurance)
  const estimate = calculateVisaCost({
    destinationSlug: 'japan',
    visaTypeId: 'business',
    applicants: 2,
    includeTravelInsurance: true,
    includeExpressAudit: false,
  });
  const refId = createQuoteReferenceId(1795385401234);
  assert.match(refId, /^QTE-\d{5}$/);

  const content = buildQuoteEmailContent(estimate, 'PKR', {
    quoteId: refId,
    recipientName: 'Amina <script>',
    createdAt: '2026-11-23T11:00:00.000Z',
  });

  assert.equal(/[\r\n]/.test(content.subject), false, 'Subject must never contain CR/LF');
  assert.ok(content.subject.includes(refId));
  assert.ok(content.subject.includes('Japan'));
  assert.ok(content.textBody.includes(`QUOTE REFERENCE: ${refId}`));
  assert.ok(content.textBody.includes('Companion Service Savings Applied'));
  assert.ok(content.textBody.includes(SITE_CONFIG.disclaimer));
  assert.equal(/guaranteed visa|100% approval/i.test(content.textBody), false);
  assert.equal(content.htmlBody.includes('<script>'), false, 'HTML body must escape recipient name');
  assert.ok(content.htmlBody.includes('&lt;script&gt;'));

  // Builds safe mailto URI and rejects invalid email schemes
  const safeHref = buildSafeMailtoHref('amina@example.com', content.subject, content.textBody);
  assert.ok(safeHref.startsWith('mailto:amina%40example.com?subject='));
  assert.ok(safeHref.includes('&body='));
  assert.equal(buildSafeMailtoHref('javascript:alert(1)', 'hi', 'body'), '#');
});

test('countryArtwork covers all 38 destinations plus Travel Insurance (INS) with dedicated hand-drawn archival illustrations on disk', () => {
  assert.equal(
    hasCountryArtworkForAllDestinations(DESTINATIONS),
    true,
    'Every destination in DESTINATIONS must have a dedicated landmark artwork entry',
  );
  assert.equal(
    hasCountryIllustrationsForAllDestinations(DESTINATIONS),
    true,
    'Every destination in DESTINATIONS must reference a generated archival illustration',
  );
  assert.ok(getCountryArtworkMeta('INS')?.motif.includes('shield'));
  assert.ok(getCountryArtworkMeta('fra')?.motif.includes('Eiffel'));
  assert.ok(getCountryArtworkMeta('JPN')?.motif.includes('torii'));
  assert.ok(getCountryIllustrationSrc('CAN')?.includes('stamp_canada_'));
  assert.ok(getCountryIllustrationSrc('GBR')?.includes('stamp_uk_'));
  assert.ok(getCountryIllustrationSrc('AUS')?.includes('stamp_australia_'));
  assert.ok(getCountryIllustrationSrc('DEU')?.includes('stamp_germany_'));

  const entries = Object.values(COUNTRY_ARTWORK_META);
  assert.equal(entries.length, DESTINATIONS.length + 1);

  const uniquePaths = new Set<string>();
  for (const entry of entries) {
    assert.ok(
      entry.imageSrc.startsWith('/src/assets/images/stamp_') && entry.imageSrc.endsWith('.avif'),
      `Invalid illustration path for ${entry.code}: ${entry.imageSrc}`,
    );
    uniquePaths.add(entry.imageSrc);
    const diskUrl = new URL(`../..${entry.imageSrc}`, import.meta.url);
    assert.equal(
      existsSync(diskUrl),
      true,
      `Generated illustration file missing on disk for ${entry.code}: ${entry.imageSrc}`,
    );
  }
  assert.equal(uniquePaths.size, entries.length, 'Every country card must have its own unique illustration file');
});










