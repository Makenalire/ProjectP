import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("data");
    const score = await db
      .collection("scores")
      .findOne({ _id: new ObjectId(id) });
    return NextResponse.json(score);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}

export async function POST(request) {
  try {
    const res = await request.json();
    console.log(res.operation);
    const client = await clientPromise;
    const db = client.db("data");
    const coll = await db.collection("scores");
    let result;

    if (res.operation === "update") {
      const filter = { _id: new ObjectId(res.id) };
      const updateDocument = {
        $set: {
          score: +res.score,
        },
      };
      result = await coll.updateOne(filter, updateDocument);
    } else if (res.operation === "add") {
      const doc = {
        _id: new ObjectId(res.id),
        score: res.score,
        name: res.name,
      };
      await coll.insertOne(doc);
      result = "successfully added the score"
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
