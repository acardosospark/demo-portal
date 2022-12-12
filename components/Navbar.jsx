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
          <img
            className={styles.menuIcon}
            src="/menu-icon.png"
            alt="menu icon"
          />
          <ul className={styles.navContent}>
            <li
              onMouseDown={() => handleNavMenuState()}
              className={styles.navItem}
            >
              {navMenuState ? (
                <Link href={`/profile/${session.user.name}`}>Dashboard</Link>
              ) : (
                <Link href="/">Profile</Link>
              )}
            </li>
            <li className={styles.navItem}>
              <div className={styles.signOutButton} onClick={() => signOut()}>
                Sign out
              </div>
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
