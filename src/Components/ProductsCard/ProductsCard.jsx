import { Link } from "react-router";

const ProductsCard = ({ products }) => {
  const { title, image, price_min, price_max, condition, location , usage , _id } = products;

  return (
    <div className="rounded-lg bg-white p-2 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      
      <div className="h-60 w-full overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      
      <div className="mt-2 space-y-1">
        <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
          {title}
        </h2>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs capitalize text-gray-500">{condition} - {usage}</span>

          <span className="text-xs text-gray-500">{location}</span>
        </div>

        <p className="text-sm font-semibold text-purple-600">
          ৳{price_min} - ৳{price_max}
        </p>

        <Link to={`/products/productDetails/${_id}`} className="w-full block text-center rounded-sm border border-purple-400 py-1.5 text-xs font-medium text-purple-600 transition hover:bg-purple-600 hover:text-white cursor-pointer">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductsCard;
