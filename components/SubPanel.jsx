import styles from "../styles/SubPanel.module.css";
import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";

const SubPanel = ({ title, titleIcon, linkIcon, links, link }) => {
  return (
    <div className={styles.container}>
      <div className={styles.subPanelItemHeader}>
        <img src={titleIcon} alt="computer icon" />
        <h5>{title}</h5>
      </div>
      <ul>
        <li>
          <h5>{title} 1</h5>
          <img src={linkIcon} alt="anchor icon" />
          <small>{link}</small>
        </li>
        <li>
          <h5>{title} 2</h5>
          <img src={linkIcon} alt="anchor icon" />
          <small>{link}</small>
        </li>
        <li>
          <h5>{title} 3</h5>
          <img src={linkIcon} alt="anchor icon" />
          <small>{link}</small>
        </li>
      </ul>
    </div>
  );
};

export default SubPanel;
