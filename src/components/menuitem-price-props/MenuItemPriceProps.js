import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import { useState } from "react";

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggler = () => {
    setIsOpen(!isOpen);
  };

  function addProp() {
    setProps((oldPROPS) => {
      return [...oldPROPS, { name: "", price: 0 }];
    });
  }

  function editProp(e, index, prop) {
    const newValue = e.target.value;
    setProps((preSizes) => {
      const newSizes = [...preSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(index) {
    setProps((prevSizes) => prevSizes.filter((_, i) => i !== index));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        className="inline-flex  p-1 border-0 justify-start items-center"
        type="button"
        onClick={toggler}
      >
        {isOpen ? (
          <ChevronUp className={"w-4 h-4"} />
        ) : (
          <ChevronDown className={"w-4 h-4"} />
        )}
        <span className="text-gray-700 ">{name}</span>
        <span className="text-primary ">({props.length})</span>
      </button>
      {isOpen && <div>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div key={index} className="flex items-end gap-2">
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => editProp(e, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                type="number"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editProp(e, index, "price")}
              />
            </div>
            <div>
              <button
                className="bg-white mb-1  px-1"
                onClick={() => removeProp(index)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={addProp} className="bg-white items-center">
        <Plus />
        <span> {addLabel}</span>
      </button>
      </div>}
    </div>
  );
};

export default MenuItemPriceProps;
