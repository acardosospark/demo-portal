import styles from "../styles/LogIn.module.css";
import Image from "next/image";
import ThreeCanvas from "./ThreeCanvas";
import { useSession, signIn } from "next-auth/react";

const LoginComponent = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.animationWrapper}>
        <img src="/login-bg.png" layout="fill" alt="bg image particle wave" />
      </div>
      <div className={styles.formWrapper}>
        <form className={styles.form} action="">
          <img
            className={`${styles.img} ${styles.title}`}
            src="/spark-logo.png"
            alt="saprk logo"
          />
          <h2 className={styles.subHeader}>Sales Demo Portal</h2>
          <div className={styles.formFields}>
            <button
              onClick={() =>
                signIn("f41450c5906ea8d04f76", { callbackUrl: "/" })
              }
            >
              Log in with SSO
            </button>
            {/* <button
              onClick={() =>
                signIn("ae4890b0-5d34-013b-c060-0222a468834b161752", { callbackUrl: "/" })
              }
            >
              TEST LOGIN
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
