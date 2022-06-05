import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

//ถ้าเป็น dynamic page ต้องมี getStaticPath()
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb://paoripper:Ripper217569@cluster0-shard-00-00.hllu4.mongodb.net:27017,cluster0-shard-00-01.hllu4.mongodb.net:27017,cluster0-shard-00-02.hllu4.mongodb.net:27017/?ssl=true&replicaSet=atlas-eyjmf3-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  // ในนี้ใช้ React Hooks ไม่ได้ ในการที่จะเอา Id จาก Url ต้องเอาขาก context
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    "mongodb://paoripper:Ripper217569@cluster0-shard-00-00.hllu4.mongodb.net:27017,cluster0-shard-00-01.hllu4.mongodb.net:27017,cluster0-shard-00-02.hllu4.mongodb.net:27017/?ssl=true&replicaSet=atlas-eyjmf3-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
