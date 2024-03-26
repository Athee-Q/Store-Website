"use client";

import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((menuItems) => {
        const bestSellers = menuItems.slice(-3);
        setBestSellers(bestSellers);
        // console.log(bestSellers);
      });
  }, []);
  return (
    <section className="">
      <div className="absolute w-full left-0 right-0 justify-start">{}</div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"Check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
};

export default HomeMenu;
