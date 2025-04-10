import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import styles from "./ProductListScreen.style";
import { ProductListScreenProps } from "src/types/navigation";
import { ProductProps } from "./Products.type";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, selectCartQuantity } from "src/store/cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styleConfig from "src/config/style-config";
import CartIcon from "src/icons/CartIcon";
import { fetchCartItems } from "src/api/graphql";
import LogoutIcon from "src/icons/LogoutIcon";
import { signOut } from "src/store/authSlice";
import ProductItem from "./ProductItem";
import Toast from "react-native-toast-message";
import ClearIcon from "src/icons/ClearIcon";

const { themeColor } = styleConfig;

export default function ProductListScreen({
  navigation,
}: ProductListScreenProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filtered, setFiltered] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const cartQty = useSelector(selectCartQuantity);

  const fetchProducts = async (initialFetch = true) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      const transformed = data.map(({ rating, ...rest }: any) => ({
        ...rest,
        rating: rating.rate,
        reviews: rating.count,
      }));

      setProducts(transformed);
      setFiltered(transformed);

      const cats: string[] = Array.from(
        new Set(data.map((p: ProductProps) => p.category))
      );
      setCategories(cats);

      //Fetch only after Login
      if (initialFetch) await fetchRemoteCartItems();
    } catch (err) {
      console.log("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRemoteCartItems = async () => {
    try {
      await fetchCartItems();
    } catch (error) {
      console.log("GraphQL fetchCartItems failed:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={{ padding: 8 }}>
              <View style={{ position: "relative" }}>
                <CartIcon />
                {cartQty > 0 && (
                  <View style={styles.cartQuantity}>
                    <Text style={styles.cartQuantityText}>{cartQty}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Logout", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Logout",
                  style: "destructive",
                  onPress: () => {
                    dispatch(signOut());
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Auth" }],
                    });
                  },
                },
              ])
            }
          >
            <View>
              <LogoutIcon />
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, cartQty]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredList = products;
    if (search.trim()) {
      filteredList = filteredList.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      filteredList = filteredList.filter(
        (p) => p.category === selectedCategory
      );
    }
    setFiltered(filteredList);
  }, [search, selectedCategory, products]);

  const renderItem = ({ item }: { item: ProductProps }) => (
    <ProductItem item={item} navigation={navigation} />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={themeColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.searchContainer]}>
          <TextInput
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={styles.clearIcon}
            >
              <ClearIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.filterRow}>
        <FlatList
          data={["", ...categories]}
          horizontal
          keyExtractor={(item) => item || "all"}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chip,
                selectedCategory === item && styles.chipSelected,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={
                  selectedCategory === item
                    ? styles.chipTextSelected
                    : styles.chipText
                }
              >
                {item || "All"}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={themeColor} />
      ) : search && !filtered.length ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No Product(s) found.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
