import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { users, unsubscribe } = use(AuthContext);
  const handleSignOut = () => {
    unsubscribe()
      .then(() => {
        alert("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  const navlink = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? " text-primary font-bold"
              : "text-base-content hover:bg-base-200"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products/allProducts"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? "text-primary font-bold"
              : "text-base-content hover:bg-base-200"
          }`
        }
      >
        All Products
      </NavLink>

      <NavLink
        to="/myproducts"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? "text-primary font-bold"
              : "text-base-content hover:bg-base-200"
          }`
        }
      >
        My Products
      </NavLink>

      <NavLink
        to="/mybids"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-primary text-white font-semibold"
              : "text-base-content hover:bg-base-200"
          }`
        }
      >
        My Bids
      </NavLink>

      <NavLink
        to="/createproduct"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? "text-primary font-bold"
              : "text-base-content hover:bg-base-200"
          }`
        }
      >
        Create Product
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {navlink}
          </ul>
        </div>
        <a className="btn hidden md:flex btn-ghost text-xl">
          Smart<span className="text-primary">Deals</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlink}</ul>
      </div>
      {users ? (
        <div className="navbar-end">
          <a
            onClick={handleSignOut}
            className="  border border-primary text-primary py-1.5 px-5 rounded-md cursor-pointer hover:bg-pink-50 "
          >
            LogOut
          </a>
        </div>
      ) : (
        <div className="navbar-end flex gap-5">
          <a href="/auth/login" className=" border border-primary text-primary py-1.5 px-5 rounded-md cursor-pointer hover:bg-pink-50 ">
            Login
          </a>
          <Link
            to="/auth/register"
            className=" rounded-md bg-linear-to-r from-[#7024e8] to-[#a45cf0] py-2 px-4 font-semibold text-white  cursor-pointer"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
