import { CartContext } from "@/context/_app";
import MenuItemTile from "../../components/menu/MenuItemTile";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const MenuItem = (menuItem) => {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(menuItem.sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  // console.log(menuItem.sizes);
  // console.log(menuItem.extraIngredientPrices);
  function handleAddtoCartButtonClick() {
    const isExtras = menuItem.sizes.length > 0 || menuItem.extraIngredientPrices.length > 0;
    if (isExtras) {
      setShowPopup(true);
    } else {
      addToCart(menuItem);
      toast.success("Add to cart!");
    }
    if (showPopup) {
      addToCart(menuItem ,selectedSize,selectedExtras);
      setShowPopup(false);
      toast.success("Add to cart!");
    }
  }

  


  function handleExtraThingClick(e, extraThing) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice  = menuItem?.price;
    if (selectedSize) {
       selectedPrice += selectedSize.price;
    } 
    if (selectedExtras?.length > 0) {
      selectedExtras.forEach(extra => {
        selectedPrice += extra.price;
      });
       selectedPrice;
    } 
  


  return (
    <>
      {showPopup && (
        <div className="fixed z-20 inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-2 rounded-lg  max-w-sm  ">
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 150px)" }}
            >
              <Image
                className="mx-auto"
                src={menuItem.image}
                alt={menuItem.itemName}
                width={200}
                height={200}
              />
              <h2 className="text-lg font-bold text-center">
                {menuItem.itemName}
              </h2>
              <p className="text-center text-gray-500 text-xs line-clamp-5">
                {menuItem.description}
              </p>
              {(menuItem.sizes?.length > 0) && (
                <div className="p-2">
                  <h3 className="text-center font-semibold text-gray-500 text-xs">
                    PICK YOUR SIZE
                  </h3>
                  {menuItem.sizes.map((size) => (
                    <label key={size._id}
                      className="grid grid-cols-[1fr,4fr,2fr] gap-2 py-2  border mt-2 rounded-md"
                      htmlFor={size.name}
                    >
                      <input
                        id={size.name}
                        name="size"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                      />{" "}
                      <span className="font-[500] checked:font-bold uppercase">
                        {size.name}&nbsp;:&nbsp;₹
                        {menuItem.price + size.price}
                      </span>{" "}
                    </label>
                  ))}
                </div>
              )}
              {(menuItem.extraIngredientPrices?.length > 0 ) && (
                <div className="p-2">
                  <h3 className="text-center font-semibold text-gray-500 text-xs">
                    ADD YOUR INGREDIENT
                  </h3>
                  {menuItem.extraIngredientPrices.map((extraThing) => (
                    <>
                      <label key={extraThing._id}
                        className="grid grid-cols-[1fr,4fr,2fr] gap-2 py-2 border mt-2 rounded-md"
                        htmlFor={extraThing.name}
                      >
                        <input
                          id={extraThing.name}
                          name="extraThing"
                          type="checkbox"
                          checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                          onChange={(e) => handleExtraThingClick(e, extraThing)}
                        />
                        <span className="font-[500] uppercase">
                          {extraThing.name}&nbsp;:&nbsp;+ ₹{extraThing.price}
                        </span>
                      </label>
                    </>
                  ))}
                </div>
              )}
              <button
                className="primary sticky -bottom-2"
                type="button"
                onClick={handleAddtoCartButtonClick}
              >
                Add to cart {selectedPrice}
              </button>
              <button
                className="mt-2"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddtoCartButtonClick}
        menuItem={menuItem}
      />
    </>
  );
};

export default MenuItem;
