import { useLoaderData } from "react-router";

const ProductDetails = () => {
    const productsData = useLoaderData();
    console.log(productsData)
  return (
    <section className="min-h-screen bg-[#f5f5f5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-2">
        
        <div className="space-y-5">
          <div className="h-64 overflow-hidden rounded-lg bg-gray-300 sm:h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab"
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-lg bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Description
            </h2>

            <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm">
              <p>
                <span className="text-gray-500">Condition:</span>{" "}
                <span className="text-purple-600">Used</span>
              </p>

              <p>
                <span className="text-gray-500">Usage Time:</span>{" "}
                <span className="font-medium">1 Year Old</span>
              </p>
            </div>

            <hr className="my-4" />

            <p className="text-sm leading-6 text-gray-500">
              This product is in good condition and works properly. It has been
              well maintained and is ready for use. Contact the seller for more
              information about the product.
            </p>
          </div>
        </div>

        
        <div className="space-y-4">
          <a
            href="/allProducts"
            className="inline-block text-sm text-slate-700 hover:text-purple-600"
          >
            ← Back To Products
          </a>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              iPhone 13 For Sale
            </h1>

            <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600">
              Electronics
            </span>
          </div>

         
          <div className="rounded-lg bg-white p-4">
            <h2 className="text-2xl font-bold text-green-600">
              ৳35,000 - ৳40,000
            </h2>
            <p className="mt-1 text-xs text-gray-500">Price Range</p>
          </div>

          <div className="rounded-lg bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Details
            </h2>

            <div className="mt-3 space-y-3 text-sm text-gray-600">
              <p>
                <span className="font-medium text-slate-900">Product ID:</span>{" "}
                6ac9f47df7bd1435c5c47ed8
              </p>

              <p>
                <span className="font-medium text-slate-900">Category:</span>{" "}
                Electronics
              </p>

              <p>
                <span className="font-medium text-slate-900">Condition:</span>{" "}
                Used
              </p>
            </div>
          </div>

          
          <div className="rounded-lg bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Seller Information
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="Seller"
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-medium text-slate-900">Rahim Ahmed</h3>
                <p className="mt-1 text-xs text-gray-500">Product Seller</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Location:</span> Dhaka
              </p>
              <p>
                <span className="font-medium">Contact:</span> 01710000001
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
                  Pending
                </span>
              </p>
            </div>
          </div>

          <button className="w-full rounded-md bg-linear-to-r from-purple-600 to-purple-500 py-3 font-semibold text-white transition hover:opacity-90">
            I Want To Buy This Product
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
