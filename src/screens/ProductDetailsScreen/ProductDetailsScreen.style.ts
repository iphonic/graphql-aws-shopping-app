import {StyleSheet} from 'react-native';
import styleConfig from 'src/config/style-config';

const {screenBGColor, fontFamily, themeColor} = styleConfig;

export default StyleSheet.create({
  container: {padding: 16, backgroundColor: screenBGColor},
  image: {
    height: 250,
    resizeMode: 'contain',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColor,
    marginBottom: 4,
    fontFamily,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 24,
    fontFamily,
  },
  quantityContainer: {marginBottom: 20},
  quantityLabel: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
    fontFamily,
  },
  quantityControls: {flexDirection: 'row', alignItems: 'center'},
  qtyButton: {
    backgroundColor: '#e4e4e4',
    padding: 8,
    borderRadius: 6,
  },
  qtyText: {fontSize: 20, fontWeight: '500', fontFamily},
  qtyCount: {
    fontSize: 18,
    marginHorizontal: 16,
    fontWeight: '600',
    fontFamily,
  },
  removeFromCart: {
    backgroundColor: '#d9534f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCart: {
    backgroundColor: themeColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily,
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
});
