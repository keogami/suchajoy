import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username'),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const counter = pgTable('counter', {
	id: integer('id').primaryKey(),
	value: integer('value').notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Counter = typeof counter.$inferSelect;
