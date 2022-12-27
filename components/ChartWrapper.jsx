import styles from "../styles/ChartWrapper.module.scss";
import { useEffect, useContext, useState, useRef } from "react";
import dateUtils from "../utils/dates";
import PostHogUtils from "../utils/posthog";
import "chart.js/auto";
import EventTable from "../components/EventTable";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { DepthModes } from "three";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// data, options for the chart component.
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Demo clicks in the last 7 days",
    },
  },
};

const buildLabels = () => {
  const labels = [];
  for (let i = 0; i <= 6; i++) {
    let date = new Date();
    date.setHours(date.getHours() - 24 * i);
    labels.push(date.toString().slice(0, 15));
  }

  return labels;
};

export const donutData = {
  responsive: true,
  labels: [
    "Maintenance Advisor",
    "Record Analysis",
    "Visual AI Advisor",
    "Renewable Suite",
  ],
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = buildLabels();
export const Data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Maintenance Advisor",
      data: labels.map(() => Math.floor(Math.random() * 7) + 1),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      fill: true,
      label: "Record Analysis",
      data: labels.map(() => Math.floor(Math.random() * 7) + 1),
      borderColor: "rgb(128,0,128, 0.5)",
      backgroundColor: "rgb(128,0,128, 0.5)",
    },
    {
      fill: true,
      label: "Visual AI Advisor",
      data: labels.map(() => Math.floor(Math.random() * 7) + 1),
      borderColor: "rgb(255,1,0, 0.5)",
      backgroundColor: "rgb(255,1,0, 0.5)",
    },
    {
      fill: true,
      label: "Renewable Suite",
      data: labels.map(() => Math.floor(Math.random() * 7) + 1),
      borderColor: "rgb(0,128,1, 0.5)",
      backgroundColor: "rgb(0,128,1, 0.5)",
    },
  ],
};

// helper methods

const filterByDayOfWeek = (dataset, labels) => {
  const dateDelta = new Date(labels[labels.length - 1]);
  const mappedData = labels.map((data) => {
    return {
      label: data,
      labelData: [],
    };
  });
  dataset.map((data) => {
    const date = new Date(data.timestamp);
    const dayOfWeek = Number(date.getDay());

    if (date > dateDelta) {
      if (dayOfWeek === 0) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 0) {
            d.labelData.push(data);
          }
        });
      }

      if (dayOfWeek === 1) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 1) {
            d.labelData.push(data);
          }
        });
      }

      if (dayOfWeek === 2) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 2) {
            d.labelData.push(data);
          }
        });
      }

      if (dayOfWeek === 3) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 3) {
            d.labelData.push(data);
          }
        });
      }

      if (dayOfWeek === 4) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 4) {
            d.labelData.push(data);
          }
        });
      }

      if (dayOfWeek === 5) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 5) {
            d.labelData.push(data);
          }
        });
      }

      if (dayOfWeek === 6) {
        mappedData.map((d) => {
          if (new Date(d.label).getDay() === 6) {
            d.labelData.push(data);
          }
        });
      }
    }
  });

  // console.log("mapped data --> ", mappedData);
  return mappedData;
};

const ChartWrapper = () => {
  const [demoClicks, setDemoClicks] = useState([]);
  const [resourceClicks, setResourceClicks] = useState([]);
  const [havePHData, setHavePHData] = useState(false);
  // const tableStateRef = useRef(false);

  useEffect(() => {
    PostHogUtils.getRecursiveEventData(
      null,
      true,
      null,
      setDemoClicks,
      "open-demo-click"
    );
    PostHogUtils.getRecursiveEventData(
      null,
      true,
      null,
      setResourceClicks,
      "open-resource-click"
    );

    // buildLabels();
    // console.log("my context --> ", context.panelState);
  }, []);

  useEffect(() => {
    if (demoClicks.length !== 0) {
      let maClicks = PostHogUtils.filterEvents("ma", demoClicks);
      let vaClicks = PostHogUtils.filterEvents("va", demoClicks);
      let rsClicks = PostHogUtils.filterEvents("rs", demoClicks);
      let raClicks = PostHogUtils.filterEvents("ra", demoClicks);

      const labels = buildLabels();
      const labeledMA = filterByDayOfWeek(maClicks, labels);
      const labeledRA = filterByDayOfWeek(raClicks, labels);
      const labeledVA = filterByDayOfWeek(vaClicks, labels);
      const labeledRS = filterByDayOfWeek(rsClicks, labels);
      setHavePHData(true);
      console.log("total demo click events ---> ", demoClicks.length);

      // MA
      Data.datasets[0].data = Data.datasets[0].data.map((e, i) => {
        return labeledMA[i].labelData.length;
      });

      // RA
      Data.datasets[1].data = Data.datasets[1].data.map((e, i) => {
        return labeledRA[i].labelData.length;
      });

      // VA
      Data.datasets[2].data = Data.datasets[2].data.map((e, i) => {
        return labeledVA[i].labelData.length;
      });

      // RS
      Data.datasets[3].data = Data.datasets[3].data.map((e, i) => {
        return labeledRS[i].labelData.length;
      });

      console.log("MA => ", Data.datasets[0]);
      console.log("RA => ", Data.datasets[1]);
      console.log("VA => ", Data.datasets[2]);
      console.log("RS => ", Data.datasets[3]);
    }
  }, [demoClicks]);

  useEffect(() => {
    if (resourceClicks.length !== 0) {
      // console.log("🚧 🦺 working here 🚧 🦺 ===> ", resourceClicks);

      let maResClicks = PostHogUtils.filterEvents("ma", resourceClicks);
      let vaResClicks = PostHogUtils.filterEvents("va", resourceClicks);
      let rsResClicks = PostHogUtils.filterEvents("rs", resourceClicks);
      let raResClicks = PostHogUtils.filterEvents("ra", resourceClicks);

      donutData.datasets[0].data = [
        maResClicks.length,
        vaResClicks.length,
        rsResClicks.length,
        raResClicks.length,
      ];

      // console.log("resource table data ====> ", resourceClicks.slice(5));
    }
  }, [resourceClicks]);

  return (
    /////////////////////////////////
    // ----- // UI render // ----- //
    ////////////////////////////////
    <div className={styles.container}>
      {havePHData ? (
        <div className={styles.contentWrapper}>
          {resourceClicks && resourceClicks.length !== 0 ? (
            <EventTable eventData={resourceClicks} />
          ) : (
            <>
              <Skeleton count={7} /> 
            </>
          )}
          <div className={`${styles.chartWrapper} ${styles.pie}`}>
            <Doughnut data={donutData} />
          </div>
          <div className={`${styles.chartWrapper} ${styles.bar}`}>
            <Bar options={options} data={Data} />
          </div>
        </div>
      ) : (
        <div className={styles.spinnerWrapper}>
          <h1>Fetching Profile Data...</h1>
          <div class="loadingSpinnerContainer">
            <div class="h1Container">
              <div class="cube h1 w1 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w1 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w1 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w2 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w2 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w2 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w3 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w3 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h1 w3 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>
            </div>

            <div class="h2Container">
              <div class="cube h2 w1 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w1 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w1 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w2 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w2 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w2 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w3 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w3 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h2 w3 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>
            </div>

            <div class="h3Container">
              <div class="cube h3 w1 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w1 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w1 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w2 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w2 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w2 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w3 l1">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w3 l2">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>

              <div class="cube h3 w3 l3">
                <div class="face top"></div>
                <div class="face left"></div>
                <div class="face right"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartWrapper;
