import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { createApolloClient } from "./apolloclient";

export default function ApolloWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) return <>{children}</>; // Don't provide Apollo if not logged in

  const client = createApolloClient(token);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
