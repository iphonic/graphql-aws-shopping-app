import {StyleSheet} from 'react-native';

import styleConfig from 'src/config/style-config';

const {fontFamily, themeColor} = styleConfig;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  subcontainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
    fontFamily,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    fontFamily,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: themeColor,
    width: '100%',
    padding: 16,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily,
    color: '#fff',
  },
  clearBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  clearCart: {color: '#dc2626', fontWeight: 'bold'},
});
