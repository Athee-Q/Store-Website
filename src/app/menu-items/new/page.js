"use client";

import ImageUpload from "@/components/image-upload/ImageUpload";
import UserTabs from "../../../components/user-tabs/UserTabs";
import userProfile from "@/app/custom-hooks/userProfile";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "../../../components/menuitem-form/MenuItemForm";
const NewMenuItemPage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [redirectTo, setRedirectTo] = useState(false);

  function handleSave(e,data) {
    e.preventDefault();

    const savePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/menu-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resolve();
        } else {
          console.error("Failed to save menu item:", response.statusText);
          reject();
        }
      } catch (error) {
        console.error("Updating error:", error);
        reject();
      }
    });

    toast.promise(savePromise, {
      loading: "Saving menu item...",
      success: "Menu item saved successfully!",
      error: "Failed to save menu item. Please try again.",
    });
    setRedirectTo(true);
  }
  if (redirectTo) {
    return redirect("/menu-items");
  }
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
    <section className="mt-8">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-8 max-w-2xl mx-auto">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleSave} />
    </section>
  );
};

export default NewMenuItemPage;
