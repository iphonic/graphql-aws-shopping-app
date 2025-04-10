import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./ProductItem.style";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemProps } from "./ProductItem.type";
import { cartItemById } from "src/store/cartSlice";
import { RootState } from "src/store";
import { CartItem } from "../CartScreen/Cart.type";
import { fetchCartItems, upsertCartItem } from "src/api/graphql";
import Toast from "react-native-toast-message";

export default function ProductItem({ navigation, item }: ProductItemProps) {
  const [loading, setLoading] = useState(false);

  const itemCart = useSelector((state: RootState) =>
    cartItemById(state, item.id)
  );

  const isInCart = !!itemCart;

  const showAddToCartButton = !itemCart || itemCart.metadata?.quantity === 0;

  const handleAddToCart = async () => {
    setLoading(true);

    const product = item;

    let cartItem: CartItem;

    if (!isInCart) {
      cartItem = {
        id: product.id,
        name: product.title,
        content: product.description,
        metadata: {
          price: product.price,
          quantity: 1,
          image: product.image,
          reviews: product.reviews,
          rating: product.rating,
          category: product.category,
          productid: String(product.id),
        },
      };
    } else {
      // Item exists in cart (with quantity 0), so restore it
      cartItem = {
        ...itemCart,
        metadata: {
          ...itemCart.metadata,
          quantity: 1,
        },
      };
    }

    try {
      const qlcartItem: CartItem = { ...cartItem };

      if (!isInCart) {
        //We don't need to send id for new record
        delete qlcartItem.id;
      }

      await upsertCartItem(qlcartItem);
      Toast.show({
        type: "success",
        text1: "Product added to cart!",
        text2: "Check your cart for details.",
      });
    } catch (err) {
      console.log("Failed to sync with backend:", err);
      Toast.show({
        type: "error",
        text1: "Failed to add Product in cart!",
      });
    } finally {
      await fetchCartItems();
      setLoading(false);
    }
  };

  const handleRemoveItem = async () => {
    if (itemCart) {
      setLoading(true);

      const cartItem = {
        ...itemCart,
        metadata: { ...itemCart.metadata, quantity: 0 },
      };

      try {
        await upsertCartItem(cartItem);

        Toast.show({
          type: "success",
          text1: "Product removed from cart!",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to remove Product!",
        });
      } finally {
        await fetchCartItems();
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() =>
          navigation.navigate("ProductDetails", {
            product: item,
            fromCart: !showAddToCartButton,
            cartItem: itemCart,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.info}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <TouchableOpacity
                style={
                  showAddToCartButton ? styles.addButton : styles.removeButton
                }
                onPress={() => {
                  if (!showAddToCartButton) {
                    Alert.alert("Remove Item", "Are you sure?", [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => handleRemoveItem(),
                      },
                    ]);
                  } else {
                    handleAddToCart();
                  }
                }}
                disabled={loading}
              >
                {loading ? (
                  <View style={{ paddingHorizontal: 10 }}>
                    <ActivityIndicator color="#fff" size={"small"} />
                  </View>
                ) : (
                  <Text style={styles.addButtonText}>
                    {showAddToCartButton ? "Add to Cart" : "Remove"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
