import { useEffect, useState } from "react";
import ImageUpload from "../image-upload/ImageUpload";
import Image from "next/image";
import MenuItemPriceProps from "@/components/menuitem-price-props/MenuItemPriceProps";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [imageUrl, setImageUrl] = useState(menuItem?.image || "");
  const [itemName, setItemName] = useState(menuItem?.itemName || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((category) => {
        // console.log(category)
        setCategories(category);
      });
  }, []);

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          image: imageUrl,
          itemName,
          description,
          price,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div className="md:grid gap-4 grid-cols-[3fr,6fr]  ">
        <div>
          {!imageUrl ? (
            <div className="bg-gray-200 p-4 text-gray-500 text-center rounded-lg ">
              No Image
            </div>
          ) : (
            <div className="relative max-w-sm h-48 ">
              <Image
                className="rounded-lg w-full h-full "
                src={imageUrl}
                alt={"avatar"}
                fill={true}
                priority
              />
            </div>
          )}
          <ImageUpload setImageUrl={setImageUrl} />
        </div>
        <div className="">
          <label>Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 ? (
              <>
                <option value="" disabled selected hidden>
                  <b>_ _SELECT_ _</b>
                </option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </>
            ) : (
              <option value="" disabled selected>
                <b>_ _SELECT_ _</b>
              </option>
            )}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra Ingredient"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
