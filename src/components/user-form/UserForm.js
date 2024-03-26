"use client";
import Image from "next/image";
import ImageUpload from "../../components/image-upload/ImageUpload";
import { useEffect, useState } from "react";
import userProfile from "@/app/custom-hooks/userProfile";
import AddressInput from "../address-input/AddressInput";

const UserForm = ({ user, onSave }) => {
  const [image, setImageUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [town, setTown] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [admin, setAdmin] = useState(false);
  const { data: loggedInUserData } = userProfile();

  useEffect(() => {
    setImageUrl(user?.image);
    setUserName(user?.name);
    setPhone(user?.phone);
    setStreet(user?.street);
    setTown(user?.town);
    setCity(user?.city);
    setState(user?.state);
    setPostalCode(user?.postalCode);
    setCountry(user?.country);
    setAdmin(user?.admin);
  }, [user]);

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "street") setStreet(value);
    if (propName === "town") setTown(value);
    if (propName === "city") setCity(value);
    if (propName === "state") setState(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="md:flex gap-4 items-start">
      <div className="p-2 flex flex-col justify-center items-center rounded-lg ">
        {image && (
          <div className="relative w-48 h-48">
            <Image
              className="rounded-md w-full h-full"
              src={image}
              alt={"Avatar"}
              fill={true}
            />
          </div>
        )}
        <ImageUpload setImageUrl={setImageUrl} />
      </div>
      <form
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            image,
            phone,
            street,
            town,
            city,
            state,
            postalCode,
            country,
          })
        }
        className="grow  "
      >
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="First and Last name"
          value={userName || ''}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={true}
          value={user?.email || ''}
        />

        <AddressInput
          addressProps={{
            phone,
            street,
            town,
            city,
            state,
            postalCode,
            country,
          }}
          setAddressProps={
            /* {setStreet,setTown,setCity,setPhone,setCountry,setPostalCode,setState} */
            handleAddressChange
          }
        />
        {loggedInUserData.admin && (
          <div>
            {/* {JSON.stringify(admin)} */}
            <label
              htmlFor="isAdmin"
              className="p-2 inline-flex items-center gap-2 mb-2"
            >
              <input
                id="isAdmin"
                type="checkbox"
                value={"1"}
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
