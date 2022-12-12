

import styles from "../styles/Layout.module.css";
import LogIn from "./LogIn";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect} from "react";
import { useSession } from "next-auth/react";
// import { usePostHog } from 'next-use-posthog';
// import posthog from 'posthog-js';

const Layout = ({ children }) => {
  // usePostHog('phc_jzSUsTcbTXr9jeM6AMlk9qkHU9Mv9WzsadvKtXjwQ7k', { api_host: 'https://app.posthog.com' })
  const { data: session } = useSession();

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