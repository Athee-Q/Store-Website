"use client";

import userProfile from "@/app/custom-hooks/userProfile";
import UserForm from "@/components/user-form/UserForm";
import UserTabs from "@/components/user-profile/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch("/api/profile?_id="+id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  // console.log(profileData);

  function handleSaveButtonClick(e, data) {
    e.preventDefault();

    const updatePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, _id: id }),
        });

        if (!response.ok) {
          reject();
        } else {
          resolve();
        }
      } catch (error) {
        console.error("Updating error:", error);
        reject();
      }
    });

    toast.promise(updatePromise, {
      loading: "Profile Saving...",
      success: "Profile Saved..!",
      error: "Error! while saving...!",
    });
  }

  if (profileLoading) {
    return (
      <>
        {" "}
        <div className="text-primary flex items-center justify-center w-full h-screen m-auto font-bold tracking-widest">
          Loading...
        </div>{" "}
      </>
    );
  }
  if (!profileData.admin) {
    return (
      <>
        {" "}
        <div className="text-primary flex items-center justify-center w-full h-screen m-auto font-bold tracking-widest">
          You are not a "ADMIN"
        </div>{" "}
      </>
    );
  }
  return (
    <section className="m-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};

export default EditUserPage;
