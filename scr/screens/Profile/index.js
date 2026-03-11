// screens/ProfileScreen/index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles, colors } from './style';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={60} color={colors.white} />
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@email.com</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="account-circle" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Icon name="chevron-right" size={24} color={colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Settings</Text>
          <Icon name="chevron-right" size={24} color={colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="history" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Transaction History</Text>
          <Icon name="chevron-right" size={24} color={colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <Icon name="logout" size={24} color={colors.danger} />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
