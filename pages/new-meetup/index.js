import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";
import Head from "next/head";

import { useRouter } from "next/router";
import { Fragment } from "react";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await axios
      .post("/api/new-meetup", enteredMeetupData, {
        "content-type": "application/json",
      })
      .then((res) => {
        console.log(res);
      });

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Share your meetup to the world and create a wide networking connection."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetupPage;
