import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <ul className={styles}>
        <li>
          <img src="/card-icon.png" alt="park icon" />
        </li>
        <li>
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </li>
        <li>
          <p>©2022 SparkCognition. All Rights Reserved.</p>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
