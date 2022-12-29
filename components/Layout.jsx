import styles from "../styles/Layout.module.css";
import LogIn from "./LogIn";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import AppContext from "../components/AppContext";
// import { usePostHog } from 'next-use-posthog';
// import posthog from 'posthog-js';

const Layout = ({ children }) => {
  // usePostHog('phc_jzSUsTcbTXr9jeM6AMlk9qkHU9Mv9WzsadvKtXjwQ7k', { api_host: 'https://app.posthog.com' })
  const { data: session } = useSession();
  const {setSparkUID, sparkUID} = useContext(AppContext);

  // STEP 2: on user login, check if user exists
  // - if user does not exist add new user to posthog

  useEffect(() => {
    if (session) {
      // const resourceId = uuid.v4();
      console.log("user login ---> ", session);
      // console.log("create new uuid and add to app context as sparkUID ---> ", setSparkUID(uuidv4()));
      // check if person with this uuid exists
    }
  }, [session]);

  if (session) {
    return (
      <div className={styles.layoutContainer}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <LogIn />
    </>
  );
};

export default Layout;
