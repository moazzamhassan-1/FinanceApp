// screens/LoginScreen/style.js
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  darkGray: '#757575',
  background: '#FAFAFA',
  border: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  appTagline: {
    fontSize: 14,
    color: colors.gray,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 10,
    fontSize: 16,
    color: colors.black,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonDisabled: {
    backgroundColor: colors.gray,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 5,
  },
  demoCredentials: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 2,
  },
});
