import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useContext, useState } from "react";
import { fetchPaginate } from "fetch-paginate";
import LogIn from "../../components/LogIn";
import AppContext from "../../components/AppContext";
import dateUtils from "../../utils/dates";
import PostHogUtils from "../../utils/posthog";

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
import { Bar } from "react-chartjs-2";
import { DepthModes } from "three";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Demo clicks in the last 24 hours",
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

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const context = useContext(AppContext);
  const [demoClicks, setDemoClicks] = useState([]);
  const [resourceClicks, setResourceClicks] = useState([]);
  const [havePHData, setHavePHData] = useState(false);

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
    // console.log("TADA! 🪄 ", demoClicks);

    // --- filter data by timestamp --- //
    // const dateFilter = new Date(labels[labels.length - 1]);

    // --- //

    let maClicks = PostHogUtils.filterClickEvent("ma", demoClicks);
    let vaClicks = PostHogUtils.filterClickEvent("va", demoClicks);
    let rsClicks = PostHogUtils.filterClickEvent("rs", demoClicks);
    let raClicks = PostHogUtils.filterClickEvent("ra", demoClicks);

    const labels = buildLabels();
    const labeledMA = filterByDayOfWeek(maClicks, labels);
    const labeledRA = filterByDayOfWeek(raClicks, labels);
    const labeledVA = filterByDayOfWeek(vaClicks, labels);
    const labeledRS = filterByDayOfWeek(rsClicks, labels);

    if (demoClicks.length !== 0) {
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

      // console.log("MA => ", Data.datasets[0]);
      // console.log("RA => ", Data.datasets[1]);
      // console.log("VA => ", Data.datasets[2]);
      // console.log("RS => ", Data.datasets[3]);
    }
  }, [demoClicks]);

  if (session) {
    return (
      <div className={styles.container}>
        {havePHData ? (
          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <h1>Welcome {session.user.name}</h1>
              <h2>{id}</h2>
            </div>
            <Bar options={options} data={Data} />
          </div>
        ) : (
          <>
            <h1>getting data from posthog...</h1>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <LogIn />
    </>
  );
};

export default Profile;
