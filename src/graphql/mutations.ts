// GraphQL mutation for upserting a cart item
export const upsertItemMutation = /* GraphQL */ `
  mutation UpsertItem($input: ItemInput!) {
    upsertItem(input: $input) {
      name
      content
      metadata
    }
  }
`;

// GraphQL query to list all cart items
export const listItemsQuery = /* GraphQL */ `
  query ListItems {
    listItems {
      id
      name
      content
      metadata
    }
  }
`;

// Optional: Get a single cart item by ID
export const getItemQuery = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      content
      metadata
    }
  }
`;

export const deleteItemMutation = /* GraphQL */ `
  mutation DeleteItem($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      id
    }
  }
`;
