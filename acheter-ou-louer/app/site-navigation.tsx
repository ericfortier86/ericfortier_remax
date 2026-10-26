'use client';
import { useLanguage } from './language-provider';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown, Menu, SendHorizontal, X } from 'lucide-react';
import { mainNavigation } from '@/lib/navigation';

export default function SiteNavigation({ onContact }: { onContact: () => void }) {
  const { t, locale, siteHref, switchHref, switchLanguage } = useLanguage();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);

  function close() { setOpenGroup(null); setMobileOpen(false); }

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) close();
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  function focusLink(group: string, index: number) {
    requestAnimationFrame(() => {
      const links = header.current?.querySelectorAll<HTMLAnchorElement>(`#navigation-${group} a`);
      if (links?.length) links[(index + links.length) % links.length].focus();
    });
  }

  function triggerKey(event: KeyboardEvent<HTMLButtonElement>, group: string) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); setOpenGroup(group); focusLink(group, event.key === 'ArrowDown' ? 0 : -1);
    }
  }

  function linkKey(event: KeyboardEvent<HTMLAnchorElement>, group: string, index: number) {
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      focusLink(group, event.key === 'Home' ? 0 : event.key === 'End' ? -1 : index + (event.key === 'ArrowDown' ? 1 : -1));
    }
  }

  function escape(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Escape') return;
    if (openGroup) {
      event.preventDefault(); document.getElementById(`navigation-trigger-${openGroup}`)?.focus(); setOpenGroup(null);
    } else if (mobileOpen) {
      event.preventDefault(); setMobileOpen(false); mobileToggle.current?.focus();
    }
  }

  return <header className="reference-navigation" ref={header} onKeyDown={escape} onBlurCapture={event => {
    if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) close();
  }}>
    <div className="reference-navigation-inner">
      <a href={siteHref("https://www.eric-fortier.com/fr")} className="reference-navigation-logo" aria-label={t("Eric Fortier — accueil du site professionnel")}><img src="/images/logo.png" alt="RE/MAX" width="136" height="42" /></a>
      <nav id="primary-navigation" className={`reference-navigation-menu${mobileOpen ? ' is-mobile-open' : ''}`} aria-label={t("Navigation principale")}>
        <ul className="reference-navigation-groups">
          {mainNavigation.map(group => <li className="reference-navigation-group" key={group.id}>
            <button type="button" id={`navigation-trigger-${group.id}`} className="reference-navigation-trigger" aria-expanded={openGroup === group.id} aria-controls={`navigation-${group.id}`} onClick={() => setOpenGroup(current => current === group.id ? null : group.id)} onKeyDown={event => triggerKey(event, group.id)}>{t(group.label)}<ChevronDown size={13} aria-hidden="true" /></button>
            <ul id={`navigation-${group.id}`} className="reference-navigation-dropdown" hidden={openGroup !== group.id} aria-labelledby={`navigation-trigger-${group.id}`}>
              {group.links.map((link, index) => <li key={`${group.id}-${index}`}><a href={siteHref(link.href)} onClick={close} onKeyDown={event => linkKey(event, group.id, index)}>{t(link.label)}</a></li>)}
            </ul>
          </li>)}
        </ul>
      </nav>
      <div className="reference-navigation-actions">
        <a className="reference-navigation-language" href={switchHref} hrefLang={locale === 'fr' ? 'en-CA' : 'fr-CA'} lang={locale === 'fr' ? 'en' : 'fr'} aria-label={locale === 'fr' ? 'View this page in English' : 'Afficher cette page en français'} onClick={event => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); close(); switchLanguage(); } }}>{locale === 'fr' ? 'EN' : 'FR'}</a>
        <button className="profile-button profile-button-primary reference-navigation-contact" type="button" onClick={() => { close(); onContact(); }}><SendHorizontal size={13} aria-hidden="true" />{t("Contacter")}</button>
        <button ref={mobileToggle} type="button" className="reference-navigation-toggle" aria-label={mobileOpen ? t("Fermer le menu") : t("Ouvrir le menu")} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => { setMobileOpen(current => !current); setOpenGroup(null); }}>{mobileOpen ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </div>
  </header>;
}
