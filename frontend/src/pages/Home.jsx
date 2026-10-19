import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../App.jsx";

const PRODUCTS = [
  {
    id: 1, name: "Noir Biker Jacket", brand: "AESTHETICA",
    price: 7999, mrp: 12999, tag: "bestseller",
    rating: 4.8, reviews: 342, category: "jackets",
    image: "/images/leather_jacket.jpg",
  },
  {
    id: 2, name: "Slim-Fit Formal Suit", brand: "CLASSICO",
    price: 14999, mrp: 22999, tag: "new",
    rating: 4.9, reviews: 128, category: "formal",
    image: "/images/navy_suit.jpg",
  },
  {
    id: 3, name: "Oversized Comfort Hoodie", brand: "URBANIX",
    price: 2499, mrp: 3999, tag: null,
    rating: 4.6, reviews: 891, category: "hoodies",
    image: "/images/white_hoodie.jpg",
  },
  {
    id: 4, name: "Elegant Cocktail Dress", brand: "ROSÉ",
    price: 5999, mrp: 9499, tag: "sale",
    rating: 4.7, reviews: 256, category: "dresses",
    image: "/images/red_dress.jpg",
  },
  {
    id: 5, name: "Premium Slim-Fit Denim", brand: "DENIMCRAFT",
    price: 3499, mrp: 5999, tag: null,
    rating: 4.5, reviews: 1204, category: "jeans",
    image: "/images/denim_jeans.jpg",
  },
  {
    id: 6, name: "Urban Street Hoodie", brand: "URBANIX",
    price: 2799, mrp: 4499, tag: "new",
    rating: 4.4, reviews: 567, category: "hoodies",
    image: "/images/white_hoodie.jpg",
  },
  {
    id: 7, name: "Classic Leather Moto", brand: "AESTHETICA",
    price: 9499, mrp: 15999, tag: "bestseller",
    rating: 4.9, reviews: 89, category: "jackets",
    image: "/images/leather_jacket.jpg",
  },
  {
    id: 8, name: "Evening Silk Dress", brand: "ROSÉ",
    price: 7499, mrp: 11999, tag: "sale",
    rating: 4.8, reviews: 198, category: "dresses",
    image: "/images/red_dress.jpg",
  },
];

const CATEGORIES = ["All", "Jackets", "Formal", "Hoodies", "Dresses", "Jeans"];

function Stars({ rating }) {
  const full = Math.floor(rating);
  return (
    <div className="product-rating">
      {"★".repeat(full)}{"☆".repeat(5 - full)} <span>({rating})</span>
    </div>
  );
}

export default function Home() {
  const nav = useNavigate();
  const user = getUser();
  const [cart, setCart] = useState([]);
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) ||
                   p.brand.toLowerCase().includes(q.toLowerCase());
    const matchCat = activeCat === "All" || p.category === activeCat.toLowerCase();
    return matchQ && matchCat;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        return prev.map((c) => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const logout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <div className="home">
      {/* ── Navbar ─────────────────────────────── */}
      <header className="top">
        <div className="nav-brand">kartly</div>
        <div className="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search"
            placeholder="Search jackets, dresses, hoodies..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="nav-actions">
          <span className="nav-user">Hello, <strong>{user?.name}</strong></span>
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Bag
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="sign-out-btn" onClick={logout}>Sign out</button>
        </div>
      </header>

      <main className="home-content">
        {/* ── Hero ───────────────────────────────── */}
        <section className="hero">
          <div className="hero-badge">✦ New Season 2026</div>
          <h2>Elevate Your Style<br/>With <span>Premium Fashion</span></h2>
          <p>Discover curated collections from top designers. From streetwear essentials to formal elegance — all in one place.</p>
          <button className="hero-btn" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
            Shop Collection
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </section>

        {/* ── Categories ────────────────────────── */}
        <div className="categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill${activeCat === cat ? " active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Products ──────────────────────────── */}
        <section id="products">
          <div className="section-header">
            <h2 className="section-title">
              {activeCat === "All" ? "Trending Now" : activeCat}
            </h2>
            <span className="section-link">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="product-grid">
            {filtered.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try a different search or category</p>
              </div>
            )}
            {filtered.map((p) => (
              <article className="product-card" key={p.id}>
                <div className="product-img-wrap">
                  <img className="product-img" src={p.image} alt={p.name} />
                  {p.tag && (
                    <span className={`product-tag${p.tag === "new" ? " new" : p.tag === "sale" ? " sale" : ""}`}>
                      {p.tag}
                    </span>
                  )}
                  <button
                    className={`wishlist-btn${wishlist.includes(p.id) ? " active" : ""}`}
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Add to wishlist"
                  >
                    <svg viewBox="0 0 24 24" fill={wishlist.includes(p.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-brand">{p.brand}</div>
                  <div className="product-name">{p.name}</div>
                  <Stars rating={p.rating} />
                  <div className="product-price-row">
                    <span className="product-price">₹{p.price.toLocaleString("en-IN")}</span>
                    <span className="product-mrp">₹{p.mrp.toLocaleString("en-IN")}</span>
                    <span className="product-discount">
                      {Math.round((1 - p.price / p.mrp) * 100)}% off
                    </span>
                  </div>
                  <button className="add-cart-btn" onClick={() => addToCart(p)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    Add to Bag
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────── */}
      <footer>
        <div className="footer">
          <div className="footer-col">
            <h4>Shop</h4>
            <a href="#">New Arrivals</a>
            <a href="#">Bestsellers</a>
            <a href="#">Sale</a>
            <a href="#">Collections</a>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <a href="#">Track Order</a>
            <a href="#">Returns</a>
            <a href="#">Shipping</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Kartly. All rights reserved. Made with ❤️ in India.
        </div>
      </footer>

      {/* ── Cart Sidebar ──────────────────────── */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setCartOpen(false)} />
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Your Bag ({cartCount})</h2>
              <button className="cart-close" onClick={() => setCartOpen(false)}>×</button>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛍️</div>
                <p>Your bag is empty</p>
                <p style={{ fontSize: 13 }}>Start adding some fashion picks!</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img className="cart-item-img" src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <div className="cart-item-brand">{item.brand}</div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                          <span className="qty-count">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button className="cart-remove" onClick={() => removeFromCart(item.id)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span className="cart-total-label">Total</span>
                    <span className="cart-total-value">₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* ── Toast ─────────────────────────────── */}
      <div className={`toast${toast ? " show" : ""}`}>
        <span className="toast-icon">✓</span>
        {toast}
      </div>
    </div>
  );
}
