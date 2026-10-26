import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(), firstName: text('first_name').notNull(), lastName: text('last_name').notNull(),
  email: text('email').notNull(), phone: text('phone').notNull().default(''), goal: text('goal').notNull(),
  sectors: text('sectors').notNull().default('[]'), propertyTypes: text('property_types').notNull().default('[]'), budget: text('budget').notNull().default(''),
  timeline: text('timeline').notNull(), message: text('message').notNull().default(''), newsletterConsent: integer('newsletter_consent').notNull().default(0),
  contactConsent: integer('contact_consent').notNull(), consentVersion: text('consent_version').notNull(), attribution: text('attribution').notNull().default('{}'),
  calculation: text('calculation'), emailStatus: text('email_status').notNull().default('pending'), createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
