import Image from "next/image";
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/context/_app";

const CartProduct = ({ product, onRemove }) => {
  return (
    <div className="flex gap-4  border-b py-4 items-center" key={product._id}>
      <div className="relative w-24 h-24">
        <Image src={product.image} alt={product.itemNmae} fill="true" />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.itemName}</h3>
        {product?.size && (
          <div className="text-sm ">
            size: <span>{product.size.name}</span>
          </div>
        )}
        {product?.extras.length > 0 && (
          <div className="text-sm text-gray-500">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                {extra.name} ₹{extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">₹{cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button onClick={() => onRemove(product._id)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
