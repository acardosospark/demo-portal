import Link from "next/link";
import styles from "../styles/DemoCard.module.css";
import AppContext from "./AppContext";
import { useRef, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { v4 as uuidv4 } from 'uuid';

const DemoCard = ({ id, title, description, media }) => {
  // secret menu
  const [isActive, setIsActive] = useState(false);
  const [isSecretMenuActive, setIsSecretMenuActive] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const secretMenuRef = useRef(null);
  const [sessionID, setSessionID] = useState(null);
  const { data: session } = useSession();

  // secret panel
  const secretPanelRef = useRef(null);
  const context = useContext(AppContext);

  useEffect(() => {
    setIsPanelOpen(context.panelState.isGlobalPanelOpen);
    if (session) {
      console.log("user email here 🚧 ", session.user.email);
      setSessionID(session.user.email);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      secretMenuRef.current.classList.remove("fade-out");
      secretMenuRef.current.style.display = "block";
      // secretMenuRef.current.classList.remove("test");
      secretMenuRef.current.classList.add("fade-in");
    } else {
      secretMenuRef.current.classList.remove("fade-in");
      secretMenuRef.current.classList.add("fade-out");
      // secretMenuRef.current.classList.add("test");
      // secretMenuRef.current.style.display = "none";
    }
  }, [isActive]);

  useEffect(() => {
    if (isSecretMenuActive) {
      // secretMenuRef.current.style.opacity = "0.5";
      secretMenuRef.current.classList.remove("fade-out");
      // secretMenuRef.current.classList.remove("test");
    } else {
      secretMenuRef.current.classList.add("fade-out");
      // secretMenuRef.current.classList.add("test");
    }
  }, [isSecretMenuActive]);

  const handleMenu = () => {
    isActive ? setIsActive(false) : setIsActive(true);
    context.setActiveDemoCard(id);
  };

  const handleSecretMenu = () => {
    isSecretMenuActive
      ? setIsSecretMenuActive(false)
      : setIsSecretMenuActive(true);
  };

  const handlePanel = () => {
    isPanelOpen ? setIsPanelOpen(false) : setIsPanelOpen(true);

    context.setGlobalPanelOpen(isPanelOpen);
  };

  const handleOpenDemo = () => {
    console.log("capture demo click -> ", title);
    // STEP 3: append distinct id and other person related information to the open demo event
    // console.log("user session email here (demo click) 🏁 ----> ", `${sessionID}-${uuidv4()}`);
    posthog.identify(session.user.email);
    posthog.capture("open-demo-click", { title, id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardTitle}>
        <img
          className={styles.cardIcon}
          src="/card-icon.png"
          alt="spark logo dark"
        />
        <h4>{title}</h4>
      </div>
      <div
        onMouseEnter={() => handleMenu()}
        onMouseLeave={() => handleMenu()}
        className={styles.cardMenuWrapper}
      >
        <img className={styles.cardMenu} src="/dots.svg" alt="menu dots" />
      </div>
      <div
        onMouseEnter={() => handleSecretMenu()}
        onMouseLeave={() => handleSecretMenu()}
        ref={secretMenuRef}
        className={`${styles.menu}`}
      >
        <ul>
          <li onClick={handleOpenDemo}>
            {" "}
            <Link className={styles.demoLink} href={media} target="_blank">
              Open Demo
            </Link>
          </li>
          <li onClick={() => handlePanel()}>View Additional Resources</li>
        </ul>
      </div>
      <div className={styles.description}>{description}</div>
      <button onClick={handleOpenDemo} className={styles.cardButton}>
        <Link className={styles.demoLink} href={media} target="_blank">
          Open Demo
        </Link>
      </button>
    </div>
  );
};

export default DemoCard;
