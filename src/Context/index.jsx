import { createContext, useState, useEffect } from 'react';

export const ShoppingContext = createContext();

export const ShoppingContextProvider = ({ children }) => {
    // Shopping Cart » Count
    const [count, setCount] = useState(0)

    // Product Details » Open/Close
    const [isOpenProductDetails, setIsOpenProductDetails] = useState(false)
    const openProductDetails = () => {setIsOpenProductDetails(true)}
    const closeProductDetails = () => {setIsOpenProductDetails(false)}

    // Checkout Side Menu » State
    const [isOpenCheckoutSideMenu, setIsOpenCheckoutSideMenu] = useState(false)
    const openCheckoutSideMenu = () => {setIsOpenCheckoutSideMenu(true)}
    const closeCheckoutSideMenu = () => {setIsOpenCheckoutSideMenu(false)}

    // Product Details » Product to Show
    const [productToShow, setProductToShow] = useState({})

    // Shopping Cart » Add Product to Cart
    const [cartProducts, setCartProducts] = useState([])

    // Shopping Cart » order
    const [order, setOrder] = useState([])

    // Search
    const [search, setSearch] = useState('')
    // Products
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    useEffect(() => {
      fetch("https://api.escuelajs.co/api/v1/products")
        .then((response) => response.json())
        .then((data) => {
            setItems(data)
            setFilteredItems(data)
        })
        .catch((error) => console.error(error));
    }, []);

    const filteredItemsByTitle = (items, search) => {
        return items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    }
    useEffect(() => {
        if(search.length > 0){
         setFilteredItems(filteredItemsByTitle(items, search))
        }
      }, [items,search]);

      // Search by category
    const [searchByCategory, setSearchByCategory] = useState('');

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    const filteredBy = (searchByType, items, search , searchByCategory) => {
        if(searchByType ==='BY_TITLE'){
            return filteredItemsByTitle(items, search)
        }
        if(searchByType ==='BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if(searchByType ==='BY_TITLE_AND_CATEGORY'){
            return filteredItemsByTitle(filteredItemsByCategory(items, searchByCategory), search)
        }
        if(!searchByType){
            return items
        }
    }

    useEffect(() => {
        if(search && searchByCategory)setFilteredItems(filteredBy('BY_TITLE_AND_CATEGORY', items, search ,searchByCategory))
        if(search && !searchByCategory)setFilteredItems(filteredBy('BY_TITLE', items, search ,searchByCategory))
        if(searchByCategory && !search)setFilteredItems(filteredBy('BY_CATEGORY', items,search, searchByCategory))
        if(!search && !searchByCategory)setFilteredItems(filteredBy(null, items, search, searchByCategory))
      }, [items,searchByCategory,search]);

    return (
        <ShoppingContext.Provider value={{
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
            setSearchByCategory
        }}>
            {children}





        </ShoppingContext.Provider>
    );
}

export default ShoppingContext;



