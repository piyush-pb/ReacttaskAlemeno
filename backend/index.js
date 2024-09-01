const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
const port = 5000

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/aniket");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas:", error);
  }
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/likes', async (req, res) => {
  const { id } = req.query;
  const coll = mongoose.connection.collection('courses');
  const result = await coll.findOne({ 'id': parseInt(id) });
  return res.json({ 'likes': result.likes });
})

app.get('/allLikes', async (req, res) => {
  const coll = mongoose.connection.collection('courses');
  const result = await coll.find({});
  const yo = await result.toArray();
  const likes = {}
  yo.map((obj)=>{
    likes[obj.id]=obj.likes;
  })
  return res.json({ 'likes': likes });
})

app.listen(port, () => {
  connectToDatabase();
  console.log(`Example app listening on port ${port}`)
})