import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  console.log(req.method)
  if (req.method === "POST") {
    if (req.body) {
      return res.status(404).json({ error: "Don't have form data." });
    }
    const { username, email, password } = req.body;

    const client = await clientPromise;
    const db = client.db("auth");
    const isExisted = await db.collection("users").findOne({ email });
    if (isExisted) {
      return res.status(422).json({ message: "This email has been used." });
    }
    const doc = { email: email, password: password, name: username };
    try {
      await myColl.insertOne(doc);
    } catch(e) {
        res.status(500).json({ message: "Unable to register" });
    }
  } else {
    res.status(500).json({ message: "Disallowed HTTP method" });
  }
}
