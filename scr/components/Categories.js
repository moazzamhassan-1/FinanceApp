import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../screens/HomeScreen/style';

const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name={category.icon || 'folder'}
          size={24}
          color={category.type === 'income' ? colors.income : colors.expense}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.type}>
          {category.type === 'income' ? '💰 Income' : '💸 Expense'}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => onEdit(category)}
          style={styles.actionButton}
        >
          <Icon name="edit" size={20} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(category)}
          style={styles.actionButton}
        >
          <Icon name="delete" size={20} color={colors.expense} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: colors.gray,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default CategoryItem;
