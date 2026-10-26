import { getDb } from '@/db';
import { leads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { allowedLeadOrigin } from '@/lib/lead-origin';
const schema = z.object({ requestId: z.string().uuid(), email: z.string().trim().email().max(200) });
export async function POST(request: Request) {
  if (!allowedLeadOrigin(request)) return Response.json({ error: 'Origine invalide.' }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 1000) return Response.json({ error: 'Demande trop volumineuse.' }, { status: 413 });
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return Response.json({ error: 'Demande invalide.' }, { status: 400 });
    const db = getDb(), d = parsed.data;
    const lead = await db.select({ email: leads.email }).from(leads).where(eq(leads.id, d.requestId)).get();
    if (!lead || lead.email !== d.email.toLowerCase()) return Response.json({ error: 'Demande introuvable.' }, { status: 404 });
    // This records the browser's report, not independent proof of inbox delivery.
    await db.update(leads).set({ emailStatus: 'client_confirmed' }).where(eq(leads.id, d.requestId));
    return Response.json({ ok: true });
  } catch { return Response.json({ error: 'Statut non confirmé.' }, { status: 503 }); }
}
