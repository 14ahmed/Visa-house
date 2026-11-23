import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, Send, X, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';

interface WhatsAppWidgetProps {
  whatsappContext: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

interface QuickMessageItem {
  id: string;
  label: string;
  sublabel: string;
  message: string;
}

export function WhatsAppWidget({
  whatsappContext,
  open,
  onToggle,
  onClose,
}: WhatsAppWidgetProps) {
  const location = useLocation();
  const { t, isUrdu } = useLanguage();
  const [customMessage, setCustomMessage] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close panel on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Close panel on Escape or outside click
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-whatsapp-trigger="true"]')) return;
      if (containerRef.current && !containerRef.current.contains(target as Node)) {
        onClose();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const contextLabel =
    whatsappContext && whatsappContext !== 'visa assistance'
      ? whatsappContext
      : isUrdu
        ? 'ویزا معلومات اور فیس'
        : 'Visa Requirements & Fees';

  const quickMessages: QuickMessageItem[] = isUrdu
    ? [
        {
          id: 'context',
          label: `${contextLabel} کی تفصیلات پوچھیں`,
          sublabel: 'مکمل دستاویزات اور موجودہ PKR فیس',
          message: `السلام علیکم ویزا ہاؤس، میرے پاس پاکستانی پاسپورٹ ہے اور مجھے ${contextLabel} کے لیے دستاویزات اور موجودہ فیس کی معلومات درکار ہیں۔`,
        },
        {
          id: 'documents',
          label: 'دستاویزات اور بینک اسٹیٹمنٹ چیک کروائیں',
          sublabel: 'اپنے پروفائل کے مطابق چیک لسٹ حاصل کریں',
          message:
            'السلام علیکم ویزا ہاؤس، میں پاکستان سے ویزا درخواست کے لیے درکار دستاویزات اور بینک اسٹیٹمنٹ کی تفصیل معلوم کرنا چاہتا/چاہتی ہوں۔',
        },
        {
          id: 'schengen',
          label: 'شینگن / VFS / BLS اپائنٹمنٹ رہنمائی',
          sublabel: 'فائل تیاری اور اپائنٹمنٹ کا طریقہ کار',
          message:
            'السلام علیکم ویزا ہاؤس، مجھے پاکستان سے شینگن ویزا فائل تیاری اور VFS/BLS اپائنٹمنٹ کے لیے رہنمائی درکار ہے۔',
        },
        {
          id: 'insurance',
          label: 'ٹریول انشورنس کوٹ (€30,000 / ورلڈ وائیڈ)',
          sublabel: 'سفارتخانے کے معیار کے مطابق پالیسی',
          message:
            'السلام علیکم ویزا ہاؤس، برائے مہربانی میرے سفر کے لیے شینگن (€30,000) یا ورلڈ وائیڈ ٹریول انشورنس کا ریٹ بتا دیں۔',
        },
        {
          id: 'status',
          label: 'اپنی درخواست کا اسٹیٹس معلوم کریں',
          sublabel: 'موجودہ فائل پر اپ ڈیٹ لیں',
          message:
            'السلام علیکم ویزا ہاؤس، میں اپنی جاری ویزا فائل / درخواست کے اسٹیٹس کے بارے میں اپ ڈیٹ لینا چاہتا/چاہتی ہوں۔',
        },
      ]
    : [
        {
          id: 'context',
          label: `Ask about ${contextLabel}`,
          sublabel: 'Required documents & current PKR fee estimate',
          message: `Assalam-o-Alaikum Visahouse, I hold a Pakistani passport and need complete details, documents, and current fees for ${whatsappContext}.`,
        },
        {
          id: 'documents',
          label: 'Check documents & bank statement',
          sublabel: 'Get a checklist tailored to your profile',
          message:
            'Assalam-o-Alaikum Visahouse, I want to check the required documents and bank statement balance for my visa application from Pakistan.',
        },
        {
          id: 'schengen',
          label: 'Schengen / VFS / BLS appointment help',
          sublabel: 'File preparation & appointment guidance',
          message:
            'Assalam-o-Alaikum Visahouse, I need help with Schengen visa file preparation and VFS/BLS appointment guidance in Pakistan.',
        },
        {
          id: 'insurance',
          label: 'Travel insurance quote (€30,000 / Worldwide)',
          sublabel: 'Embassy-compliant medical coverage',
          message:
            'Assalam-o-Alaikum Visahouse, please share a travel insurance quote (Schengen €30,000 / Worldwide) for my upcoming trip from Pakistan.',
        },
        {
          id: 'status',
          label: 'Check my application status',
          sublabel: 'Follow up on an existing Visahouse file',
          message:
            'Assalam-o-Alaikum Visahouse, I would like an update on my ongoing visa file / application.',
        },
      ];

  const handleCustomSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = customMessage.trim();
    const url = buildWhatsAppUrl(whatsappContext, trimmed || undefined);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setCustomMessage('');
  };

  return (
    <div ref={containerRef} className="no-print">
      {/* Quick-Messages Popover */}
      {open && (
        <div
          id="whatsapp-quick-messages"
          role="dialog"
          aria-label={isUrdu ? 'واٹس ایپ فوری پیغامات' : 'WhatsApp Quick Messages'}
          className="fixed bottom-16 md:bottom-22 end-3 sm:end-6 z-50 w-[calc(100vw-1.5rem)] max-w-[360px] bg-slip border border-ink/85 rounded-[3px] shadow-xl overflow-hidden"
        >
          {/* Desk Header */}
          <div className="bg-visa-green text-slip px-4 py-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <p className="font-display text-base font-semibold leading-tight">
                  {isUrdu ? 'ویزا ہاؤس واٹس ایپ ڈیسک' : 'Visahouse WhatsApp Desk'}
                </p>
              </div>
              <p className="text-[11px] text-slip/85 mt-1 font-latin-mono">
                {SITE_CONFIG.whatsappDisplay}
              </p>
              <p className="text-[11px] text-slip/80 mt-0.5 leading-snug">
                {t.common.officeHours}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={isUrdu ? 'واٹس ایپ پینل بند کریں' : 'Close WhatsApp messages'}
              className="inline-flex items-center justify-center h-8 w-8 rounded-[2px] text-slip/90 hover:bg-slip/15 transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Quick Message Templates */}
          <div className="p-3 bg-paper/70 max-h-[55vh] overflow-y-auto space-y-2">
            <p className="mono-label text-[10px] text-ink-muted px-1">
              {isUrdu ? 'فوری پیغام منتخب کریں' : 'Choose a quick message'}
            </p>
            <ul className="space-y-1.5">
              {quickMessages.map((item) => (
                <li key={item.id}>
                  <a
                    href={buildWhatsAppUrl(whatsappContext, item.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-2.5 p-2.5 bg-slip border border-rule hover:border-visa-green rounded-[2px] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-ink group-hover:text-visa-green leading-snug">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                        {item.sublabel}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-muted group-hover:text-visa-green shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom Message Composer */}
          <form
            onSubmit={handleCustomSubmit}
            className="p-3 bg-slip border-t border-rule flex items-center gap-2"
          >
            <label htmlFor="wa-custom-msg" className="sr-only">
              {isUrdu ? 'اپنا واٹس ایپ پیغام لکھیں' : 'Type your WhatsApp message'}
            </label>
            <input
              id="wa-custom-msg"
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={isUrdu ? 'اپنا پیغام لکھیں...' : 'Type your own message...'}
              className="flex-1 min-w-0 h-10 px-3 bg-paper border border-rule rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-visa-green"
            />
            <button
              type="submit"
              aria-label={isUrdu ? 'واٹس ایپ پر بھیجیں' : 'Send on WhatsApp'}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-3.5 bg-visa-green text-slip text-xs font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors shrink-0 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{isUrdu ? 'بھیجیں' : 'Send'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Desktop Floating WhatsApp Launcher (mobile uses the bottom bar button) */}
      <button
        type="button"
        data-whatsapp-trigger="true"
        aria-expanded={open}
        aria-controls="whatsapp-quick-messages"
        onClick={onToggle}
        className="hidden md:inline-flex fixed bottom-6 end-6 z-40 items-center gap-2.5 min-h-[48px] px-4 py-2.5 bg-visa-green text-slip border border-ink/25 rounded-[3px] shadow-lg hover:bg-visa-green-dark transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visa-green focus-visible:ring-offset-2"
      >
        {open ? (
          <X className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        <span className="text-sm font-medium whitespace-nowrap">
          {open
            ? isUrdu
              ? 'بند کریں'
              : 'Close Chat'
            : isUrdu
              ? 'واٹس ایپ پیغامات'
              : 'WhatsApp Messages'}
        </span>
      </button>
    </div>
  );
}
