import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";
import connectToMongoDB from "../../../../db/connectToMongoDB";
import MenuItems from "../../../../server/MenuItems";
import Order from "../../../../server/Order";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK);

export async function POST(req) {
  try {
    await connectToMongoDB();
    const { cartProducts, address } = await req.json();
    const session = await getServerSession(options);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    });

    const line_items_promises = cartProducts?.map(async (item , i) => {
      let productPrice = 0;
      const productInfo = await MenuItems.findById(item._id);
    
      if (!productInfo) {
        console.error(`Product information not found for ID: ${item._id}`);
        return;
      }
      
      productPrice += productInfo.price;

      if (item.size) {
        const size = productInfo.sizes.find(
          (size) => size._id.toString() === item.size._id.toString()
        );
    
        if (size) {
          productPrice += size.price;
        }
      }
    
      if (item.extras?.length > 0) {
        for (const extra of item.extras) {
          const extraThingInfo = productInfo.extraIngredientPrices.find(
            (extraInfo) => extraInfo._id.toString() === extra._id.toString()
          );
      
          if (extraThingInfo) {
            productPrice += extraThingInfo.price;
          }
        }
      }
    
      return productPrice += productPrice[i]
    });

    const line_items = {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.itemName,
          metadata: { productID: item._id },
        },
        unit_amount: productPrice * 100,
        quantity: 1,
      },
    };

    console.log(line_items);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.NEXTAUTH_URL}/orders/${orderDoc._id.toString()}?clear-cart=1`,
      cancel_url: `${process.env.NEXTAUTH_URL}cart?canceled=1`,
      customer_email: userEmail,
      mode: "payment",
      metadata: { orderID: `${orderDoc._id}` },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'deliveryFee',
            type: 'fixed_amount',
            fixed_amount: {amount: 5000 ,currency: 'inr'}
          }
        },
      ],
      line_items,
    });

    console.log(stripeSession.url);
    return Response.json({ url: stripeSession.url });
  } catch (error) {
    console.error(error);
    return Response.error(500, "Internal Server Error");
  }
}


















































































// import { getServerSession } from "next-auth";
// import { options } from "../../auth/[...nextauth]/option";
// import connectToMongoDB from "../../../../db/connectToMongoDB";
// import MenuItems from "../../../../server/MenuItems";
// import Order from "../../../../server/Order";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SK);

// export async function POST(req) {
//   try {
//     await connectToMongoDB();
//     const { cartProducts, address } = await req.json();
//     const session = await getServerSession(options);
//     const userEmail = session?.user?.email;

//     const orderDoc = await Order.create({
//       userEmail,
//       ...address,
//       cartProducts,
//       paid: false,
//     });

    
//     // for (const cartProduct of cartProducts) {
//     //   const productInfo = await MenuItems.findById(cartProduct._id);

//     //   if (!productInfo) {
//     //     console.error(
//     //       `Product information not found for ID: ${cartProduct._id}`
//     //     );
//     //     continue;
//     //   }

//     //   console.log(productInfo)

//     //   let productPrice = productInfo.price;

//     //   console.log(productPrice)

//     //   if (cartProduct.size) {
//     //     const size = productInfo.sizes.find(
//     //       (size) => size._id.toString() === cartProduct.size._id.toString()
//     //     );

//     //     productPrice += size.price;
//     //   }

//     //   if (cartProduct.extras?.length > 0) {
//     //     for (const extra of cartProduct.extras) {
//     //       const extraThingInfo = productInfo.extraIngredientPrices.find(
//     //         (extraInfo) => extraInfo._id.toString() === extra._id.toString()
//     //       );

//     //       if (extraThingInfo) {
//     //         productPrice += extraThingInfo.price;
//     //       } else {
//     //         console.error(
//     //           `Extra information not found for ID: ${extraThing._id}`
//     //         );
//     //       }
//     //     }
//     //   }
//     // }
//     // let quantity = orderDoc.cartProducts.length;

//     // let quantity = 1

//     // const line_items = cartProducts?.map((item) => {
//     //   return {
//     //     price_data: {
//     //       currency: "inr",
//     //       product_data: {
//     //         name: item.itemName,
//     //         metadata: { productID: item._id },
//     //       },
//     //       unit_amount: productPrice * 100,
//     //       // tax_rates: [`txr_1OwehVSFVxDPJ1f3fCyq1q6L`],
//     //       quantity:quantity++,
//     //     },
//     //   };
//     // });

//     const line_items = cartProducts?.map(async (item) => {
//       let productPrice = 0; // Initialize productPrice inside the loop
//       const productInfo = await MenuItems.findById(item._id);
    
//       if (!productInfo) {
//         console.error(`Product information not found for ID: ${item._id}`);
//         return; // If productInfo is not found, return undefined for this item
//       }
    
//       // Add base price
//       productPrice += productInfo.price;
    
//       if (item.size) {
//         const size = productInfo.sizes.find(
//           (size) => size._id.toString() === item.size._id.toString()
//         );
    
//         if (size) {
//           // If size is found, add its price
//           productPrice += size.price;
//         } else {
//           productPrice;
//         }
//       }
    
//       if (item.extras?.length > 0) {
//         for (const extra of item.extras) {
//           const extraThingInfo = productInfo.extraIngredientPrices.find(
//             (extraInfo) => extraInfo._id.toString() === extra._id.toString()
//           );
    
//           if (extraThingInfo) {
//             productPrice += extraThingInfo.price;
//           } else {
//             productPrice;
//           }
//         }
//       }
    
//       return {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.itemName,
//             metadata: { productID: item._id },
//           },
//           unit_amount: productPrice * 100, // Calculate unit_amount based on productPrice
//           quantity: 1, // Assuming each line item represents one product
//         },
//       };
//     }).filter(Boolean); // Filter out undefined items
    
//     console.log(line_items);

//     const stripeSession = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       success_url: `${process.env.NEXTAUTH_URL}cart?success=1`,
//       cancel_url: `${process.env.NEXTAUTH_URL}`,
//       customer_email: userEmail,
//       mode: "payment",
//       metadata: { orderID: `${orderDoc._id}` },
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             display_name: 'deliveryFee',
//             type: 'fixed_amount',
//             fixed_amount: {amount: 5000 ,currency: 'inr'}
//           }
//         },
//       ],
//       line_items,
//     });
//     console.log(stripeSession.url);
//     return Response.json({ url: stripeSession.url });
//   } catch (error) {
//     console.error(error);
//     return Response.error(500, "Internal Server Error");
//   }
// }
