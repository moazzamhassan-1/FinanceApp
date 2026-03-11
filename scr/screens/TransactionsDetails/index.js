import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  initDatabase,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../database/database';
import CategoryItem from '../../components/Categories';
import AddCategoryModal from '../../components/addCatagoriesModal';
import { styles, colors } from './style';

const TransactionDetailScreen = () => {
  const [db, setDb] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    setupDatabase();
  }, []);

  const setupDatabase = async () => {
    const database = await initDatabase();
    setDb(database);
    if (database) {
      loadCategories(database);
    }
  };

  const loadCategories = async database => {
    setLoading(true);
    const data = await getCategories(database);
    setCategories(data);
    filterCategories(data, activeTab);
    setLoading(false);
  };

  const filterCategories = (data, tab) => {
    if (tab === 'all') {
      setFilteredCategories(data);
    } else {
      setFilteredCategories(data.filter(cat => cat.type === tab));
    }
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
    filterCategories(categories, tab);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleEditCategory = category => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const handleDeleteCategory = category => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteCategory(db, category.id);
            if (success) {
              loadCategories(db);
              Alert.alert('Success', 'Category deleted successfully');
            } else {
              Alert.alert('Error', 'Failed to delete category');
            }
          },
        },
      ],
    );
  };

  const handleSaveCategory = async categoryData => {
    let success;
    if (categoryData.id) {
      // Update existing category
      success = await updateCategory(
        db,
        categoryData.id,
        categoryData.name,
        categoryData.icon,
      );
    } else {
      // Add new category
      success = await addCategory(
        db,
        categoryData.name,
        categoryData.type,
        categoryData.icon,
      );
    }

    if (success) {
      loadCategories(db);
      setModalVisible(false);
      Alert.alert(
        'Success',
        `Category ${categoryData.id ? 'updated' : 'added'} successfully`,
      );
    } else {
      Alert.alert(
        'Error',
        `Failed to ${categoryData.id ? 'update' : 'add'} category`,
      );
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="category" size={80} color={colors.gray} />
      <Text style={styles.emptyText}>
        No categories found.{'\n'}
        Tap the + button to add your first category.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.icon}>SS</Text>
          <Text style={styles.headerTxt}>Transactions</Text>
        </View>

        <View style={styles.inputMainView}>
          <View style={styles.inputView}>
            <Text>SS</Text>
            <TextInput placeholder=" earch" />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCategory}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => handleTabChange('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'income' && styles.activeTab]}
          onPress={() => handleTabChange('income')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'income' && styles.activeTabText,
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'expense' && styles.activeTab]}
          onPress={() => handleTabChange('expense')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'expense' && styles.activeTabText,
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
        />
      )}

      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCategory}
        categoryToEdit={editingCategory}
      />
    </SafeAreaView>
  );
};

export default TransactionDetailScreen;
