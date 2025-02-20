import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingContext } from "../../Context";

const Home = () => {
  const context = useContext(ShoppingContext);
  const renderProducts = () => {
    if (context.filteredItems?.length > 0) {
      
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg mx-auto px-6">
          {context.filteredItems.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      );

    } else {
      return (
        <div className="grid w-full max-w-screen-lg">
          <div className="flex flex-col items-center justify-center  p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold">
              No products found
            </h1>
            <p className="text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold mt-2 text-center">
              We couldn't find any products matching your search. Please try
              again later.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      <input
        type="text"
        className="w-96 p-1 px-2 rounded-lg border-2 focus:outline-none  focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 mb-6"
        placeholder="Search a product..."
        value={context.search}
        onChange={(e) => context.setSearch(e.target.value)}
      />

      {renderProducts()}
      <ProductDetail />
    </Layout>
  );
};

export default Home;
