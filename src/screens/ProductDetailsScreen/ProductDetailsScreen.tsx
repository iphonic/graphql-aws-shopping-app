import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./ProductDetailsScreen.style";

import { ProductDetailsScreenProps } from "src/types/navigation";
import MinusIcon from "src/icons/MinusIcon";
import PlusIcon from "src/icons/PlusIcon";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { cartItemById } from "src/store/cartSlice";
import { useCartActions } from "src/hooks/useCartActions";

const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const navigation = useNavigation();

  const { handleRemoveCartItem, handleAddItemToCart, handleUpdateQuantity } =
    useCartActions();

  const [loading, setLoading] = useState(false);

  const [updatingQty, setUpdatingQty] = useState(false);

  const { product, fromCart, cartItem } = route.params;
  const [quantity, setQuantity] = useState(() => {
    const q = fromCart ? cartItem?.metadata.quantity : product?.quantity;
    return q && q > 0 ? q : 1;
  });

  const itemCart = useSelector((state: RootState) =>
    product?.id !== undefined
      ? cartItemById(state, product.id)
      : fromCart
      ? cartItem
      : undefined
  );

  var showAddToCartButton = !itemCart || itemCart.metadata?.quantity === 0;

  if (fromCart) {
    showAddToCartButton = false;
  }

  const handleAddToCart = async () => {
    if (product && !fromCart) {
      await handleAddItemToCart(product, 1, fromCart, itemCart, {
        onStart: () => setLoading(true),
        onEnd: () => {
          setLoading(false);
          navigation.goBack();
        },
        handleProductDetailsLogic: true,
      });
    }
  };

  const handleRemoveItem = async (item: any) => {
    await handleRemoveCartItem(item, {
      onStart: () => setLoading(true),
      onEnd: () => {
        setLoading(false);
        navigation.goBack();
      },
    });
  };

  const updateQuantity = async (item: any, qty: number) => {
    await handleUpdateQuantity(item, qty, {
      onEnd: () => setUpdatingQty(false),
    });
  };

  useEffect(() => {
    //Update the cart if the Item was added to the cart
    if (fromCart && updatingQty && !showAddToCartButton) {
      updateQuantity(cartItem, quantity);
    }
  }, [quantity, updatingQty]);

  const handleRemoveProduct = () => {
    Alert.alert("Remove Item", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => handleRemoveItem(cartItem),
      },
    ]);
  };

  if (!product) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{"Product not found."}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        ⭐ {product.rating} ({product.reviews} reviews)
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => {
              setQuantity((q) => Math.max(1, q - 1));
              setUpdatingQty(true);
            }}
            style={styles.qtyButton}
          >
            <MinusIcon width={16} />
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity((q) => q + 1);
              setUpdatingQty(true);
            }}
            style={styles.qtyButton}
          >
            <PlusIcon width={16} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (showAddToCartButton) {
            handleAddToCart();
          } else {
            handleRemoveProduct();
          }
        }}
        style={showAddToCartButton ? styles.addToCart : styles.removeFromCart}
        disabled={loading}
      >
        {loading ? (
          <View>
            <ActivityIndicator color="#fff" size={"small"} />
          </View>
        ) : (
          <Text style={styles.addToCartText}>
            {showAddToCartButton ? "Add to Cart" : "Remove from Cart"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetailsScreen;
