"use client";
import UserTabs from "../../components/user-tabs/UserTabs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userProfile from "../custom-hooks/userProfile";
import Edit from "@/components/icons/Edit";
import DeleteButton from "@/components/delete-button/DeleteButton";

const CategoriesPage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      });
  };

  const handleCategory = (e) => {
    e.preventDefault();
    const data = { name: category };
    if (editedCategory) {
      data._id = editedCategory._id;
    }
    const creatingStatus = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchCategories();
        setCategory("");
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(creatingStatus, {
      success: editedCategory ? "Category Updated" : "Category Created",
      loading: editedCategory
        ? "category is Updating..."
        : "Creating your new category ...",
      error: editedCategory
        ? "Server connection Error"
        : "Server connection Error",
    });
  };

  function handleDelete(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
        fetchCategories();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Deleting...!",
      success: "Deleted Successfully !!",
      error: "Can't Delete your data",
    });
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
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData.admin} />
      <form className="mt-8" onSubmit={handleCategory}>
        <div className="grid gap-2 items-center grid-cols-[6fr,1fr,1fr]">
          <div className="grow">
            <label>
              {" "}
              {editedCategory ? "Update category name" : "New category name"}
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className=" pt-4 ">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            </div>
            <div className=" pt-4 ">
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategory("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-xs text-gray-500 font-semibold">
          Existing Category
        </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div key={c._id} className="rounded-lg py-1 px-4 flex items-center gap-1 cursor-pointer mb-2 border-b-2">
              <div className="grow hover:text-primary ">{c.name}</div>
              <div className="flex gap-1">
                <button
                  className="border-0 focus:text-primary"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategory(c.name);
                  }}
                >
                  <Edit />
                </button>
                <DeleteButton
                  className={"border-0 focus:text-primary"}
                  onDelete={() => handleDelete(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
