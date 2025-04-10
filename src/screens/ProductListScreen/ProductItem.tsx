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
import { useSelector } from "react-redux";
import { ProductItemProps } from "./ProductItem.type";
import { cartItemById } from "src/store/cartSlice";
import { RootState } from "src/store";
import { useCartActions } from "src/hooks/useCartActions";

export default function ProductItem({ navigation, item }: ProductItemProps) {
  const [loading, setLoading] = useState(false);

  const { handleRemoveCartItem, handleAddItemToCart } = useCartActions();

  const itemCart = useSelector((state: RootState) =>
    cartItemById(state, item.id)
  );

  const isInCart = !!itemCart;

  const showAddToCartButton = !itemCart || itemCart.metadata?.quantity === 0;

  const handleAddToCart = async () => {
    const product = item;

    await handleAddItemToCart(product, 1, isInCart, itemCart, {
      onStart: () => setLoading(true),
      onEnd: () => setLoading(false),
    });
  };

  const handleRemoveItem = async () => {
    if (itemCart) {
      const cartItem = {
        ...itemCart,
        metadata: { ...itemCart.metadata, quantity: 0 },
      };

      await handleRemoveCartItem(cartItem, {
        onStart: () => setLoading(true),
        onEnd: () => setLoading(false),
      });
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
