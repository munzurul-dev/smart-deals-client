import { use } from "react";
import ProductsCard from "../ProductsCard/ProductsCard";
import { Link } from "react-router";

const LatestProducts = ({ latestProductsPromise }) => {
  const productsData = use(latestProductsPromise);
  //console.log(productsData);
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-5 ">
        Recent <span className="text-primary">Products</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 mt-5">
        {productsData.map((products) => (
          <ProductsCard key={products._id} products={products}></ProductsCard>
        ))}
      </div>
      <div className="mt-5 mb-5 text-center">
        <Link
          to="/products/allProducts"
          className="bg-linear-to-r from-[#7024e8] to-[#a45cf0]  text-white py-2 px-5 rounded-md "
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
