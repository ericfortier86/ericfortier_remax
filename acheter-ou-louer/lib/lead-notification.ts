type NotificationData = {
  id: string; firstName: string; lastName: string; email: string; phone: string;
  goal: string; sectors: string[]; propertyTypes: string[]; budget: string;
  timeline: string; message: string; newsletterConsent: boolean;
  calculation?: string | null; attribution: Record<string,string>;
};
const labels: Record<string,string> = { rencontre: 'Conseils pour un achat', alertes: 'Liste de propriétés', preparation: 'Plan de préparation', hypotheque: 'Référence hypothécaire' };
export function leadNotification(d: NotificationData, origin: string): Record<string,string> {
  return {
    _subject: `[Projet acheteur] ${labels[d.goal] || d.goal} — ${d.firstName} ${d.lastName}`,
    _template: 'table', _captcha: 'false', _replyto: d.email, email: d.email, _url: origin,
    Nom: `${d.firstName} ${d.lastName}`, Courriel: d.email, Téléphone: d.phone || 'Non fourni',
    Demande: labels[d.goal] || d.goal, Secteurs: d.sectors.join(', ') || 'À préciser',
    Propriétés: d.propertyTypes.join(', ') || 'À préciser', Budget: d.budget, Échéance: d.timeline,
    Message: d.message || 'Aucun', 'Consentement au suivi': 'Oui — version 2026-10-26',
    'Consentement aux envois': d.newsletterConsent ? 'Oui' : 'Non',
    'Résumé du calcul partagé volontairement': d.calculation || 'Non partagé',
    Attribution: JSON.stringify(d.attribution), Référence: d.id,
  };
}
