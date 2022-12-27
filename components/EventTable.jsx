import styles from "../styles/EventTable.module.scss";
import { useState, useEffect, useContext, useRef } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const EventTable = ({ eventData }) => {
  const [tableData, setTableData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let dataSlice = eventData.slice(0, 4);
    console.log("🚧 🦺 working here event table data 🚧 🦺 ===> ", eventData);

    setTableData([...dataSlice]);
  }, []);

  useEffect(() => {
    console.log("loading event table... ", tableData.length);
    // console.log("🚧 🦺 working here 🚧 🦺 ===> ", tableData);
    let rows = [];
    tableData.map((row, i) => {
      console.log("setting up rows -> ", row.properties.id);
      console.log("setting up rows -> ", row.properties.media);
      console.log("setting up rows -> ", new Date(row.timestamp));

      // parse Id property to retrieve demo type, resource type, and resource values

      let demo = row.properties.id.split("-")[0].trim().toUpperCase();
      let resourceType = row.properties.id.split("-")[1].trim();
      let resourceNumber = Number(row.properties.id.split("-")[2].trim()) + 1;
      let ts = new Date(row.timestamp);
      let mediaLink = row.properties.media;

      //check for resource
      if (resourceType === "ds") {
        rows.push({
          resource_type: "Demo Site",
          resource: `Demo Site ${resourceNumber}`,
        });
      } else if (resourceType === "cp") {
        rows.push({
          resource_type: "Content Prototype",
          resource: `Content Prototype ${resourceNumber}`,
        });
      } else if (resourceType === "pr") {
        rows.push({
          resource_type: "Presentation",
          resource: `Presentation ${resourceNumber}`,
        });
      } else if (resourceType === "vi") {
        rows.push({
          resource_type: "Video",
          resource: `Video ${resourceNumber}`,
        });
      } else {
        console.log("resource type not recognized...");
      }

      // add timestamp, demo, and link to row object
      rows[i]["demo"] = demo;
      rows[i]["timestamp"] = ts.toString();
      rows[i]["media"] = mediaLink;
      console.log("here it is ==>", typeof rows[i]);
    });

    if (rows.length !== 0) {
      console.log("🚧 🦺 working here 🚧 🦺 rows ===> ", rows);

      setRows([...rows]);
    }
  }, [tableData]);

  return (
    <div className={styles.container}>
      <CSVLink className={styles.CSVDownload} data={rows}>
        <h4>Download</h4>
        <span>
          <img
            className={styles.downloadIcon}
            src="/download.png"
            alt="menu icon"
          />
        </span>
      </CSVLink>
      ;
      <table className={styles.eventTable}>
        <tr>
          <th>Demo</th>
          <th>Resource TYpe</th>
          <th>Resource</th>
          <th>Timestamp</th>
          <th>Link</th>
        </tr>
        {/* row */}
        {rows.map((row, i) => (
          <tr key={i}>
            <td>{row.demo}</td>
            <td>{row.resource_type}</td>
            <td>{row.resource}</td>
            <td>{row.timestamp}</td>
            <td>
              <a href={row.media} target="_blank" rel="noreferrer">
                Media
              </a>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default EventTable;
