"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(product) {
  let price = Number(product?.price);
  if (product?.size) {
     price += Number(product?.size.price);
  }
  if (product?.extras?.length > 0) {
    for (const extra of product?.extras) {
       price += Number(extra?.price);
    }
  }
  return price;
}


export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // console.log(cartProducts);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function saveCartProductsTolocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsTolocalStorage([]);
  }

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts((prevProducts) => {
      const cartProducts = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProducts];
      saveCartProductsTolocalStorage(newProducts);
      return newProducts;
    });
  };

  const removeFromCart = (idtoRemove) => {
    // console.log(idtoRemove);

    setCartProducts((prevProducts) => {
      const newCartProducts = prevProducts.filter((product) => product._id !== idtoRemove);
      // console.log(newCartProducts);
      saveCartProductsTolocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product Removed!')
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          addToCart,
          removeFromCart,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
