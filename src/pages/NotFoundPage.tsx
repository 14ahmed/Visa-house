import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { RubberStamp } from '../components/RubberStamp';
import { SeoHead } from '../components/SeoHead';
import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';

export function NotFoundPage() {
  const count = DESTINATIONS.length;
  return (
    <Layout whatsappContext="finding a visa page" applyHref="/contact#apply">
      <SeoHead
        title="Page Not Found (404) | Visahouse"
        description={`The visa page or route you requested could not be found. Browse all ${count} visa guides, Schengen appointments, or travel insurance.`}
        path="/404"
        noindex
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
        <div className="bg-slip border border-ink/80 rounded-[3px] p-8 sm:p-12">
          <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-rule">
            <div>
              <p className="mono-label text-stamp-red">Error 404 · Unstamped Page</p>
              <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink mt-2">
                This passport page is blank.
              </h1>
            </div>
            <RubberStamp
              label="NO ENTRY · 404"
              sublabel="ROUTE NOT FOUND"
              color="#B93222"
              rotation={-5}
              variant="rect"
            />
          </div>

          <p className="mt-6 text-base text-ink-body leading-relaxed max-w-xl">
            The destination guide or link you followed does not exist or may have moved. Choose a
            verified destination below or head back to our main index.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark whitespace-nowrap"
            >
              <span>Return to Home</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/visas"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 border border-ink/80 text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep whitespace-nowrap"
            >
              Browse All {count} Visas
            </Link>
            <Link
              to="/schengen-appointments"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 border border-rule text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep whitespace-nowrap"
            >
              Schengen Appointments
            </Link>
            <Link
              to="/travel-insurance"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 border border-rule text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep whitespace-nowrap"
            >
              Travel Insurance
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
