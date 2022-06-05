// api/new-meetup
import { MongoClient } from "mongodb";

//ชื่อฟังก์ชันไรก็ได้
//Paor...02@
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb://paoripper:Ripper217569@cluster0-shard-00-00.hllu4.mongodb.net:27017,cluster0-shard-00-01.hllu4.mongodb.net:27017,cluster0-shard-00-02.hllu4.mongodb.net:27017/?ssl=true&replicaSet=atlas-eyjmf3-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    res.status(201).json({ message: "Meetup Inserted!" });
    console.log(result);
    client.close();
  }
};

export default handler;
