import Toast from "react-native-toast-message";
import { fetchCartItems, upsertCartItem } from "src/api/graphql";
import { CartItem } from "src/screens/CartScreen/Cart.type";
import { ProductProps } from "src/screens/ProductListScreen/Products.type";

export const useCartActions = () => {
  const handleAddItemToCart = async (
    product: ProductProps,
    quantity: number = 1,
    isInCart: boolean = false,
    itemCart?: CartItem,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      handleProductDetailsLogic?: boolean;
    }
  ) => {
    let cartItem: CartItem | undefined;

    const reviveSoftDeletedItem =
      (options?.handleProductDetailsLogic &&
        itemCart &&
        itemCart.metadata.quantity === 0) ||
      !!isInCart;

    if (reviveSoftDeletedItem) {
      cartItem = {
        id: product.id,
        name: product.title,
        content: product.description,
        metadata: {
          price: product.price,
          quantity,
          image: product.image,
          reviews: product.reviews,
          rating: product.rating,
          category: product.category,
          productid: String(product.id),
        },
      };
    } else if (itemCart) {
      // Item exists in cart (with quantity 0), so restore it
      cartItem = {
        ...itemCart,
        metadata: {
          ...itemCart.metadata,
          quantity,
        },
      };
    }
    if (cartItem) {
      options?.onStart?.();

      try {
        const qlcartItem: CartItem = { ...cartItem };

        if (!reviveSoftDeletedItem) {
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
        options?.onEnd?.();
      }
    }
  };

  const handleRemoveCartItem = async (
    item: CartItem,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
    }
  ) => {
    try {
      options?.onStart?.();
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
        text1: "Failed to remove Product!",
      });
    } finally {
      await fetchCartItems();
      options?.onEnd?.();
    }
  };

  const handleUpdateQuantity = async (
    item: CartItem,
    quantity: number,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
    }
  ) => {
    if (quantity <= 0) {
      return;
    }

    const updatedItem = {
      id: item.id,
      name: item.name,
      content: item.content,
      metadata: {
        ...item.metadata,
        quantity,
      },
    };
    options?.onStart?.();
    try {
      await upsertCartItem(updatedItem);
    } catch (error) {
    } finally {
      await fetchCartItems();
      options?.onEnd?.();
    }
  };

  return {
    handleAddItemToCart,
    handleRemoveCartItem,
    handleUpdateQuantity,
  };
};
