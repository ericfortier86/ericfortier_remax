'use client';
import { useLanguage } from './language-provider';
import { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
declare global { interface Window { fbq?: ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void }; _fbq?: Window['fbq']; } }
const KEY = 'ef-consent-v1';
export function track(event: string, data?: Record<string,string>, custom = false) { try { if (typeof window !== 'undefined' && localStorage.getItem(KEY) === 'accepted') window.fbq?.(custom ? 'trackCustom' : 'track', event, data || {}); } catch { /* Storage may be disabled; do not start tracking. */ } }
function enablePixel() {
  if (window.fbq) { window.fbq('consent','grant'); return; }
  const fbq: NonNullable<Window['fbq']> = function(...args: unknown[]) { if (fbq.callMethod) fbq.callMethod(...args); else fbq.queue?.push(args); };
  fbq.queue = []; fbq.loaded = true; fbq.version = '2.0'; window.fbq = fbq; window._fbq = fbq;
  const script = document.createElement('script'); script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.appendChild(script);
  fbq('consent','grant'); fbq('init','2378121756324783'); fbq('track','PageView');
}
export default function Tracking() {
  const { t, localHref } = useLanguage();
  const [open,setOpen] = useState(false), [hasChoice,setHasChoice] = useState(false);
  useEffect(() => { try { const c = localStorage.getItem(KEY); setHasChoice(!!c); if (c === 'accepted') enablePixel(); if (!c) setOpen(true); } catch { setOpen(true); } },[]);
  function choose(accept: boolean) { try { localStorage.setItem(KEY, accept ? 'accepted' : 'refused'); } catch { /* Consent is still applied to this page. */ } if (accept) enablePixel(); else window.fbq?.('consent','revoke'); setHasChoice(true); setOpen(false); }
  return <><button type="button" className="cookie-settings" onClick={() => setOpen(true)}>{t("Préférences de témoins")}</button>{open && <aside className="consent-banner" aria-label={t("Préférences de confidentialité")}><div className="consent-copy"><ShieldCheck size={22} /><div><strong>{t("Votre visite, vos choix.")}</strong><p>{t("Avec votre accord, le pixel Meta nous aide à mesurer nos publicités. Le calculateur fonctionne avec ou sans ces témoins. ")}<a href={localHref("/confidentialite")}>{t("En savoir plus")}</a></p></div></div><div className="consent-actions"><button type="button" onClick={() => choose(false)}>{t("Refuser")}</button><button type="button" className="btn btn-blue" onClick={() => choose(true)}>{t("Accepter")}</button>{hasChoice && <button className="icon-button" aria-label={t("Fermer les préférences")} onClick={() => setOpen(false)}><X size={18} /></button>}</div></aside>}</>;
}
