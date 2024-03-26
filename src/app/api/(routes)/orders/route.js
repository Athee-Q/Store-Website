import { getServerSession } from 'next-auth';
import connectToMongoDB from '../../../../db/connectToMongoDB'
import Order from '../../../../server/Order'
import {options} from '../../auth/[...nextauth]/option'
import { isAdmin } from '../../auth/[...nextauth]/route';
export async function GET(){
    await connectToMongoDB();
    const session = await getServerSession(options);
    const userEmail = session?.user?.email;
    let admin = await isAdmin();

    const url = new URL(req.url);
    const id = url.searchParams.get('_id')
    if(id){
        return Response.json(await Order.findById(id))
    }

    if(admin ){
        return Response.json(await Order.find());
    }

    if(userEmail){
        return Response.json(await Order.find({userEmail}))   
    }
}
