import Image from "next/image";
import AddToCartButton from "@/components/menu/AddToCartButton";
const MenuItemTile = ({ onAddToCart, menuItem }) => {
  const { image, description, itemName, price, sizes, extraIngredientPrices } =
    menuItem;
  // console.log(menuItem);
  const hasSizesOrExtras =
    (sizes?.length > 0 || extraIngredientPrices?.length > 0);

  return (
    <div className="min-w-xs max-h-96 bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="relative min-w-24 max-w-xs h-32 ">
        <Image
          src={image}
          alt={itemName}
          fill={true}
          className="rounded-lg w-full h-full z-10"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{itemName}</h4>
      <p className="text-gray-500 text-sm max-h-16 line-clamp-3">
        {description}
      </p>
      <AddToCartButton
        onClick={onAddToCart}
        hasSizesOrExtras={hasSizesOrExtras}
        price={price}
      />
    </div>
  );
};

export default MenuItemTile;
