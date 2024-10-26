import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';

export const waterLevelsTemp = sqliteTable('levels', {
  currentlvl: integer('currentlvl').notNull(),
  changeFromLast: integer('change_from_last').notNull(),
  country: text('country').notNull(),
  area: text('area').notNull(),
  date: text('date').notNull(),
  // id: integer('id').primaryKey({autoIncrement: true})
  
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.area, table.date] }),
    // pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.area, table.date] }),
  }
});

// coulmns: area, currentlvl, changeFromLast, date, country(optional: then can get avg per country), id(not sure about this)
// PK could be area and date compostit key 
// Or just have id