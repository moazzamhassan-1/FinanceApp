import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather';
const AddCategoryModal = ({ visible, onClose, onSave, categoryToEdit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const [icon, setIcon] = useState('folder');

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setType(categoryToEdit.type);
      setIcon(categoryToEdit.icon || 'folder');
    } else {
      setName('');
      setType('expense');
      setIcon('folder');
    }
  }, [categoryToEdit, visible]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter category name');
      return;
    }

    onSave({
      id: categoryToEdit?.id,
      name: name.trim(),
      type,
      icon,
    });

    setName('');
    setType('expense');
    setIcon('folder');
  };

  const iconOptions = [
    'folder',
    'work',
    'restaurant',
    'car',
    'home',
    'medical',
    'school',
    'shopping',
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {categoryToEdit ? 'Edit Category' : 'Add New Category'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#bda1a1" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Category Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g., Salary, Rent, Food"
            placeholderTextColor={'#bda1a1'}
          />

          <Text style={styles.label}>Category Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.activeIncomeButton,
              ]}
              onPress={() => setType('income')}
            >
              <Feather name="trending-up" size={20} color="#000" />
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'income' && styles.activeTypeText,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.activeExpenseButton,
              ]}
              onPress={() => setType('expense')}
            >
              <Feather name="trending-down" size={20} color="#000" />
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'expense' && styles.activeTypeText,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Choose Icon</Text>
          <View style={styles.iconGrid}>
            {iconOptions.map(iconName => (
              <TouchableOpacity
                key={iconName}
                style={[
                  styles.iconOption,
                  icon === iconName && styles.selectedIcon,
                ]}
                onPress={() => setIcon(iconName)}
              >
                <Icon name={iconName} size={24} color="#000" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {categoryToEdit ? 'Update Category' : 'Save Category'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F44336',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  activeIncomeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  activeExpenseButton: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTypeText: {
    color: '#fff',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    marginTop: 8,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedIcon: {
    backgroundColor: '#92c5f1',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCategoryModal;
