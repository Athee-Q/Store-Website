import connectToMongoDB from "@/db/connectToMongoDB";
import MenuItems from "@/server/MenuItems";
import { URL } from "url";
import { isAdmin } from "../../auth/[...nextauth]/route";


export async function POST(req) {
  const data = await req.json();
  await connectToMongoDB();
  if(await isAdmin()){

      const MenuItemsDoc = await MenuItems.create(data);
      return Response.json(MenuItemsDoc);
  }else{
    return Response.json({})
  }
}

export async function PUT(req) {
  const { _id, ...data } = await req.json();
  await connectToMongoDB();
  if(await isAdmin()){

      await MenuItems.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function GET() {
  await connectToMongoDB();
    return Response.json(await MenuItems.find());
}

export async function DELETE(req) {
  await connectToMongoDB();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await MenuItems.deleteOne({ _id });
  }
  return Response.json(true);
}
