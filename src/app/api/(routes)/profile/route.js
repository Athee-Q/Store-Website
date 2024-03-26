import connectToMongoDB from "../../../../db/connectToMongoDB";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";
import UserInfo from "../../../../server/UserInfo";
import User from "@/server/User";
import { URL } from "url";

export async function PUT(req) {
  await connectToMongoDB();
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};

  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(options);
    const email = session?.user?.email;
    filter = { email };
  }
  const user = await User.findOne(filter);
  await User.updateOne(filter, { name, image });
  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
    upsert: true,
  });
  return Response.json(true);
}

export async function GET(req) {

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  
  await connectToMongoDB();
  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(options);
    const email = session?.user?.email;

    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }
  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json({ ...user, ...userInfo });
}
