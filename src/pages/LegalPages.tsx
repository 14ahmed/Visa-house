import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';
import { buildWebPageSchema, type BreadcrumbItem } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Layout } from '../components/Layout';
import { SeoHead } from '../components/SeoHead';

export function PrivacyPage() {
  const path = '/privacy';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path },
  ];

  return (
    <Layout whatsappContext="privacy inquiry" applyHref="/contact#apply">
      <SeoHead
        title="Privacy Policy | Visahouse"
        description="How Visahouse collects, handles, stores, and deletes passport scans and personal inquiry data submitted by visa applicants."
        path={path}
        breadcrumbs={breadcrumbs}
        schemas={[
          buildWebPageSchema({
            name: 'Privacy Policy | Visahouse',
            description:
              'How Visahouse collects, handles, stores, and deletes passport scans and personal inquiry data submitted by visa applicants.',
            path,
            hasBreadcrumb: true,
          }),
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
        <Breadcrumbs items={breadcrumbs} />
        <p className="mono-label text-ink-muted">Legal Record · Document Handling</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink mt-2">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm font-mono text-ink-muted">
          Entity: {SITE_CONFIG.brandName} ({SITE_CONFIG.domain}) · Contact: {SITE_CONFIG.email} · Last Updated: {SITE_CONFIG.legal.legalLastUpdated}
        </p>
        <p className="mt-2 text-xs text-ink-muted leading-relaxed">
          {SITE_CONFIG.legal.operatorDisclosure} · {SITE_CONFIG.legal.serviceCities}
        </p>

        <div className="mt-8 pt-8 border-t border-ink/70 space-y-6 text-[15px] text-ink-body leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you submit an inquiry form or communicate with {SITE_CONFIG.brandName} over
              WhatsApp or email, we collect only the contact and travel details you choose to share
              (such as your name, WhatsApp number, destination country, passport nationality, and
              planned travel month). If you formally engage us to prepare a visa file or insurance
              quote, you may share supporting documents such as passport bio scans, bank statements,
              CNIC/FRC copies, FBR tax returns, and employment records strictly for preparing your
              application.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              2. How Your Documents Are Used
            </h2>
            <p>
              Applicant records are used solely to audit your visa dossier, draft official
              application forms, guide submissions through authorised portals or visa centres, and
              obtain travel insurance quotes from licensed insurers when requested. We never sell,
              rent, or share personal or financial records with marketing brokers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              3. Third-Party Portals &amp; Government Submissions
            </h2>
            <p>
              Submitting a visa or insurance application necessarily transmits required personal
              details to the relevant foreign embassy, immigration e-Visa portal, authorised visa
              centre (such as VFS Global or BLS International), or licensed insurance underwriter.
              Those institutions govern submitted data under their own legal privacy frameworks.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              4. Document Retention &amp; Deletion Requests
            </h2>
            <p>
              {SITE_CONFIG.legal.documentRetentionSummary} You may also request immediate deletion
              of passport scans, bank statements, tax filings, or inquiry messages held by{' '}
              {SITE_CONFIG.brandName} at any time by emailing{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-visa-green underline">
                {SITE_CONFIG.email}
              </a>{' '}
              from your registered contact address.
            </p>
          </section>

          <section className="pt-6 border-t border-rule flex flex-wrap gap-6 text-sm">
            <Link to="/terms" className="text-visa-green hover:underline underline-offset-4">
              Read Terms of Service →
            </Link>
            <Link to="/contact" className="text-ink hover:text-visa-green hover:underline underline-offset-4">
              Contact Privacy Desk →
            </Link>
            <Link to="/visas" className="text-ink hover:text-visa-green hover:underline underline-offset-4">
              All Destinations →
            </Link>
          </section>
        </div>
      </article>
    </Layout>
  );
}

export function TermsPage() {
  const path = '/terms';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Terms of Service', path },
  ];

  return (
    <Layout whatsappContext="terms of service inquiry" applyHref="/contact#apply">
      <SeoHead
        title="Terms of Service | Visahouse"
        description="Consultancy scope, non-government disclaimer, fee transparency, and applicant responsibilities when using Visahouse services."
        path={path}
        breadcrumbs={breadcrumbs}
        schemas={[
          buildWebPageSchema({
            name: 'Terms of Service | Visahouse',
            description:
              'Consultancy scope, non-government disclaimer, fee transparency, and applicant responsibilities when using Visahouse services.',
            path,
            hasBreadcrumb: true,
          }),
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
        <Breadcrumbs items={breadcrumbs} />
        <p className="mono-label text-ink-muted">Legal Record · Engagement Terms</p>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink mt-2">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm font-mono text-ink-muted">
          Entity: {SITE_CONFIG.brandName} ({SITE_CONFIG.domain}) · Last Updated: {SITE_CONFIG.legal.legalLastUpdated}
        </p>
        <p className="mt-2 text-xs text-ink-muted leading-relaxed">
          {SITE_CONFIG.legal.operatorDisclosure} · {SITE_CONFIG.legal.serviceCities}
        </p>

        <div className="mt-8 pt-8 border-t border-ink/70 space-y-6 text-[15px] text-ink-body leading-relaxed">
          <div className="p-4 bg-slip border border-ink/60 text-sm text-ink font-medium">
            {SITE_CONFIG.disclaimer}
          </div>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              1. Nature of Services &amp; Scope of Practice
            </h2>
            <p>
              {SITE_CONFIG.brandName} provides private administrative visitor, tourist, and business
              visa consultancy: document auditing, application form preparation, itinerary checks,
              official-channel appointment guidance, and travel insurance quote coordination. We do
              not issue visas, do not influence consular officers, and never guarantee visa
              approvals, specific processing durations, or embassy appointment dates.
            </p>
            <p className="mt-2.5 text-sm text-ink-muted">
              <strong>Regulated Jurisdiction Boundary:</strong> We do not act as licensed legal
              counsel or regulated immigration representatives for asylum claims, tribunal appeals,
              or permanent residency petitions under CICC/RCIC (Canada), MARA (Australia), IAA/OISC
              (UK), or U.S. immigration attorneys.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              2. Accuracy of Applicant Information
            </h2>
            <p>
              Applicants are solely responsible for the truthfulness and authenticity of every
              passport, bank statement, tax record, employment letter, and personal history answer
              supplied to our desk. We decline any request involving altered or fabricated papers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              3. Official Fees, Consultancy Charges &amp; Refund Policy
            </h2>
            <p>
              Government visa fees, authorised visa-centre service charges, courier charges, and
              insurance underwriter premiums are determined by third-party authorities and are
              strictly non-refundable once lodged, regardless of visa outcome. Consultancy service
              fees are confirmed in writing prior to work commencement.
            </p>
            <ul className="mt-3 list-disc ps-5 space-y-1.5 text-sm">
              <li>
                <strong>Before document audit begins:</strong> 100% of paid consultancy service fee
                is refundable upon written cancellation.
              </li>
              <li>
                <strong>After audit / before form drafting or portal upload:</strong> Partial refund
                minus completed file-review work.
              </li>
              <li>
                <strong>After application drafting or submission:</strong> Consultancy service fee is
                earned and non-refundable, regardless of consular decision.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              4. Official Payment &amp; Anti-Fraud Notice
            </h2>
            <p>{SITE_CONFIG.legal.paymentSafetyNotice}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-ink mb-2">
              5. Travel Bookings &amp; Policy Changes
            </h2>
            <p>
              Immigration regulations, entry cards, and fee circulars can change without notice. We
              advise applicants not to purchase non-refundable airline tickets or hotel stays until
              their visa decision has been issued.
            </p>
          </section>

          <section className="pt-6 border-t border-rule flex flex-wrap gap-6 text-sm">
            <Link to="/privacy" className="text-visa-green hover:underline underline-offset-4">
              Read Privacy Policy →
            </Link>
            <Link to="/about" className="text-ink hover:text-visa-green hover:underline underline-offset-4">
              About Visahouse →
            </Link>
            <Link to="/contact" className="text-ink hover:text-visa-green hover:underline underline-offset-4">
              Contact Our Desk →
            </Link>
          </section>
        </div>
      </article>
    </Layout>
  );
}
