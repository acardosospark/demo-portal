import styles from "../styles/PanelContentWrapper.module.css";
import { useState, useEffect, useContext } from "react";
import SubPanel from "./SubPanel";
import AppContext from "./AppContext";
import Link from "next/link";
import posthog from "posthog-js";
import { useSession } from "next-auth/react";

const PanelContentWrapper = ({ title }) => {
  const [demoObj, setDemoObj] = useState([]);
  const [sessionID, setSessionID] = useState(null);
  const context = useContext(AppContext);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setSessionID(session.user.email);
    }
  }, []);

  useEffect(() => {
    // console.log("holy shit ---> ", context.panelState.activeDemoCard);
    const mydemo = context.panelState.demos.filter((demo) => {
      return demo.id === context.panelState.activeDemoCard;
    });

    setDemoObj([...mydemo]);
  }, [context.panelState.activeDemoCard]);

  useEffect(() => {}, [demoObj]);

  const handleOpenResource = (id, media) => {
    // console.log("capture resource click here... ", id);
    // STEP 4: append distinct id and other person related information to the open resource event
    posthog.identify(sessionID);
    posthog.capture("open-resource-click", { id, media });
  };

  return (
    <div className={styles.container}>
      {demoObj.length > 0 ? (
        <>
          <h3>{demoObj[0].title}</h3>
          <ul>
            <li>
              <div className={styles.cardContainer}>
                <div className={styles.subPanelItemHeader}>
                  <img
                    src={demoObj[0].demoSites.titleIcon}
                    alt="computer icon"
                  />
                  <h5>{demoObj[0].demoSites.title}</h5>
                </div>
                <ul>
                  {demoObj[0].demoSites.media.map((m, i) => (
                    <li
                      onClick={() =>
                        handleOpenResource(
                          `${context.panelState.activeDemoCard}-ds-${i}`,
                          m
                        )
                      }
                      key={`ds-${i}`}
                    >
                      <a href={m} target="_blank" rel="noreferrer">
                        <img
                          src={demoObj[0].demoSites.mediaIcon}
                          alt="anchor icon"
                        />
                        <h5>Site {i + 1}</h5>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className={styles.cardContainer}>
                <div className={styles.subPanelItemHeader}>
                  <img
                    src={demoObj[0].clickProtos.titleIcon}
                    alt="computer icon"
                  />
                  <h5>{demoObj[0].clickProtos.title}</h5>
                </div>
                <ul>
                  {demoObj[0].clickProtos.media.map((m, i) => (
                    <li
                      onClick={() =>
                        handleOpenResource(
                          `${context.panelState.activeDemoCard}-cp-${i}`,
                          m
                        )
                      }
                      key={`cp-${i}`}
                    >
                      <a href={m} target="_blank" rel="noreferrer">
                        <img
                          src={demoObj[0].clickProtos.mediaIcon}
                          alt="anchor icon"
                        />
                        <h5>Prototype {i + 1}</h5>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className={styles.cardContainer}>
                <div className={styles.subPanelItemHeader}>
                  <img
                    src={demoObj[0].presentations.titleIcon}
                    alt="computer icon"
                  />
                  <h5>{demoObj[0].presentations.title}</h5>
                </div>
                <ul>
                  {demoObj[0].presentations.media.map((m, i) => (
                    <li
                      onClick={() =>
                        handleOpenResource(
                          `${context.panelState.activeDemoCard}-pr-${i}`,
                          m
                        )
                      }
                      key={`pr-${i}`}
                    >
                      <a href={m} target="_blank" rel="noreferrer">
                        <img
                          src={demoObj[0].presentations.mediaIcon}
                          alt="anchor icon"
                        />
                        <h5>presentation {i + 1}</h5>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <div className={styles.cardContainer}>
                <div className={styles.subPanelItemHeader}>
                  <img src={demoObj[0].videos.titleIcon} alt="computer icon" />
                  <h5>{demoObj[0].videos.title}</h5>
                </div>
                <ul>
                  {demoObj[0].videos.media.map((m, i) => (
                    <li
                      onClick={() =>
                        handleOpenResource(
                          `${context.panelState.activeDemoCard}-vi-${i}`,
                          m
                        )
                      }
                      key={`vi-${i}`}
                    >
                      <a href={m} target="_blank" rel="noreferrer">
                        <img
                          src={demoObj[0].videos.mediaIcon}
                          alt="anchor icon"
                        />
                        <h5>Video {i + 1}</h5>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h2>loading...</h2>
        </>
      )}
    </div>
  );
};

export default PanelContentWrapper;
