import {StyleSheet} from 'react-native';

import styleConfig from 'src/config/style-config';

const {fontFamily, themeColor} = styleConfig;

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#f0f0f0',
  },
  details: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    fontFamily,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
    fontFamily,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: themeColor,
    marginBottom: 6,
    fontFamily,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#e4e4e4',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteBtn: {
    padding: 8,
    backgroundColor: '#d9534f',
    borderRadius: 4,
  },
});
