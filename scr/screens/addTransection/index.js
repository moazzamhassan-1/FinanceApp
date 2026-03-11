// screens/AddTransaction/index.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { getUserCategories, addTransaction } from '../../database/database';
import { styles, colors } from './style';

const AddTransaction = ({ navigation, route }) => {
  const { user, db } = route.params; // Get user and db from navigation params

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    type: 'expense', // 'income' or 'expense'
    categoryId: null,
    amount: '',
    description: '',
    date: new Date(),
    notes: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [formData.type]);

  const loadCategories = async () => {
    const cats = await getUserCategories(db, user.id, formData.type);
    setCategories(cats);
    if (cats.length > 0) {
      setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
    }
  };

  const handleTypeChange = type => {
    setFormData(prev => ({ ...prev, type, categoryId: null }));
  };

  const handleAmountChange = text => {
    // Only allow numbers and decimal
    const cleaned = text.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, amount: cleaned }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const validateForm = () => {
    if (!formData.categoryId) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const success = await addTransaction(
      db,
      user.id,
      formData.categoryId,
      parseFloat(formData.amount),
      formData.type,
      formData.description || `${formData.type} transaction`,
      formData.date.toISOString(),
      formData.notes,
    );

    setLoading(false);

    if (success) {
      Alert.alert('Success', 'Transaction added successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Error', 'Failed to add transaction');
    }
  };

  const formatDate = date => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Type Selection */}
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'income' && styles.typeButtonActive,
              formData.type === 'income' && {
                backgroundColor: colors.income + '20',
              },
            ]}
            onPress={() => handleTypeChange('income')}
          >
            <Icon
              name="arrow-upward"
              size={24}
              color={formData.type === 'income' ? colors.income : colors.gray}
            />
            <Text
              style={[
                styles.typeText,
                formData.type === 'income' && { color: colors.income },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'expense' && styles.typeButtonActive,
              formData.type === 'expense' && {
                backgroundColor: colors.expense + '20',
              },
            ]}
            onPress={() => handleTypeChange('expense')}
          >
            <Icon
              name="arrow-downward"
              size={24}
              color={formData.type === 'expense' ? colors.expense : colors.gray}
            />
            <Text
              style={[
                styles.typeText,
                formData.type === 'expense' && { color: colors.expense },
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>Rs</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={handleAmountChange}
            placeholderTextColor={colors.gray}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Category</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            {formData.categoryId ? (
              <View style={styles.selectedCategory}>
                <Text style={styles.selectedCategoryText}>
                  {categories.find(c => c.id === formData.categoryId)?.name ||
                    'Select Category'}
                </Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Select Category</Text>
            )}
            <Icon name="arrow-drop-down" size={24} color={colors.gray} />
          </TouchableOpacity>

          {showCategoryPicker && categories.length > 0 && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.categoryId}
                onValueChange={itemValue => {
                  setFormData(prev => ({ ...prev, categoryId: itemValue }));
                  setShowCategoryPicker(false);
                }}
              >
                {categories.map(cat => (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={formData.description}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, description: text }))
            }
            placeholderTextColor={colors.gray}
          />
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar-today" size={20} color={colors.primary} />
            <Text style={styles.dateText}>{formatDate(formData.date)}</Text>
          </TouchableOpacity>
        </View>

        {/* Notes Input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add any additional notes"
            value={formData.notes}
            onChangeText={text =>
              setFormData(prev => ({ ...prev, notes: text }))
            }
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={colors.gray}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Icon name="check" size={24} color={colors.white} />
              <Text style={styles.submitButtonText}>Add Transaction</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default AddTransaction;
