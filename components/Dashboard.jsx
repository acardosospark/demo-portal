import styles from "./../styles/Dashboard.module.css";
import { useState, useEffect, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import DemoCard from "./DemoCard";
import AppContext from "../components/AppContext";
import App from "next/app";

const Dashboard = () => {
  const { data: session } = useSession();
  const [localDemos, setLocalDemos] = useState([]);

  const context = useContext(AppContext);

  useEffect(() => {
    setLocalDemos([...localDemos, context.panelState.demos]);
  }, []);

  useEffect(() => {
    if (localDemos.length > 0) {
    }
  }, [localDemos]);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2>Industrial Suit Demos</h2>
        <p>What SparkCognition Offers</p>
      </div>
      <ul className={styles.demoCardSection}>
        {localDemos.length > 0 ? (
          localDemos[0].map((demo) => (
            <li key={demo.id}>
              <DemoCard
                id={demo.id}
                title={demo.title}
                description={demo.description}
              />
            </li>
          ))
        ) : (
          <h2>Loading</h2>
        )}
      </ul>
      <div className={styles.separator}></div>
      <ul className={styles.feedbackSection}>
        <li>
          <div>
            <h3>Provide Feedback</h3>
            <p>Let us know what you think</p>
          </div>
          <div>
            <h3>Demo Feedback Form</h3>
            <p>
              Actively provide feedback after your demo session and we won’t
              bother you with feedback emails at the end of the day
            </p>
          </div>
          <button className={styles.feedbackFormButton}>
            <img
              className={styles.clipboard}
              src="/clipboard.png"
              alt="clipboard"
            />
            Open Form
          </button>
        </li>
        <li>
          <div>
            <h3>Provide Feedback</h3>
            <p>Let us know what you think</p>
          </div>
          <button className={styles.feedbackFormButton}>
            <img
              className={styles.clipboard}
              src="/clipboard.png"
              alt="clipboard"
            />
            Open Form
          </button>
        </li>
      </ul>

      {/* <h1>main product selection dashboard</h1>
      Signed in as {session.user.email} <br />
      <div onClick={() => signOut()}>Sign out</div> */}
    </div>
  );
};

export default Dashboard;
