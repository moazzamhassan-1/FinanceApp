import SQLite from 'react-native-sqlite-storage';
import { createTables, defaultCategories } from './tables';

// Enable debugging
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const databaseName = 'CEOFinance.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'CEO Finance Database';
const databaseSize = 200000;

const getDBConnection = async () => {
  return SQLite.openDatabase(
    databaseName,
    databaseVersion,
    databaseDisplayName,
    databaseSize,
  );
};

const createTable = async db => {
  try {
    await db.executeSql(createTables);
    console.log('Tables created successfully');

    // Check if categories exist, if not insert defaults
    const results = await db.executeSql(
      'SELECT COUNT(*) as count FROM categories',
    );
    const count = results[0].rows.item(0).count;

    if (count === 0) {
      // Insert default categories
      const insertQuery =
        'INSERT INTO categories (name, type, icon, sort_order) VALUES (?, ?, ?, ?)';
      for (const category of defaultCategories) {
        await db.executeSql(insertQuery, category);
      }
      console.log('Default categories inserted');
    }
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

export const initDatabase = async () => {
  try {
    const db = await getDBConnection();
    await createTable(db);
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    return null;
  }
};

// Category CRUD operations
export const getCategories = async (db, type = null) => {
  try {
    let query = 'SELECT * FROM categories ORDER BY sort_order ASC';
    let params = [];

    if (type) {
      query = 'SELECT * FROM categories WHERE type = ? ORDER BY sort_order ASC';
      params = [type];
    }

    const results = await db.executeSql(query, params);
    const categories = [];
    results.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        categories.push(result.rows.item(i));
      }
    });
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const addCategory = async (db, name, type, icon = 'folder') => {
  try {
    // Get max sort order
    const result = await db.executeSql(
      'SELECT MAX(sort_order) as maxOrder FROM categories WHERE type = ?',
      [type],
    );
    const maxOrder = result[0].rows.item(0).maxOrder || 0;

    const query =
      'INSERT INTO categories (name, type, icon, sort_order) VALUES (?, ?, ?, ?)';
    await db.executeSql(query, [name, type, icon, maxOrder + 1]);
    return true;
  } catch (error) {
    console.error('Error adding category:', error);
    return false;
  }
};

export const updateCategory = async (db, id, name, icon) => {
  try {
    const query =
      'UPDATE categories SET name = ?, icon = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await db.executeSql(query, [name, icon, id]);
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    return false;
  }
};

export const deleteCategory = async (db, id) => {
  try {
    await db.executeSql('DELETE FROM categories WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

export default {
  initDatabase,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
