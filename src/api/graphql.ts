import { gql } from "@apollo/client";
import {
  deleteItemMutation,
  listItemsQuery,
  upsertItemMutation,
} from "src/graphql/mutations";
import { CartItem } from "src/screens/CartScreen/Cart.type";
import { store } from "src/store";
import { createApolloClient } from "src/services/apolloclient";
import { signOut } from "src/store/authSlice";
import { loadCart } from "src/store/cartSlice";

const LIST_ITEMS_QUERY = gql(listItemsQuery);
const DELETE_ITEM_MUTATION = gql(deleteItemMutation);

function isAuthError(error: any): boolean {
  return (
    error?.networkError?.statusCode === 401 || error?.message?.includes("401")
  );
}

// Function to call upsertItem mutation
export async function upsertCartItem(item: {
  id?: number;
  name: string;
  content: string;
  metadata: any;
}) {
  const token = store.getState().auth.token;
  const client = createApolloClient(token);

  try {
    const mutation = gql(upsertItemMutation);

    const { data } = await client.mutate({
      mutation,
      variables: { input: item },
    });

    return data;
  } catch (error) {
    if (isAuthError(error)) {
      console.log("Token expired or invalid. Logging out...");
      store.dispatch(signOut());
    } else {
      console.log("GraphQL upsertItem error:", error);
    }
    throw error;
  }
}

// Function to fetch all cart items
export async function fetchCartItems(): Promise<CartItem[]> {
  const token = store.getState().auth.token;
  const client = createApolloClient(token);
  try {
    const { data } = await client.query({
      query: LIST_ITEMS_QUERY,
      fetchPolicy: "network-only",
    });
    const cleanItems = data.listItems.map(
      ({ __typename, ...rest }: any) => rest
    );

    store.dispatch(loadCart(cleanItems));

    return cleanItems as CartItem[];
  } catch (error) {
    if (isAuthError(error)) {
      console.log("Token expired or invalid. Logging out...");
      store.dispatch(signOut());
    } else {
      console.log("GraphQL listItems error:", error);
    }
    return [];
  }
}
