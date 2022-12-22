import styles from "../styles/Navbar.module.css";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [navMenuState, setNavMenuState] = useState(false);
  const { data: session, status } = useSession();

  const handleNavMenuState = () => {
    navMenuState ? setNavMenuState(false) : setNavMenuState(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.navMenu}>
          <button onClick={() => signOut()}>Sign out</button>
          <ul className={styles.navContent}>
            <li>
              <Link href="/" legacyBehavior>
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href={`/profile/${session.user.name}`} legacyBehavior>
                <a>Profile</a>
              </Link>
            </li>
          </ul>
          <img
            className={styles.menuIcon}
            src="/menu-icon.png"
            alt="menu icon"
          />
        </div>
        <img
          className={`${styles.img}`}
          src="/spark-logo.png"
          alt="spark logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
