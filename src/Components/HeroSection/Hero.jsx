import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="bg-[url('/images/hero-bg.png')] bg-cover bg-center px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 xl:px-20">
      <div className="mx-auto w-full max-w-7xl space-y-5 text-center">
        <h1 className="text-3xl font-extrabold leading-tight text-slate-800 sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="block mb-1 sm:mb-3">
            Deal Your <span className="text-primary">Products</span>
          </span>
          <span className="block">
            In A <span className="text-primary">Smart</span> Way!
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-6 text-[#627382] sm:text-base md:text-lg">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        
        <form onSubmit={ (e)=> e.preventDefault()} className="relative mx-auto flex w-full max-w-md pt-2">
          <input
            className="min-w-0 flex-1 rounded-l-full bg-white py-3 pl-4 pr-2 text-sm shadow-lg outline-none sm:py-3.5 sm:pl-5"
            type="search"
            placeholder="Search products, categories..."
          />

          <button
            aria-label="Search products"
            className="shrink-0 rounded-r-full cursor-pointer bg-linear-to-r from-[#7024e8] to-[#a45cf0] px-4 text-white transition hover:opacity-90 sm:px-5"
          >
            <IoSearchOutline size={20} />
          </button>
        </form>

    
        <div className="mx-auto flex w-full max-w-md flex-col items-stretch justify-center gap-3 pt-2 min-[400px]:flex-row min-[400px]:items-center">
          <Link
            to="/products"
            className="rounded-md bg-linear-to-r from-[#7024e8] to-[#a45cf0] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:text-base"
          >
            Watch All Products
          </Link>

          <Link
            to="/auth/login"
            className="rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-purple-50 sm:text-base"
          >
            Post a Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
