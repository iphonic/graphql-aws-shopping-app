import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { fetchCartItems } from "src/api/graphql";
import styles from "./CartScreen.style";

import { CartScreenProps } from "src/types/navigation";
import CartRow from "./CartRow";

import { CartItem } from "./Cart.type";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export default function CartScreen({ navigation }: CartScreenProps) {
  const [loading, setLoading] = useState(true);

  const items = useSelector((state: RootState) =>
    state.cart.items.filter((item) => item.metadata.quantity > 0)
  );

  const fetchRemoteCartItems = async (initialFetch = true) => {
    setLoading(initialFetch);
    try {
      await fetchCartItems();
    } catch (error) {
      console.log("GraphQL fetchCartItems failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.metadata.price * item.metadata.quantity,
      0
    );
  };

  useEffect(() => {
    fetchRemoteCartItems();
  }, []);

  const renderItem = ({ item }: { item: CartItem }) => {
    return <CartRow navigation={navigation} item={item} />;
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!items.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.header}>Your Cart</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: ${calculateTotal().toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
