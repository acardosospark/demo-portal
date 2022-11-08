import Head from "next/head";
import Image from "next/image";
import LogIn from "../components/LogIn";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import SelectionDashboard from "./../components/SelectionDashboard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="text/javascript"
          src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=TGGZ2J"
        defer ></script>
      </Head>
      <SelectionDashboard />
    </div>
  );
}