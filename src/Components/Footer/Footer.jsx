const Footer = () => {
  return (
    <footer className="w-full bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div>
            <h2 className="text-2xl font-bold">
              Smart<span className="text-primary">Deals</span>
            </h2>
            <p className="mt-3 text-sm opacity-80">
              Find the best deals and discover amazing products.
            </p>
          </div>

          
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/home" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/allproducts" className="hover:text-primary">
                  All Products
                </a>
              </li>
              <li>
                <a href="/myproducts" className="hover:text-primary">
                  My Products
                </a>
              </li>
              <li>
                <a href="/mybids" className="hover:text-primary">
                  My Bids
                </a>
              </li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <p className="text-sm opacity-80">Email: support@smartdeals.com</p>
            <p className="text-sm opacity-80 mt-2">
              Find great deals, all in one place.
            </p>
          </div>
        </div>

        <div className="border-t border-base-content/20 mt-8 pt-5 text-center text-sm">
          <p>© {new Date().getFullYear()} SmartDeals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
