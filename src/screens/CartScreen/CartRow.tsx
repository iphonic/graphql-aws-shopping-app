import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import styles from "./CartItem.style";
import MinusIcon from "src/icons/MinusIcon";
import PlusIcon from "src/icons/PlusIcon";
import DeleteIcon from "src/icons/DeleteIcon";
import { ProductProps } from "../ProductListScreen/Products.type";
import { CartItemProps } from "./CartItem.type";
import { useCartActions } from "src/hooks/useCartActions";

export default function CartRow({ navigation, item }: CartItemProps) {
  const [removingItem, setRemovingItem] = useState(false);

  const { handleRemoveCartItem, handleUpdateQuantity } = useCartActions();

  const [addingQty, setAddingQty] = useState(false);
  const [removingQty, setRemovingQty] = useState(false);

  const { metadata } = item;

  const product: ProductProps = {
    id: item.id ?? 0,
    title: item.name,
    description: item.content,
    price: item.metadata.price,
    category: item.metadata.category,
    image: item.metadata.image ?? "",
    rating: item.metadata.rating,
    reviews: item.metadata.reviews,
    quantity: item.metadata.quantity,
  };

  const handleRemoveItem = async () => {
    await handleRemoveCartItem(item, {
      onStart: () => setRemovingItem(true),
      onEnd: () => setRemovingItem(false),
    });
  };

  const updateQuantity = async (qty: number) => {
    await handleUpdateQuantity(item, qty, {
      onEnd: () => {
        setRemovingQty(false);
        setAddingQty(false);
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetails", {
          product,
          fromCart: true,
          cartItem: item,
        })
      }
    >
      <View style={styles.card}>
        <Image source={{ uri: metadata.image }} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.content}
          </Text>
          <Text style={styles.price}>${metadata.price}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                onPress={() => {
                  setRemovingQty(true);
                  updateQuantity(metadata.quantity - 1);
                }}
                style={styles.qtyButton}
              >
                {removingQty ? (
                  <View>
                    <ActivityIndicator color="#000" size={"small"} />
                  </View>
                ) : (
                  <MinusIcon width={16} />
                )}
              </TouchableOpacity>
              <Text style={styles.qtyText}>{metadata.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  setAddingQty(true);
                  updateQuantity(metadata.quantity + 1);
                }}
                style={styles.qtyButton}
              >
                {addingQty ? (
                  <View>
                    <ActivityIndicator color="#000" size={"small"} />
                  </View>
                ) : (
                  <PlusIcon width={16} />
                )}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Remove Item", "Are you sure?", [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => handleRemoveItem(),
                    },
                  ])
                }
                style={styles.deleteBtn}
              >
                {removingItem ? (
                  <View style={{ paddingHorizontal: 5 }}>
                    <ActivityIndicator color="#fff" size={"small"} />
                  </View>
                ) : (
                  <DeleteIcon width={18} height={18} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
