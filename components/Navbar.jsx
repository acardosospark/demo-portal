import styles from "../styles/Navbar.module.scss";
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
          {/* <button onClick={() => signOut()}>Sign out</button> */}
          <ul className={styles.navContent}>
            <li>
              <Link href="/" legacyBehavior>
                <a>
                  <h5>Dashboard</h5>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/profile/${session.user.name}`} legacyBehavior>
                <a>
                  <h5>Profile</h5>
                </a>
              </Link>
            </li>
            <li>
              <a onClick={() => signOut()}>
                <h5>Sign Out</h5>
              </a>
              <span>
                <img
                  className={styles.menuIcon}
                  src="/menu-icon.png"
                  alt="menu icon"
                />
              </span>
            </li>
          </ul>
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
