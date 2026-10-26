import { getDb } from '@/db';
import { leads } from '@/db/schema';
import { eq, and, gte } from 'drizzle-orm';
import { z } from 'zod';
import { CONTACT_EMAIL, sectors } from '@/lib/site';
const schema = z.object({
  firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80), email: z.string().trim().email().max(200), phone: z.string().trim().max(30).default(''),
  goal: z.enum(['rencontre','alertes','preparation','hypotheque']), sectors: z.array(z.enum(sectors.map(s => s.name) as [string, ...string[]])).max(8),
  propertyTypes: z.array(z.enum(['Maison','Condo','Plex','Terrain','Construction neuve'])).max(5), budget: z.enum(['À préciser','Moins de 350 000 $','350 000 à 500 000 $','500 000 à 700 000 $','700 000 $ et plus']),
  timeline: z.enum(['Dès que possible','Dans 3 à 6 mois','Dans 6 à 12 mois','Dans plus d’un an','Je m’informe']), message: z.string().trim().max(2000).default(''),
  contactConsent: z.literal(true), newsletterConsent: z.boolean(), website: z.string().max(0), attribution: z.record(z.string().max(250)).optional(), calculation: z.string().max(1200).optional(), requestId: z.string().uuid(),
}).refine(d => d.goal !== 'alertes' || d.newsletterConsent, { message: 'Le consentement aux alertes est requis pour cette inscription.' });
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return Response.json({ error: 'Origine de la demande invalide.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 16000) return Response.json({ error: 'Demande trop volumineuse.' }, { status: 413 });
  try {
    const raw = await request.text();
    if (raw.length > 16000) return Response.json({ error: 'Demande trop volumineuse.' }, { status: 413 });
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return Response.json({ error: 'Vérifiez les champs du formulaire et vos consentements.' }, { status: 400 });
    const d = parsed.data, db = getDb();
    const existing = await db.select({ id: leads.id, emailStatus: leads.emailStatus }).from(leads).where(eq(leads.id, d.requestId)).get();
    if (existing) return Response.json({ ok: true, emailDelivered: existing.emailStatus === 'accepted' });
    const cutoff = new Date(Date.now() - 600000).toISOString().slice(0,19).replace('T',' ');
    const recent = await db.select({ id: leads.id }).from(leads).where(and(eq(leads.email, d.email.toLowerCase()), gte(leads.createdAt, cutoff))).all();
    if (recent.length >= 3) return Response.json({ error: 'Vous avez déjà envoyé plusieurs demandes. Pour un suivi, appelez le 819 210-3124.' }, { status: 429 });
    const attribution = Object.fromEntries(Object.entries(d.attribution || {}).filter(([k]) => ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].includes(k)));
    await db.insert(leads).values({ id: d.requestId, firstName: d.firstName, lastName: d.lastName, email: d.email.toLowerCase(), phone: d.phone, goal: d.goal, sectors: JSON.stringify(d.sectors), propertyTypes: JSON.stringify(d.propertyTypes), budget: d.budget, timeline: d.timeline, message: d.message, contactConsent: 1, newsletterConsent: d.newsletterConsent ? 1 : 0, consentVersion: '2026-10-26', attribution: JSON.stringify(attribution), calculation: d.calculation || null });
    const labels = { rencontre: 'Conseils pour un achat', alertes: 'Liste de propriétés', preparation: 'Plan de préparation', hypotheque: 'Référence hypothécaire' };
    let accepted = false;
    if (!['localhost','127.0.0.1'].includes(new URL(request.url).hostname)) {
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json', Referer: new URL(request.url).origin + '/', Origin: new URL(request.url).origin }, signal: AbortSignal.timeout(12000), body: JSON.stringify({ _subject: `[Projet acheteur] ${labels[d.goal]} — ${d.firstName} ${d.lastName}`, _template: 'table', _captcha: 'false', _replyto: d.email, email: d.email, _url: new URL(request.url).origin, Nom: `${d.firstName} ${d.lastName}`, Courriel: d.email, Téléphone: d.phone || 'Non fourni', Demande: labels[d.goal], Secteurs: d.sectors.join(', ') || 'À préciser', Propriétés: d.propertyTypes.join(', ') || 'À préciser', Budget: d.budget, Échéance: d.timeline, Message: d.message || 'Aucun', 'Consentement au suivi': 'Oui — version 2026-10-26', 'Consentement aux envois': d.newsletterConsent ? 'Oui' : 'Non', 'Résumé du calcul partagé volontairement': d.calculation || 'Non partagé', Attribution: JSON.stringify(attribution), Référence: d.requestId }) });
        const result = await response.json() as { success?: boolean | string; message?: string };
        accepted = response.ok && (result.success === true || result.success === 'true') && !/activat|confirm/i.test(result.message || '');
      } catch { /* Durable storage retains the lead when email is unavailable. */ }
    }
    await db.update(leads).set({ emailStatus: accepted ? 'accepted' : 'pending' }).where(eq(leads.id, d.requestId));
    return Response.json({ ok: true, emailDelivered: accepted });
  } catch (e) {
    console.error('Lead submission failed', e instanceof Error ? e.name : 'unknown');
    return Response.json({ error: 'L’enregistrement a échoué. Réessayez ou contactez Eric au 819 210-3124.' }, { status: 503 });
  }
}
