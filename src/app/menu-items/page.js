"use client";

import UserTabs from "../../components/user-tabs/UserTabs";
import userProfile from "../custom-hooks/userProfile";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

const MenuItemPage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) {
    return (
      <>
        <div className="text-primary flex items-center justify-center w-full h-screen m-auto font-bold tracking-widest">
          Loading...
        </div>
      </>
    );
  }
  if (!profileData.admin) {
    return (
      <>
        <div className="text-primary flex items-center justify-center w-full h-screen m-auto font-bold tracking-widest">
          You are not a "ADMIN"
        </div>
      </>
    );
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          <span>Create new menu_item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-4">Edit menu item</h2>
        <div className="grid grid-cols-4 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
              key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-2"
              >
                <div className="relative max-w-md h-24">
                  <Image
                    className="rounded-md w-full h-full"
                    src={item.image}
                    alt={item.itemName}
                    fill={true}
                  />
                </div>
                <div className="text-center max-w-md">{item.itemName}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItemPage;
