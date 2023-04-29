import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const id = await request.nextUrl.searchParams.get('id');
        
        const client = await clientPromise;
        const db = client.db("data");
        const score = await db.collection("scores").findOne({ _id: new ObjectId(id) });
        return NextResponse.json( score );
    }
    catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}