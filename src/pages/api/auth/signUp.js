import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  
  if (req.method === "POST") {

    if (!req.body) {
      return res.status(404).json({ error: "Don't have form data." });
    }

    const { name, email, password } = req.body;
    console.log(name, email, password);
    const client = await clientPromise;
    const db = client.db("auth");
    const coll = await db.collection("users");

    if (await coll.findOne({ email })) {
      return res.status(422).json({ message: "This email has been used."});
    }
    const doc = { email: email, password: password, name: name };
    try {
      await coll.insertOne(doc);
      return res.status(200).json({ message: "Successfully register", success: true });
    } catch(e) {
      console.error(e);
      res.status(500).json({ message: "Unable to register" });
    }
  } else {
    res.status(500).json({ message: "Disallowed HTTP method" });
  }
}
