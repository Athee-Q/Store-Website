"use client";

import { useEffect, useState } from "react";
import UserTabs from "../../components/user-tabs/UserTabs";
import userProfile from "../custom-hooks/userProfile";
import dbTimeForHuman from "../custom-hooks/datetime";
import Link from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { loading, data: profileData } = userProfile();
  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders(){
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
        res.json().then((orders) => {
          setOrders(orders.reverse());
          setLoadingOrders(false);
        });
      });
  }


  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-8">
        {loadingOrders && (
            <div className="text-primary flex items-center justify-center w-full h-screen m-auto font-bold tracking-widest">
            Loading...
          </div>
        )}
        {orders?.length > 0 &&
          orders.map((order) => {
            <div
            key={order._id}
            className="bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-[2fr,5fr,2fr] gap-4items-center">
              <div >
                <div >{order.email}</div>
                <div className="text-gray-500 text-sm">{order.cartproducts?.map((p) => p.itemName).join(" , ")}</div>
              </div>

              <div className="text-right flex gap-2 items-center whitespace-nowrap">
                <span
                  className={
                    (order.paid ? "bg-green-500" : "bg-red-500") +
                    "p-2 rounded-md text-white "
                  }
                >
                  {order.paid ? "paid" : "not Paid"}
                </span>
                {dbTimeForHuman(order.createdAt)}
                <Link href={'/orders/'+order._id} className="button">
                    Show order
                    </Link>
              </div>
            </div>;
          })}
      </div>
    </section>
  );
};

export default OrdersPage;
