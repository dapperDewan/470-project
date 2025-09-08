import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBagIcon, CurrencyDollarIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";

function MerchandisePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: ""
  });
  const [formError, setFormError] = useState("");
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name || !form.price || !form.image) {
      setFormError("Name, price, and image URL are required.");
      return;
    }
    try {
      const res = await axios.post("/api/merchandise", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock) || 10
      });
      setItems(prev => [...prev, res.data]);
      setMessage("Product listed successfully!");
      setShowForm(false);
      setForm({ name: "", description: "", price: "", image: "", stock: "", category: "" });
    } catch {
      setFormError("Failed to list product. Try again.");
    }
  };

  // Real admin check
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  useEffect(() => {
    async function fetchMerchandise() {
      try {
        const res = await axios.get("/api/merchandise");
        setItems(res.data);
      } catch {
        setItems([]);
      }
      setLoading(false);
    }
    fetchMerchandise();
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i._id === item._id);
      if (exists) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setMessage(`${item.name} added to cart!`);
  };

  const handleCheckout = async () => {
    setMessage("");
    let success = true;
    for (const cartItem of cart) {
      for (let i = 0; i < cartItem.quantity; i++) {
        try {
          await axios.post(`/api/merchandise/${cartItem._id}/buy`);
        } catch {
          success = false;
        }
      }
    }
    if (success) {
      setMessage("Purchase successful!");
      setCart([]);
      // Refetch items to update stock
      const res = await axios.get("/api/merchandise");
      setItems(res.data);
    } else {
      setMessage("Some items could not be purchased. Try again!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8 border border-gray-200 relative">
      <button
        className="mb-6 px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition-colors"
        onClick={() => setShowForm(v => !v)}
      >
        {showForm ? "Cancel" : "List a Product"}
      </button>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="mb-8 p-6 bg-gray-50 rounded-xl shadow flex flex-col gap-4 max-w-lg mx-auto">
          <h3 className="text-xl font-bold mb-2">List a New Product</h3>
          {formError && <div className="text-red-500 mb-2">{formError}</div>}
          <input name="name" value={form.name} onChange={handleFormChange} placeholder="Product Name" className="border px-3 py-2 rounded" required />
          <input name="description" value={form.description} onChange={handleFormChange} placeholder="Description" className="border px-3 py-2 rounded" />
          <input name="price" value={form.price} onChange={handleFormChange} placeholder="Price" type="number" min="0" className="border px-3 py-2 rounded" required />
          <input name="image" value={form.image} onChange={handleFormChange} placeholder="Image URL" className="border px-3 py-2 rounded" required />
          <input name="stock" value={form.stock} onChange={handleFormChange} placeholder="Stock" type="number" min="0" className="border px-3 py-2 rounded" />
          <input name="category" value={form.category} onChange={handleFormChange} placeholder="Category" className="border px-3 py-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">List Product</button>
        </form>
      )}
      <button
        className="fixed top-24 right-8 z-50 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-bold shadow hover:bg-blue-700 transition-colors"
        onClick={() => setShowCart(v => !v)}
      >
        <ShoppingCartIcon className="h-6 w-6" />
        Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
      </button>
      {showCart && <Cart cart={cart} setCart={setCart} onCheckout={handleCheckout} />}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
        <ShoppingBagIcon className="h-8 w-8 text-blue-500" />
        NBA Merchandise
      </h2>
      {message && <div className="mb-6 text-green-600 font-bold text-center text-lg animate-fade-in">{message}</div>}
      {loading ? (
        <div className="text-center py-8 text-blue-500 animate-pulse text-xl">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-lg">No merchandise found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.filter(item => item.verified || isAdmin).map(item => {
            // Use provided image for NBA Basketball
            const basketballImg = 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg';
            const imgSrc = item.name === 'NBA Basketball'
              ? basketballImg
              : (item.image || 'https://via.placeholder.com/200x200?text=NBA+Merch');
            return (
              <div key={item._id} className="bg-gray-50 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <img
                  src={imgSrc}
                  alt={item.name}
                  className="h-36 w-36 object-cover mx-auto rounded-lg mb-2 border-2 border-blue-200"
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x200?text=NBA+Merch'; }}
                />
                <div className="text-xs font-bold text-white bg-blue-500 px-2 py-1 rounded-full w-fit mx-auto mb-2">{item.category || 'NBA'}</div>
                <div className="font-bold text-lg text-gray-800 text-center">{item.name}</div>
                <div className="text-gray-600 text-center text-sm">{item.description}</div>
                <div className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-700">
                  <CurrencyDollarIcon className="h-5 w-5 text-blue-500" />
                  {item.price}
                </div>
                <div className="text-sm text-gray-500 text-center">Stock: <span className={item.stock > 5 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>{item.stock}</span></div>
                <button
                  onClick={() => addToCart(item)}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-full font-bold shadow hover:bg-blue-700 transition-colors mt-2 ${item.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={item.stock <= 0}
                >
                  {item.stock > 0 ? "Add to Cart" : "Sold Out"}
                </button>
                {isAdmin && (
                  <div className="mt-2 flex gap-2 justify-center">
                    {!item.verified && <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={async () => {
                      await axios.post(`/api/merchandise/${item._id}/verify`);
                      setItems(items => items.map(i => i._id === item._id ? { ...i, verified: true } : i));
                    }}>Verify</button>}
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={async () => {
                      await axios.delete(`/api/merchandise/${item._id}`);
                      setItems(items => items.filter(i => i._id !== item._id));
                    }}>Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MerchandisePage;
