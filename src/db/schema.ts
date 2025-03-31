import { integer, text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';

export const waterLevels = sqliteTable('levels', {
  currentlvl: integer('currentlvl').notNull(),
  area: text('area').notNull(),
  date: text('date').notNull(),
  
}, (table) => {
  return {
    // Primary Key is composite key of the area and date columns
    pk: primaryKey({ columns: [table.area, table.date] }),
  }
});