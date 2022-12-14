import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useContext, useState } from "react";
import LogIn from "../../components/LogIn";
import AppContext from "../../components/AppContext";
import ChartWrapper from "../../components/ChartWrapper";
// import EventTable from "../../components/EventTable";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const context = useContext(AppContext);

  if (session) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Welcome {session.user.name}</h1>
          <h2>{id}</h2>
        </div>
        {/* <EventTable /> */}
        <ChartWrapper />
      </div>
    );
  }

  return (
    <>
      <LogIn />
    </>
  );
};

export default Profile;
