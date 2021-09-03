import Mongo from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const connection = Mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((c) => {
    console.log('MongoDB connected')
    return c
  })

export async function emojiDb () {
  const conn = await connection
  const db = conn.db('emoji_stash_bot')
  const coll = db.collection('emoji')
  return coll
}

export default connection
