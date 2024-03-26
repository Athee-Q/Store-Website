"use client";

import DeleteButton from "@/components/delete-button/DeleteButton";
import UserTabs from "../../../../components/user-tabs/UserTabs";
import userProfile from "@/app/custom-hooks/userProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/menuitem-form/MenuItemForm";
const EditMenuItemPage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectTo, setRedirectTo] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
  }, []);

  async function handleUpdate(e, data) {
    e.preventDefault();

    const savePromise = new Promise(async (resolve, reject) => {
      try {
        data = { ...data, _id: id };
        const response = await fetch("/api/menu-items", {
          method: "PUT",
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
      loading: "Updating menu item...",
      success: "Menu item updated successfully!",
      error: "Failed to update menu item. Please try again.",
    });
    setRedirectTo(true);
  }

  function handleDelete() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Deleting...!",
      success: "Deleted Successfully !!",
      error: "Can't Delete your item",
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
      <MenuItemForm menuItem={menuItem} onSubmit={handleUpdate} />
      <div className="max-w-md mx-auto mt-4">
        <div className="max-w-xs ml-auto pl-8">
          <DeleteButton
            label={"Delete Item"}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
};

export default EditMenuItemPage;
