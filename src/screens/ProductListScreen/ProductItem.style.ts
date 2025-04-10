import {StyleSheet} from 'react-native';
import styleConfig from 'src/config/style-config';

const {screenBGColor, fontFamily, themeColor} = styleConfig;

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 1,
  },
  image: {width: 60, height: 60, resizeMode: 'contain', marginRight: 12},
  info: {flex: 1, justifyContent: 'space-between'},
  title: {
    fontWeight: '600',
    fontSize: 15,
    fontFamily,
    lineHeight: 20,
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
  },
  price: {
    fontWeight: 'bold',
    color: themeColor,
    marginTop: 2,
    fontFamily,
  },
  category: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
    fontFamily,
    textTransform: 'capitalize',
  },
  removeButton: {
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: '#d9534f',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: themeColor,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 11,
    fontFamily,
  },
});
