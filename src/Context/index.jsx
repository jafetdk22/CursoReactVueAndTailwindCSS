import { createContext, useState, useEffect } from "react";
import productsData from "../data/products.json";
export const ShoppingContext = createContext();

export const ShoppingContextProvider = ({ children }) => {
  // Shopping Cart » Count
  const [count, setCount] = useState(0);
  const categoriesPath = [
    { path: "/clothes", label: "Clothes", category: "Clothes" },
    { path: "/electronics", label: "Electronics", category: "Electronics" },
    { path: "/furnitures", label: "Furnitures", category: "Furniture" },
    // { path: '/toys', label: 'Toys', category: 'Toy' },
    { path: "/shoes", label: "Shoes", category: "Shoes" },
    { path: "/others", label: "Others", category: "Others" },
  ];

  const [categories, setCategories] = useState(categoriesPath);

  // Product Details » Open/Close
  const [isOpenProductDetails, setIsOpenProductDetails] = useState(false);
  const openProductDetails = () => {
    setIsOpenProductDetails(true);
  };
  const closeProductDetails = () => {
    setIsOpenProductDetails(false);
  };

  // Checkout Side Menu » State
  const [isOpenCheckoutSideMenu, setIsOpenCheckoutSideMenu] = useState(false);
  const openCheckoutSideMenu = () => {
    setIsOpenCheckoutSideMenu(true);
  };
  const closeCheckoutSideMenu = () => {
    setIsOpenCheckoutSideMenu(false);
  };

  // Product Details » Product to Show
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart » Add Product to Cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart » order
  const [order, setOrder] = useState([]);

  // Search
  const [search, setSearch] = useState("");
  // Products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/productss")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
          setFilteredItems(data);
        } else {
          // Si el fetch está vacío o no es un formato correcto, usa los datos locales
          console.warn("No data found from API, using local data.");
          setItems(productsData); // Usar el archivo local
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // En caso de error de fetch, usar los datos locales
        setItems(productsData);
      });
  }, []);

  const filteredItemsByTitle = (items, search) => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  };
  useEffect(() => {
    if (search.length > 0) {
      setFilteredItems(filteredItemsByTitle(items, search));
    }
  }, [items, search]);

  // Search by category
  const [searchByCategory, setSearchByCategory] = useState("");

  const filteredItemsByCategory = (items, searchByCategory) => {
    if (searchByCategory !== "Others") {
      return items.filter((item) =>
        item.category.name
          .toLowerCase()
          .includes(searchByCategory.toLowerCase())
      );
    } else {
      const categoriesExcluded = categoriesPath
        .filter((category) => category.category !== "Others")
        .map((category) => category.label.toLowerCase());
      // Filtramos los items para que no incluyan las categorías excluidas
      return items.filter(
        (item) => !categoriesExcluded.includes(item.category.name.toLowerCase())
      );
    }
  };

  const filteredBy = (searchByType, items, search, searchByCategory) => {
    if (searchByType === "BY_TITLE") {
      return filteredItemsByTitle(items, search);
    }
    if (searchByType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }
    if (searchByType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByTitle(
        filteredItemsByCategory(items, searchByCategory),
        search
      );
    }
    if (!searchByType) {
      return items;
    }
  };

  useEffect(() => {
    if (search && searchByCategory)
      setFilteredItems(
        filteredBy("BY_TITLE_AND_CATEGORY", items, search, searchByCategory)
      );
    if (search && !searchByCategory)
      setFilteredItems(filteredBy("BY_TITLE", items, search, searchByCategory));
    if (searchByCategory && !search)
      setFilteredItems(
        filteredBy("BY_CATEGORY", items, search, searchByCategory)
      );
    if (!search && !searchByCategory)
      setFilteredItems(filteredBy(null, items, search, searchByCategory));
  }, [items, searchByCategory, search]);

  return (
    <ShoppingContext.Provider
      value={{
        count,
        setCount,
        isOpenProductDetails,
        openProductDetails,
        closeProductDetails,
        isOpenCheckoutSideMenu,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        cartProducts,
        setCartProducts,
        productToShow,
        setProductToShow,
        order,
        setOrder,
        search,
        setSearch,
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory,
        categories,
        setCategories,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
