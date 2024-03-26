"use client";
import SectionHeaders from "@/components/main/SectionHeaders";
import { CartContext, cartProductPrice } from "../../context/_app";
import { useContext, useEffect, useState } from "react";
import AddressInput from "@/components/address-input/AddressInput";
import CartProduct from "@/components/cart-product/CartProduct";
import userProfile from "../custom-hooks/userProfile";

const Cartpage = () => {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const [deliveryFee] = useState(50);
  const { data: profileData } = userProfile();

  useEffect(() => {
    const { phone, street, town, city, state, postalCode, country } =
      profileData;
    const addressFromProfile = {
      phone,
      street,
      town,
      city,
      state,
      postalCode,
      country,
    };
    setAddress(addressFromProfile);
  }, [profileData]);

  async function proceedToCheckout(e) {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/checkout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, cartProducts }),
      });
      console.log(response)
      
          if (!response.ok) {
            throw new Error('Failed to process checkout. Please try again later.');
          }
    //   const link = await response.json();
    //   window.location.href = link.url; 
    } catch (error) {
      console.error('Error during checkout:', error.message);
      // alert('There was an error processing your checkout. Please try again later.');
    }
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  // console.log(cartProducts);
  let subTotal = 0;
  for (const product of cartProducts) {
    subTotal += cartProductPrice(product);
  }

  if(cartProducts?.length === 0){
    return(
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
      <p className="MT-4">Your shopping cart is empty 🥴</p>
      </section>
    )
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 md:grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length > 0 &&
            cartProducts.map((product,index) => {
              //   console.log(product);
              return (
               <CartProduct
               key={index}
               product ={product}
               onRemove={removeFromCart}
               />
              );
            })}
          <div className="py-2  pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              SubTotal: <br />
              Delivery: <br /> Total:{" "}
            </div>
            <div className="font-semibold pl-2">
              ₹{subTotal}
              <br />₹{deliveryFee}
              <br />₹{subTotal + deliveryFee}
            </div>
          </div>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg text-right">
          <h2>CheckOut</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInput
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay ₹{subTotal + 50}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cartpage;
