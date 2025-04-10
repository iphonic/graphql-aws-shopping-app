import { StyleSheet } from "react-native";
import styleConfig from "src/config/style-config";

const { screenBGColor, fontFamily, themeColor } = styleConfig;

export default StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { padding: 16 },
  container: { flex: 1, padding: 16, backgroundColor: screenBGColor },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    fontFamily,
  },
  filterRow: { flexDirection: "column", marginBottom: 12 },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 8,
    fontFamily,
    textTransform: "capitalize",
  },
  chipSelected: { backgroundColor: themeColor },
  chipText: {
    fontSize: 12,
    color: "#333",
    fontFamily,
    textTransform: "capitalize",
  },
  chipTextSelected: {
    fontSize: 12,
    color: "#fff",
    fontFamily,
    textTransform: "capitalize",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    fontFamily,
  },
  cartQuantity: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#4f46e5",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  cartQuantityText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  searchContainer: {
    position: "relative",
    justifyContent: "center",
  },

  clearIcon: {
    position: "absolute",
    right: 10,
    transform: [{ translateY: -6 }],
    padding: 5,
  },
});
