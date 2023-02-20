import {getScore} from "../lib/mongo/score"

async function fetchScore() {
    const {score} = await getScore() 
    if(!score) throw new Error('Failed to fetch movies!')
  
    return score
}
export default fetchScore