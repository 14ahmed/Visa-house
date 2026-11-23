import { useEffect, useId, useState, type FormEvent } from 'react';
import { Bell, Check, Loader2, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { subscribeToVisaAlerts } from '../services/alertsService';
import {
  formatAlertTopicsSummary,
  readRememberedAlertSubscription,
  RECENT_POLICY_DISPATCHES,
  validateAlertSignupInput,
  VISA_ALERT_TOPICS,
  type VisaAlertTopicId,
} from '../utils/visaAlerts';

interface VisaNewsAlertsProps {
  sectionNumber?: string;
  heading?: string;
  subcopy?: string;
  defaultTopics?: VisaAlertTopicId[];
  sourcePath?: string;
}

/**
 * Editorial 'Visa News & Alerts' signup section collecting email addresses
 * and destination feeds for Schengen and key outbound policy changes.
 */
export function VisaNewsAlerts({
  sectionNumber,
  heading,
  subcopy,
  defaultTopics = ['schengen', 'southeast-gulf'],
  sourcePath = '/',
}: VisaNewsAlertsProps) {
  const { t, isUrdu } = useLanguage();
  const resolvedSectionNumber = sectionNumber ?? t.home.no10AlertsEyebrow;
  const resolvedHeading = heading ?? t.alerts.heading;
  const resolvedSubcopy = subcopy ?? t.alerts.subcopy;
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<VisaAlertTopicId[]>(defaultTopics);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [topicsError, setTopicsError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{
    subscriptionId: string;
    email: string;
    topics: VisaAlertTopicId[];
    message: string;
  } | null>(null);

  const emailInputId = useId();
  const honeypotId = useId();

  useEffect(() => {
    const saved = readRememberedAlertSubscription();
    if (saved) {
      setEmail(saved.email);
      setSelectedTopics(saved.topics);
    }
  }, []);

  const toggleTopic = (topicId: VisaAlertTopicId) => {
    setTopicsError(null);
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId],
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const check = validateAlertSignupInput({
      email,
      topics: selectedTopics,
      honeypot,
    });

    if (check.isSpam) {
      setConfirmed({
        subscriptionId: 'ALR-RECEIVED',
        email: email.trim(),
        topics: selectedTopics,
        message: 'Alert subscription recorded.',
      });
      return;
    }

    setEmailError(check.emailError ?? null);
    setTopicsError(check.topicsError ?? null);

    if (!check.valid) {
      return;
    }

    setSubmitting(true);
    try {
      const result = await subscribeToVisaAlerts({
        email,
        topics: selectedTopics,
        sourcePath,
        honeypot,
      });
      setConfirmed({
        subscriptionId: result.subscriptionId,
        email: result.email,
        topics: result.topics,
        message: result.message,
      });
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Unable to save your subscription right now. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="visa-alerts"
      aria-labelledby="visa-alerts-heading"
      className="bg-slip border border-ink/80 rounded-[3px] p-5 sm:p-8 lg:p-10 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Signup Controls & Topic Selector */}
        <div className="lg:col-span-7">
          <p className="mono-label text-visa-green">{resolvedSectionNumber}</p>
          <h2
            id="visa-alerts-heading"
            className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5 text-balance"
          >
            {resolvedHeading}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-body leading-relaxed max-w-2xl">
            {resolvedSubcopy}
          </p>

          {confirmed ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 bg-paper border border-visa-green/60 rounded-[3px] p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-[2px] bg-visa-green text-slip flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="mono-label text-visa-green">
                    Alert Dispatch Active · <span className="font-latin-mono">{confirmed.subscriptionId}</span>
                  </p>
                  <h3 className="font-display text-xl font-medium text-ink mt-1">
                    {confirmed.email}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-body leading-relaxed">
                    {confirmed.message}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-rule text-xs font-mono text-ink-muted">
                {t.alerts.activeFeedsLabel}{' '}
                <span className="text-ink">
                  {formatAlertTopicsSummary(confirmed.topics) || 'General Policy Briefs'}
                </span>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className={`min-h-[40px] px-4 py-2 border border-ink/60 bg-slip text-ink hover:border-visa-green hover:text-visa-green text-xs rounded-[2px] transition-colors cursor-pointer whitespace-nowrap ${
                    isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                  }`}
                >
                  {t.alerts.updateFeedsBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={honeypotId}>Company Website</label>
                <input
                  id={honeypotId}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Topic Selection Grid */}
              <fieldset>
                <legend className="mono-label text-ink mb-2.5">{t.alerts.step1Topics}</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VISA_ALERT_TOPICS.map((topic) => {
                    const checked = selectedTopics.includes(topic.id);
                    return (
                      <label
                        key={topic.id}
                        className={`flex items-start gap-3 p-3.5 rounded-[2px] border cursor-pointer transition-colors ${
                          checked
                            ? 'bg-paper border-visa-green'
                            : 'bg-paper/60 border-rule hover:border-ink/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="alertTopics"
                          value={topic.id}
                          checked={checked}
                          onChange={() => toggleTopic(topic.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-visa-green rounded-[2px] cursor-pointer"
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink">
                            {topic.title}
                          </span>
                          <span className="block mt-0.5 text-xs text-ink-muted leading-relaxed">
                            {topic.scope}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {topicsError && (
                  <p role="alert" className="mt-2 text-xs text-stamp-red font-medium">
                    {topicsError}
                  </p>
                )}
              </fieldset>

              {/* Email Input + Submit Row */}
              <div className="bg-paper border border-rule rounded-[3px] p-4">
                <label htmlFor={emailInputId} className="block mono-label text-ink mb-2">
                  {t.alerts.step2Email}
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <div className="relative flex-1 min-w-0">
                    <Mail
                      className="h-4 w-4 text-ink-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id={emailInputId}
                      name="alertEmail"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(null);
                      }}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(emailError)}
                      className="w-full min-h-[44px] ps-10 pe-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark disabled:opacity-65 disabled:cursor-not-allowed text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
                        <span>{t.alerts.subscribingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{t.alerts.subscribeBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {emailError && (
                  <p role="alert" className="mt-2 text-xs text-stamp-red font-medium">
                    {emailError}
                  </p>
                )}
                {serverError && (
                  <p role="alert" className="mt-2 text-xs text-stamp-red font-medium">
                    {serverError}
                  </p>
                )}

                <p className="mt-2.5 text-xs text-ink-muted leading-relaxed">
                  {t.alerts.privacyNote}
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Right: Recent Policy Briefings Dispatch Board */}
        <aside className="lg:col-span-5 bg-paper border border-rule rounded-[3px] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-ink/30">
            <span className="mono-label text-ink">{t.alerts.policyWatchTitle}</span>
            <span className="text-xs font-mono text-ink-muted">{t.alerts.verifiedBriefs}</span>
          </div>

          <ul className="divide-y divide-rule mt-1">
            {RECENT_POLICY_DISPATCHES.map((note) => (
              <li key={note.code} className="py-4 first:pt-3 last:pb-1">
                <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                  <span className="font-latin-mono text-visa-green font-semibold">{note.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.region}</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink mt-1">
                  {note.headline}
                </h3>
                <p className="mt-1 text-sm text-ink-body leading-relaxed">{note.summary}</p>
              </li>
            ))}
          </ul>

          <p className="mt-4 pt-3 border-t border-rule text-xs text-ink-muted leading-relaxed">
            {t.common.disclaimer}
          </p>
        </aside>
      </div>
    </section>
  );
}
