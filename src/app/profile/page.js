"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/user-tabs/UserTabs";
import userProfile from "../custom-hooks/userProfile";
import UserForm from "../../components/user-form/UserForm";

const ProfilePage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [user, setUser] = useState(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated" && profileData) {
      
      setUser(profileData);
      setProfileFetched(true);
    }
  }, [session,profileData]);

  // console.log(profileData);

  
  async function handleProfileInfoUpdate(e,data) {
    e.preventDefault();

    const updatePromise = new Promise(async (resolve, reject) => {
      try {
        const { ok } = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!ok) {
          reject();
        } else {
          resolve();
        }
      } catch (error) {
        console.error("Updating error:", error);
        reject();
      }
      if (session.status === "loading" || !profileFetched) {
        return;
      }
    });

    toast.promise(updatePromise, {
      loading: "Profile updating...",
      success: "Profile updated..!",
      error: "Updating Error..!",
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
    <section className="mt-8">
      <UserTabs isAdmin={profileData.admin} />{" "}
      {/* temporryly i need isAmin = true what can i do tell chatgpt */}
      <div className="max-w-lg mx-auto mt-8 ">
        <UserForm user={user} onSave={handleProfileInfoUpdate} /> 
      </div>
    </section>
  );
};

export default ProfilePage;
