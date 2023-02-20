import getScore from "@/lib/mongo/score"


const handler = async (req,res) => {
    if (req.method === 'GET'){
      try {
        const { score,error } = await getScore()
        if (error) throw new Error(error)

        return res.status(200).json({ score })
      }catch (error) {
        return res.status(500).json({error: error.message})
      }
    }
}

export default handler