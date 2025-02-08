import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingContext } from "../../Context";

const Home = () => {
  const context = useContext(ShoppingContext);
  const renderProducts = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => {
        return <Card key={item.id} data={item} />;
      });
    } else {
      return <h1>No products found</h1>;
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <input
        type="text"
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        placeholder="Search a product"
        value={context.search}
        onChange={(e) => context.setSearch(e.target.value)}
      />

      <div className="grid grid-cols-4 gap-4 w-full max-w-screen-lg">
        {renderProducts()}
      </div>
      <ProductDetail />
    </Layout>
  );
};

export default Home;
