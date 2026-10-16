import { use, useEffect, useRef, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const productsData = useLoaderData();

  const {
    condition,
    usage,
    description,
    image,
    title,
    category,
    price_max,
    price_min,
    _id,
    seller_image,
    seller_name,
    seller_contact,
    status,
    location,
  } = productsData;

  const { users } = use(AuthContext);
  const bidModalRef = useRef(null);
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);

  const handleBidModal = () => {
    bidModalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    bidModalRef.current?.close();
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newBid = {
      product: productsData._id,
      bid_price: form.elements.bid.value,
      product_image: image ,
      product_title:title,
      expected_price: price_max,
      buyer_name: form.elements.name.value,
      seller_image: users.photoURL,
      buyer_email: form.elements.email.value,
      buyer_contact: form.elements.number.value,
      status: "pending",
    };

    // console.log("Product ID:", productsData._id);
    // console.log("Bid Data:", newBid);

    try {
      const res = await fetch("http://localhost:3000/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBid),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit bid");
      }

      console.log("Bid saved successfully:", data);
      toast.success("Bid saved successfully!");
      setBids((prevBids) =>
        [...prevBids, { ...newBid, _id: data.insertedId }].sort(
          (a, b) => Number(b.bid_price) - Number(a.bid_price),
        ),
      );

      bidModalRef.current?.close();
      form.reset();
    } catch (error) {
      console.error("Error submitting bid:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/productsBids/${productsData._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Get bids from API:", data);
        setBids(data);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
      });
  }, [productsData._id]);

  return (
    <section className="min-h-screen bg-[#f5f5f5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="h-64 overflow-hidden rounded-lg bg-gray-300 sm:h-80 lg:h-96">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-lg bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Product Description
            </h2>

            <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm">
              <p>
                <span className="text-gray-500">Condition: </span>
                <span className="text-purple-600">{condition}</span>
              </p>

              <p>
                <span className="text-gray-500">Usage Time: </span>
                <span className="font-medium">{usage}</span>
              </p>
            </div>

            <hr className="my-4" />

            <p className="text-sm leading-6 text-gray-500">{description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-1 text-sm text-slate-700 hover:text-purple-600"
          >
            <GoArrowLeft />
            <span>Back To Products</span>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {title}
            </h1>

            <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600">
              {category}
            </span>
          </div>

          <div className="rounded-lg bg-white p-4">
            <h2 className="text-2xl font-bold text-green-600">
              ৳{price_min} - ৳{price_max}
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
                {_id}
              </p>

              <p>
                <span className="font-medium text-slate-900">Category:</span>{" "}
                {category}
              </p>

              <p>
                <span className="font-medium text-slate-900">Condition:</span>{" "}
                {condition}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Seller Information
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <img
                src={seller_image}
                alt={seller_name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-medium text-slate-900">{seller_name}</h3>
                <p className="mt-1 text-xs text-gray-500">Product Seller</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Location: </span>
                {location}
              </p>

              <p>
                <span className="font-medium">Contact: </span>
                {seller_contact}
              </p>

              <p>
                <span className="font-medium">Status: </span>
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
                  {status}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBidModal}
            className="w-full cursor-pointer rounded-md bg-linear-to-r from-purple-600 to-purple-500 py-3 font-semibold text-white transition hover:opacity-90"
          >
            I Want To Buy This Product
          </button>
        </div>
      </div>

      <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-4xl">
          <h3 className="text-center text-2xl font-bold">
            Give Seller Your Offered Price
          </h3>

          <div className="modal-action">
            <form onSubmit={handleSubmitBid} className="w-full">
              <div className="mx-auto flex max-w-2xl flex-col gap-5">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="w-full">
                    <label htmlFor="buyer-name" className="mb-2 block text-xl">
                      Name
                    </label>

                    <input
                      id="buyer-name"
                      type="text"
                      className="w-full rounded-md border border-gray-200 px-5 py-2 outline-0"
                      readOnly
                      name="name"
                      defaultValue={users?.displayName || ""}
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="buyer-email" className="mb-2 block text-xl">
                      Email
                    </label>

                    <input
                      id="buyer-email"
                      type="email"
                      className="w-full rounded-md border border-gray-200 px-5 py-2 outline-0"
                      readOnly
                      name="email"
                      defaultValue={users?.email || ""}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="bid-price" className="label">
                    Place your Price
                  </label>

                  <input
                    id="bid-price"
                    type="number"
                    name="bid"
                    min="1"
                    required
                    className="input w-full outline-0"
                    placeholder="Your bid amount"
                  />

                  <label htmlFor="buyer-contact" className="label">
                    Contact Info
                  </label>

                  <input
                    id="buyer-contact"
                    type="text"
                    className="input w-full outline-0"
                    readOnly
                    name="number"
                    defaultValue={seller_contact || ""}
                  />
                </div>
              </div>

              <div className="mx-auto mt-10 flex max-w-2xl justify-end gap-5">
                <button
                  type="submit"
                  className="cursor-pointer rounded-md bg-linear-to-r from-[#7024e8] to-[#a45cf0] px-4 py-2 font-semibold text-white"
                >
                  Submit Bid
                </button>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn px-5"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <div className="mx-auto mt-6 w-full max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:mt-10">
        <h2 className="p-4 text-lg font-bold leading-snug sm:p-5 sm:text-2xl md:text-3xl lg:text-4xl">
          Bids For This Products:{" "}
          <span className="text-primary">{bids.length}</span>
        </h2>

        {bids.length === 0 && (
          <p className="px-4 pb-6 text-center text-sm text-gray-500 sm:text-base">
            No bids yet.
          </p>
        )}

        {bids.length > 0 && (
          <>
            <div className="divide-y divide-gray-100 border-t border-gray-200 sm:hidden">
              {bids.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex flex-col gap-3 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                      ${item.bid_price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100">
                      {item.seller_image ? (
                        <img
                          src={item.seller_image}
                          referrerPolicy="no-referrer"
                          alt={item.buyer_name || "Seller"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-semibold text-blue-700">
                          {item.buyer_name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-800">
                        {item.buyer_name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {item.buyer_email}
                      </p>
                    </div>
                  </div>

                  <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95">
                    OutBid
                  </button>
                </div>
              ))}
            </div>

            <div className="hidden w-full overflow-x-auto sm:block">
              <table className="w-full text-left text-sm">
                <thead className="border-y border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-4 lg:px-6">
                      SL No
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 lg:px-6">
                      Seller Information
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 lg:px-6">
                      Bid Price
                    </th>
                    <th className="whitespace-nowrap px-4 py-4 text-right lg:px-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {bids.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className="transition-colors duration-200 hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-500 lg:px-6">
                        {index + 1}
                      </td>

                      <td className="px-4 py-4 lg:px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100">
                            {item.seller_image ? (
                              <img
                                src={item.seller_image}
                                referrerPolicy="no-referrer"
                                alt={item.buyer_name || "Seller"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-semibold text-blue-700">
                                {item.buyer_name?.charAt(0)?.toUpperCase() ||
                                  "U"}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-800">
                              {item.buyer_name}
                            </p>
                            <p className="mt-0.5 max-w-45 truncate text-xs text-gray-500 md:max-w-xs">
                              {item.buyer_email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 lg:px-6">
                        <span className="inline-flex rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">
                          ${item.bid_price}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right lg:px-6">
                        <button
                          onClick={handleBidModal}
                          className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95 lg:px-5 cursor-pointer"
                        >
                          OutBid
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
