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
import Toast from "react-native-toast-message";
import { fetchCartItems, upsertCartItem } from "src/api/graphql";
import { CartItem } from "../CartScreen/Cart.type";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { cartItemById } from "src/store/cartSlice";

const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const navigation = useNavigation();

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
    let cartItemToAdd: CartItem;

    if (product && !fromCart) {
      setLoading(true);
      let toUpdate = true;
      if (itemCart && itemCart.metadata.quantity === 0) {
        // Item exists in cart (with quantity 0), so restore it
        cartItemToAdd = {
          ...itemCart,
          metadata: {
            ...itemCart.metadata,
            quantity: 1,
          },
        };
      } else {
        cartItemToAdd = {
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
        toUpdate = false;
      }

      try {
        const qlcartItem: CartItem = { ...cartItemToAdd };

        //If we need to create new entry don't need id
        if (!toUpdate) delete qlcartItem.id;

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
        setLoading(false);
        navigation.goBack();
        fetchCartItems();
      }
    }
  };

  const handleRemoveItem = async (item: any) => {
    setLoading(true);
    try {
      await upsertCartItem({
        ...item,
        metadata: { ...item.metadata, quantity: 0 },
      });
      Toast.show({
        type: "success",
        text1: "Product removed from cart!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to remove from Cart!",
      });
    } finally {
      setLoading(false);
      navigation.goBack();
      fetchCartItems();
    }
  };

  const updateQuantity = async (item: any, qty: number) => {
    if (qty <= 0) {
      return;
    }

    const updatedItem = {
      id: item.id,
      name: item.name,
      content: item.content,
      metadata: {
        ...item.metadata,
        quantity: qty,
      },
    };
    try {
      await upsertCartItem(updatedItem);
      await fetchCartItems();
    } catch (error) {
    } finally {
      setUpdatingQty(false);
    }
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
