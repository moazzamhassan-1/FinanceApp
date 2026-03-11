import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2196F3',
  income: '#4CAF50',
  expense: '#F44336',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  darkGray: '#757575',
  border: '#E0E0E0',
  background: '#FAFAFA',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4EAFF',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
  },
  inputMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputView: {
    flex: 1,
    backgroundColor: '#E4EAFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  iconView: {
    backgroundColor: '#E4EAFF',
    height: 38,
    width: 42,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#E4EAFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 1,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkGray,
  },
  activeTabText: {
    color: colors.white,
  },
  transectionView: {
    flex: 1, // Changed from fixed height to flex:1
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  seeAllView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
