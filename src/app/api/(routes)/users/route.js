import connectToMongoDB from '../../../../db/connectToMongoDB';
import User from '../../../../server/User';
import { isAdmin } from '../../auth/[...nextauth]/route';



export  async function GET( res) {
  await connectToMongoDB();
  try {
    if(await isAdmin()){

      const users = await User.find();
      return res.json(users);
    }else{
      return Response.json([]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
