import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const id = await request.nextUrl.searchParams.get('id');
        
        const client = await clientPromise;
        const db = client.db("data");
        const coll = await db.collection("scores");
        const cursor = await coll.find({}).sort({score: -1}).limit(10).toArray();

        return NextResponse.json( cursor );
    }
    catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}