"use client";
import UserTabs from "../../components/user-tabs/UserTabs";
import userProfile from "../custom-hooks/userProfile";
import { useEffect, useState } from "react";
import Link from "next/link";

const UserPage = () => {
  const { loading: profileLoading, data: profileData } = userProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

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
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
            key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 pl-2 grid grid-cols-[1fr,4fr,.5fr] items-center">
              <div className="text-gray-900">
                {!!user.name && <span className="font-semibold" >{user.name}</span>}
                {!user.name && (
                  <span className="italic font-semibold text-gray-400">{"no_name"}</span>
                )}
              </div>
              <div>
                <span className="text-gray-800">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={'/users/'+user._id} > Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserPage;
