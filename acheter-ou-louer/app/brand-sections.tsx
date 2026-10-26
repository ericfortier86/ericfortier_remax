'use client';

import { CalendarDays, ExternalLink, Globe2, Languages, Mail, MessageSquare, Phone, SendHorizontal } from 'lucide-react';
import { CONTACT_EMAIL, sectors } from '@/lib/site';
import Tracking from './tracking';

const appointmentUrl = 'https://letstalk.welcomespaces.io/s/nfq73q';
const footerSectors = ['gatineau', 'hull', 'aylmer', 'masson-angers', 'buckingham', 'cantley', 'chelsea', 'val-des-monts']
  .map(slug => sectors.find(sector => sector.slug === slug)!);

type ContactProps = { onContact: () => void };

function ContactButtons({ onContact }: ContactProps) {
  return <div className="profile-actions">
    <button type="button" className="profile-button profile-button-primary" onClick={onContact}><SendHorizontal size={14} aria-hidden="true" />Contacter</button>
    <a className="profile-button profile-button-outline" href={appointmentUrl} target="_blank" rel="noopener noreferrer"><CalendarDays size={17} aria-hidden="true" />Prendre rendez-vous</a>
  </div>;
}

export function BrandedHero({ onContact }: ContactProps) {
  return <header className="site-masthead" aria-labelledby="hero-title">
    <img className="site-masthead-background" src="/images/hero.png" alt="" width="1600" height="893" fetchPriority="high" />
    <div className="site-masthead-overlay" aria-hidden="true" />
    <div className="site-masthead-inner">
      <div className="site-masthead-copy">
        <h1 id="hero-title">Acheter ou louer?<br />La question se pose!</h1>
        <div className="site-masthead-identity"><strong>Eric Fortier</strong><p>Courtier immobilier en Outaouais - G3778</p><p>Remax Direct – Gatineau, QC</p></div>
        <ContactButtons onContact={onContact} />
      </div>
      <img className="site-masthead-portrait" src="/images/eric-fortier.png" alt="Eric Fortier, courtier immobilier en Outaouais" width="456" height="360" fetchPriority="high" />
    </div>
  </header>;
}

export function BrandedFooter({ onContact }: ContactProps) {
  return <footer className="reference-footer" id="public-profile-contact-info">
    <div className="reference-footer-inner">
      <img className="reference-footer-avatar" src="/images/eric-fortier-avatar.png" alt="Eric Fortier" width="120" height="120" loading="lazy" />
      <div className="reference-footer-columns">
        <div className="reference-footer-identity">
          <h2>Eric Fortier</h2>
          <p className="reference-footer-role">Courtier immobilier en Outaouais - G3778</p>
          <p>Remax Direct – Gatineau, QC</p>
          <div className="reference-footer-contact-details">
            <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} aria-hidden="true" /><span>{CONTACT_EMAIL}</span></a>
            <a href="tel:+18192103124"><Phone size={14} aria-hidden="true" /><span>+1 (819) 210-3124</span></a>
          </div>
          <ContactButtons onContact={onContact} />
        </div>
        <section className="reference-footer-contact" aria-labelledby="footer-contact-title">
          <h3 id="footer-contact-title">Contacter</h3>
          <button type="button" className="reference-footer-link" onClick={onContact}><MessageSquare size={15} aria-hidden="true" /><span>Contacter</span></button>
          <a className="reference-footer-link" href={appointmentUrl} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} aria-hidden="true" /><span>Prendre rendez-vous</span></a>
          <p className="reference-footer-languages"><Languages size={15} aria-hidden="true" /><span>Français, Anglais</span></p>
        </section>
        <section className="reference-footer-social" aria-labelledby="footer-links-title">
          <h3 id="footer-links-title">Mes liens</h3>
          <a href="https://www.facebook.com/ericfortier.inc/" target="_blank" rel="noopener noreferrer">Facebook<ExternalLink size={10} aria-hidden="true" /></a>
          <a href="https://www.remax-quebec.com/fr/courtiers-immobiliers/eric.fortier" target="_blank" rel="noopener noreferrer">Remax<ExternalLink size={10} aria-hidden="true" /></a>
        </section>
      </div>
      <address>3 rue Picardie, Gatineau, Québec, J8T 1N8</address>
    </div>
    <div className="reference-footer-legal">
      <div className="reference-footer-legal-inner">
        <div className="reference-footer-legal-links"><a className="reference-footer-english" href="https://www.eric-fortier.com/en/"><Globe2 size={13} aria-hidden="true" />English</a><span aria-hidden="true">·</span><a href="https://www.welcomespaces.io/fr/terms-of-use" target="_blank" rel="noopener noreferrer">Conditions</a><span aria-hidden="true">·</span><a href="/confidentialite">Confidentialité</a></div>
        <Tracking />
      </div>
    </div>
    <nav className="reference-footer-sectors" aria-labelledby="footer-sectors-title">
      <h3 id="footer-sectors-title">Secteurs immobiliers desservis</h3>
      <ul>{footerSectors.map(sector => <li key={sector.slug}><a href={`https://www.eric-fortier.com/fr/secteur-${sector.slug}`}>{sector.name}</a></li>)}</ul>
    </nav>
  </footer>;
}
