import { useState } from "react";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";

function Cart({ cart, setCart, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  return (
    <div className="fixed top-20 right-8 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 z-50">
      <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        <ShoppingCartIcon className="h-7 w-7 text-blue-500" />
        Your Cart
      </h3>
      {cart.length === 0 ? (
        <div className="text-gray-400 text-center">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow">
              <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded" />
              <div className="flex-1 ml-3">
                <div className="font-bold text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                <div className="text-sm text-blue-700 font-semibold">${item.price * item.quantity}</div>
              </div>
              <button onClick={() => removeItem(item._id)} className="ml-2 text-red-500 hover:text-red-700">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
          <div className="font-bold text-lg text-blue-700 text-right">Total: ${total.toFixed(2)}</div>
          <button
            onClick={onCheckout}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-full font-bold shadow hover:bg-blue-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
