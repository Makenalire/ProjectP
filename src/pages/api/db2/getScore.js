import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler (req, res) {
    try {
        const { id } = req.query;

        const client = await clientPromise;
        const db = client.db("data");
        const score = await db.collection("scores").findOne({ _id: new ObjectId(id) });
        res.json(score);
    }
    catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}