import { use, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const MyBids = () => {
  const [myBids, setMyBids] = useState([]);
  const { users } = use(AuthContext);
  useEffect(() => {
    if (users?.email) {
      fetch(`http://localhost:3000/bids?email=${users.email}`)
        .then((res) => res.json())
        .then((data) => setMyBids(data));
    }
  }, [users?.email]);
  console.log("satete :", myBids);

  const handleBidRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this bid?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/bids/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setMyBids((prevBids) => prevBids.filter((bid) => bid._id !== id));

        alert(data.message || "Bid removed successfully!");
      } else {
        alert(data.message || "Failed to remove bid.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="mx-auto my-6 w-full max-w-7xl px-3 sm:px-5 lg:px-8">
      <h2 className="text-2xl text-center mb-5 font-bold  tracking-tight text-gray-800 sm:text-2xl">
        My Bids: <span className="text-primary"> {myBids.length}</span>
      </h2>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-212.5 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">SL No</th>
                <th className="px-5 py-4 font-semibold">Product</th>
                <th className="px-5 py-4 font-semibold">Seller</th>
                <th className="px-5 py-4 font-semibold">Bid Price</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {myBids.map((bid, index) => (
                <tr
                  key={bid._id || index}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-gray-500">{index + 1}</td>

                  <td className="px-5 py-4">
                    <div className="flex min-w-45 items-center gap-3">
                      <img
                        src={bid.product_image}
                        alt={bid.product_title || "Product"}
                        className="h-12 w-12 shrink-0 rounded-xl border border-gray-100 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800">
                          {bid.product_title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Expected: ৳{bid.expected_price}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex min-w-45 items-center gap-3">
                      <img
                        src={bid.seller_image}
                        alt={bid.buyer_name || "Seller"}
                        className="h-10 w-10 shrink-0 rounded-full border border-gray-100 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800">
                          {bid.buyer_name}
                        </p>
                        <p className="mt-1 max-w-50 break-all text-xs text-gray-500">
                          {bid.buyer_email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="rounded-lg bg-blue-50 px-3 py-2 font-bold text-blue-700">
                      ৳{bid.bid_price}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        (bid.status || "Pending").toLowerCase() === "accepted"
                          ? "bg-green-100 text-green-700"
                          : (bid.status || "Pending").toLowerCase() ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {bid.status || "Pending"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleBidRemove(bid._id)}
                      type="button"
                      className="whitespace-nowrap rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-4 bg-gray-50/60 p-3 sm:grid-cols-2 sm:p-4 lg:hidden">
          {myBids.map((bid, index) => (
            <article
              key={bid._id || index}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                  Bid #{index + 1}
                </span>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    (bid.status || "Pending").toLowerCase() === "accepted"
                      ? "bg-green-100 text-green-700"
                      : (bid.status || "Pending").toLowerCase() === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {bid.status || "Pending"}
                </span>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={bid.product_image}
                  alt={bid.product_title || "Product"}
                  className="h-14 w-14 shrink-0 rounded-xl border border-gray-100 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="wrap-break-word font-bold text-gray-800">
                    {bid.product_title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Expected: ৳{bid.expected_price}
                  </p>
                </div>
              </div>

              <div className="my-4 border-t border-gray-100" />

              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={bid.seller_image}
                  alt={bid.buyer_name || "Seller"}
                  className="h-10 w-10 shrink-0 rounded-full border border-gray-100 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">Seller</p>
                  <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
                    {bid.buyer_name}
                  </p>
                  <p className="mt-1 break-all text-xs text-gray-500">
                    {bid.buyer_email}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-blue-50 p-3">
                <span className="text-sm font-medium text-gray-600">
                  Your Bid
                </span>
                <span className="text-lg font-bold text-blue-700">
                  ৳{bid.bid_price}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleBidRemove(myBids._id)}
                className="mt-4 w-full rounded-lg border  border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                Remove Bid
              </button>
            </article>
          ))}
        </div>

        {myBids.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="font-semibold text-gray-800">No bids found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your bids will appear here when you place one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;
