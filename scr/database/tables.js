// Table creation queries
export const createTables = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,  -- 'income' or 'expense'
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

// Default categories to insert
export const defaultCategories = [
  // Income categories
  ['Salary', 'income', 'briefcase', 1],
  ['Business', 'income', 'business', 2],
  ['Investment', 'income', 'trending-up', 3],
  ['Freelance', 'income', 'laptop', 4],

  // Expense categories
  ['Rent', 'expense', 'home', 1],
  ['Utilities', 'expense', 'flash', 2],
  ['Food', 'expense', 'restaurant', 3],
  ['Transport', 'expense', 'car', 4],
  ['Healthcare', 'expense', 'medical', 5],
  ['Entertainment', 'expense', 'film', 6],
];
