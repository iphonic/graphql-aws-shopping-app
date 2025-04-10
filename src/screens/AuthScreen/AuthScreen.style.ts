import {StyleSheet} from 'react-native';
import styleConfig from 'src/config/style-config';

const {screenBGColor, fontFamily, themeColor} = styleConfig;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: screenBGColor,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily,
  },
  button: {
    backgroundColor: themeColor,
    padding: 14,
    borderRadius: 8,
    fontFamily,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily,
  },
});
