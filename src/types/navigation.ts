import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CartItem} from 'src/screens/CartScreen/Cart.type';
import {ProductProps} from 'src/screens/ProductListScreen/Products.type';

export type RootStackParamList = {
  Auth: undefined;
  ChangePassword: {email: string; tempPassword: string};
  Products: undefined;
  Cart: undefined;
  ProductDetails: {
    product?: ProductProps; //Local product item
    fromCart?: boolean;
    cartItem?: CartItem; // Cart Object
  };
};

// Type helpers for each screen
export type AuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
>;
export type ProductListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Products'
>;
export type CartScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Cart'
>;
export type ProductDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;
export type ChangePasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;
