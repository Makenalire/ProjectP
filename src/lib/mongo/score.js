import clientPromise from "@/lib/mongo";
let client;
let score;
let db;

async function init() {
    if (db) return
    try{
      client = await clientPromise
      db = await client.db()
      score = await db.collection('score')
    } catch (error) {
      throw new Error('Faild to connection to database')
    }
  }
  ;(async () => {
    await init()
  })()
  
  async function getScore() {
    try {
      if (!score) await init() 
      const result = await score
      .find({})
      .limit(20)
      .map(user => ({ ...user, _id: user._id.toString() }))
      .toArray()
  
      return {score: result}
    }catch (error) {
      return {error: 'Failed to fetch score!'}
    }
  }

export default getScore