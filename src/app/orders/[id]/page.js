"use client";
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../../components/user-tabs/UserTabs";
import { CartContext, cartProductPrice } from "../../../context/_app";
import AddressInputs from '../../../components/address-input/AddressInput'
import { useParams } from "next/navigation";

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const [order,setOrder] = useState();
const {id} = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if(id){
        fetch('/api/orders?_id='+id).then(res => {
            res.json().then(orderData => {
                setOrder(orderData);
            })
        })
    }
  },[]);

  let subtotal = 0;
  if(order?.cartProducts){
    for(const product of order?.cartProducts){
        subtotal += cartProductPrice(product)
    }
  }

  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8">
          <p>thanks for your order.</p>
          <p>We will call you when your order will be onthe way.</p>
        </div>
      </div>
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
            <div>
                {order.cartProducts.map(product =>{
                    <CartProduct key={product._id} product={product}/>
                })}
                <div className="text-right py-2 text-gray-500">
                    Subtotal: <span className="text-black font-bold inline-block w-8">₹{subtotal}</span><br/>
                </div>
                <div className="text-right py-2 text-gray-500">
                    Delivery: <span className="text-black font-bold inline-block w-8">₹50</span><br/>
                </div>
                <div className="text-right py-2 text-gray-500">
                    Total: <span className="text-black font-bold inline-block w-8">₹{subtotal+50}</span><br/>
                </div>
                
            </div>
            <div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <AddressInputs 
                    disabled={true} 
                    addressProps ={order}/>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
