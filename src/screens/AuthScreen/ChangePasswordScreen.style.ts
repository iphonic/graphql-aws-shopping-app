import {StyleSheet} from 'react-native';
import styleConfig from 'src/config/style-config';

const {screenBGColor, fontFamily, themeColor} = styleConfig;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: screenBGColor,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: themeColor,
    fontFamily,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
    fontFamily,
  },
  button: {
    backgroundColor: themeColor,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily,
  },
});
