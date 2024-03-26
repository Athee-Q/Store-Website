import User from "../../../../server/User";
import connectToMongoDB from "../../../../db/connectToMongoDB";

export async function POST(req) {
  try {
    const body = await req.json();

    await connectToMongoDB();

    const user = await User.create(body);

    return Response.json(user);
  } catch (error) {
    console.error("Error:", error);
  }
}
