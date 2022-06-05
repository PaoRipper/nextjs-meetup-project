import Head from "next/head";

import { MongoClient } from "mongodb";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

//Always run on server after the deployment
//ใช้ตอนที่ต้องรันทุกรอบที่มี incoming request เข้ามา
// export const getServerSideProps = async (context) => {
//   const { req, res } = context;
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

//RUN DURING BUILD PROCESS
//ใช้ตอนที่ request ไม่เยอะ
export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb://paoripper:Ripper217569@cluster0-shard-00-00.hllu4.mongodb.net:27017,cluster0-shard-00-01.hllu4.mongodb.net:27017,cluster0-shard-00-02.hllu4.mongodb.net:27017/?ssl=true&replicaSet=atlas-eyjmf3-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  //fetch data from an API
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
