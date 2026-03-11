import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { initDatabase, getCategories } from '../../database/database';
import CategoryItem from '../../components/CategoriesItems';
import { styles, colors } from './style';

const HomeScreen = () => {
  const [db, setDb] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
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
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.amoutTxt}>TOTAL BALANCE</Text>
          <View style={styles.amoutView}>
            <Text style={styles.amout}>Rs23000</Text>
            <Icon name="category" size={20} color="#fff" />
          </View>
          <Text style={styles.dateTxt}>As of March 10, 2026</Text>
        </View>
      </View>
      <View style={styles.CardsContainer}>
        <View style={styles.card}>
          <View style={styles.iconIncome}>
            <Icon name="category" size={20} color="#E1A165" />
          </View>
          <Text style={styles.icomeTxt}>Income</Text>
          <Text style={styles.icome}>Rs 50000</Text>
          <Text>This Month</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.iconExpense}>
            <Icon name="category" size={20} color="#d81c1c" />
          </View>
          <Text style={styles.expenseTxt}>Income</Text>
          <Text style={styles.expense}>Rs 30000</Text>
          <Text style={styles.monthTxt}>This Month</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.transectionView}>
          <View style={styles.seeAllView}>
            <Text>Recent Transections</Text>
            <TouchableOpacity>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredCategories?.slice(0, 4)}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <CategoryItem category={item} />}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmptyState}
            style={{ maxHeight: 400 }} // Add this line - adjust based on your item height
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
