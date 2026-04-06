import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  department: varchar('department', { length: 255 }).notNull(),
  timeType: varchar('time_type', { length: 64 }).notNull(),
  location: varchar('location', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  body: text('body').notNull(),
  jobId: integer('job_id').references(() => jobs.id, { onDelete: 'set null' }),
  resumePath: text('resume_path'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Message = typeof messages.$inferSelect;
