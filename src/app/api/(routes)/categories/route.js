import { Category } from "../../../../server/Category";
import connectToMongoDB from '../../../../db/connectToMongoDB'
import { URL } from "url";
import { isAdmin } from "../../auth/[...nextauth]/route";

export async function POST(req){
    const body = await req.json();
    await connectToMongoDB();
    if(await isAdmin()){

        const categoriesDoc = await Category.create(body);
        return Response.json(categoriesDoc);
    }else{
        return Response.json({});
    }
}

export async function PUT(req){
    const {_id,name} =await req.json();
    await connectToMongoDB();
    if(await isAdmin()){

        await Category.updateOne({_id},{name});
    }
    return Response.json(true);
}

 export async function GET(){
     await connectToMongoDB();
    return Response.json(
        await Category.find()
    )
 }

 export async function DELETE(req) {
    await connectToMongoDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if(await isAdmin()){

        await Category.deleteOne({_id});
    }
    return Response.json(true);
  }